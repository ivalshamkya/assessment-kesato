"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Menu } from "lucide-react";
import Button from "../button/Button";
import { IGoogleReview } from "@/types/google";
import { getGoogleReview } from "@/app/api/google/google";
import { useTranslations } from "next-intl";
import LanguangeSwitcher from "../switcher/LanguageSwitcher";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [isAnnouncementVisible, setIsAnnouncementVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [googleReview, setGoogleReview] = useState<IGoogleReview>();
  const t = useTranslations("navbar");

  const navRef = useRef(null);
  const navContentRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef(null);
  const sidebarRef = useRef(null);
  const sidebarBgRef = useRef(null);
  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  const setMenuItemRef =
    (index: number) => (element: HTMLAnchorElement | null) => {
      menuItemsRef.current[index] = element;
    };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => {
      const newState = !prev;

      if (newState) {
        // Opening animation
        gsap.fromTo(
          sidebarBgRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: "power2.out" }
        );

        gsap.fromTo(
          sidebarRef.current,
          { x: "-100%" },
          { x: "0%", duration: 0.5, ease: "power3.out" }
        );

        // Animate menu items one by one
        menuItemsRef.current.forEach((item, index) => {
          gsap.fromTo(
            item,
            {
              x: -20,
              opacity: 0,
            },
            {
              x: 0,
              opacity: 1,
              duration: 0.5,
              delay: 0.2 + index * 0.1,
              ease: "power2.out",
            }
          );
        });
      } else {
        // Closing animation
        gsap.to(sidebarBgRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });

        gsap.to(sidebarRef.current, {
          x: "-100%",
          duration: 0.5,
          ease: "power3.in",
        });

        // Fade out menu items
        menuItemsRef.current.forEach((item) => {
          gsap.to(item, {
            opacity: 0,
            duration: 0.2,
            ease: "power2.in",
          });
        });
      }

      document.body.style.overflow = !prev ? "hidden" : "unset";
      return newState;
    });
  };

  useEffect(() => {
    // Desktop animations
    if (window.innerWidth > 768) {
      // Initial navbar animation
      gsap.fromTo(
        navRef.current,
        {
          y: 0,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        }
      );

      const navTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "100px",
          scrub: 0.6,
        },
      });

      // Select both logo elements
      const logoElements = document.querySelectorAll(".navbar-logo");

      navTimeline
        .to(navRef.current, {
          top: 0,
          backgroundColor: "#fefefe",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          paddingTop: "0.0rem",
          paddingBottom: "0.0rem",
        })
        .to(
          navContentRef.current,
          {
            color: "#000",
          },
          "<"
        )
        .to(
          logoElements,
          {
            filter: "brightness(0%) invert(0%)",
          },
          "<"
        )
        .from(
          linksRef.current,
          {
            color: "#fff",
          },
          "<"
        )
        .to(linksRef.current, {
          color: "#86752D",
          backgroundColor: "#FAFAFA",
        });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
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
    { name: "HOME", path: "/" },
    { name: "DESTINATIONS", path: "/destinations" },
    { name: "BOATS", path: "/boats" },
    { name: "RATES & SCHEDULE", path: "/rates-schedule" },
    { name: "GALLERY", path: "/gallery" },
    { name: "ABOUT", path: "/about" },
    { name: "BLOG", path: "/blog" },
    { name: "FAQs", path: "/faqs" },
  ];

  return (
    <div className="relative">
      {isAnnouncementVisible && (
        <div className="relative bg-darkGold text-white py-3">
          <div className="container mx-auto flex items-center justify-between px-4">
            <div className="flex-1 text-center text-sm md:text-base">
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

      <nav ref={navRef} className="fixed w-full z-50 transition-transform">
        <div className="w-full mx-auto" ref={navContentRef}>
          <div className="w-full flex items-center justify-between px-4 md:px-[8%] py-5">
            <div className="hidden md:flex justify-center items-center gap-2">
              <LanguangeSwitcher />
              <div className="border-[#F6F6F6] border-r border-l p-2.5">
                <span>{t("currency")}</span>
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
                <span className="font-semibold">
                  {googleReview?.average || 0}
                </span>
                <span className="text-sm text-gray-400">
                  {googleReview?.totalReviews || 0} reviews
                </span>
              </div>
            </div>

            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-darkGold"
              aria-label="Toggle menu"
            >
              <Menu
                ref={logoRef}
                className="w-6 h-6 brightness-0 invert navbar-logo transition-all duration-300"
              />
            </button>

            <div
              className="absolute left-1/2 transform -translate-x-1/2"
              ref={logoRef}
            >
              <div className="relative w-24 md:w-32 h-12">
                <Image
                  src="/logo2.svg"
                  alt="Company Logo"
                  fill
                  className="object-contain navbar-logo transition-all duration-300"
                  priority
                />
              </div>
            </div>

            <Button colors="darkGold" className="uppercase hidden md:block">
              Enquire
            </Button>
          </div>

          <div
            ref={linksRef}
            className="hidden md:flex justify-center space-x-8 py-3 bg-gray-500/30"
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

      <div
        ref={sidebarBgRef}
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden ${
          isMobileMenuOpen
            ? "pointer-events-auto"
            : "pointer-events-none opacity-0"
        }`}
        onClick={toggleMobileMenu}
      >
        <div
          ref={sidebarRef}
          className="fixed inset-y-0 left-0 w-full bg-darkGold transform -translate-x-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="grid grid-cols-3 items-center p-4">
            <button
              onClick={toggleMobileMenu}
              className="text-white"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex justify-center">
              <div className="relative w-24 md:w-32 h-12">
                <Image
                  src="/logo.svg"
                  alt="Company Logo"
                  fill
                  className="object-contain brightness-0 invert transition-all duration-300"
                />
              </div>
            </div>
          </div>

          {/* Sidebar Navigation */}
          <div className="px-4 py-6 space-y-6">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.path}
                ref={setMenuItemRef(index)}
                className="block text-white text-xl font-light tracking-wider hover:text-gray-300 transition-colors opacity-0"
                onClick={toggleMobileMenu}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Google Review - Mobile */}
          <div className="absolute bottom-24 left-0 right-0 flex items-center justify-center gap-2 text-white">
            <Image
              src="/google-logo.svg"
              alt="Google"
              width={20}
              height={20}
            />
            <span className="font-semibold">
              {googleReview?.average || 5.0}
            </span>
            <span className="text-sm">
              {googleReview?.totalReviews || 2302} Review
            </span>
          </div>

          {/* Enquire Button - Mobile */}
          <div className="absolute bottom-0 left-0 w-full p-4 bg-darkGold border-t border-white/20">
            <Button colors="gold" className="w-full justify-center uppercase">
              ENQUIRE
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
