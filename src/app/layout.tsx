import { AppWrapper } from "@/components/AppWrapper";
import { Background } from "@/components/layout/Background";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScrollProvider } from "@/context/SmoothScrollContext";
import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import { Footer } from "../components/layout/Footer";

import { Preloader } from "@/components/PreLoader";
import "./globals.css";
import { AnimationWrapper } from "@/components/AnimationWrapper";

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
        className={`${kanit.className} antialiased overflow-x-hidden`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScrollProvider>
            <AppWrapper>
              <Preloader />
              <AnimationWrapper>
                <Background />
                <Navbar />
                {children}
                <Footer />
                <ScrollToTop />
              </AnimationWrapper>
            </AppWrapper>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
