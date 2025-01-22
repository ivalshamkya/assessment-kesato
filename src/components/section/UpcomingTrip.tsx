import { Trip } from "@/types/trip";
import { TripCard } from "../ui/trip";
import { Button } from "../ui/button";

const UpcomingTrips: React.FC = () => {
    const trips: Trip[] = [
      {
        id: '1',
        destination: 'Banda Sea, Raja Ampat, Triton Bay',
        ship: 'MV Ambai',
        shipCode: 'A241108',
        departure: {
            port: 'Sorong',
            code: 'SOQ',
            date: '08 Nov 2024',
        },
        arrival: {
            port: 'Kaimana',
            code: 'KNG',
            date: '22 Nov 2024',
        },
        nights: 14,
        price: 5000,
      },
      {
        id: '2',
        destination: 'Banda Sea, Raja Ampat, Triton Bay',
        ship: 'MV Ambai',
        shipCode: 'A241108',
        departure: {
            port: 'Sorong',
            code: 'SOQ',
            date: '08 Nov 2024',
        },
        arrival: {
            port: 'Kaimana',
            code: 'KNG',
            date: '22 Nov 2024',
        },
        nights: 14,
        price: 5000,
        spacesLeft: 1,
      },
      {
        id: '3',
        destination: 'Banda Sea, Raja Ampat, Triton Bay',
        ship: 'MV Ambai',
        shipCode: 'A241108',
        departure: {
            port: 'Sorong',
            code: 'SOQ',
            date: '08 Nov 2024',
        },
        arrival: {
            port: 'Kaimana',
            code: 'KNG',
            date: '22 Nov 2024',
        },
        nights: 14,
        price: 3000,
        originalPrice: 5000,
        discount: 20,
        spacesLeft: 1,
      },
    ];
  
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-16 flex flex-col justify-center items-center">
          <div className="w-12 h-[1px] bg-[#8B7F55] mb-4" />
          <h1 className="text-[40px] font-light text-zinc-900">UPCOMING TRIPS</h1>
        </div>
        <div className="space-y-4">
          {trips.map((trip) => (
            <TripCard key={trip.id} {...trip} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Button variant={"secondary"} colors={"gold"}>VIEW ALL</Button>
        </div>
      </div>
    );
  };
  
  export default UpcomingTrips;