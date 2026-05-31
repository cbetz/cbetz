import ContactEmail from "@/components/contact-email";
import SectionHeading from "@/components/section-heading";

export default function ContactCTA() {
  return (
    <section id="contact" className="reveal scroll-mt-20">
      <SectionHeading eyebrow="Contact" title="Let's talk" />
      <p className="max-w-xl leading-relaxed text-muted-foreground">
        I&apos;m open to hiring great engineers, collaborating on hard
        healthcare problems, and the occasional advising conversation. The
        fastest way to reach me is email or LinkedIn.
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
        <ContactEmail className="u-link font-medium" />
        <a
          href="https://www.linkedin.com/in/christopherbetz"
          target="_blank"
          rel="noreferrer me"
          className="u-link"
        >
          LinkedIn
        </a>
      </div>
    </section>
  );
}
