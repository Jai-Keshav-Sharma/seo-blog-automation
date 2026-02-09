"use client";

import { useEffect, useState } from "react";
import { Meteors } from "./Meteors";

export const LightModeBackground = () => {
    const [isLight, setIsLight] = useState(false);

    useEffect(() => {
        // Check initial mode - light mode is when 'dark' class is NOT present
        setIsLight(!document.documentElement.classList.contains("dark"));

        // Watch for theme changes
        const observer = new MutationObserver(() => {
            setIsLight(!document.documentElement.classList.contains("dark"));
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => observer.disconnect();
    }, []);

    if (!isLight) return null;

    return (
        <div className="light-background-container">
            <Meteors
                number={30}
                minDelay={0.5}
                maxDelay={2}
                minDuration={3}
                maxDuration={8}
                angle={215}
            />
        </div>
    );
};
