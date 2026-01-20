import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navigation from "@/components/Navigation";
import CanvasCursor from "@/components/CanvasCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vertex Interactive | Digital Infrastructure",
  description: "Vertex Interactive represents precision-led innovation, measured transformation, and quiet technological confidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`} suppressHydrationWarning>
      <body
        className="bg-deep-charcoal text-off-white antialiased overflow-x-hidden selection:bg-accent-gold selection:text-deep-charcoal"
        suppressHydrationWarning
      >
        <SmoothScroll>
          <Navigation />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
