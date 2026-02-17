"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/useStore";

const navLinks = [
    { label: "Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "About", href: "#about" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { toggleGate } = useStore();
    const pathname = usePathname();
    const isLoading = useStore((state) => state.isLoading);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;
            setScrolled(currentY > 50);
            // Hide when scrolling down past 100px, show when scrolling up
            if (currentY > 100 && currentY > lastScrollY.current) {
                setHidden(true);
            } else {
                setHidden(false);
            }
            lastScrollY.current = currentY;
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Only show navbar on homepage, and hide during loading
    if (pathname !== "/" || isLoading) return null;

    const handleNavClick = (href: string) => {
        setMenuOpen(false);
        if (href.startsWith("#")) {
            const id = href.replace("#", "");
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    return (
        <>
            <nav
                className={cn(
                    "fixed top-0 left-0 w-full z-[999] transition-all duration-500 ease-[cubic-bezier(0.6,0.01,-0.05,0.95)]",
                    scrolled
                        ? "bg-matte-black/80 backdrop-blur-xl border-b border-white/5 py-4"
                        : "bg-transparent py-6",
                    hidden && !menuOpen && "-translate-y-full"
                )}
            >
                <div className="w-full flex items-center justify-between px-6 md:px-12">
                    {/* Logo */}
                    <a
                        href="/"
                        className="font-syne text-lg font-bold text-off-white tracking-tight uppercase hover:opacity-70 transition-opacity duration-300"
                    >
                        ADITYA<span className="text-white/30">.RAJ</span>
                    </a>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <button
                                key={link.label}
                                onClick={() => handleNavClick(link.href)}
                                className="relative font-inter text-[11px] text-white/50 uppercase tracking-[0.2em] hover:text-white transition-colors duration-300 group"
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-500 ease-out" />
                            </button>
                        ))}

                        <button
                            onClick={toggleGate}
                            className="ml-4 font-inter text-[11px] uppercase tracking-[0.15em] px-5 py-2 border border-white/20 text-white/80 hover:bg-white hover:text-black transition-all duration-500 rounded-none"
                        >
                            Let&apos;s Talk
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 z-[1001]"
                        aria-label="Toggle menu"
                    >
                        <span
                            className={cn(
                                "block w-6 h-px bg-white transition-all duration-500",
                                menuOpen && "rotate-45 translate-y-[3.5px]"
                            )}
                        />
                        <span
                            className={cn(
                                "block w-6 h-px bg-white transition-all duration-500",
                                menuOpen && "-rotate-45 -translate-y-[3.5px]"
                            )}
                        />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={cn(
                    "fixed inset-0 z-[998] bg-matte-black/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-10 transition-all duration-700 ease-[cubic-bezier(0.6,0.01,-0.05,0.95)] md:hidden",
                    menuOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                )}
            >
                {navLinks.map((link, i) => (
                    <button
                        key={link.label}
                        onClick={() => handleNavClick(link.href)}
                        className={cn(
                            "font-syne text-3xl font-bold text-off-white uppercase tracking-tight transition-all duration-700",
                            menuOpen
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-8"
                        )}
                        style={{ transitionDelay: menuOpen ? `${i * 100 + 200}ms` : "0ms" }}
                    >
                        {link.label}
                    </button>
                ))}

                <button
                    onClick={() => {
                        setMenuOpen(false);
                        toggleGate();
                    }}
                    className={cn(
                        "mt-4 font-inter text-xs uppercase tracking-[0.2em] px-8 py-3 border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-700",
                        menuOpen
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-8"
                    )}
                    style={{ transitionDelay: menuOpen ? `${navLinks.length * 100 + 200}ms` : "0ms" }}
                >
                    Let&apos;s Talk
                </button>
            </div>
        </>
    );
}
