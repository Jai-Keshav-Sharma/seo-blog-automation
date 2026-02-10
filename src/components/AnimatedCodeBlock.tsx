"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useInView } from "motion/react";
import { cn } from "@/lib/utils";

// Extract text content from React element tree (handles nested spans from rehype-highlight)
function getTextContent(node: unknown): string {
    if (typeof node === "string") return node;
    if (typeof node === "number") return String(node);
    if (Array.isArray(node)) return node.map(getTextContent).join("");
    if (node && typeof node === "object" && "props" in (node as Record<string, unknown>)) {
        const element = node as { props?: { children?: unknown } };
        if (element.props?.children) return getTextContent(element.props.children);
    }
    return "";
}

interface AnimatedPreProps extends React.HTMLAttributes<HTMLPreElement> {
    children?: React.ReactNode;
}

export function AnimatedPre({ children, className, ...props }: AnimatedPreProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-50px" });
    const [typedLength, setTypedLength] = useState(0);
    const [isDone, setIsDone] = useState(false);
    const [copied, setCopied] = useState(false);

    // Extract language from code element's className
    const codeElement = children as React.ReactElement<{
        className?: string;
        children?: React.ReactNode;
    }>;
    const codeClassName = codeElement?.props?.className || "";
    const langMatch = codeClassName.match(/language-(\w+)/);
    const language = langMatch ? langMatch[1] : "code";

    // Get raw text content for typing animation
    const fullText = getTextContent(codeElement?.props?.children || "");

    useEffect(() => {
        if (!isInView || isDone || !fullText) return;

        const totalChars = fullText.length;
        // Scale speed: short code ~2s, long code capped at ~4s
        const duration = Math.min(4000, Math.max(1500, totalChars * 15));
        const charsPerFrame = Math.max(1, Math.ceil(totalChars / (duration / 16)));

        let current = 0;
        const timer = setInterval(() => {
            current += charsPerFrame;
            if (current >= totalChars) {
                setTypedLength(totalChars);
                setIsDone(true);
                clearInterval(timer);
            } else {
                setTypedLength(current);
            }
        }, 16);

        return () => clearInterval(timer);
    }, [isInView, isDone, fullText]);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(fullText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, [fullText]);

    // Language display names
    const langNames: Record<string, string> = {
        js: "JavaScript",
        jsx: "JSX",
        ts: "TypeScript",
        tsx: "TSX",
        py: "Python",
        python: "Python",
        bash: "Bash",
        sh: "Shell",
        css: "CSS",
        html: "HTML",
        json: "JSON",
        yaml: "YAML",
        yml: "YAML",
        md: "Markdown",
        sql: "SQL",
        rust: "Rust",
        go: "Go",
        java: "Java",
        cpp: "C++",
        c: "C",
        rb: "Ruby",
        ruby: "Ruby",
        php: "PHP",
        swift: "Swift",
        kotlin: "Kotlin",
        code: "Code",
    };

    const displayLang = langNames[language] || language.charAt(0).toUpperCase() + language.slice(1);

    return (
        <div ref={containerRef} className="animated-code-container">
            {/* Header */}
            <div className="animated-code-header">
                <div className="animated-code-dots">
                    <span className="animated-code-dot animated-code-dot--red" />
                    <span className="animated-code-dot animated-code-dot--yellow" />
                    <span className="animated-code-dot animated-code-dot--green" />
                </div>
                <span className="animated-code-lang">{displayLang}</span>
                <button
                    className="animated-code-copy"
                    onClick={handleCopy}
                    title="Copy code"
                >
                    {copied ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Code Block */}
            <pre className={cn("animated-code-block", className)} {...props}>
                {isDone ? (
                    // Fully syntax-highlighted version after typing completes
                    children
                ) : (
                    // Typing animation with cursor
                    <code className={codeClassName}>
                        {fullText.slice(0, typedLength)}
                        {isInView && <span className="typing-cursor">▎</span>}
                    </code>
                )}
            </pre>
        </div>
    );
}
