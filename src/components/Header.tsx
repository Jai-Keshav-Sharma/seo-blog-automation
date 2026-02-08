"use client";

import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site.config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faUser, faEnvelope, faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="site-header">
            <nav className="navbar">
                <div className="nav-container">
                    <Link href="/" className="site-logo">
                        <Image
                            src="/images/logo.jpeg"
                            alt={siteConfig.title}
                            width={40}
                            height={40}
                            className="site-logo-img"
                        />
                        <span className="site-logo-text">{siteConfig.title}</span>
                    </Link>

                    <button
                        className="nav-toggle"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle navigation"
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </button>

                    <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
                        <li className="nav-item">
                            <Link href="/" className="nav-link">
                                <FontAwesomeIcon icon={faPen} /> Blog
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/about" className="nav-link">
                                <FontAwesomeIcon icon={faUser} /> About
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/contact" className="nav-link">
                                <FontAwesomeIcon icon={faEnvelope} /> Contact
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}
