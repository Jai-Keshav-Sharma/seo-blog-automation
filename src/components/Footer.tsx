import Link from "next/link";
import { siteConfig } from "@/lib/site.config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn, faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="site-footer">
            <div className="footer-container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>About</h3>
                        <p>
                            A blog exploring Machine Learning, Data Science and Artificial Intelligence.
                            Join me as I share insights, tutorials, and discoveries from the world of AI.
                        </p>
                    </div>

                    <div className="footer-section">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><Link href="/">Blog</Link></li>
                            <li><Link href="/about">About</Link></li>
                            <li><Link href="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h3>{siteConfig.author.name}</h3>
                        <p>{siteConfig.author.bio}</p>
                        <div className="footer-social">
                            <a
                                href={siteConfig.author.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                            >
                                <FontAwesomeIcon icon={faLinkedinIn} />
                            </a>
                            <a
                                href={siteConfig.author.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                            >
                                <FontAwesomeIcon icon={faGithub} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {currentYear} {siteConfig.title}. All rights reserved.</p>
                    <p>
                        Built with <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">Next.js</a>
                        {" "}and hosted on <a href="https://pages.github.com" target="_blank" rel="noopener noreferrer">GitHub Pages</a>.
                    </p>
                </div>
            </div>
        </footer>
    );
}
