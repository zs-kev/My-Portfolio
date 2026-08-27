import FrontendMentor from "@/lib/assets/icons/FrontendMentor";
import Github from "@/lib/assets/icons/Github";
import Insta from "@/lib/assets/icons/Instagram";
import Linkedin from "@/lib/assets/icons/Linkedin";
import { SOCIAL_LINKS } from "@/lib/siteConfig";
import type { FC } from "react";

const ICONS: Record<string, FC> = {
  LinkedIn: Linkedin,
  Github: Github,
  FrontendMentor: FrontendMentor,
  Instagram: Insta,
};

// The same icon bar appeared verbatim in the hero and the portfolio sidebar,
// with the handles hardcoded in both. One component, one list.
export default function SocialIconLinks({ className }: { className?: string }) {
  return (
    <div className={className}>
      {SOCIAL_LINKS.map(({ label, href }) => {
        const Icon = ICONS[label];
        if (!Icon) return null;
        return (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
          >
            <Icon />
          </a>
        );
      })}
    </div>
  );
}
