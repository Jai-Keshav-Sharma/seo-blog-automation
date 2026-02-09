"use client";

import React, { useCallback, useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";

interface MagicCardProps {
    children?: React.ReactNode;
    className?: string;
    gradientSize?: number;
    gradientColor?: string;
    gradientOpacity?: number;
    gradientFrom?: string;
    gradientTo?: string;
    borderWidth?: number;
}

export function MagicCard({
    children,
    className,
    gradientSize = 250,
    gradientColor = "rgba(120, 119, 198, 0.3)",
    gradientOpacity = 1,
    gradientFrom = "#9E7AFF",
    gradientTo = "#FE8BBB",
    borderWidth = 2,
}: MagicCardProps) {
    const mouseX = useMotionValue(-gradientSize);
    const mouseY = useMotionValue(-gradientSize);

    const reset = useCallback(() => {
        mouseX.set(-gradientSize);
        mouseY.set(-gradientSize);
    }, [gradientSize, mouseX, mouseY]);

    const handlePointerMove = useCallback(
        (e: React.PointerEvent<HTMLDivElement>) => {
            const rect = e.currentTarget.getBoundingClientRect();
            mouseX.set(e.clientX - rect.left);
            mouseY.set(e.clientY - rect.top);
        },
        [mouseX, mouseY]
    );

    useEffect(() => {
        reset();
    }, [reset]);

    useEffect(() => {
        const handleGlobalPointerOut = (e: PointerEvent) => {
            if (!e.relatedTarget) {
                reset();
            }
        };

        const handleVisibility = () => {
            if (document.visibilityState !== "visible") {
                reset();
            }
        };

        window.addEventListener("pointerout", handleGlobalPointerOut);
        window.addEventListener("blur", reset);
        document.addEventListener("visibilitychange", handleVisibility);

        return () => {
            window.removeEventListener("pointerout", handleGlobalPointerOut);
            window.removeEventListener("blur", reset);
            document.removeEventListener("visibilitychange", handleVisibility);
        };
    }, [reset]);

    return (
        <div
            className={cn("magic-card-wrapper group relative", className)}
            onPointerMove={handlePointerMove}
            onPointerLeave={reset}
        >
            {/* Gradient border layer - covers entire card */}
            <motion.div
                className="magic-card-border pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
            ${gradientFrom}, 
            ${gradientTo}, 
            transparent 100%
            )
          `,
                }}
            />
            {/* Background layer - sits inside with border gap */}
            <div
                className="magic-card-bg absolute rounded-xl"
                style={{
                    inset: `${borderWidth}px`,
                }}
            />
            {/* Spotlight glow layer */}
            <motion.div
                className="magic-card-glow pointer-events-none absolute rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    inset: `${borderWidth}px`,
                    background: useMotionTemplate`
            radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 100%)
          `,
                    opacity: gradientOpacity,
                }}
            />
            {/* Content - padded to account for border */}
            <div
                className="relative rounded-xl"
                style={{
                    margin: `${borderWidth}px`,
                }}
            >
                {children}
            </div>
        </div>
    );
}
