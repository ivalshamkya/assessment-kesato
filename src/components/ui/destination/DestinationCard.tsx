'use client'
import { Destination } from "@/types/destination";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import Image from "next/image";

interface DestinationCardProps {
  destination: Destination;
  isActive: boolean;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ 
  destination, 
  isActive
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && cardRef.current && contentRef.current && imageWrapperRef.current) {
      const tl = gsap.timeline();
      tl.fromTo(imageWrapperRef.current,
        {
          opacity: 0,
          scale: 1.1,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
        }
      ).fromTo(contentRef.current,
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.8"
      );
    }
  }, [isActive]);

  return (
    <div 
      ref={cardRef} 
      className="relative aspect-[3/4] w-full overflow-hidden"
    >
      {/* Image Container */}
      <div ref={imageWrapperRef} className="relative w-full h-full">
        <Image
          src={destination.imageUrl}
          alt={`${destination.name} destination`}
          className="object-cover"
          priority={true}
          quality={100}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div 
        ref={contentRef}
        className="absolute inset-0 flex flex-col justify-center items-center"
      >
        <div className="text-center space-y-4">
          <p className="text-white/90 text-lg tracking-[0.2em] uppercase font-light">
            START FROM €{destination.price}
          </p>
          <h2 className="text-white text-4xl tracking-[0.2em] uppercase font-extralight">
            {destination.name}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;