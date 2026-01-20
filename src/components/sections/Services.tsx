"use client";

import { cn } from "@/lib/utils";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const services = [
    {
        id: "01",
        title: "Design Systems",
        description: "Scalable component architectures.",
        image: "/assets/services/design-systems.png"
    },
    {
        id: "02",
        title: "User Experience",
        description: "Interaction flows that convert.",
        image: "/assets/services/user-experience.png"
    },
    {
        id: "03",
        title: "Visual Interface",
        description: "Pixel-perfect UI execution.",
        image: "/assets/services/visual-interface.png"
    },
    {
        id: "04",
        title: "Art Direction",
        description: "Visual storytelling and brand authority.",
        image: "/assets/services/art-direction.png"
    },
    {
        id: "05",
        title: "Prototyping",
        description: "High-fidelity motion interactions.",
        image: "/assets/services/prototyping.png"
    },
    {
        id: "06",
        title: "Strategy",
        description: "Product roadmap and vision alignment.",
        image: "/assets/services/strategy.png"
    },
];

// ... imports
// Add this component at bottom or inside return if needed. But best to put SVG in a global place or just inside the section.
export default function Services() {
    return (
        <section className="relative w-full bg-matte-black py-32 px-4 md:px-0">
            {/* LIQUID METAL FILTER DEFINITION */}
            <svg className="hidden">
                <defs>
                    <filter id="liquidFilter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.01 0.005" numOctaves="2" result="warp" />
                        <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="30" in="SourceGraphic" in2="warp" />
                    </filter>
                </defs>
            </svg>

            <div className="mx-auto max-w-[90vw]">
                {/* Header */}
                <div className="mb-24 flex flex-col items-center justify-center border-b border-white/5 pb-12 text-center">
                    <h2 className="font-syne text-5xl font-bold uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 md:text-7xl mb-6">
                        Core<br />Coordinates
                    </h2>
                    <p className="max-w-md font-inter text-xs uppercase tracking-[0.2em] text-white/40">
                        Design systems engineered for scale.
                    </p>
                </div>

                {/* ELEGANT LIST LAYOUT (No more hard grid) */}
                <div className="flex flex-col border-t border-white/10">
                    {services.map((service, index) => (
                        <ServiceItem key={index} service={service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ServiceItem({ service, index }: { service: typeof services[0], index: number }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const cursor = useRef({ x: 0, y: 0 });
    const imagePos = useRef({ x: 0, y: 0 });
    const [isOpen, setIsOpen] = useState(false);

    useGSAP(() => {
        const xSet = gsap.quickSetter(imageRef.current, "x", "px");
        const ySet = gsap.quickSetter(imageRef.current, "y", "px");

        const loop = () => {
            if (!containerRef.current) return;
            const dt = 1.0 - Math.pow(1.0 - 0.1, gsap.ticker.deltaRatio());
            imagePos.current.x += (cursor.current.x - imagePos.current.x) * dt;
            imagePos.current.y += (cursor.current.y - imagePos.current.y) * dt;
            xSet(imagePos.current.x);
            ySet(imagePos.current.y);
        }
        gsap.ticker.add(loop);
        return () => gsap.ticker.remove(loop);
    }, { scope: containerRef });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        cursor.current.x = e.clientX - rect.left - 150;
        cursor.current.y = e.clientY - rect.top - 100;
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onClick={() => setIsOpen(!isOpen)}
            className="group relative flex flex-col width-full border-b border-white/10 transition-all duration-500 hover:bg-white/5 overflow-hidden cursor-pointer md:cursor-none"
        >
            <div className="flex w-full items-center justify-between py-8 md:py-12 px-4 relative z-20">
                {/* Hover Image Reveal (Desktop Only) */}
                <img
                    ref={imageRef}
                    src={service.image}
                    alt={service.title}
                    className="hidden md:block absolute top-0 left-0 w-[400px] h-[250px] object-cover opacity-0 group-hover:opacity-70 pointer-events-none grayscale brightness-110 contrast-125 scale-95 group-hover:scale-105 transition-all duration-700 z-0 mix-blend-screen rounded-sm"
                />

                <div className="flex items-center gap-6 md:gap-8">
                    <span className="font-inter text-xs text-white/30 font-medium">0{index + 1}</span>
                    <h3 className="font-syne text-2xl md:text-5xl font-bold uppercase text-off-white group-hover:text-white md:group-hover:translate-x-4 transition-all duration-500">
                        {service.title}
                    </h3>
                </div>

                <div className="hidden md:block">
                    <p className="font-inter text-xs uppercase tracking-widest text-white/40 group-hover:text-white/80 transition-colors">
                        {service.description}
                    </p>
                </div>

                <div className={`md:hidden text-white/20 text-xl font-light transition-transform duration-300 ${isOpen ? "rotate-45 text-white" : ""}`}>
                    +
                </div>
            </div>

            {/* Mobile Expanded Content */}
            <div className={`md:hidden px-4 overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-32 opacity-100 pb-8" : "max-h-0 opacity-0"}`}>
                <p className="font-inter text-sm text-white/60 leading-relaxed border-l border-white/20 pl-4">
                    {service.description}
                </p>
            </div>
        </div>
    );
}
