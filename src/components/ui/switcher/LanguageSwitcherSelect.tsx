"use client";

import { useTransition, useState, useRef, useEffect } from "react";
import { Locale } from "@/i18n/config";
import { setUserLocale } from "@/services/locale";
import { LanguagesIcon, ChevronDownIcon, CheckIcon } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";

type Props = {
  defaultValue: string;
  items: Array<{ value: string; label: string; image: string }>;
  label: string;
};

export default function LocaleSwitcherSelect({
  defaultValue,
  items,
  label,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function onChange(value: string) {
    const locale = value as Locale;
    startTransition(() => {
      setUserLocale(locale);
      setIsOpen(false);
    });
  }

  const handleClick = () => {
    const currentIndex = items.findIndex(item => item.value === defaultValue);
    const nextIndex = (currentIndex + 1) % items.length;
    onChange(items[nextIndex].value);
  };

  const selectedItem = items.find((item) => item.value === defaultValue);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleClick}
        disabled={isPending}
        className={clsx(
          "flex items-center gap-2 rounded-md h-6 w-6 text-sm transition-colors",
          "text-white",
          isPending && "opacity-60 cursor-not-allowed"
        )}
        aria-label={label}
        aria-expanded={isOpen}
        aria-controls="language-menu"
      >
        <Image
          src={selectedItem?.image || ""}
          alt="Language Switcher"
          fill
          className="object-contain"
        />
      </button>
    </div>
  );
}
