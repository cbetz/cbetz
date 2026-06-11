import Link from "next/link";
import Container from "./container";

// Renders only in Contentful preview mode; the old "source on GitHub" note now
// lives in the site footer.
export default function Alert({ preview }: { preview?: boolean }) {
  if (!preview) return null;

  return (
    <div className="border-b border-hairline bg-foreground text-background print:hidden">
      <Container size="wide">
        <div className="py-2 text-center text-sm">
          This page is a preview.{" "}
          <Link href="/api/exit-preview" className="underline underline-offset-4">
            Exit preview mode
          </Link>
          .
        </div>
      </Container>
    </div>
  );
}
