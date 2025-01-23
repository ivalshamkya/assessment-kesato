'use client';
import { IBoats } from '@/types/boat';
import BoatCard from '../ui/boats/BoatCard';
import { useEffect, useState } from 'react';
import { getBoat1 } from '@/app/api/boats/boats';

export default function BoatsSection() {
  const [boat, setBoat] = useState<IBoats | null>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setBoat(await getBoat1());
      } catch (error) {
        console.error("Error fetching information data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 mx-auto">
      <div className="mb-16">
          <div className="w-12 h-[1px] bg-[#8B7F55] mb-4" />
          <h1 className="text-[40px] font-light text-zinc-900">OUR BOATS</h1>
        </div>
      {boat && <BoatCard {...boat} />}
    </section>
  );
}