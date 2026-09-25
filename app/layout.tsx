import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Iron 9 Gym | Best Gym in Aqaba",
  description:
    "Forge your iron and build your best at Iron 9 Gym in Aqaba, Jordan. Explore our gym, memberships and supplements.",
  openGraph: {
    title: "Iron 9 Gym | Best Gym in Aqaba",
    description: "Forge your iron. Build your best. Train with Iron 9 Gym in Aqaba.",
    images: ["/assets/hero.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Iron 9 Gym | Best Gym in Aqaba",
    description: "Train stronger at Iron 9 Gym in Aqaba, Jordan.",
    images: ["/assets/hero.jpg"],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "HealthClub",
  name: "IRON 9 GYM",
  description: "Fitness club in Aqaba, Jordan.",
  telephone: "+962793100014",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Aqaba",
    addressCountry: "JO",
  },
  sameAs: ["https://instagram.com/iron_9gym"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        {children}
      </body>
    </html>
  );
}
