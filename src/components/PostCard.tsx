"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PostMeta } from "@/lib/posts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { MagicCard } from "./MagicCard";

interface PostCardProps {
    post: PostMeta;
}

export default function PostCard({ post }: PostCardProps) {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const postUrl = `/${post.categories[0]}/${post.slug}`;

    return (
        <MagicCard className="post-card">
            <Link href={postUrl} className="post-card-link">
                <div className="post-card-image">
                    {post.image ? (
                        <>
                            {/* Skeleton placeholder - shows while image loads */}
                            {!isImageLoaded && (
                                <div className="skeleton-loading skeleton-image-placeholder" />
                            )}
                            <Image
                                src={post.image.startsWith("/") ? post.image : `/${post.image}`}
                                alt={post.title}
                                width={300}
                                height={150}
                                style={{
                                    objectFit: "cover",
                                    width: "100%",
                                    height: "100%",
                                    opacity: isImageLoaded ? 1 : 0,
                                    transition: "opacity 0.3s ease-in-out",
                                }}
                                onLoad={() => setIsImageLoaded(true)}
                            />
                        </>
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
        </MagicCard>
    );
}
