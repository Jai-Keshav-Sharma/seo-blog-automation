import { Metadata } from "next";
import { siteConfig } from "@/lib/site.config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
    title: "Contact",
};

export default function ContactPage() {
    return (
        <div className="page-container">
            <header className="page-header">
                <h1 className="page-title">Get in Touch</h1>
            </header>

            <div className="page-content">
                <p>
                    I&apos;d love to hear from you! Whether you have questions about a blog post, suggestions for topics,
                    collaboration opportunities, or just want to say hello — feel free to reach out.
                </p>

                <div className="contact-info" style={{ margin: "30px 0" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "15px" }}>
                        <FontAwesomeIcon icon={faEnvelope} style={{ width: "20px" }} />
                        <span>
                            <strong>Email:</strong>{" "}
                            <a href={`mailto:${siteConfig.author.email}`}>{siteConfig.author.email}</a>
                        </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "15px" }}>
                        <FontAwesomeIcon icon={faGithub} style={{ width: "20px" }} />
                        <span>
                            <strong>GitHub:</strong>{" "}
                            <a href={siteConfig.author.github} target="_blank" rel="noopener noreferrer">
                                {siteConfig.author.github}
                            </a>
                        </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "15px" }}>
                        <FontAwesomeIcon icon={faLinkedinIn} style={{ width: "20px" }} />
                        <span>
                            <strong>LinkedIn:</strong>{" "}
                            <a href={siteConfig.author.linkedin} target="_blank" rel="noopener noreferrer">
                                {siteConfig.author.linkedin}
                            </a>
                        </span>
                    </div>
                </div>

                <h2>Response Time</h2>

                <p>
                    I try to respond to all messages within 24-48 hours. If you&apos;re reaching out about a potential collaboration
                    or project, please include as much detail as possible to help me understand how I can help.
                </p>

                <h2>Other Ways to Connect</h2>

                <p>
                    You can also leave comments on any blog post using the Giscus comment system powered by GitHub Discussions.
                    This is a great way to start a public conversation about specific topics!
                </p>
            </div>
        </div>
    );
}
