"use client";
import React, { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

interface AnnouncementProps {
  message: string;
  linkText?: string;
  linkHref?: string;
  isVisible: boolean;
  onClose: () => void;
}

const Announcement = ({
  message,
  linkText,
  linkHref = "/enquire",
  isVisible,
  onClose,
}: AnnouncementProps) => {
  if (!isVisible) return null;

  const [showAnnouncement, setShowAnnouncement] = useState(true);

  return (
    <>
      <Announcement
        message="Special offer - 20% off all bookings!"
        linkText="Book Now"
        linkHref="/booking"
        isVisible={showAnnouncement}
        onClose={() => setShowAnnouncement(false)}
      />
      <div className="relative bg-[#8B7F55] text-white py-3 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex-1 text-center">
            {message}
            {linkText && (
              <Link href={linkHref} className="underline ml-4">
                {linkText}
              </Link>
            )}
          </div>
          <button
            onClick={onClose}
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
            aria-label="Close announcement"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Announcement;
