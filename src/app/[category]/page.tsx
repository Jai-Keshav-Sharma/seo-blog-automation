import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostsByCategory } from "@/lib/posts";
import { siteConfig } from "@/lib/site.config";
import PostCard from "@/components/PostCard";

interface CategoryPageProps {
    params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
    return siteConfig.categories.map((cat) => ({
        category: cat.slug,
    }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
    const { category } = await params;
    const cat = siteConfig.categories.find((c) => c.slug === category);

    if (!cat) return { title: "Category Not Found" };

    return {
        title: cat.name,
        description: `Posts in the ${cat.name} category`,
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { category } = await params;
    const cat = siteConfig.categories.find((c) => c.slug === category);

    if (!cat) {
        notFound();
    }

    const posts = getPostsByCategory(category);

    return (
        <div className="page-container">
            <header className="page-header">
                <h1 className="page-title">{cat.name}</h1>
            </header>

            <div className="posts-grid">
                {posts.length > 0 ? (
                    posts.map((post) => <PostCard key={post.slug} post={post} />)
                ) : (
                    <p className="no-posts">No posts yet in this category.</p>
                )}
            </div>

            <div style={{ marginTop: "40px", textAlign: "center" }}>
                <Link href="/" style={{ fontWeight: 500 }}>
                    ← Back to Home
                </Link>
            </div>
        </div>
    );
}
