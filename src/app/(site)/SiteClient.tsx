"use client";

import Preloader from "@/components/ui/Preloader";
import TheGate from "@/components/ui/TheGate";
import SonicIdentity from "@/components/ui/SonicIdentity";
import TheVault from "@/components/ui/TheVault";
import SmoothScroll from "@/components/utils/SmoothScroll";
import { useStore } from "@/store/useStore";

export default function SiteClient({ children }: { children: React.ReactNode }) {
    const isLoading = useStore((state) => state.isLoading);

    return (
        <>
            <TheGate />
            <SonicIdentity />
            <TheVault />
            {isLoading && <Preloader />}
            <SmoothScroll>
                {children}
            </SmoothScroll >
        </>
    );
}
