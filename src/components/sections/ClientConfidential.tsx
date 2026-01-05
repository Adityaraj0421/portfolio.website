"use client";

import { cn } from "@/lib/utils";

import Link from "next/link";

const clients = [
    {
        id: "claussal-ai",
        name: "Claussal Compliance",
        type: "Unified OS",
        desc: "Engineering the Unified Compliance OS",
        year: "2025"
    },
    {
        id: "itz-confidential",
        name: "Itz Confidential",
        type: "Web Experience",
        desc: "Designing the Digital Detective Board",
        year: "2024"
    },
    {
        id: "fobet-media",
        name: "Fobet Media",
        type: "Super-Profile",
        desc: "Engineering the 'Super-Profile' Architecture",
        year: "2024"
    },
];

export default function ClientConfidential() {
    return (
        <section className="relative w-full bg-matte-black py-32 border-t border-white/5">
            <div className="flex flex-col items-center mb-16 px-4">
                <span className="font-inter text-xs text-white/50 uppercase tracking-[0.3em] font-bold mb-4">
                    Case Studies
                </span>
                <h2 className="font-syne text-4xl md:text-6xl text-off-white font-bold uppercase tracking-tight text-center">
                    Selected Works
                </h2>
            </div>

            <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    {clients.map((client, i) => (
                        <Link
                            key={i}
                            href={`/work/${client.id}`}
                            className="group relative aspect-[4/5] md:aspect-[3/4] border border-white/5 flex flex-col justify-between p-8 md:p-10 bg-[#0a0a0a] hover:bg-white/5 transition-all duration-700 ease-out overflow-hidden rounded-[2px]"
                        >

                            {/* Top Section */}
                            <div className="relative z-10 w-full flex justify-between items-start border-b border-white/10 pb-6 mb-auto group-hover:border-white/30 transition-colors duration-500">
                                <span className="font-syne text-4xl text-white/10 font-bold group-hover:text-white/30 transition-colors duration-500 leading-relaxed pb-2 block">
                                    0{i + 1}
                                </span>
                                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 -rotate-45 group-hover:rotate-0">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                                        <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>

                            {/* Bottom Section */}
                            <div className="relative z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                <span className="block font-inter text-[9px] text-white/60 uppercase tracking-[0.2em] mb-3 opacity-80 group-hover:opacity-100 transition-opacity">
                                    {client.type}
                                </span>
                                <h3 className="font-syne text-3xl md:text-3xl lg:text-4xl text-white font-bold uppercase leading-[0.9] tracking-tight mb-4 group-hover:text-white transition-colors duration-300">
                                    {client.name}
                                </h3>
                                <div className="h-px w-0 group-hover:w-full bg-white/20 transition-all duration-700 ease-in-out mb-4" />
                                <p className="font-inter text-xs text-white/40 max-w-[90%] group-hover:text-white/60 transition-colors duration-500">
                                    {client.desc}
                                </p>
                            </div>

                            {/* Hover Gradient Glow */}
                            <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-white/10 blur-[100px] rounded-full pointer-events-none opacity-0 group-hover:opacity-50 transition-opacity duration-700" />
                        </Link>
                    ))}
                </div>
            </div>

            <div className="mt-16 text-center">
                <Link href="/work" className="inline-flex items-center gap-2 font-inter text-xs text-white/40 uppercase tracking-widest hover:text-white transition-colors">
                    View All Projects
                    <span className="text-white">→</span>
                </Link>
            </div>
        </section>
    );
}
