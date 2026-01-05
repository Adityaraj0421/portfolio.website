"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

export default function DynamicBackground() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Blob 1: Deep Blue (Smoke Base)
        gsap.to(".blob-1", {
            x: "20%",
            y: "-20%",
            scale: 1.2,
            opacity: 0.6,
            duration: 20,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        // Blob 2: Silver/Gray (Silk Highlight)
        gsap.to(".blob-2", {
            x: "-30%",
            y: "30%",
            scale: 1.1,
            rotation: 45,
            duration: 25,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        // Blob 3: Deep Emerald (Subtle Tinge)
        gsap.to(".blob-3", {
            x: "10%",
            y: "40%",
            duration: 15,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-matte-black">
            {/* Base Fog Layer */}
            <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 50% 50%, #1a1a1a 0%, #000000 100%)' }} />

            {/* Blob 1 */}
            <div className="blob-1 absolute top-[-20%] left-[-20%] w-[80vw] h-[80vw] bg-slate-900 rounded-full blur-[120px] opacity-40 mix-blend-screen" />

            {/* Blob 2 */}
            <div className="blob-2 absolute top-[20%] right-[-20%] w-[60vw] h-[60vw] bg-gray-800 rounded-full blur-[100px] opacity-30 mix-blend-screen" />

            {/* Blob 3 */}
            <div className="blob-3 absolute bottom-[-20%] left-[20%] w-[70vw] h-[70vw] bg-black rounded-full blur-[150px] opacity-80 mix-blend-multiply" />

            {/* Grain Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
        </div>
    );
}
