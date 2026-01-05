"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const steps = [
    { num: "01", title: "Discovery", desc: "Deconstruct the problem space. We strip it down to the core user needs." },
    { num: "02", title: "Strategy", desc: "Define the visual architecture. We don't guess, we engineer systems." },
    { num: "03", title: "Prototyping", desc: "High-fidelity motion. Interactive proof of concept." },
    { num: "04", title: "Production", desc: "Pixel-perfect execution. Component-driven development." },
    { num: "05", title: "Validation", desc: "Data-driven iteration. If it doesn't perform, it evolves." },
    { num: "06", title: "Handover", desc: "Seamless integration. Documentation for scale." },
];

export default function Protocol() {
    const containerRef = useRef<HTMLDivElement>(null);
    const numberRef = useRef<HTMLHeadingElement>(null);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Create scroll triggers for each step card
        const triggers: ScrollTrigger[] = [];

        steps.forEach((_, index) => {
            triggers.push(
                ScrollTrigger.create({
                    trigger: `#protocol-card-${index}`,
                    start: "top center",
                    end: "bottom center",
                    onEnter: () => setCurrentStep(index),
                    onEnterBack: () => setCurrentStep(index),
                })
            );
        });

        return () => {
            triggers.forEach(t => t.kill());
        };
    }, []);

    // Animate the number change
    useEffect(() => {
        if (numberRef.current) {
            gsap.fromTo(numberRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.8, ease: "power4.out" }
            );
        }
    }, [currentStep]);

    return (
        <section ref={containerRef} className="relative w-full bg-off-white text-matte-black">
            <div className="flex flex-col md:flex-row">

                {/* STICKY LEFT: The Mechanical Counter */}
                <div className="sticky top-0 flex h-[50vh] md:h-screen w-full md:w-1/2 flex-col justify-between p-8 md:p-16 border-b md:border-b-0 md:border-r border-matte-black/10">
                    <div className="uppercase tracking-widest text-xs font-bold text-matte-black/40">
                        The Protocol
                    </div>

                    <div className="overflow-hidden">
                        <h2
                            ref={numberRef}
                            className="font-syne text-[25vw] md:text-[20vw] font-bold leading-[0.9] tracking-tighter text-matte-black select-none pb-4"
                        >
                            {steps[currentStep].num}
                        </h2>
                    </div>

                    <div className="text-sm font-inter text-matte-black/60">
                        System Status: Active
                    </div>
                </div>

                {/* SCROLLABLE RIGHT: The Content Cards */}
                <div className="w-full md:w-1/2">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            id={`protocol-card-${index}`}
                            className="flex h-[80vh] md:h-screen w-full flex-col justify-center p-8 md:p-24 border-b border-matte-black/5 last:border-0"
                        >
                            <h3 className="font-syne text-4xl md:text-7xl font-bold uppercase mb-8 text-matte-black">
                                {step.title}
                            </h3>
                            <p className="font-inter text-xl md:text-2xl text-matte-black/70 leading-relaxed max-w-md">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
