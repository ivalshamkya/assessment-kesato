'use client';
import { IBoats } from '@/types/boat';
import BoatCard from '../ui/boats/BoatCard';

export default function BoatsSection(boatData: IBoats) {
  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 mx-auto">
      <BoatCard {...boatData} />
    </section>
  );
}