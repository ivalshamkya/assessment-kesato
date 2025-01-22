interface NavigationButtonProps {
  direction: "prev" | "next";
  onClick: () => void;
}

export default function DestinationNavigation({
  direction,
  onClick,
}: NavigationButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
          w-12 h-12 rounded-full border border-[#B5A268] text-[#B5A268]
          flex items-center justify-center
          transition-all duration-300
          hover:bg-[#B5A268] hover:text-white
          focus:outline-none focus:ring-2 focus:ring-[#B5A268] focus:ring-opacity-50
        `}
      aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
    >
      {direction === "prev" ? (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      ) : (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      )}
    </button>
  );
}
