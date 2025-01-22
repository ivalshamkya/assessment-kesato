'use client'
import BoatsSection from "@/components/section/BoatsSection";
import Navbar from "@/components/ui/navbar/Navbar";
import { useEffect, useState } from "react";
import { getBoat1, getBoat2 } from "./api/boats/boats";
import { IBoats } from "@/types/boat";
import Hero from "@/components/section/Hero";
import UpcomingTrips from "@/components/section/UpcomingTrip";
import DestinationSlider from "@/components/section/DestinationSlider";
import FAQSection from "@/components/section/FaqSection";
import { Footer } from "@/components/ui/footer";
import BoatsReversedSection from "@/components/section/BoatsReversedSection";

export default function Home() {
  const [boat1, setBoat1] = useState<IBoats | null>();
  const [boat2, setBoat2] = useState<IBoats | null>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setBoat1(await getBoat1());
        setBoat2(await getBoat2());
      } catch (error) {
        console.error("Error fetching information data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white font-[family-name:var(--font-questrial)]">
      <Navbar />
      <main className="relative">
          <Hero />
          {boat1 && <BoatsSection {...boat1} />}
          {boat2 && <BoatsReversedSection {...boat2} />}
          {/* <BoatsSection {} /> */}
          <UpcomingTrips />
          <DestinationSlider />
          <FAQSection />
          <Footer />
      </main>
    </div>
  );
}
