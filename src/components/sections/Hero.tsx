"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "@/components/ui/MagneticButton";
import { useStore } from "@/store/useStore";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const { toggleGate } = useStore();
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const subTextRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const text = textRef.current;
        const subText = subTextRef.current;

        if (!container || !text || !subText) return;

        // Initial Reveal
        const tl = gsap.timeline();

        tl.fromTo(text,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 3.5, ease: "power4.out" }
        ).fromTo(subText,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 2, ease: "power4.out" },
            "-=2"
        );

        // Parallax Scroll Effect
        gsap.to(text, {
            y: 300, // Move text down faster than scroll
            ease: "none",
            scrollTrigger: {
                trigger: container,
                start: "top top",
                end: "bottom top",
                scrub: 1.5,
            },
        });

    }, []);

    return (
        <section
            ref={containerRef}
            className="relative flex h-screen w-full flex-col items-center justify-center overflow-x-clip overflow-y-visible bg-matte-black pb-32"
        >
            {/* Background: Subtle Spotlight Gradient instead of Grid */}
            <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-40 blur-3xl" />



            {/* Main Title: Chrome Gradient */}
            <div className="relative z-10 w-full text-center mix-blend-normal padding-bottom-safe">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-16 md:-translate-y-16 text-[10px] md:text-xs font-inter text-off-white/60 tracking-[0.5em] uppercase opacity-80 whitespace-nowrap">
                    Product Designer
                </div>
                <h1
                    ref={textRef}
                    className="font-syne text-[18vw] md:text-[14vw] font-bold leading-[0.8] tracking-tighter uppercase select-none opacity-0 transition-all duration-1000 ease-[cubic-bezier(0.6,0.01,-0.05,0.95)] hover:tracking-normal cursor-default text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500 drop-shadow-2xl"
                >
                    VISUAL
                    <br />
                    ARCHITECT
                </h1>
            </div>

            {/* Subtext: Minimalist Status Indicators */}
            <div
                ref={subTextRef}
                className="absolute bottom-8 md:bottom-12 left-0 w-full flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 px-8 md:px-16 text-off-white/80 font-inter text-xs uppercase tracking-widest opacity-0 z-20"
            >
                <div className="hidden md:flex flex-col gap-1 text-left">
                    <span>Est. 2026</span>
                    <span className="text-[10px] text-white/40">Onsite and Remote Capable</span>
                </div>

                {/* Center Badge - Visible on Mobile too now? No, keep hidden or minimal */}
                <div className="flex items-center gap-2 border border-white/10 rounded-full px-4 py-1 backdrop-blur-md">
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    <span className="text-[10px]">Open to Work</span>
                </div>

                <div>
                    <div onClick={toggleGate}>
                        <MagneticButton className="!py-3 !px-8 text-xs bg-white text-black font-bold hover:bg-gray-200 transition-all scale-100 hover:scale-105">
                            Start a Project
                        </MagneticButton>
                    </div>
                </div>
            </div>
        </section>
    );
}
