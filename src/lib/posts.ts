import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface PostMeta {
    slug: string;
    title: string;
    date: string;
    categories: string[];
    tags: string[];
    author: string;
    image?: string;
    description: string;
}

export interface Post extends PostMeta {
    content: string;
}

export function getAllPosts(): PostMeta[] {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const allPosts = fileNames
        .filter((fileName) => fileName.endsWith(".mdx"))
        .map((fileName) => {
            const slug = fileName.replace(/\.mdx$/, "");
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, "utf8");
            const { data } = matter(fileContents);

            return {
                slug,
                title: data.title || "",
                date: data.date ? new Date(data.date).toISOString() : "",
                categories: data.categories || [],
                tags: data.tags || [],
                author: data.author || "Jai Keshav Sharma",
                image: data.image,
                description: data.description || "",
            };
        });

    return allPosts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostsByCategory(category: string): PostMeta[] {
    return getAllPosts().filter((post) => post.categories.includes(category));
}

export function getPostBySlug(slug: string): Post | null {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
        slug,
        title: data.title || "",
        date: data.date ? new Date(data.date).toISOString() : "",
        categories: data.categories || [],
        tags: data.tags || [],
        author: data.author || "Jai Keshav Sharma",
        image: data.image,
        description: data.description || "",
        content,
    };
}

export function getAllPostSlugs(): string[] {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    return fs
        .readdirSync(postsDirectory)
        .filter((fileName) => fileName.endsWith(".mdx"))
        .map((fileName) => fileName.replace(/\.mdx$/, ""));
}
