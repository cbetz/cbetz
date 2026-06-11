import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ALTITUDE_URL, PROFILE_IMAGE_URL, SOCIAL_LINKS } from "@/lib/site";

export default function Hero() {
  return (
    <section className="flex flex-col-reverse items-start gap-8 pt-4 md:flex-row md:items-center md:justify-between md:gap-12 md:pt-8">
      <div className="flex-1 space-y-5">
        <h1 className="animate-in fade-in slide-in-from-bottom-2 font-serif text-4xl font-semibold leading-[1.05] tracking-tight duration-500 md:text-[3rem]">
          Chris Betz
        </h1>
        <div className="animate-in fade-in slide-in-from-bottom-2 space-y-2 delay-100 duration-500">
          <p className="text-lg leading-snug md:text-xl">
            Head of Engineering at{" "}
            <Link
              href={ALTITUDE_URL}
              target="_blank"
              rel="noreferrer"
              className="u-link font-medium"
            >
              Altitude
            </Link>
            , building real-world AI for healthcare.
          </p>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Two decades turning hard, regulated problems into software that
            ships across web, mobile, and applied AI.
          </p>
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            Before Altitude: CTO at aptihealth, leader of 30+ engineers at
            Brightside Health, CTO of New Ocean Health for nine years, and
            engineer at Take Care Health (acquired by Walgreens).
          </p>
        </div>
        <div className="animate-in fade-in slide-in-from-bottom-2 flex flex-wrap items-center gap-5 pt-1 delay-200 duration-500">
          <Button asChild className="h-10 px-5">
            <Link href="/#contact">Get in touch</Link>
          </Button>
          <ul className="flex items-center gap-4">
            {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer me"
                  aria-label={label}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Icon className="size-5" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="animate-in fade-in zoom-in-95 shrink-0 duration-700">
        <Image
          src={PROFILE_IMAGE_URL}
          alt="Chris Betz"
          width={240}
          height={240}
          priority
          className="size-32 rounded-full object-cover ring-1 ring-hairline md:size-44"
        />
      </div>
    </section>
  );
}
