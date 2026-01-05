"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const words = textRef.current?.querySelectorAll(".manifesto-word");
        if (!words) return;

        gsap.fromTo(words,
            {
                color: "#333", // Dark gray start
                opacity: 0.2
            },
            {
                color: "#fff", // White/Chrome end
                opacity: 1,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top center",
                    end: "bottom center",
                    scrub: true,
                }
            }
        );
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative w-full min-h-screen bg-matte-black flex items-center justify-center py-32 px-4 md:px-0 overflow-hidden">
            <div ref={textRef} className="max-w-6xl mx-auto text-center relative z-10">
                <p className="font-syne text-4xl md:text-7xl font-bold uppercase leading-tight tracking-tighter">
                    {["I", "don't", "design", "screens.", "I", "engineer", "outcomes.", "Beauty", "is", "a", "byproduct", "of", "function.", "Welcome", "to", "the", "next", "level."].map((word, i) => (
                        <span key={i} className="manifesto-word inline-block mr-4 mb-2 transition-colors duration-300">
                            {word}
                        </span>
                    ))}
                </p>

                <div className="mt-16 flex justify-center">
                    <div className="h-24 w-[1px] bg-gradient-to-b from-white to-transparent opacity-50" />
                </div>
            </div>
        </section>
    );
}
