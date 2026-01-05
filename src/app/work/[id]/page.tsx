"use client";

import { useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import MagneticButton from "@/components/ui/MagneticButton";

// Register ScrollTrigger
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// Mock Data for Case Studies
const projects = {
    "claussal-ai": {
        title: "Claussal.ai",
        category: "Legal Tech AI",
        year: "2025",
        client: "Claussal Inc.",
        link: "https://claussal.ai",
        description: "A digital front door for the Indian Legal Sector that feels less like a sales pitch and more like a glimpse into the future of litigation.",
        challenge: "The average legal-tech website is cluttered, outdated, and screams 'database.' The goal was to convince skeptical lawyers that Claussal isn't just a search tool - it is a sophisticated, intelligent partner. We needed to communicate authority without friction and build trust in 0.5 seconds.",
        solution: "We bypassed the standard 'corporate blue' for 'The Matte-Black Brief' - a bold, dark-themed aesthetic. By stripping away unnecessary graphics (Minimalism as Power) and prioritizing crisp, high-contrast typography, we signaled focus and precision. The UX answers 'What is it?', 'Is it safe?', and 'How do I start?' immediately.",
        metrics: [
            { label: "Visual Language", value: "Dark Mode" },
            { label: "Trust Factor", value: "Verified" },
            { label: "User Friction", value: "Zero" }
        ],
        next: "itz-confidential"
    },
    "itz-confidential": {
        title: "Itz Confidential",
        category: "Web Experience",
        year: "2024",
        client: "Itz Confidential",
        link: "https://itzconfidential.com",
        description: "We successfully launched itzconfidential.com not as a store, but as a playable prologue. Users aren't just buying a game; they are entering a story.",
        challenge: "Mystery games rely on atmosphere, yet most websites selling them look like generic clothing stores. The magic of 'solving a crime' was getting lost in boring product grids. We needed a noir aesthetic and a user experience that matched the intensity of the product.",
        solution: "I scrapped the traditional e-commerce layout for a digital 'Evidence Board.' I engineered a dynamic 'Red Thread' SVG line that draws itself down the screen as the user scrolls, turning passive scrolling into active investigation. The checkout flow was gamified into a logic-gated 'Closure Report' - users have to solve the case to submit.",
        metrics: [
            { label: "Aesthetic", value: "Noir" },
            { label: "Interaction", value: "Red Thread" },
            { label: "UX Type", value: "Gamified" }
        ],
        next: "fobet-media"
    },
    "fobet-media": {
        title: "Fobet Media",
        category: "Super-Profile",
        year: "2024",
        client: "Fobet Media",
        status: "Coming Soon",
        description: "A platform that feels instantly familiar to creators, yet expensive enough to justify high-ticket retainers. We synthesized the psychomechanics of social media with a strict 'Matte Black' design.",
        challenge: "Fobet Media needed a digital home that spoke the native language of creators (Viral Art) while proving enterprise-grade engineering (Backend Science). The challenge was to balance 'Internet Hype' with 'High-Ticket Trust' without looking like a generic marketing template.",
        solution: "We adopted the 'Super-Profile' architecture with a 'Matte-Gram' aesthetic - Pitch Black OLED backgrounds and system-native typography. I engineered a responsive 'Smart Grid' that morphs from a mobile feed to a desktop command center. The 'Message' button was reinvented as a simulated DM Chat Interface that pre-qualifies leads using logic-based automation.",
        metrics: [
            { label: "Aesthetic", value: "Matte-Gram" },
            { label: "Architecture", value: "Super-Profile" },
            { label: "Conversion", value: "DM Pipeline" }
        ],
        next: "claussal-ai"
    }
};

export default function CaseStudyPage() {
    const params = useParams();
    const id = params?.id as string;
    const project = projects[id as keyof typeof projects];

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Simple entrance animation
        gsap.fromTo(".animate-in",
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" }
        );

    }, [id]);

    if (!project) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                <div className="text-center">
                    <h1 className="font-syne text-4xl mb-4">404</h1>
                    <p className="font-inter text-white/50">Project not found.</p>
                    <Link href="/" className="inline-block mt-8 text-white border-b border-white pb-1">Return Home</Link>
                </div>
            </div>
        );
    }

    return (
        <main ref={containerRef} className="bg-matte-black min-h-screen text-white selection:bg-white/30">
            {/* Navigation / Back */}
            <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center mix-blend-difference">
                <Link href="/" className="font-syne font-bold text-xl uppercase">Aditya Raj</Link>
                <Link href="/" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                    ✕
                </Link>
            </nav>

            {/* Hero Section */}
            <header className="relative w-full h-[80vh] flex flex-col justify-end p-8 md:p-20 border-b border-white/10">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />

                {/* Background (Abstract for now) */}
                <div className="absolute inset-0 z-0 bg-neutral-900 opacity-20">
                    <div className="w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-800 via-black to-black" />
                </div>

                <div className="relative z-10 max-w-4xl">
                    <div className="flex items-center gap-4 mb-6 animate-in">
                        <span className="font-mono text-xs text-white border border-white/20 px-2 py-1 rounded-full">{project.category}</span>
                        <span className="font-mono text-xs text-white/40">{project.year}</span>
                    </div>
                    <h1 className="font-syne text-5xl md:text-8xl font-bold uppercase leading-[0.9] tracking-tight mb-8 animate-in">
                        {project.title}
                    </h1>
                    <p className="font-inter text-lg md:text-xl text-white/60 max-w-2xl animate-in">
                        {project.description}
                    </p>
                </div>
            </header>

            {/* Content Body */}
            <section className="max-w-7xl mx-auto px-4 md:px-20 py-24 md:py-32 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">

                {/* Sidebar / Metadata */}
                <div className="md:col-span-4 flex flex-col gap-12 animate-in">
                    <div>
                        <h3 className="font-inter text-xs text-white/30 uppercase tracking-widest mb-4">Client</h3>
                        <p className="font-syne text-xl text-white">{project.client}</p>
                    </div>
                    <div>
                        <h3 className="font-inter text-xs text-white/30 uppercase tracking-widest mb-4">Role</h3>
                        <p className="font-syne text-xl text-white">Lead Design</p>
                    </div>

                    {/* View Project Button */}
                    <div className="pt-4">
                        {project.status === "Coming Soon" ? (
                            <div className="inline-flex px-6 py-3 border border-white/10 rounded-full font-inter text-xs text-white/30 uppercase tracking-widest cursor-not-allowed bg-white/5">
                                Coming Soon
                            </div>
                        ) : (
                            <a href={project.link} target="_blank" rel="noopener noreferrer">
                                <MagneticButton className="!px-8 !py-3 text-xs bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors">
                                    View Project ↗
                                </MagneticButton>
                            </a>
                        )}
                    </div>
                </div>

                {/* Main Content */}
                <div className="md:col-span-8 flex flex-col gap-24 animate-in">
                    <div className="prose prose-invert max-w-none">
                        <h3 className="font-syne text-2xl md:text-3xl font-bold mb-6 text-white">The Challenge</h3>
                        <p className="font-inter text-lg leading-relaxed text-white/70">{project.challenge}</p>
                    </div>



                    <div className="prose prose-invert max-w-none">
                        <h3 className="font-syne text-2xl md:text-3xl font-bold mb-6 text-white">The Solution</h3>
                        <p className="font-inter text-lg leading-relaxed text-white/70">{project.solution}</p>
                    </div>
                </div>
            </section>

            {/* Metrics */}
            <section className="border-y border-white/5 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto px-4 md:px-20 py-24 grid grid-cols-1 md:grid-cols-3 gap-12">
                    {project.metrics.map((metric, i) => (
                        <div key={i} className="flex flex-col text-center md:text-left">
                            <span className="font-syne text-5xl md:text-6xl font-bold text-white mb-2">{metric.value}</span>
                            <span className="font-inter text-xs text-white/40 uppercase tracking-widest">{metric.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Next Project Footer */}
            <Link href={`/work/${project.next}`} className="group block relative w-full h-[50vh] overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 bg-neutral-900 transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-500" />

                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                    <span className="font-inter text-xs text-white/50 uppercase tracking-widest mb-4">Next Project</span>
                    <h2 className="font-syne text-5xl md:text-7xl font-bold text-white group-hover:scale-110 transition-transform duration-700">
                        {projects[project.next as keyof typeof projects].title}
                    </h2>
                </div>
            </Link>
        </main>
    );
}
