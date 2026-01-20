import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Footer from "@/components/sections/Footer";
import ResultsStream from "@/components/sections/ResultsStream";
import Manifesto from "@/components/sections/Manifesto";
import ClientConfidential from "@/components/sections/ClientConfidential";
import MemberPass from "@/components/sections/MemberPass";
import Paparazzi from "@/components/ui/Paparazzi";
import Protocol from "@/components/sections/Protocol";
import { getFeaturedProjects } from "@/lib/sanity/queries";

export default async function Home() {
  const projects = await getFeaturedProjects();

  return (
    <main className="min-h-screen w-full bg-matte-black text-off-white selection:bg-white selection:text-black">
      <Hero />
      <Manifesto />
      <Protocol />
      <ResultsStream />
      <Services />
      <ClientConfidential projects={projects} />
      <MemberPass />
      <Paparazzi />
      <Footer />
    </main>
  );
}
