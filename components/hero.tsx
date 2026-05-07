import Image from "next/image";
import Link from "next/link";
import { FiGithub, FiLinkedin, FiTwitter, FiYoutube } from "react-icons/fi";

const PROFILE_IMAGE_URL =
  "https://images.ctfassets.net/nld1cbd8nf0f/50rUigjk0iUdn6YaTR8fM1/cd888f0f0e4c6b6644301c8ca1526904/profile.png";

const socialLinks = [
  { href: "https://www.linkedin.com/in/christopherbetz", label: "LinkedIn", icon: FiLinkedin },
  { href: "https://twitter.com/thechrisbetz", label: "Twitter", icon: FiTwitter },
  { href: "https://github.com/cbetz", label: "GitHub", icon: FiGithub },
  { href: "https://www.youtube.com/c/ChrisBetz", label: "YouTube", icon: FiYoutube },
];

export default function Hero() {
  return (
    <section className="flex flex-col-reverse items-start gap-10 pb-16 md:pb-24 md:flex-row md:items-center md:gap-16">
      <div className="flex-1 space-y-6">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.05]">
          Chris Betz
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground leading-snug max-w-xl">
          Head of Engineering at{" "}
          <Link
            href="https://joinaltitude.com"
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline underline-offset-4 decoration-2 hover:decoration-primary"
          >
            Altitude
          </Link>
          . Building real-world AI systems for healthcare.
        </p>
        <ul className="flex items-center gap-5">
          {socialLinks.map(({ href, label, icon: Icon }) => (
            <li key={label}>
              <Link
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon className="size-6" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="shrink-0">
        <Image
          src={PROFILE_IMAGE_URL}
          alt="Chris Betz"
          width={240}
          height={240}
          priority
          className="rounded-full size-40 md:size-60 object-cover ring-1 ring-foreground/10"
        />
      </div>
    </section>
  );
}
