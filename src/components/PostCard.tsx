import Link from "next/link";
import Image from "next/image";
import { PostMeta } from "@/lib/posts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";

interface PostCardProps {
    post: PostMeta;
}

export default function PostCard({ post }: PostCardProps) {
    const postUrl = `/${post.categories[0]}/${post.slug}`;

    return (
        <article className="post-card">
            <Link href={postUrl} className="post-card-link">
                <div className="post-card-image">
                    {post.image ? (
                        <Image
                            src={post.image.startsWith("/") ? post.image : `/${post.image}`}
                            alt={post.title}
                            width={300}
                            height={150}
                            style={{ objectFit: "cover", width: "100%", height: "100%" }}
                        />
                    ) : (
                        <div className="placeholder">
                            <FontAwesomeIcon icon={faFileAlt} />
                        </div>
                    )}
                </div>
                <div className="post-card-content">
                    <h3 className="post-card-title">{post.title}</h3>
                </div>
            </Link>
        </article>
    );
}
