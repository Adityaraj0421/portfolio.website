"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

export default function MemberPass() {
    const cardRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const card = cardRef.current;
        const glow = glowRef.current;

        if (!container || !card || !glow) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg rotation
            const rotateY = ((x - centerX) / centerX) * 10;

            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                duration: 0.5,
                ease: "power2.out"
            });

            // Holographic Glare Movement
            gsap.to(glow, {
                x: (x - centerX) * 0.5,
                y: (y - centerY) * 0.5,
                duration: 0.2,
                opacity: 0.4 + Math.abs(rotateX / 20)
            });
        };

        const handleMouseLeave = () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 1,
                ease: "elastic.out(1, 0.5)"
            });
            gsap.to(glow, {
                opacity: 0,
                duration: 0.5
            });
        };

        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            container.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <section ref={containerRef} className="relative w-full min-h-screen flex flex-col items-center justify-center bg-matte-black perspective-[1000px] overflow-hidden py-24">
            {/* Background Context */}
            <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center opacity-20">
                <div className="w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full animate-pulse" />
            </div>



            {/* THE CARD */}
            <div
                ref={cardRef}
                className="relative w-[85vw] max-w-[340px] h-[60vh] max-h-[540px] md:w-[400px] md:h-[630px] rounded-[24px] bg-gradient-to-br from-[#1a1a1a] via-[#0a0a0a] to-black border border-white/10 shadow-2xl flex flex-col p-6 md:p-8 transform-style-3d group cursor-default overflow-hidden ring-1 ring-white/5"
            >
                {/* Metallic Shine/Glow Layer */}
                <div
                    ref={glowRef}
                    className="absolute inset-0 rounded-[24px] bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none opacity-0 z-10 mix-blend-overlay"
                    style={{
                        background: 'linear-gradient(115deg, transparent 0%, rgba(255, 255, 255, 0.05) 45%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.05) 55%, transparent 100%)'
                    }}
                />

                {/* Subtle Metal Grain/Brushed Effect (Optional, using gradient) */}
                <div className="absolute inset-0 rounded-[24px] bg-gradient-to-b from-white/5 to-transparent opacity-10 pointer-events-none z-0" />

                {/* --- CARD CONTENT --- */}
                <div className="relative z-20 flex flex-col h-full">

                    {/* Header */}
                    <div className="w-full flex justify-between items-start mb-10 border-b border-white/5 pb-6">
                        <div className="flex flex-col">
                            <h2 className="font-syne text-4xl font-bold text-white tracking-tight drop-shadow-md">ADITYA</h2>
                            <span className="font-inter text-[10px] text-white/60 uppercase tracking-[0.25em] mt-2 font-medium">Product Designer</span>
                        </div>
                        {/* Premium 'Chip' Visual */}
                        <div className="w-10 h-7 rounded bg-gradient-to-br from-yellow-100/20 to-yellow-600/20 border border-white/10 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20" />
                            <div className="w-full h-[1px] bg-white/20 absolute top-1/2 -translate-y-1/2" />
                            <div className="h-full w-[1px] bg-white/20 absolute left-1/2 -translate-x-1/2" />
                        </div>
                    </div>

                    {/* Body - Clean List */}
                    <div className="flex-1 flex flex-col gap-8">

                        {/* Experience */}
                        <div className="flex flex-col gap-4">
                            <h4 className="font-inter text-[9px] text-white/30 uppercase tracking-[0.2em] font-semibold">Professional History</h4>
                            <ul className="flex flex-col gap-5">
                                <li className="relative group/item pl-4 border-l border-white/10 hover:border-white/50 transition-colors duration-300">
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <span className="font-syne text-base text-white/90 font-medium group-hover/item:text-white transition-colors">Product Designer</span>
                                        <span className="font-mono text-[9px] text-white/60">Oct 24 - Aug 25</span>
                                    </div>
                                    <span className="font-inter text-[10px] text-white/40 group-hover/item:text-white/60 transition-colors uppercase tracking-wider">Jobmato</span>
                                </li>
                                <li className="relative group/item pl-4 border-l border-white/10 hover:border-white/30 transition-colors duration-300">
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <span className="font-syne text-sm text-white/70 font-normal group-hover/item:text-white transition-colors">Product Designer</span>
                                        <span className="font-mono text-[9px] text-white/30">Apr 24 - Aug 24</span>
                                    </div>
                                    <span className="font-inter text-[10px] text-white/40 group-hover/item:text-white/60 transition-colors uppercase tracking-wider">Stealth Startup</span>
                                </li>
                                <li className="relative group/item pl-4 border-l border-white/10 hover:border-white/30 transition-colors duration-300">
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <span className="font-syne text-sm text-white/70 font-normal group-hover/item:text-white transition-colors">UI/UX Designer Intern</span>
                                        <span className="font-mono text-[9px] text-white/30">Jan 24 - Mar 24</span>
                                    </div>
                                    <span className="font-inter text-[10px] text-white/40 group-hover/item:text-white/60 transition-colors uppercase tracking-wider">Fly Your Tech</span>
                                </li>
                            </ul>
                        </div>

                        {/* Education */}
                        <div className="flex flex-col gap-4 mt-auto">
                            <h4 className="font-inter text-[9px] text-white/30 uppercase tracking-[0.2em] font-semibold">Credentials</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <span className="block font-syne text-xs text-white/80 font-medium mb-1">B.Tech in ECE</span>
                                    <span className="block font-inter text-[9px] text-white/40 uppercase tracking-wide">IIIT Guwahati</span>
                                    <span className="block font-mono text-[8px] text-white/20 mt-1">2022-2026</span>
                                </div>
                                <div>
                                    <span className="block font-syne text-xs text-white/80 font-medium mb-1">Designer in Residence</span>
                                    <span className="block font-inter text-[9px] text-white/40 uppercase tracking-wide">10K Designers</span>
                                    <span className="block font-mono text-[8px] text-white/20 mt-1">Jan-May 2025</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Deco */}
                    <div className="absolute bottom-0 right-0 font-mono text-[8px] text-white/10 rotate-90 origin-bottom-right translate-x-2 translate-y-2">
                        ADITYA RAJ • ID:8902-PREMIUM
                    </div>
                </div>
            </div>
        </section>
    );
}
