"use client";

import SquareButton from "@/components/buttons/squareButton/SquareButton";
import Input from "@/components/forms/input/Input";
import Label from "@/components/forms/label/Label";
import Textarea from "@/components/forms/textarea/Textarea";
import { FormEvent, useState } from "react";
import styles from "./page.module.css";

type FieldName = "name" | "email" | "number" | "subject" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;
type Status = "idle" | "sending" | "sent" | "error";

const EMPTY_FIELDS: Record<FieldName, string> = {
  name: "",
  email: "",
  number: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const [fields, setFields] = useState(EMPTY_FIELDS);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState("");
  // Honeypot. Hidden from people, usually filled in by bots.
  const [company, setCompany] = useState("");

  const setField = (field: FieldName) => (value: string) => {
    setFields((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // Without this the browser POSTs to the page itself, which has no handler,
    // and every enquiry was silently destroyed.
    event.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setErrors({});
    setFormError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, company }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (data.errors) setErrors(data.errors);
        setFormError(
          data.error ?? "Some details need another look before I can send this."
        );
        setStatus("error");
        return;
      }

      setFields(EMPTY_FIELDS);
      setStatus("sent");
    } catch {
      setFormError(
        "That didn't reach me — check your connection and try again."
      );
      setStatus("error");
    }
  };

  const sending = status === "sending";

  return (
    <>
      <section className={`${styles.getInTouch} max-width-wrapper`}>
        <div className={styles.wrapper}>
          <div className={styles.introContainer}>
            <h1>Get in Touch</h1>
            <p>
              I am here to answer any questions you may have and create an
              effective solution for your instructional needs.
            </p>
          </div>
          <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={`${styles.name} ${styles.inputContainer}`}>
                <Input
                  type="text"
                  required
                  placeholder="Your Name"
                  name="name"
                  value={fields.name}
                  error={Boolean(errors.name)}
                  id="name"
                  autoComplete="name"
                  disabled={sending}
                  onChange={(e) => setField("name")(e.target.value)}
                  autoFocus
                />
                <Label
                  htmlFor="name"
                  error={Boolean(errors.name)}
                  floatingLabel
                >
                  Your Name<sup>*</sup>
                </Label>
                {errors.name && (
                  <p id="name-error" className={styles.fieldError}>
                    {errors.name}
                  </p>
                )}
              </div>
              <div className={`${styles.email} ${styles.inputContainer}`}>
                <Input
                  type="email"
                  required
                  placeholder="Your Email"
                  name="email"
                  value={fields.email}
                  error={Boolean(errors.email)}
                  id="email"
                  autoComplete="email"
                  disabled={sending}
                  onChange={(e) => setField("email")(e.target.value)}
                  autoFocus={false}
                />
                <Label
                  htmlFor="email"
                  error={Boolean(errors.email)}
                  floatingLabel
                >
                  Your Email<sup>*</sup>
                </Label>
                {errors.email && (
                  <p id="email-error" className={styles.fieldError}>
                    {errors.email}
                  </p>
                )}
              </div>
              <div className={`${styles.phone} ${styles.inputContainer}`}>
                <Input
                  type="tel"
                  required
                  placeholder="Phone Number"
                  name="number"
                  value={fields.number}
                  error={Boolean(errors.number)}
                  id="number"
                  autoComplete="tel"
                  disabled={sending}
                  onChange={(e) => setField("number")(e.target.value)}
                  autoFocus={false}
                />
                <Label
                  htmlFor="number"
                  error={Boolean(errors.number)}
                  floatingLabel
                >
                  Phone Number<sup>*</sup>
                </Label>
                {errors.number && (
                  <p id="number-error" className={styles.fieldError}>
                    {errors.number}
                  </p>
                )}
              </div>
              <div className={`${styles.subject} ${styles.inputContainer}`}>
                <Input
                  type="text"
                  required
                  placeholder="Subject"
                  name="subject"
                  value={fields.subject}
                  error={Boolean(errors.subject)}
                  id="subject"
                  disabled={sending}
                  onChange={(e) => setField("subject")(e.target.value)}
                  autoFocus={false}
                />
                <Label
                  htmlFor="subject"
                  error={Boolean(errors.subject)}
                  floatingLabel
                >
                  Subject<sup>*</sup>
                </Label>
                {errors.subject && (
                  <p id="subject-error" className={styles.fieldError}>
                    {errors.subject}
                  </p>
                )}
              </div>
              <div className={`${styles.message} ${styles.inputContainer}`}>
                <Textarea
                  required
                  placeholder="Message"
                  name="message"
                  value={fields.message}
                  error={Boolean(errors.message)}
                  id="message"
                  autoFocus={false}
                  rows={5}
                  cols={5}
                  disabled={sending}
                  onChange={(e) => setField("message")(e.target.value)}
                />
                <Label
                  htmlFor="message"
                  error={Boolean(errors.message)}
                  floatingLabel
                >
                  Message<sup>*</sup>
                </Label>
                {errors.message && (
                  <p id="message-error" className={styles.fieldError}>
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Honeypot: off-screen and skipped by the tab order. */}
              <div className={styles.honeypot} aria-hidden="true">
                <label htmlFor="company">Company</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>

              <div className={styles.button}>
                <SquareButton
                  buttonStyle="filled"
                  type="submit"
                  disabled={sending}
                >
                  {sending ? "Sending..." : "Submit"}
                </SquareButton>
              </div>

              {/* Announced to screen readers as it changes, not only shown. */}
              <p role="status" aria-live="polite" className={styles.formStatus}>
                {status === "sent" &&
                  "Thanks — your message is with me. I'll come back to you shortly."}
                {status === "error" && formError}
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
