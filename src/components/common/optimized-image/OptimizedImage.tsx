// components/common/OptimizedImage.tsx
'use client';
import { useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  fill?: boolean;
}

export default function OptimizedImage({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  fill = false,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    gsap.to(`#${alt.replace(/\s+/g, '-')}`, {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out'
    });
  };

  return (
    <div className={`relative ${className}`}>
      <Image
        id={alt.replace(/\s+/g, '-')}
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        fill={fill}
        className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={handleLoad}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}