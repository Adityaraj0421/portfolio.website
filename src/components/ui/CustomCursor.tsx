"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3" });

        const moveCursor = (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
        };

        window.addEventListener("mousemove", moveCursor);

        // Hide default cursor
        document.body.style.cursor = "none";

        // Add hover listeners to links and buttons for "active" state
        const handleMouseEnter = (e: Event) => {
            const target = e.target as HTMLElement;
            // Check if element wants to hide the cursor
            if (target.getAttribute("data-hide-cursor") === "true") {
                gsap.to(cursor, { scale: 0, duration: 0.3 });
                return;
            }
            gsap.to(cursor, { scale: 3, duration: 0.3 });
        };

        const handleMouseLeave = (e: Event) => {
            const target = e.target as HTMLElement;
            // Restore cursor visibility if it was hidden, or scale back to 1
            if (target.getAttribute("data-hide-cursor") === "true") {
                gsap.to(cursor, { scale: 1, duration: 0.3 });
            } else {
                gsap.to(cursor, { scale: 1, duration: 0.3 });
            }
        };

        // Attach to interactive elements
        const interactables = document.querySelectorAll("a, button, [role='button']");
        interactables.forEach((el) => {
            el.addEventListener("mouseenter", handleMouseEnter);
            el.addEventListener("mouseleave", handleMouseLeave);
            if (!el.getAttribute("data-hide-cursor")) {
                el.classList.add("cursor-none"); // Ensure they don't show default cursor (unless handled by component)
            }
        });

        // Observer for new elements (like client-side rendered content)
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length) {
                    const newInteractables = document.querySelectorAll("a, button, [role='button']");
                    newInteractables.forEach((el) => {
                        // Avoid re-adding listeners if already handled (simplified logic here)
                        el.removeEventListener("mouseenter", handleMouseEnter);
                        el.addEventListener("mouseenter", handleMouseEnter);
                        el.removeEventListener("mouseleave", handleMouseLeave);
                        el.addEventListener("mouseleave", handleMouseLeave);
                        el.classList.add("cursor-none");
                    });
                }
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            document.body.style.cursor = "auto";
            observer.disconnect();
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className="hidden md:block pointer-events-none fixed top-0 left-0 z-[10000] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
        />
    );
}
