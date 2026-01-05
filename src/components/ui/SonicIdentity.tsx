"use client";

import { useEffect, useState } from "react";
import useSound from "use-sound";
import { useStore } from "@/store/useStore";

// Short subtle click sound (Base64) to avoid external assets
const CLICK_SOUND = "data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YQIAAAAAAA=="; // Placeholder silent/short

// Actually, let's use a real short bleep if possible, or just a simple oscillator if we were doing raw audio context. 
// But since we installed use-sound, we need a file. 
// For now, I will assume a standard 'click.mp3' exists or I will create a simple component that uses Audio Context for generated beeps to be standalone.

export default function SonicIdentity() {
    // Using AudioContext for procedurally generated UI sounds (Zero assets needed)

    useEffect(() => {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;

        const ctx = new AudioContext();

        const playClick = () => {
            if (ctx.state === 'suspended') ctx.resume();

            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.connect(gain);
            gain.connect(ctx.destination);

            // Very high, short luxury "tick"
            osc.type = "sine";
            osc.frequency.setValueAtTime(800, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05);

            gain.gain.setValueAtTime(0.05, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.05);
        };

        const handleInteraction = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Play on buttons or interactive elements
            if (target.closest('button') || target.closest('a') || target.closest('.interactive')) {
                playClick();
            }
        };

        window.addEventListener('mousedown', handleInteraction);

        return () => {
            window.removeEventListener('mousedown', handleInteraction);
            ctx.close();
        }
    }, []);

    return null; // Headless component
}
