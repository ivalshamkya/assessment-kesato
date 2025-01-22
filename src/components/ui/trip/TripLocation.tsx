interface TripLocationProps {
  port: string;
  code: string;
  date: string;
  align?: "left" | "right";
}

export default function TripLocation({
  port,
  code,
  date,
  align = "left",
}: TripLocationProps) {
  return (
    <>
      <div className="w-full lg:border p-2">
        <div className={`md:text-${align} ${align == "left" ? "text-right" : ""}`}>
          <div className="font-bold text-zinc-900">
            {port} ({code})
          </div>
          <div className="text-gray-500 text-sm">{date}</div>
        </div>
      </div>
    </>
  );
}
