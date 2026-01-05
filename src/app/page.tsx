"use client";

import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Footer from "@/components/sections/Footer";
import ResultsStream from "@/components/sections/ResultsStream";
import Manifesto from "@/components/sections/Manifesto";
import ClientConfidential from "@/components/sections/ClientConfidential";
import MemberPass from "@/components/sections/MemberPass";
import Paparazzi from "@/components/ui/Paparazzi";
import Experience from "@/components/sections/Experience";
import Protocol from "@/components/sections/Protocol";
import Preloader from "@/components/ui/Preloader";
import CustomCursor from "@/components/ui/CustomCursor";
import TheGate from "@/components/ui/TheGate";
import SonicIdentity from "@/components/ui/SonicIdentity";
import TheVault from "@/components/ui/TheVault";
import SmoothScroll from "@/components/utils/SmoothScroll";
import { useStore } from "@/store/useStore";

export default function Home() {
  const isLoading = useStore((state) => state.isLoading);

  return (
    <>
      <CustomCursor />
      <TheGate />
      <SonicIdentity />
      <TheVault />
      {isLoading && <Preloader />}
      <SmoothScroll>
        <main className="min-h-screen w-full bg-matte-black text-off-white selection:bg-white selection:text-black">
          <Hero />
          <Manifesto />
          <Protocol />
          <ResultsStream />
          <Services />
          <ClientConfidential />
          <MemberPass />
          <Paparazzi />
          <Footer />
        </main>
      </SmoothScroll >
    </>
  );
}
