import Link from "next/link";
import { getAllPosts, getPostsByCategory } from "@/lib/posts";
import { siteConfig } from "@/lib/site.config";
import PostCard from "@/components/PostCard";

export default function Home() {
  const allPosts = getAllPosts();

  return (
    <div className="home-container">
      {siteConfig.categories.map((category) => {
        const categoryPosts = getPostsByCategory(category.slug);

        return (
          <section key={category.slug} className="category-section">
            <h2 className="section-title">
              <Link href={`/${category.slug}`}>{category.name}</Link>
            </h2>
            <div className="posts-grid">
              {categoryPosts.length > 0 ? (
                categoryPosts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))
              ) : (
                <p className="no-posts">No posts yet in this category.</p>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
