export const siteConfig = {
    title: "This Wasn't in the PPT",
    description: "A blog exploring Machine Learning, Data Science and Artificial Intelligence",
    url: "https://jai-keshav-sharma.github.io",

    author: {
        name: "Jai Keshav Sharma",
        email: "ksharma9719@gmail.com",
        avatar: "/images/profile-logo.jpeg",
        bio: "Exploring the frontiers of AI and Machine Learning",
        linkedin: "https://www.linkedin.com/in/jai-keshav-sharma/",
        github: "https://github.com/Jai-Keshav-Sharma/",
    },

    googleAnalytics: "G-LNHG9G1469",

    giscus: {
        repo: "Jai-Keshav-Sharma/jai-keshav-sharma.github.io" as `${string}/${string}`,
        repoId: "R_kgDOQtwvsw",
        category: "Announcements",
        categoryId: "DIC_kwDOQtwvs84C1HJa",
        mapping: "pathname" as const,
        reactionsEnabled: "1",
        emitMetadata: "0",
        theme: "light",
        lang: "en",
    },

    categories: [
        { slug: "machine-learning", name: "Machine Learning and Data Science" },
        { slug: "artificial-intelligence", name: "Artificial Intelligence" },
    ],
};

export type SiteConfig = typeof siteConfig;
