import type { Metadata } from "next";
import "./globals.css";
import { BuildBadge } from "@/app/_components/BuildBadge";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ParallaxProvider } from "@/components/ParallaxProvider";
import { ProductAssistant } from "@/components/ProductAssistant";
import { ScrollRevealProvider } from "@/components/ScrollRevealProvider";

export const metadata: Metadata = {
  title: "Zepargn | Épargnez pour vos rêves",
  description:
    "Zepargn vous aide à épargner seul ou en groupe, suivre vos objectifs et avancer vers vos projets.",
  metadataBase: new URL("https://zepargn.com")
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isLayoutDebug = process.env.NEXT_PUBLIC_DEBUG_LAYOUT === "1";
  const isProduction = process.env.NODE_ENV === "production";
  const bodyClassName = [isLayoutDebug ? "debug-layout" : "", isProduction ? "env-production" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <html lang="fr">
      <body className={bodyClassName || undefined}>
        <AnalyticsProvider />
        <ScrollRevealProvider />
        <ParallaxProvider />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ProductAssistant />
        <BuildBadge />
      </body>
    </html>
  );
}
