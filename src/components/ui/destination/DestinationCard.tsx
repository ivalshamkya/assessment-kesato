"use client";
import { IDestination } from "@/types/destination";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import Image from "next/image";

interface DestinationCardProps {
  destination: IDestination;
  isActive: boolean;
}

export default function DestinationCard({
  destination,
  isActive,
}: DestinationCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      isActive &&
      cardRef.current &&
      contentRef.current &&
      imageWrapperRef.current
    ) {
      gsap.killTweensOf([imageWrapperRef.current, contentRef.current]);

      const tl = gsap.timeline({
        defaults: {
          ease: "power2.out",
        },
      });

      tl.fromTo(
        imageWrapperRef.current,
        {
          scale: 1.1,
          opacity: 0.8,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
        }
      ).fromTo(
        contentRef.current,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
        },
        "-=0.8"
      );
    }
  }, [isActive]);

  return (
    <div 
      ref={cardRef} 
      className="relative w-full h-full overflow-hidden"
    >
      <div 
        ref={imageWrapperRef} 
        className="relative w-full h-full"
      >
        <Image
          src={destination.imageUrl}
          alt={`${destination.name} destination`}
          className="object-cover object-center"
          priority={isActive}
          quality={100}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 85vw"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col justify-center px-12 md:px-16 lg:px-20"
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-white/90 text-base md:text-lg tracking-[0.2em] uppercase font-light">
              START FROM
            </p>
            <p className="text-white text-xl md:text-2xl tracking-[0.2em] uppercase font-light">
              €{destination.price}
            </p>
          </div>
          
          <div className="max-w-[80%]">
            <h2 className="text-white text-4xl md:text-5xl lg:text-6xl tracking-[0.2em] uppercase font-light leading-tight">
              {destination.name}
            </h2>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 hover:opacity-100" />
    </div>
  );
}