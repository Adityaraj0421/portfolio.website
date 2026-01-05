"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const metrics = [
    { label: "Product Impact", value: "High" },
    { label: "User Satisfaction", value: "100%" },
    { label: "System Uptime", value: "99.9%" },
    { label: "Code Quality", value: "A+" },
    { label: "Design Systems", value: "Scalable" },
    { label: "Interaction", value: "Fluid" },
    { label: "Performance", value: "60FPS" },
    { label: "Client Trust", value: "Verified" },
];

export default function ResultsStream() {
    const sliderRef = useRef<HTMLDivElement>(null);
    const firstTextRef = useRef<HTMLDivElement>(null);
    const secondTextRef = useRef<HTMLDivElement>(null);
    let xPercent = 0;
    let direction = -1;

    useEffect(() => {
        let animationId: number;

        const animate = () => {
            if (xPercent <= -100) {
                xPercent = 0;
            }
            if (xPercent > 0) {
                xPercent = -100;
            }

            gsap.set(firstTextRef.current, { xPercent: xPercent });
            gsap.set(secondTextRef.current, { xPercent: xPercent });

            xPercent += 0.05 * direction; // Speed
            animationId = requestAnimationFrame(animate);
        };

        // Scroll velocity influence
        const trigger = ScrollTrigger.create({
            trigger: document.documentElement,
            start: 0,
            end: "max",
            onUpdate: (self) => {
                const velocity = self.getVelocity();
                // If scrolling fast, speed up the marquee slightly
                direction = self.direction * -1; // Reverse direction on scroll
            }
        });

        animationId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationId);
            trigger.kill();
        };
    }, []);

    return (
        <section className="relative w-full bg-matte-black py-16 border-y border-white/10 overflow-hidden">
            <div className="flex w-full items-center">
                <div ref={sliderRef} className="relative whitespace-nowrap flex">
                    <StreamContent ref={firstTextRef} />
                    <StreamContent ref={secondTextRef} />
                </div>
            </div>

            {/* Gradient Fade Edges */}
            <div className="absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-matte-black to-transparent z-10" />
            <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-matte-black to-transparent z-10" />
        </section>
    );
}

// Separate component for content to act as duplicate
import { forwardRef } from "react";

const StreamContent = forwardRef<HTMLDivElement>((props, ref) => (
    <div ref={ref} className="flex gap-24 px-12">
        {metrics.map((metric, index) => (
            <div key={index} className="flex items-center gap-4 group cursor-default">
                <span className="font-syne text-4xl font-bold uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-600 transition-all duration-300">
                    {metric.value}
                </span>
                <span className="font-inter text-xs text-off-white/40 uppercase tracking-widest group-hover:text-off-white/80 transition-colors">
                    {metric.label}
                </span>
            </div>
        ))}
    </div>
));

StreamContent.displayName = "StreamContent";
