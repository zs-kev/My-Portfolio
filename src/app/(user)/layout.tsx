import Footer from "@/components/footer/Footer";
import {
  JOB_TITLE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SOCIAL_LINKS,
} from "@/lib/siteConfig";
import type { Metadata } from "next";
import Header from "@/components/header/Header";
import { ProviderLoader } from "@/lib/providers/LoaderProvider/ProviderLoader";
import { Providers } from "../../lib/providers/ThemeProvider/providers";
import {
  butlerBlack,
  butlerBold,
  butlerMedium,
  sansProBold,
  sansProExtraBold,
  sansProMedium,
  sansProMediumItalic,
  sansProRegular,
  sansProSemiBold,
} from "../../styles/fonts";
import "../../styles/globals.css";

const fonts = `${sansProRegular.variable} ${sansProMedium.variable} ${sansProSemiBold.variable} ${sansProBold.variable} ${sansProExtraBold.variable} ${sansProMediumItalic.variable} ${butlerMedium.variable} ${butlerBold.variable} ${butlerBlack.variable}`;

export const metadata: Metadata = {
  // metadataBase makes every relative OG/canonical URL below absolute, which
  // is what crawlers and link-preview bots require.
  metadataBase: new URL(SITE_URL),
  title: {
    // Pages set only their own name; this frames it. Previously every route
    // served the identical title, so five pages competed as duplicates.
    default: `${SITE_NAME} — ${JOB_TITLE}`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${JOB_TITLE}`,
    description: SITE_DESCRIPTION,
    url: "/",
    locale: "en_ZA",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${JOB_TITLE}`,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

// Tells Google this site is about a person, what they do, where they are, and
// which profiles are the same entity — none of which was expressible before.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  jobTitle: JOB_TITLE,
  url: SITE_URL,
  image: `${SITE_URL}/assets/images/kevin-simon.png`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Johannesburg",
    addressCountry: "ZA",
  },
  description: SITE_DESCRIPTION,
  knowsAbout: ["React", "Next.js", "TypeScript", "Front-end development"],
  sameAs: SOCIAL_LINKS.map((link) => link.href),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={fonts}>
        {/* The intro overlay is part of the first paint so it never flashes.
            It is dismissed by JS, so without JS it would cover the page
            forever — hide it outright in that case. */}
        <noscript>
          <style>{`[data-loader-overlay]{display:none !important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          // Serialised from a literal object we control, not user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Providers>
          <ProviderLoader>
            <Header />
            <main>{children}</main>
            <Footer />
          </ProviderLoader>
        </Providers>
      </body>
    </html>
  );
}
