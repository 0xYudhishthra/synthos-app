// app/layout.tsx
import type { Metadata } from "next";
import { ThirdwebProvider } from "thirdweb/react";
import "../styles/globals.css";
import Header from "../components/header";
import { Gluten, Titillium_Web, Roboto_Mono, Space_Grotesk } from "next/font/google";

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "700"],
});

const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Synth OS - Verifiable DeFAI Agent Marketplace on Scroll",
  description: "Verifiable DeFAI Agent Marketplace on Scroll",
  icons: {
    icon: "/logo.jpeg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${space_grotesk.className}`}  // Use gluten font for the body
        style={{ backgroundColor: "#09092f", minWidth: "100vw" }}
      >
        <ThirdwebProvider>
          <Header />
          <div className="w-full h-full mx-2 overflow-y-hidden">
            {children}
          </div>
        </ThirdwebProvider>
      </body>
    </html>
  )
}
