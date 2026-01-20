"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SmoothScroll({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const lenis = useLenis();

    useEffect(() => {
        // Reset scroll position on route change
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        } else {
            // Fallback for native scroll
            window.scrollTo(0, 0);
        }
    }, [pathname, lenis]);

    return (
        <ReactLenis root options={{ lerp: 0.05, duration: 2.5, smoothWheel: true }}>
            {children}
        </ReactLenis>
    );
}
