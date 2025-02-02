import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Navbar";
import { PreLoader } from "../components/PreLoader";
import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import { LoadingProvider } from "@/context/LoadingContext";
import { SmoothScrollProvider } from "@/context/SmoothScrollContext";

const kanit = Kanit({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  style: "normal",
});

export const metadata: Metadata = {
  title: "Lakshya'25 | Poornima University",
  description:
    "Lakshya'25 is the grand annual cultural and technical festival of Poornima University, Jaipur. Experience a vibrant celebration of talent, innovation, and creativity through competitions, performances, workshops, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${kanit.className}  antialiased`}
        suppressHydrationWarning
      >
        <LoadingProvider>
          <SmoothScrollProvider>
            <PreLoader />
            <main className="bg-black">
              <Navbar />
              {children}
              <Footer />
            </main>
          </SmoothScrollProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
