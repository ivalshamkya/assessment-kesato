'use client';
import { IBoats } from '@/types/boat';
import BoatCardReversed from '../ui/boats/BoatCardReversed';

export default function BoatsReversedSection(boatData: IBoats) {
  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 mx-auto">
      <BoatCardReversed {...boatData} />
    </section>
  );
}