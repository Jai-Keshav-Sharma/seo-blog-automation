import { SkeletonCard } from "@/components/Skeleton";

export default function Loading() {
    return (
        <div className="home-container">
            <section className="posts-section">
                <div className="section-header">
                    <div className="skeleton-loading" style={{ width: "200px", height: "28px" }} />
                </div>
                <div className="posts-grid">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            </section>
        </div>
    );
}
