import { LinkPreview } from "./LinkPreview";
import { AnimatedPre } from "./AnimatedCodeBlock";
import type { MDXComponents } from "mdx/types";

export function getMDXComponents(): MDXComponents {
    return {
        a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
            const { href, children, ...rest } = props;
            if (!href) return <a {...rest}>{children}</a>;
            return <LinkPreview href={href}>{children}</LinkPreview>;
        },
        pre: (props: React.HTMLAttributes<HTMLPreElement>) => {
            return <AnimatedPre {...props} />;
        },
    };
}
