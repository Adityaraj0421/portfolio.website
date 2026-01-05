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

    useEffect(() => {
        const button = buttonRef.current;
        const text = textRef.current;

        if (!button || !text) return;

        const xTo = gsap.quickTo(button, "x", { duration: 1, ease: "power4.out" });
        const yTo = gsap.quickTo(button, "y", { duration: 1, ease: "power4.out" });

        const textXTo = gsap.quickTo(text, "x", { duration: 1, ease: "power4.out" });
        const textYTo = gsap.quickTo(text, "y", { duration: 1, ease: "power4.out" });

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = button.getBoundingClientRect();

            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);

            xTo(x * 0.5); // Increase strength
            yTo(y * 0.5);

            textXTo(x * 0.7); // Text follows more aggressively
            textYTo(y * 0.7);
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
            textXTo(0);
            textYTo(0);
        };

        button.addEventListener("mousemove", handleMouseMove);
        button.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            button.removeEventListener("mousemove", handleMouseMove);
            button.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <button
            ref={buttonRef}
            className={cn(
                "relative rounded-full border border-off-white/20 px-8 py-4 text-off-white transition-colors duration-300 hover:border-white hover:text-white uppercase tracking-wider text-sm font-semibold overflow-hidden group",
                className
            )}
            {...props}
        >
            {/* Background fill effect on hover */}
            <span className="absolute inset-0 translate-y-full bg-off-white/5 transition-transform duration-300 group-hover:translate-y-0" />

            <span ref={textRef} className="relative z-10 inline-block">
                {children}
            </span>
        </button>
    );
}
