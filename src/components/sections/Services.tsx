"use client";

import { cn } from "@/lib/utils";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const services = [
    {
        id: "01",
        title: "Design Systems",
        description: "Scalable component architectures.",
        image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        id: "02",
        title: "User Experience",
        description: "Interaction flows that convert.",
        image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        id: "03",
        title: "Visual Interface",
        description: "Pixel-perfect UI execution.",
        image: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        id: "04",
        title: "Art Direction",
        description: "Visual storytelling and brand authority.",
        image: "https://images.pexels.com/photos/3052727/pexels-photo-3052727.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        id: "05",
        title: "Prototyping",
        description: "High-fidelity motion interactions.",
        image: "https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        id: "06",
        title: "Strategy",
        description: "Product roadmap and vision alignment.",
        image: "https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=800"
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
            className="group relative flex w-full items-center justify-between border-b border-white/10 py-12 px-4 transition-all duration-500 hover:bg-white/5 overflow-hidden cursor-none"
        >
            {/* Hover Image Reveal */}
            <img
                ref={imageRef}
                src={service.image}
                alt={service.title}
                className="absolute top-0 left-0 w-[300px] h-[200px] object-cover opacity-0 group-hover:opacity-40 pointer-events-none grayscale transition-opacity duration-500 z-0 mix-blend-screen rounded-sm"
            // style={{ filter: "url(#liquidFilter)" }} // Disabled for 60FPS performance
            />

            <div className="relative z-10 flex items-baseline gap-8">
                <span className="font-inter text-xs text-white/30 font-medium">0{index + 1}</span>
                <h3 className="font-syne text-3xl md:text-5xl font-bold uppercase text-off-white group-hover:text-white group-hover:translate-x-4 transition-all duration-500">
                    {service.title}
                </h3>
            </div>

            <div className="relative z-10 hidden md:block">
                <p className="font-inter text-xs uppercase tracking-widest text-white/40 group-hover:text-white/80 transition-colors">
                    {service.description}
                </p>
            </div>

            <div className="relative z-10 md:hidden text-white/20 text-xl font-light">
                +
            </div>
        </div>
    );
}
