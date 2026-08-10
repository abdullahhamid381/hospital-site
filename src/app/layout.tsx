import type { Metadata } from "next";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/manrope/800.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "./globals.css";
import { ThemeProvider, THEME_INIT_SCRIPT } from "@/components/theme-provider";
import { SITE } from "@/lib/data/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ammhospital.pk"),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.shortName}`,
  },
  description:
    "A premium, technology-driven hospital delivering trusted medical care through experienced specialists, advanced diagnostics, and patient-centered healthcare, 24 hours a day.",
  keywords: [
    "hospital",
    "healthcare",
    "medical services",
    "doctors",
    "emergency care",
    "specialist doctors",
    "medical treatment",
    "health checkup",
    "appointment",
    "diagnostics",
    "Bhakkar hospital",
  ],
  openGraph: {
    title: SITE.name,
    description: SITE.tagline,
    siteName: SITE.name,
    type: "website",
  },
  icons: { icon: "/images/logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Hospital",
              name: SITE.name,
              telephone: SITE.phone,
              email: SITE.email,
              address: { "@type": "PostalAddress", streetAddress: SITE.address },
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-bg text-text antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
