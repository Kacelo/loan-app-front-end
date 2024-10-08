import { Benefits } from "@/components/landing-page/benefits-section/benefits";
import Hero from "@/components/landing-page/hero-section/hero";
import Nav from "@/components/landing-page/navigation/navbar/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="">
        <Hero />
      </div>

      <div className="">
        <Benefits />
      </div>
    </main>
  );
}
