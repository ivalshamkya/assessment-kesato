'use client'
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';
import Button from '../button/Button';
import { IGoogleReview } from '@/types/google';
import { getGoogleReview } from '@/app/api/google/google';
import { useTranslations } from 'next-intl';
import LanguangeSwitcher from '../switcher/LanguageSwitcher';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [isAnnouncementVisible, setIsAnnouncementVisible] = useState(true);
  const [googleReview, setGoogleReview] = useState<IGoogleReview>();
  const t = useTranslations('navbar');
  
  const navRef = useRef(null);
  const navContentRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { 
        y: 0,
        opacity: 0 
      },
      { 
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
      }
    );

    const navTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "100px",
        scrub: 0.6
      }
    });

    navTimeline
      .to(navRef.current, {
        top: 0,
        backgroundColor: "#fefefe", // bg-gray-900/95
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        paddingTop: "0.0rem",
        paddingBottom: "0.0rem",
      })
      .to(navContentRef.current, {
        color: "#000",
      })

      .from(logoRef.current, {
        filter: "invert(100%) sepia(8%) saturate(7470%) hue-rotate(282deg) brightness(106%) contrast(96%);"
      })

      .from(linksRef.current, {
        color: "#fff",
      })
      .to(linksRef.current, {
        color: "#86752D",
        backgroundColor: "#FAFAFA"
      })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getGoogleReview();
        setGoogleReview(result);
      } catch (error) {
        console.error("Error fetching information data:", error);
      }
    };

    fetchData();
  }, []);

  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'DESTINATIONS', path: '/destinations' },
    { name: 'BOATS', path: '/boats' },
    { name: 'RATES & SCHEDULE', path: '/rates-schedule' },
    { name: 'GALLERY', path: '/gallery' },
    { name: 'ABOUT', path: '/about' },
    { name: 'BLOG', path: '/blog' },
    { name: 'FAQs', path: '/faqs' }
  ];

  return (
    <div className="relative">
      {isAnnouncementVisible && (
        <div className="relative bg-[#fcfcfc] text-white py-3">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex-1 text-center">
              Stay connected with Starlink - Available on Board
              <Link href="/enquire" className="underline ml-4">
                Enquire
              </Link>
            </div>
            <button
              onClick={() => setIsAnnouncementVisible(false)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
              aria-label="Close announcement"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      <nav 
        ref={navRef}
        className="fixed w-full z-50 transition-transform"
      >
        <div className="w-full mx-auto" ref={navContentRef}>
          <div className="w-full flex items-center justify-between px-[8%] py-3">
            <div className="flex justify-center items-center gap-2">
              <LanguangeSwitcher />
              <div className="border-[#F6F6F6] border-r border-l p-2.5">
                <span>
                  {t('currency')}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="relative w-6 h-6">
                  <Image 
                    src="/google-logo.svg" 
                    alt="Google Rating" 
                    fill
                    className="object-contain"
                    ref={logoRef}
                  />
                </div>
                <span className="font-semibold">{googleReview?.average || 0}</span>
                <span className="text-sm text-gray-400">{googleReview?.totalReviews || 0} reviews</span>
              </div>
            </div>

            <div className="absolute left-1/2 transform -translate-x-1/2" ref={logoRef}>
              <div className="relative w-32 h-12">
                <Image 
                  src="/logo.svg" 
                  alt="Company Logo" 
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            <Button colors={"darkGold"} className='uppercase'>Enquire</Button>
          </div>

          <div 
            ref={linksRef}
            className="flex justify-center space-x-8 py-3 bg-gray-500/30"
          >
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.path}
                className="hover:text-[#8B7F55] transition-colors text-sm tracking-wide"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;