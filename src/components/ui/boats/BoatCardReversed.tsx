"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Button } from "../button";
import { ArrowRight } from "lucide-react";
import { IBoats } from "@/types/boat";

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
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    thumbnailRefs.current = thumbnailRefs.current.slice(
      0,
      thumbnails.length + 1
    );
  }, [thumbnails]);

  const changeImage = (newImage: string) => {
    if (isAnimating || newImage === currentImage) return;

    setIsAnimating(true);

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
    });

    tl.to(imageWrapperRef.current, {
      clipPath: "inset(0 0 0 100%)",
      duration: 0.7,
      onComplete: () => {
        setCurrentImage(newImage);
        gsap.set(imageWrapperRef.current, {
          clipPath: "inset(0 100% 0 0)",
        });
      },
    }).to(imageWrapperRef.current, {
      clipPath: "inset(0 0% 0 0)",
      duration: 0.7,
      ease: "power3.inOut",
      onComplete: () => setIsAnimating(false),
    });
  };

  useEffect(() => {
    if (
      !mainImageRef.current ||
      !imageWrapperRef.current ||
      !thumbnailContainerRef.current
    )
      return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainImageRef.current,
        start: "top 70%",
      },
    });

    tl.fromTo(
      imageWrapperRef.current,
      {
        clipPath: "inset(0 100% 0 0)",
        opacity: 1,
      },
      {
        clipPath: "inset(0 0% 0 0)",
        duration: 1.5,
        ease: "power3.inOut",
      }
    );

    const validThumbnailRefs = thumbnailRefs.current.filter(Boolean);
    if (validThumbnailRefs.length > 0) {
      tl.fromTo(
        validThumbnailRefs,
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
        "-=0.8"
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  const setThumbnailRef = (index: number) => (el: HTMLButtonElement | null) => {
    thumbnailRefs.current[index] = el;
  };

  return (
    <div className="max-w-[1440px] mx-auto">
      <div className="mt-10 mb-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 lg:gap-14 items-start">
          <div className="relative h-full space-y-6 pt-4">
            <div
              ref={thumbnailContainerRef}
              className="lg:absolute -right-[15%] bottom-[10%] z-10 flex justify-center gap-3"
            >
              {[mainImage, ...thumbnails].map((thumb, index) => (
                <button
                  key={index}
                  ref={setThumbnailRef(index)}
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
                    <div className="absolute inset-0 border-2 border-[#8B7F55]" />
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

          <div className="relative w-full">
            <div
              ref={mainImageRef}
              className="bg-primary relative aspect-square w-full"
            >
              <div ref={imageWrapperRef} className="relative w-full h-full">
                <Image
                  src={currentImage}
                  alt={title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div
                ref={overlayRef}
                className="absolute inset-0 bg-black opacity-0 pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
