const WP_URL = process.env.WP_URL;
const GF_CONSUMER_KEY = process.env.GF_CONSUMER_KEY;
const GF_CONSUMER_SECRET = process.env.GF_CONSUMER_SECRET;

export type GravityFormsSubmissionResult = {
  is_valid: boolean;
  validation_messages?: Record<string, string>;
  confirmation_message?: string;
  confirmation_type?: string;
  confirmation_redirect?: string;
  page_number?: number;
  source_page_number?: number;
};

export async function submitGravityForm(
  formId: string,
  inputs: Record<string, string | number | boolean>
): Promise<GravityFormsSubmissionResult> {
  if (!WP_URL || !GF_CONSUMER_KEY || !GF_CONSUMER_SECRET) {
    throw new Error(
      'Missing Gravity Forms environment variables (WP_URL, GF_CONSUMER_KEY, GF_CONSUMER_SECRET)'
    );
  }

  const auth = Buffer.from(`${GF_CONSUMER_KEY}:${GF_CONSUMER_SECRET}`).toString('base64');
  const url = `${WP_URL}/wp-json/gf/v2/forms/${formId}/submissions`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inputs),
    cache: 'no-store',
  });

  const data = await res.json().catch(() => null);

  // GF returns 400 with { is_valid: false, validation_messages } for user-input errors.
  // Treat those as a normal response so the caller can surface field errors.
  const looksLikeValidationResponse =
    data && typeof data === 'object' && 'is_valid' in data;

  if (!res.ok && !looksLikeValidationResponse) {
    throw new Error(
      `Gravity Forms submission failed (${res.status}): ${JSON.stringify(data ?? {})}`
    );
  }

  return data as GravityFormsSubmissionResult;
}
