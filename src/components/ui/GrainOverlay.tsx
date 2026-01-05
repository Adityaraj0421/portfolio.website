"use client";

import { useEffect, useState } from "react";

export default function GrainOverlay() {
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        // Fade in grain to avoid flash
        setOpacity(0.04);
    }, []);

    return (
        <div
            className="pointer-events-none fixed inset-0 z-[9998] h-full w-full select-none"
            style={{ opacity }}
        >
            {/* SVG Noise Filter */}
            <svg className="fixed inset-0 h-full w-full opacity-100">
                <filter id="noise">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.80"
                        numOctaves="4"
                        stitchTiles="stitch"
                    />
                </filter>
                <rect width="100%" height="100%" filter="url(#noise)" className="text-transparent" />
            </svg>
        </div>
    );
}
