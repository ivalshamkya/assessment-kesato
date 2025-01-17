import Button from "@/components/ui/button/Button"; 
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-gray-600  grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Button variant={"tertiary"} colors={"gold"} rightIcon={<ArrowRight />}>BUTTON</Button>
      </main>
    </div>
  );
}
