import React from "react";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Events } from "@/components/sections/Events";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Events />
    </main>
  );
}
