"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
    className?: string;
    isLoaded?: boolean;
    children?: React.ReactNode;
}

export function Skeleton({ className, isLoaded = false, children }: SkeletonProps) {
    if (isLoaded && children) {
        return <>{children}</>;
    }

    return (
        <div
            className={cn(
                "skeleton-loading",
                className
            )}
        >
            {children && <div className="invisible">{children}</div>}
        </div>
    );
}

// Pre-styled skeleton variants
export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
    return (
        <div className={cn("skeleton-text-container", className)}>
            {Array.from({ length: lines }).map((_, i) => (
                <div
                    key={i}
                    className={cn(
                        "skeleton-loading skeleton-text",
                        i === lines - 1 && "w-3/4" // Last line shorter
                    )}
                />
            ))}
        </div>
    );
}

export function SkeletonCard({ className }: { className?: string }) {
    return (
        <div className={cn("skeleton-card", className)}>
            <div className="skeleton-loading skeleton-image" />
            <div className="skeleton-card-content">
                <div className="skeleton-loading skeleton-title" />
            </div>
        </div>
    );
}

export function SkeletonAvatar({ size = "md", className }: { size?: "sm" | "md" | "lg"; className?: string }) {
    const sizeClasses = {
        sm: "w-8 h-8",
        md: "w-12 h-12",
        lg: "w-16 h-16",
    };

    return (
        <div
            className={cn(
                "skeleton-loading rounded-full",
                sizeClasses[size],
                className
            )}
        />
    );
}
