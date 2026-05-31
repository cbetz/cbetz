import Image from "next/image";
import Link from "next/link";
import { PROFILE_IMAGE_URL } from "@/lib/site";

export default function AuthorBio() {
  return (
    <aside className="flex items-start gap-4 rounded-lg p-5 ring-1 ring-hairline">
      <Image
        src={PROFILE_IMAGE_URL}
        alt="Chris Betz"
        width={56}
        height={56}
        className="size-12 shrink-0 rounded-full object-cover ring-1 ring-hairline"
      />
      <div>
        <p className="font-medium">
          <Link href="/about" className="u-link">
            Chris Betz
          </Link>
        </p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          Head of Engineering at Altitude, building real-world AI for
          healthcare. Two decades shipping software across web, mobile, and
          applied AI.
        </p>
        <div className="mt-2 flex gap-4 text-sm">
          <a
            href="https://www.linkedin.com/in/christopherbetz"
            target="_blank"
            rel="noreferrer me"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/cbetz"
            target="_blank"
            rel="noreferrer me"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            GitHub
          </a>
        </div>
      </div>
    </aside>
  );
}
