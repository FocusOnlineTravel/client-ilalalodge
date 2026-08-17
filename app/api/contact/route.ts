import { NextResponse } from 'next/server';
import { submitGravityForm } from '@/lib/gravity-forms';

type ContactPayload = {
  type: 'general' | 'accommodation';
  name: string;
  email: string;
  phone?: string;
  arrival?: string;
  departure?: string;
  guests?: string;
  roomPref?: string;
  nationality?: string;
  message: string;
  howFound?: string;
  newsletter?: boolean;
};

const NEWSLETTER_CHOICE_LABEL =
  'Sign me up to the Ilala Lodge newsletter for updates, special offers, and travel inspiration.';

export async function POST(req: Request) {
  const formId = process.env.GF_CONTACT_FORM_ID;
  if (!formId) {
    return NextResponse.json(
      { error: 'Contact form is not configured (missing GF_CONTACT_FORM_ID).' },
      { status: 500 }
    );
  }

  let body: ContactPayload;
  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
    return NextResponse.json(
      { error: 'Name, email, and message are required.' },
      { status: 400 }
    );
  }

  const inputs: Record<string, string> = {
    input_1: body.type,
    input_2: body.name.trim(),
    input_3: body.email.trim(),
    input_4: body.phone?.trim() ?? '',
    input_10: body.message.trim(),
    input_11: body.howFound?.trim() ?? '',
    input_12_1: body.newsletter ? NEWSLETTER_CHOICE_LABEL : '',
  };

  if (body.type === 'accommodation') {
    inputs.input_5 = body.arrival ?? '';
    inputs.input_6 = body.departure ?? '';
    inputs.input_7 = body.guests ?? '';
    inputs.input_8 = body.roomPref ?? '';
    inputs.input_9 = body.nationality ?? '';
  }

  try {
    const result = await submitGravityForm(formId, inputs);

    if (!result.is_valid) {
      return NextResponse.json(
        {
          error: 'Please check the form for errors.',
          validation_messages: result.validation_messages ?? {},
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      confirmation: result.confirmation_message ?? null,
    });
  } catch (err) {
    console.error('[api/contact] Submission failed:', err);
    return NextResponse.json(
      { error: 'Something went wrong sending your enquiry. Please try again or email us directly.' },
      { status: 502 }
    );
  }
}
