"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
}

export default function MagneticButton({
    children,
    className,
    ...props
}: MagneticButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const overlayTextRef = useRef<HTMLSpanElement>(null);

    // We use a proxy object to animate the clip-path values smoothly
    const clipPathState = useRef({ x: 0, y: 0, r: 0 });

    useEffect(() => {
        const button = buttonRef.current;
        const text = textRef.current;
        const overlay = overlayRef.current;
        const overlayText = overlayTextRef.current;

        if (!button || !text || !overlay || !overlayText) return;

        // Button Magnetic Movement
        const xTo = gsap.quickTo(button, "x", { duration: 1.5, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(button, "y", { duration: 1.5, ease: "elastic.out(1, 0.3)" });

        // Text Parallax (apply to both text layers to keep them synced)
        const textXTo = gsap.quickTo([text, overlayText], "x", { duration: 1.2, ease: "power2.out" });
        const textYTo = gsap.quickTo([text, overlayText], "y", { duration: 1.2, ease: "power2.out" });

        // Clip Path Animation proxy
        const clipXTo = gsap.quickTo(clipPathState.current, "x", {
            duration: 0.4,
            ease: "power2.out",
            onUpdate: updateClipPath
        });
        const clipYTo = gsap.quickTo(clipPathState.current, "y", {
            duration: 0.4,
            ease: "power2.out",
            onUpdate: updateClipPath
        });

        function updateClipPath() {
            const { x, y, r } = clipPathState.current;
            if (overlay) {
                overlay.style.clipPath = `circle(${r}px at ${x}px ${y}px)`;
            }
        }

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = button.getBoundingClientRect();

            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);

            // Relative position within button for clip-path
            const relX = clientX - left;
            const relY = clientY - top;

            xTo(x * 0.35);
            yTo(y * 0.35);

            textXTo(x * 0.25);
            textYTo(y * 0.25);

            // Move the center of the clip circle
            clipXTo(relX);
            clipYTo(relY);
        };

        const handleMouseEnter = () => {
            // Expand the circle radius smoothly
            gsap.to(clipPathState.current, {
                r: 35, // Radius of the spotlight
                duration: 0.4,
                ease: "power2.out",
                onUpdate: updateClipPath
            });
        };

        const handleMouseLeave = () => {
            // Scale back down
            gsap.to(clipPathState.current, {
                r: 0,
                duration: 0.4,
                ease: "power2.in",
                onUpdate: updateClipPath
            });
            // Also reset position
            xTo(0);
            yTo(0);
            textXTo(0);
            textYTo(0);
        };

        button.addEventListener("mousemove", handleMouseMove);
        button.addEventListener("mouseenter", handleMouseEnter);
        button.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            button.removeEventListener("mousemove", handleMouseMove);
            button.removeEventListener("mouseenter", handleMouseEnter);
            button.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <button
            ref={buttonRef}
            className={cn(
                "relative rounded-full border border-off-white/20 px-8 py-4 text-off-white transition-colors duration-300 hover:border-white uppercase tracking-wider text-sm font-semibold overflow-hidden isolate",
                className
            )}
            data-hide-cursor="true"
            {...props}
        >
            {/* Base Layer: White Button, Black Text (inherited from className usually, but enforced here via props logic) */}
            {/* Actually we just render the children normally here. The parent controls the base color (white) and text color (black). */}
            <span ref={textRef} className="relative z-10 inline-block">
                {children}
            </span>

            {/* Overlay Layer: Black Background, White Text */}
            {/* This layer is clipped to show only at cursor */}
            <div
                ref={overlayRef}
                className="absolute inset-px rounded-full z-20 bg-black flex items-center justify-center pointer-events-none"
                style={{ clipPath: 'circle(0px at 50% 50%)' }}
            >
                {/* We duplicate the text here to show it in white */}
                <span ref={overlayTextRef} className="relative inline-block text-white">
                    {children}
                </span>
            </div>
        </button>
    );
}

