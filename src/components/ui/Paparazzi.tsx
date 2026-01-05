"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function Paparazzi() {
    const [flash, setFlash] = useState(false);
    const [position, setPosition] = useState({ x: 50, y: 50 }); // Percent

    useEffect(() => {
        // Random flash loop
        const triggerFlash = () => {
            // Random position
            setPosition({
                x: Math.random() * 100,
                y: Math.random() * 80,
            });
            setFlash(true);

            // Short flash duration
            setTimeout(() => {
                setFlash(false);
            }, 100 + Math.random() * 100);

            // Schedule next flash
            const nextDelay = Math.random() * 8000 + 2000; // Random delay between 2s and 10s
            setTimeout(triggerFlash, nextDelay);
        };

        const timer = setTimeout(triggerFlash, 4000); // Initial start
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden mix-blend-overlay">
            <div
                className={cn(
                    "absolute w-[80vw] h-[80vw] bg-white rounded-full blur-[100px] transition-opacity duration-150 ease-out",
                    flash ? "opacity-20" : "opacity-0"
                )}
                style={{
                    top: `${position.y}%`,
                    left: `${position.x}%`,
                    transform: 'translate(-50%, -50%)'
                }}
            />
            {/* Secondary harder flash point */}
            <div
                className={cn(
                    "absolute w-[200px] h-[200px] bg-white rounded-full blur-[40px] transition-opacity duration-75 ease-in",
                    flash ? "opacity-40" : "opacity-0"
                )}
                style={{
                    top: `${position.y}%`,
                    left: `${position.x}%`,
                    transform: 'translate(-50%, -50%)'
                }}
            />
        </div>
    );
}
