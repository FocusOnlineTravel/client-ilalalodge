import { NextResponse } from 'next/server';

const AGENT_PASSWORD = process.env.AGENT_PASSWORD || 'ilala2024';

// POST - verify password
export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (password === AGENT_PASSWORD) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: 'Invalid password' }, { status: 401 });
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
}

// GET - fetch agents data (requires auth header)
export async function GET(request: Request) {
  // Check for auth header
  const authHeader = request.headers.get('x-agents-auth');
  if (authHeader !== AGENT_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const res = await fetch(
      'https://backend-ilalalodge.focusonlinetravel.co.za/wp-json/ilala/v1/page/agents',
      { next: { revalidate: 60 } } // Cache for 60 seconds
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch from WordPress' },
        { status: res.status }
      );
    }

    const json = await res.json();
    return NextResponse.json(json.acf);
  } catch (error) {
    console.error('Agents API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
