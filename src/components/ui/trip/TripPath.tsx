import { Ship } from "lucide-react";

interface TripPathProps {
  nights: number;
}

export default function TripPath({ nights }: TripPathProps) {
  return (
    <div className="flex flex-col items-center px-4">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-primary"></div>
        <div className="border-t border-dashed border-primary w-16"></div>
        <div className="w-6 h-6">
          <Ship className="text-primary"/>
        </div>
        <div className="border-t border-dashed border-primary w-16"></div>
        <div className="w-2 h-2 rounded-full bg-primary"></div>
      </div>
      <div className="text-sm text-gray-500 mt-2">{nights} Nights</div>
    </div>
  );
}
