"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useStore } from "@/store/useStore";

export default function Preloader() {
    const [count, setCount] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const setIsLoading = useStore((state) => state.setIsLoading);

    useEffect(() => {
        const tl = gsap.timeline();
        const counterProxy = { value: 0 };

        // 1. Smooth Counter Animation
        tl.to(counterProxy, {
            value: 100,
            duration: 2.5,
            ease: "power2.inOut",
            onUpdate: () => {
                setCount(Math.round(counterProxy.value));
            },
        });

        // 2. Exit Animation
        tl.to(containerRef.current, {
            yPercent: -100,
            duration: 1.2,
            ease: "power4.inOut",
            delay: 0.2, // Small pause at 100%
            onComplete: () => setIsLoading(false),
        });

        return () => {
            tl.kill();
        };
    }, [setIsLoading]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[100] flex h-screen w-full items-end justify-end bg-matte-black p-10 text-off-white"
        >
            <span className="font-syne text-[15vw] leading-none font-bold tracking-tighter">
                {count}%
            </span>
        </div>
    );
}
