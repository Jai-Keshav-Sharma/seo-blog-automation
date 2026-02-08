import { notFound } from "next/navigation";
import Image from "next/image";
import { getPostBySlug, getAllPostSlugs, getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site.config";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import AuthorBox from "@/components/AuthorBox";
import Giscus from "@/components/Giscus";

interface PostPageProps {
    params: Promise<{ category: string; slug: string[] }>;
}

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        category: post.categories[0] || "uncategorized",
        slug: [post.slug],
    }));
}

export async function generateMetadata({ params }: PostPageProps) {
    const { slug } = await params;
    const postSlug = slug.join("/");
    const post = getPostBySlug(postSlug);

    if (!post) {
        return { title: "Post Not Found" };
    }

    return {
        title: post.title,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description,
            type: "article",
            publishedTime: post.date,
            authors: [post.author],
            images: post.image ? [post.image] : [],
        },
    };
}

export default async function PostPage({ params }: PostPageProps) {
    const { slug } = await params;
    const postSlug = slug.join("/");
    const post = getPostBySlug(postSlug);

    if (!post) {
        notFound();
    }

    const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <article className="post-container">
            <header className="post-header">
                <h1 className="post-title">{post.title}</h1>
                <div className="post-meta">
                    <span>{formattedDate}</span>
                    <span>•</span>
                    <span>{post.author}</span>
                </div>
            </header>

            {post.image && (
                <div className="post-featured-image">
                    <Image
                        src={post.image.startsWith("/") ? post.image : `/${post.image}`}
                        alt={post.title}
                        width={900}
                        height={450}
                        style={{ objectFit: "cover", width: "100%" }}
                        priority
                    />
                </div>
            )}

            <div className="post-content">
                <MDXRemote
                    source={post.content}
                    options={{
                        mdxOptions: {
                            remarkPlugins: [remarkGfm],
                            rehypePlugins: [rehypeHighlight, rehypeSlug],
                        },
                    }}
                />
            </div>

            <footer className="post-footer">
                <AuthorBox />

                {post.tags && post.tags.length > 0 && (
                    <div className="post-tags">
                        {post.tags.map((tag) => (
                            <span key={tag} className="tag">
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                <div className="comments-section">
                    <h3>Comments</h3>
                    <Giscus />
                </div>
            </footer>
        </article>
    );
}
