import { Benefits } from "@/components/landing-page/benefits-section/benefits";
import Hero from "@/components/landing-page/hero-section/hero";
import Nav from "@/components/landing-page/navigation/navbar/navbar";
import Image from "next/image";

export default function Home() {
  console.log("should we restart");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <Hero />
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:text-left">
        <Benefits />
      </div>
    </main>
  );
}
