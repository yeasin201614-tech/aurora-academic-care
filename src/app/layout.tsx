import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aurora Academic Care | Learn Today. Lead Tomorrow.",
  description:
    "Bangladesh's leading hybrid coaching centre management and learning platform. Comprehensive HSC, SSC, Medical & BUET Engineering admission preparation with offline and online classes.",
  keywords: [
    "Aurora Academic Care",
    "Coaching Centre Bangladesh",
    "HSC Science Coaching",
    "Medical Admission Buster",
    "BUET Admission Mastery",
    "SSC Foundation",
    "Dhaka Coaching Centre"
  ],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Aurora Academic Care | Learn Today. Lead Tomorrow.",
    description: "Bangladesh's Premier Coaching Centre & Learning Platform.",
    url: "https://auroraacademic.com",
    siteName: "Aurora Academic Care",
    locale: "en_BD",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-surface text-brandText flex flex-col font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
