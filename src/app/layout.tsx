// app/layout.tsx
import type { Metadata } from "next";
import { Providers } from "./providers";
import "../styles/globals.css";
import Header from "../components/header";
import { Gluten, Titillium_Web } from "next/font/google";

const gluten = Gluten({
  subsets: ["latin"],
  variable: "--font-gluten", // Optional: create a CSS variable for advanced use
  weight: ["400", "700"], // Define the weights you need
});

const titilliumWeb = Titillium_Web({
  subsets: ["latin"],
  variable: "--font-titillium",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Synth OS",
  description: "A decentralized operating system for the future",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${gluten.className}`}
        style={{ backgroundColor: "#f7f8e6", minWidth: "100vw" }}
      >
        <Providers>
          <Header />
          <div className="w-full h-full px-[10%] text-[#043a68]">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
