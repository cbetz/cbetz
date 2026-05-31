import { FiGithub, FiLinkedin, FiTwitter, FiYoutube } from "react-icons/fi";
import type { IconType } from "react-icons";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://cbetz.com";

export const PROFILE_IMAGE_URL =
  "https://images.ctfassets.net/nld1cbd8nf0f/50rUigjk0iUdn6YaTR8fM1/cd888f0f0e4c6b6644301c8ca1526904/profile.png";

// Split for light obfuscation against naive scrapers; assembled client-side.
export const CONTACT_EMAIL_USER = "christopherwilliambetz";
export const CONTACT_EMAIL_DOMAIN = "gmail.com";

export const ALTITUDE_URL = "https://joinaltitude.com";
export const GITHUB_REPO_URL = "https://github.com/cbetz/cbetz";

export type SocialLink = {
  href: string;
  label: string;
  icon: IconType;
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: "https://www.linkedin.com/in/christopherbetz",
    label: "LinkedIn",
    icon: FiLinkedin,
  },
  { href: "https://github.com/cbetz", label: "GitHub", icon: FiGithub },
  { href: "https://twitter.com/thechrisbetz", label: "X", icon: FiTwitter },
  {
    href: "https://www.youtube.com/c/ChrisBetz",
    label: "YouTube",
    icon: FiYoutube,
  },
];

// Same set, URLs only, used for schema.org sameAs and <link rel="me">.
export const SAME_AS = SOCIAL_LINKS.map((s) => s.href);

export const NAV_LINKS = [
  { href: "/portfolio", label: "Work" },
  { href: "/blog", label: "Writing" },
  { href: "/about", label: "About" },
  { href: "/now", label: "Now" },
];
