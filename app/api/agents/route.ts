import { NextResponse } from 'next/server';

export async function GET() {
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
