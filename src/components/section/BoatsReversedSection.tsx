'use client';
import { IBoats } from '@/types/boat';
import BoatCardReversed from '../ui/boats/BoatCardReversed';
import { useEffect, useState } from 'react';
import { getBoat2 } from '@/app/api/boats/boats';
import { BoatCard } from '../ui/boats';

export default function BoatsReversedSection() {
  const [boat, setBoat] = useState<IBoats | null>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setBoat(await getBoat2());
      } catch (error) {
        console.error("Error fetching information data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 mx-auto">
      <div className="hidden md:block">
        {boat && <BoatCardReversed {...boat} />}
      </div>
      <div className="block md:hidden">
        {boat && <BoatCard {...boat} />}
      </div>
    </section>
  );
}