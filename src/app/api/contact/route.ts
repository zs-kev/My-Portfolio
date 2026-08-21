import { NextResponse } from "next/server";
import { Resend } from "resend";

// Sending needs the Node runtime, and this route must never be cached.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LIMITS = {
  name: 100,
  email: 200,
  number: 40,
  subject: 200,
  message: 5000,
} as const;

type FieldName = keyof typeof LIMITS;

const LABELS: Record<FieldName, string> = {
  name: "name",
  email: "email address",
  number: "phone number",
  subject: "subject",
  message: "message",
};

const asString = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

function validate(body: Record<string, unknown>) {
  const values = {} as Record<FieldName, string>;
  const errors: Partial<Record<FieldName, string>> = {};

  for (const field of Object.keys(LIMITS) as FieldName[]) {
    const value = asString(body[field]);
    values[field] = value;

    if (!value) {
      errors[field] = `Please add your ${LABELS[field]}.`;
    } else if (value.length > LIMITS[field]) {
      errors[field] = `That ${LABELS[field]} is too long.`;
    }
  }

  // Deliberately permissive: the only thing worth rejecting here is input that
  // clearly cannot be delivered to. Anything stricter turns away real people
  // with unusual but valid addresses.
  if (!errors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) {
    errors.email = "That doesn't look like an email address.";
  }

  return { values, errors };
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    // Logged rather than returned: the visitor should not be told which
    // environment variables a deployment is missing.
    console.error(
      "Contact form not configured. Set RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL."
    );
    return NextResponse.json(
      { error: "The contact form isn't available right now." },
      { status: 503 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: a field hidden from people but usually filled in by bots.
  // Answer as though it succeeded so the bot has nothing to learn.
  if (asString(body.company)) {
    return NextResponse.json({ ok: true });
  }

  const { values, errors } = validate(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const text = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Phone: ${values.number}`,
    `Subject: ${values.subject}`,
    "",
    values.message,
  ].join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      // replyTo means hitting reply in the inbox goes to the sender, not to
      // the site's own from-address.
      replyTo: values.email,
      subject: `Portfolio enquiry: ${values.subject}`,
      text,
      html: `<pre style="font:inherit;white-space:pre-wrap">${escapeHtml(text)}</pre>`,
    });

    if (error) {
      console.error("Resend rejected the message:", error);
      return NextResponse.json(
        { error: "Your message couldn't be sent. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (cause) {
    console.error("Contact form send failed:", cause);
    return NextResponse.json(
      { error: "Your message couldn't be sent. Please try again." },
      { status: 500 }
    );
  }
}
