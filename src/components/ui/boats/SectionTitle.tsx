'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SectionTitle() {
  const titleRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: titleRef.current,
        start: 'top 80%',
      }
    });

    tl.from(lineRef.current, {
      width: 0,
      duration: 1,
      ease: 'power2.out'
    })
    .from(titleRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.5');
  }, []);

  return (
    <div className="mb-16">
      <div ref={lineRef} className="w-12 h-[1px] bg-[#8B7F55] mb-4" />
      <h1 ref={titleRef} className="text-5xl text-zinc-900 font-light">OUR BOATS</h1>
    </div>
  );
}