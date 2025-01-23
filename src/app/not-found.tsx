"use client";
import { useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      ".animate-in",
      { 
        y: 20, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-[#FBFBFB] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <h1 className="animate-in text-9xl text-primary font-light mb-4">404</h1>
        <h2 className="animate-in text-3xl text-zinc-800 mb-6">
          Page Not Found
        </h2>
        <p className="animate-in text-zinc-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link href="/" className="inline-block animate-in">
          <Button variant="secondary" className="gap-2" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}