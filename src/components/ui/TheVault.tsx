"use client";

import { useState, useRef, useEffect } from "react";
import { useStore } from "@/store/useStore";
import gsap from "gsap";
import MagneticButton from "./MagneticButton";
import { cn } from "@/lib/utils";

const PASSCODES = ["ICON", "ADITYA", "DESIGN", "ELITE"];

export default function TheVault() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [status, setStatus] = useState<"IDLE" | "ERROR" | "SUCCESS">("IDLE");

    const containerRef = useRef<HTMLDivElement>(null);

    // Listen for custom event to open vault
    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        window.addEventListener("open-vault", handleOpen);
        return () => window.removeEventListener("open-vault", handleOpen);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (PASSCODES.includes(input.toUpperCase())) {
            setStatus("SUCCESS");
        } else {
            setStatus("ERROR");
            setTimeout(() => setStatus("IDLE"), 2000);
            setInput("");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl">
            <button
                onClick={() => setIsOpen(false)}
                className="absolute top-8 right-8 text-white/40 hover:text-white uppercase tracking-widest text-xs font-mono"
            >
                [ Abort Sequence ]
            </button>

            <div className="w-full max-w-md p-8 text-center">
                {status === "SUCCESS" ? (
                    <div className="animate-in fade-in zoom-in duration-500">
                        <div className="text-white/80 font-mono text-xs uppercase tracking-[0.5em] mb-4">Access Granted</div>
                        <h2 className="font-syne text-4xl text-white font-bold uppercase mb-8">The Inner Circle</h2>
                        <div className="border border-white/10 bg-white/5 p-8 rounded-lg">
                            <p className="font-inter text-sm text-white/60 leading-relaxed mb-6">
                                Welcome to the genesis block. You are now part of the 0.01%.
                                <br /><br />
                                Exclusive drop coming Q3 2026.
                            </p>
                            <div className="font-mono text-[10px] text-white/20 uppercase">ID: #882-192-X</div>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col items-center">
                        <div className="mb-8">
                            <div className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <div className={cn("w-2 h-2 rounded-full", status === "ERROR" ? "bg-red-500" : "bg-white animate-pulse")} />
                            </div>
                            <h3 className="font-syne text-2xl text-white uppercase tracking-widest">Restricted Area</h3>
                            <p className="font-mono text-[10px] text-white/30 uppercase mt-2">Enter Passcode</p>
                        </div>

                        <div className="relative w-full mb-8 group">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value.toUpperCase())}
                                className={cn(
                                    "w-full bg-transparent border-b border-white/20 py-4 text-center font-mono text-2xl text-white outline-none transition-colors",
                                    status === "ERROR" ? "border-red-500 text-red-500" : "focus:border-white"
                                )}
                                placeholder="____"
                                maxLength={5}
                                autoFocus
                            />
                            {status === "ERROR" && (
                                <div className="absolute top-full left-0 w-full text-center text-[10px] text-red-500 font-mono mt-2 uppercase tracking-widest">
                                    Access Denied
                                </div>
                            )}
                        </div>

                        <MagneticButton type="submit" className="!px-12 !py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors">
                            Authenticate
                        </MagneticButton>
                    </form>
                )}
            </div>
        </div>
    );
}
