"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Button } from "../button";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { IBoats } from "@/types/boats";

export default function BoatCard({
  title,
  price,
  description,
  mainImage,
  thumbnails,
}: IBoats) {
  const [currentImage, setCurrentImage] = useState(mainImage);
  const [isAnimating, setIsAnimating] = useState(false);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const currentImageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("boats");

  // Image change animation
  const changeImage = (newImage: string) => {
    if (isAnimating || newImage === currentImage) return;

    setIsAnimating(true);

    // Create sliding transition
    gsap.to(overlayRef.current, {
      clipPath: "inset(0 0 0 100%)", // Slide out to left
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => {
        setCurrentImage(newImage);
        gsap.fromTo(
          overlayRef.current,
          {
            clipPath: "inset(0 100% 0 0)", // Start from right
          },
          {
            clipPath: "inset(0 0 0 0)", // Slide in from right
            duration: 0.4,
            ease: "power2.inOut",
            onComplete: () => setIsAnimating(false),
          }
        );
      },
    });
  };

  // Initial animation
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainImageRef.current,
        start: "top 70%",
      },
    });

    // Main image reveal
    tl.fromTo(
        currentImageRef.current,
      {
        clipPath: "inset(0 100% 0 0)",
        opacity: 1,
      },
      {
        clipPath: "inset(0 0% 0 0)",
        duration: 1.2,
        ease: "power3.inOut",
      }
    );

    // Thumbnails slide in
    tl.fromTo(
      thumbnailsRef.current?.children,
      {
        x: -30,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      },
      "-=0.8" // Start before main animation ends
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="max-w-[1440px] mx-auto">
      <div className="mt-16 mb-24">
        <div className="mb-16">
          <div className="w-12 h-[1px] bg-[#8B7F55] mb-4" />
          <h1 className="text-[40px] font-light text-zinc-900">OUR BOATS</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 lg:gap-14 items-start">
          <div className="relative w-full">
            <div
              ref={mainImageRef}
              className="bg-primary relative aspect-square w-full"
            >
              <Image
                ref={currentImageRef}
                src={currentImage}
                alt={title}
                fill
                className="object-cover"
                priority
              />
              <div
                ref={overlayRef}
                className="absolute inset-0 bg-black opacity-0 pointer-events-none"
              />
            </div>
          </div>

          <div className="relative h-full space-y-6 pt-4">
            <div
              className="lg:absolute -left-[15%] bottom-[10%] flex justify-center gap-3"
              ref={thumbnailsRef}
            >
              {[mainImage, ...thumbnails].map((thumb, index) => (
                <button
                  key={index}
                  onClick={() => changeImage(thumb)}
                  className={`relative w-[180px] aspect-[4/3] group overflow-hidden
                      ${currentImage === thumb ? "ring-2 ring-[#baa54a]" : ""}`}
                  disabled={isAnimating}
                >
                  <Image
                    src={thumb}
                    alt={`${title} view ${index + 1}`}
                    fill
                    className={`object-cover transition-transform duration-300 
                        ${
                          currentImage !== thumb ? "group-hover:scale-110" : ""
                        }`}
                  />
                  {currentImage !== thumb && (
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                  )}
                  {currentImage === thumb && (
                    <>
                      <div className="absolute inset-0 border-2 border-[#8B7F55]" />
                    </>
                  )}
                </button>
              ))}
            </div>
            <h2 className="text-[40px] font-light text-zinc-900 font-optim">
              {title}
            </h2>
            <div className="space-y-1 flex items-center gap-1">
              <span className="text-zinc-600 text-lg">Starts from</span>
              <div className="text-[#8B7F55] text-lg font-medium">{price}</div>
            </div>
            <p className="text-zinc-600 text-lg leading-relaxed max-w-[540px]">
              {description}
            </p>
            <div className="flex items-center gap-6 pt-4">
              <Button
                variant="secondary"
                colors="darkGold"
                className="min-w-[160px] h-[46px] uppercase text-sm tracking-wide"
              >
                Learn More
              </Button>
              <Button
                variant="tertiary"
                colors="darkGold"
                rightIcon={<ArrowRight className="w-5 h-5" />}
                className="uppercase text-sm tracking-wide"
              >
                View Trips
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
