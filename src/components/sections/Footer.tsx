"use client";

import MagneticButton from "@/components/ui/MagneticButton";

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const openVault = () => {
        window.dispatchEvent(new CustomEvent("open-vault"));
    };

    return (
        <footer className="relative w-full bg-matte-black pt-32 pb-12 px-8 border-t border-white/10 overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24">
                {/* Branding */}
                <div className="mb-12 md:mb-0">
                    <h2
                        className="font-syne text-[15vw] leading-[0.8] font-bold text-off-white tracking-tighter uppercase opacity-20 hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.6,0.01,-0.05,0.95)] hover:tracking-wide select-none cursor-default"
                    >
                        ADITYA
                    </h2>
                </div>

                {/* Grid Links */}
                <div className="flex gap-16 font-inter text-xs uppercase tracking-widest text-off-white/40">
                    <div className="flex flex-col gap-4">
                        <span className="text-white/20 mb-2">// Socials</span>
                        <a href="#" className="hover:text-white transition-colors">Instagram</a>
                        <a href="#" className="hover:text-white transition-colors">Twitter</a>
                        <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                    </div>
                    <div className="flex flex-col gap-4">
                        <span className="text-white/20 mb-2">// Legal</span>
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <button onClick={openVault} className="text-left hover:text-white transition-colors hover:tracking-widest duration-300">[ Locked ]</button>
                    </div>
                    <div className="flex flex-col gap-4">
                        <span className="text-white/20 mb-2">// Contact</span>
                        <a href="mailto:hello@aditya.design" className="hover:text-white transition-colors">hello@aditya.design</a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8">
                <div className="text-off-white/20 text-[10px] font-mono tracking-widest uppercase mb-4 md:mb-0">
                    System Verified • All Systems Operational
                </div>

                <div className="flex items-center gap-4">
                    <span className="text-off-white/20 text-[10px] font-mono tracking-widest uppercase hidden md:block">
                        End of Protocol
                    </span>
                    <div onClick={scrollToTop}>
                        <MagneticButton className="!px-6 !py-2 text-xs border-white/10 hover:bg-white hover:text-black hover:border-white transition-all">
                            Back to Top
                        </MagneticButton>
                    </div>
                </div>
            </div>
        </footer>
    );
}
