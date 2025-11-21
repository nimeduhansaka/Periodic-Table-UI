"use client";
import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";


const SOCIAL_LINKS = [
    { label: "GitHub", href: "https://github.com/nimeduhansaka", Icon: Github },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/nimedu-hansaka-9721b4383", Icon: Linkedin },
    { label: "Twitter", href: "https://x.com/nimedu", Icon: Twitter },
    { label: "Mail", href: "mailto:nimeduhansaka@gamil.com", Icon: Mail },
];

export default function FooterSection() {
    return (
        <footer id="table-bottom-section" className="mt-16 border-t border-white/10 pt-8 text-center text-sm text-white/70">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">Connect</p>
            <div className="mt-4 flex flex-wrap justify-center gap-4">
                {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                    <Link
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-white/80 transition hover:border-white/40 hover:text-white"
                    >
                        <Icon size={18} strokeWidth={1.8} />
                        {label}
                    </Link>
                ))}
            </div>

        </footer>
    );
}
