"use client";

import { useEffect, useRef, useState } from "react";
import { useStore } from "@/store/useStore";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import MagneticButton from "./MagneticButton";
import { cn } from "@/lib/utils";

export default function TheGate() {
    const { isGateOpen, toggleGate } = useStore();
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const [bgImage, setBgImage] = useState("");

    useEffect(() => {
        // Prevent scrolling when open
        if (isGateOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [isGateOpen]);

    useGSAP(() => {
        if (isGateOpen) {
            gsap.to(containerRef.current, {
                autoAlpha: 1,
                duration: 0.5,
                ease: "power2.out"
            });
            gsap.fromTo(contentRef.current,
                { y: 50, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
            );
        } else {
            gsap.to(containerRef.current, {
                autoAlpha: 0,
                duration: 0.5,
                ease: "power2.in",
                onComplete: () => {
                    // Clean up if needed
                }
            });
        }
    }, [isGateOpen]);

    if (!isGateOpen) return <div ref={containerRef} className="fixed inset-0 z-[100] bg-black/90 opacity-0 pointer-events-none" />;

    return (
        <div ref={containerRef} className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop Blur */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={toggleGate} />

            {/* Close Button */}
            <button
                onClick={toggleGate}
                className="absolute top-8 right-8 text-white/40 hover:text-white uppercase tracking-widest text-xs font-mono z-20 group"
            >
                [ Close Protocol ]
                <span className="block h-[1px] w-0 group-hover:w-full bg-white transition-all duration-300" />
            </button>

            {/* Application Card */}
            <div ref={contentRef} className="relative w-full max-w-2xl bg-matte-black border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-50" />
                <div className="absolute top-4 left-4 text-[10px] text-white/20 font-mono">SECURE UPLINK ESTABLISHED</div>
                <div className="absolute bottom-4 right-4 text-[10px] text-white/20 font-mono">ENCRYPTED // 2048-BIT</div>

                <div className="text-center mb-12">
                    <h2 className="font-syne text-3xl md:text-4xl text-white font-bold uppercase mb-2">Project Inquiry</h2>
                    <p className="font-inter text-xs text-white/50 uppercase tracking-widest">Initiate visual protocol.</p>
                </div>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] text-white/60 font-mono uppercase tracking-widest pl-1">Name / Organization</label>
                            <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-syne focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all placeholder:text-white/20" placeholder="IDENTIFY" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] text-white/60 font-mono uppercase tracking-widest pl-1">Contact Signal</label>
                            <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-syne focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all placeholder:text-white/20" placeholder="EMAIL" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] text-white/60 font-mono uppercase tracking-widest pl-1">Allocated Resources</label>
                        <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-syne focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all appearance-none cursor-pointer">
                            <option className="bg-matte-black text-white/50">SELECT BUDGET TIER</option>
                            <option className="bg-matte-black text-white">$5k - $10k (MVP)</option>
                            <option className="bg-matte-black text-white">$10k - $25k (Standard)</option>
                            <option className="bg-matte-black text-white">$25k+ (Enterprise)</option>
                        </select>
                    </div>

                    <div className="pt-8 flex justify-center w-full">
                        <MagneticButton className="w-full md:w-auto !px-12 !py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors">
                            Submit Application
                        </MagneticButton>
                    </div>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-[10px] text-white/20 font-inter">
                        *By applying, you agree to our NDA and exclusivity terms. <br />
                        Acceptance rate is currently &lt; 2%.
                    </p>
                </div>
            </div>
        </div>
    );
}
