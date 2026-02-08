import Image from "next/image";
import { siteConfig } from "@/lib/site.config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn, faGithub } from "@fortawesome/free-brands-svg-icons";

export default function AuthorBox() {
    return (
        <div className="author-box">
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
    );
}
