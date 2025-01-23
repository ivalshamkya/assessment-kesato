import { TripCard } from "../ui/trip";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { ITrip } from "@/types/trip";
import { getTrip } from "@/app/api/trip/trip";

export default function UpcomingTrips() {
  const [trips, setTrips] = useState<ITrip[] | null>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTrips(await getTrip());
      } catch (error) {
        console.error("Error fetching information data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-16 flex flex-col justify-center items-center">
        <div className="w-12 h-[1px] bg-[#8B7F55] mb-4" />
        <h1 className="text-[40px] font-light text-zinc-900">UPCOMING TRIPS</h1>
      </div>
      <div className="space-y-4">
        {trips?.map((trip) => (
          <TripCard key={trip.id} {...trip} />
        ))}
      </div>
      <div className="text-center mt-8">
        <Button variant={"secondary"} colors={"gold"}>
          VIEW ALL
        </Button>
      </div>
    </div>
  );
}
