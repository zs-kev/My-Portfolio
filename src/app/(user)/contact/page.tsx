import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with Kevin Simon about web development work, or just to talk over a cup of coffee.",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact", title: "Contact" },
};

export default function Contact() {
  return <ContactForm />;
}
