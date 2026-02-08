import { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/lib/site.config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
    title: "About",
};

export default function AboutPage() {
    return (
        <div className="page-container">
            <header className="page-header">
                <h1 className="page-title">About Me</h1>
            </header>

            <div className="page-content">
                <div className="author-box" style={{ marginBottom: "30px" }}>
                    <Image
                        src={siteConfig.author.avatar}
                        alt={siteConfig.author.name}
                        width={80}
                        height={80}
                        className="author-avatar"
                    />
                    <div className="author-info">
                        <h4 className="author-name">{siteConfig.author.name}</h4>
                        <p className="author-bio">{siteConfig.author.bio}</p>
                        <div className="author-social">
                            <a href={siteConfig.author.github} target="_blank" rel="noopener noreferrer" title="GitHub">
                                <FontAwesomeIcon icon={faGithub} />
                            </a>
                            <a href={siteConfig.author.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                                <FontAwesomeIcon icon={faLinkedinIn} />
                            </a>
                            <a href={`mailto:${siteConfig.author.email}`} title="Email">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </a>
                        </div>
                    </div>
                </div>

                <h2>Welcome to &quot;This Wasn&apos;t in the PPT&quot;</h2>

                <p>
                    You know that moment in class when the professor glosses over something &quot;trivial&quot; and says
                    &quot;this won&apos;t be on the exam&quot; — but then you realize it&apos;s actually the key to understanding
                    everything? That&apos;s what this blog is about.
                </p>

                <p>
                    <strong>&quot;This Wasn&apos;t in the PPT&quot;</strong> is a sarcastic nod to all the crucial concepts,
                    intuitions, and practical insights that somehow never make it into those 200-slide lecture decks.
                    The stuff professors skip. The details buried in footnotes. The &quot;obvious&quot; things that take
                    weeks to truly understand.
                </p>

                <p>
                    Here, I document my journey through Machine Learning and Artificial Intelligence — the real
                    learning that happens outside the classroom, beyond the slides, and often at 2 AM when nothing
                    makes sense until suddenly it does.
                </p>

                <h2>What You&apos;ll Find Here</h2>

                <ul>
                    <li><strong>Machine Learning &amp; Data Science:</strong> Deep dives into algorithms, model architectures, training techniques, and real-world applications.</li>
                    <li><strong>Artificial Intelligence:</strong> Broader explorations of AI systems, neural networks, and intelligent agents.</li>
                    <li><strong>Tutorials &amp; Guides:</strong> Step-by-step explanations with code examples.</li>
                    <li><strong>Research Insights:</strong> Summaries and discussions of interesting papers and developments.</li>
                </ul>

                <h2>Let&apos;s Connect</h2>

                <p>
                    I&apos;m always happy to connect with fellow enthusiasts. Feel free to reach out through any of the channels below,
                    or leave a comment on any post!
                </p>
            </div>
        </div>
    );
}
