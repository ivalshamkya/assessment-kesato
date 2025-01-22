'use client'
import BoatsSection from "@/components/ui/boats/BoatsSection";
import Navbar from "@/components/ui/navbar/Navbar";
import { useEffect, useState } from "react";
import { getBoats } from "./api/boats/boats";
import { IBoats } from "@/types/boats";
import Hero from "@/components/section/Hero";

export default function Home() {
  const [boats, setBoats] = useState<IBoats | null>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getBoats();
        setBoats(result);
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
          {boats && <BoatsSection {...boats} />}
          {/* <BoatsSection {} /> */}
      </main>
    </div>
  );
}
