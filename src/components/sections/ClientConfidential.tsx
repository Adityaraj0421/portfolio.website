"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ProjectListing } from "@/lib/sanity/types";

interface ClientConfidentialProps {
    projects: ProjectListing[];
}

export default function ClientConfidential({ projects }: ClientConfidentialProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [xDistance, setXDistance] = useState(0);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
    });

    useEffect(() => {
        const updateDistance = () => {
            if (trackRef.current) {
                const scrollWidth = trackRef.current.scrollWidth;
                const windowWidth = window.innerWidth;
                const distance = Math.max(0, scrollWidth - windowWidth);
                setXDistance(distance);
            }
        };

        updateDistance();
        // Add a small delay to ensure rendering is complete
        const timer = setTimeout(updateDistance, 100);

        window.addEventListener("resize", updateDistance);
        return () => {
            window.removeEventListener("resize", updateDistance);
            clearTimeout(timer);
        };
    }, [projects]);

    const x = useTransform(scrollYProgress, [0, 1], [0, -xDistance]);

    // Calculate height based on number of projects (roughly 100vh per project group)
    const sectionHeight = Math.max(200, projects.length * 50) + "vh";

    // Fallback if no projects
    if (!projects || projects.length === 0) {
        return null;
    }

    return (
        <section ref={sectionRef} style={{ height: sectionHeight }} className="relative bg-matte-black border-t border-white/5">
            <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
                {/* Header Section */}
                <div className="flex flex-col items-center mb-16 px-4">
                    <span className="font-inter text-xs text-white/50 uppercase tracking-[0.3em] font-bold mb-4">
                        Case Studies
                    </span>
                    <h2 className="font-syne text-4xl md:text-6xl text-off-white font-bold uppercase tracking-tight text-center">
                        Selected Works
                    </h2>
                </div>

                {/* Horizontal Track */}
                <div className="relative w-full overflow-hidden">
                    <motion.div ref={trackRef} style={{ x }} className="flex gap-6 px-4 md:px-20 w-max">
                        {projects.map((project, i) => (
                            <Link
                                key={project._id}
                                href={`/work/${project.slug.current}`}
                                className="relative shrink-0 w-[75vw] md:w-[30vw] aspect-[4/5] md:aspect-[3/4] border border-white/5 flex flex-col justify-between p-8 md:p-10 bg-[#0a0a0a] hover:bg-white/5 transition-all duration-700 ease-out overflow-hidden rounded-[2px] group"
                            >
                                {/* Top Section */}
                                <div className="relative z-10 w-full flex justify-between items-start border-b border-white/10 pb-6 mb-auto group-hover:border-white/30 transition-colors duration-500">
                                    <span className="font-syne text-4xl text-white/10 font-bold group-hover:text-white/30 transition-colors duration-500 leading-relaxed pb-2 block">
                                        0{i + 1}
                                    </span>
                                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 -rotate-45 group-hover:rotate-0">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                                            <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Bottom Section */}
                                <div className="relative z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                    <span className="block font-inter text-[9px] text-white/60 uppercase tracking-[0.2em] mb-3 opacity-80 group-hover:opacity-100 transition-opacity">
                                        {project.platform}
                                    </span>
                                    <h3 className="font-syne text-2xl md:text-2xl lg:text-3xl text-white font-bold uppercase leading-[0.9] tracking-tight mb-4 group-hover:text-white transition-colors duration-300">
                                        {project.title}
                                    </h3>
                                    <div className="h-px w-0 group-hover:w-full bg-white/20 transition-all duration-700 ease-in-out mb-4" />
                                    <p className="font-inter text-xs text-white/40 max-w-[90%] group-hover:text-white/60 transition-colors duration-500 line-clamp-3">
                                        {project.description}
                                    </p>
                                </div>

                                {/* Hover Gradient Glow */}
                                <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-white/10 blur-[100px] rounded-full pointer-events-none opacity-0 group-hover:opacity-50 transition-opacity duration-700" />
                            </Link>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

