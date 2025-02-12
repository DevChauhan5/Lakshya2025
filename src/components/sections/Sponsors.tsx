"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { ShineBorder } from "@/components/magicui/shine-border";
import { SectionTitle } from "@/components/ui/SectionTitle";
import Image from "next/image";
import { TextAnimate } from "../magicui/text-animate";

export const Sponsors = () => {
  return (
    <section className="w-full min-h-screen bg-black/95 py-20 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-16">
          <BlurFade>
            <SectionTitle title="Our Sponsors" />
          </BlurFade>
        </div>

        <div className="flex justify-center">
          <BlurFade>
            <ShineBorder
              className="relative max-w-3xl p-6 rounded-xl backdrop-blur-sm bg-black/40 !border-0"
              color={["#ffce6b", "#f48952", "#f0524a"]}
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Image */}
                <div className="w-full md:w-1/3 h-[200px] md:h-[300px] relative">
                  <Image
                    src="/images/sponsors/1.webp"
                    alt="Quick Smart Wash"
                    fill
                    className="object-contain bg-white rounded-md"
                  />
                </div>

                {/* Content */}
                <div className="w-full md:w-2/3 space-y-4">
                  <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-theme-primary via-theme-accent to-theme-secondary bg-clip-text text-transparent">
                    About Quick Smart Wash
                  </h3>
                  <TextAnimate
                    animation="blurInUp"
                    by="character"
                    className="text-gray-300 text-sm md:text-base leading-relaxed"
                  >
                    Established in 2013, Quick Smart Wash Private Limited (QSW)
                    revolutionized the laundry industry in India with its
                    professional linen management and laundry services.
                    Operating from Jaipur, Rajasthan, QSW introduced the concept
                    of &apos;Campus Laundromats&apos; nationwide, offering
                    eco-friendly cleaning through smart card-driven laundries
                    and state-of-the-art technology.
                  </TextAnimate>
                </div>
              </div>
            </ShineBorder>
          </BlurFade>
        </div>
      </div>
    </section>
  );
};
