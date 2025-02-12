"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { SectionTitle } from "@/components/ui/SectionTitle";
import Image from "next/image";

const images = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  src: `/images/gallery/${i + 1}.webp`,
  alt: `Lakshya Gallery Image ${i + 1}`,
  isLandscape: i % 2 === 0,
}));

export const Gallery = () => {
  return (
    <section
      id="gallery"
      className="w-full min-h-screen bg-black/95 py-20 px-4 sm:px-6 md:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-16">
          <BlurFade>
            <SectionTitle title="Gallery" />
          </BlurFade>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [&>div]:mb-4">
          {images.map((image) => (
            <BlurFade
              key={image.id}
              delay={0.15 + image.id * 0.1}
              className="relative break-inside-avoid"
              inView
            >
              <div
                className={`relative group overflow-hidden rounded-xl 
                         ${
                           image.isLandscape ? "h-[300px]" : "h-[400px]"
                         } w-full`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-all duration-700 
                           group-hover:scale-110 group-hover:rotate-1"
                  sizes="(max-width: 640px) 100vw, 
                         (max-width: 1024px) 50vw, 
                         33vw"
                />
                {/* Overlay on hover */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-lg font-medium truncate">
                      Lakshya&apos;24
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Moments captured during the event
                    </p>
                  </div>
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
};
