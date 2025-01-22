'use client';
import { IBoats } from '@/types/boats';
import BoatCard from './BoatCard';

export default function BoatsSection(boatData: IBoats) {
  return (
    <section className="py-24 px-4 md:px-8 lg:px-16 mx-auto">
      <BoatCard {...boatData} />
    </section>
  );
}