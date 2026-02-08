"use client";

import { useEffect, useRef } from "react";
import { siteConfig } from "@/lib/site.config";

export default function Giscus() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current || ref.current.hasChildNodes()) return;

        const script = document.createElement("script");
        script.src = "https://giscus.app/client.js";
        script.async = true;
        script.crossOrigin = "anonymous";
        script.setAttribute("data-repo", siteConfig.giscus.repo);
        script.setAttribute("data-repo-id", siteConfig.giscus.repoId);
        script.setAttribute("data-category", siteConfig.giscus.category);
        script.setAttribute("data-category-id", siteConfig.giscus.categoryId);
        script.setAttribute("data-mapping", siteConfig.giscus.mapping);
        script.setAttribute("data-reactions-enabled", siteConfig.giscus.reactionsEnabled);
        script.setAttribute("data-emit-metadata", siteConfig.giscus.emitMetadata);
        script.setAttribute("data-theme", siteConfig.giscus.theme);
        script.setAttribute("data-lang", siteConfig.giscus.lang);

        ref.current.appendChild(script);
    }, []);

    return <div ref={ref} />;
}
