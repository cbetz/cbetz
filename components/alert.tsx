import Container from "./container";
import cn from "classnames";
import Link from "next/link";

export default function Alert({ preview }) {
  return (
    <div
      className={cn("border-b", {
        "bg-accent-7 border-accent-7 text-white": preview,
        "bg-accent-1 border-accent-2": !preview,
      })}
    >
      <Container>
        <div className="py-2 text-center text-sm">
          {preview ? (
            <>
              This is page is a preview.{" "}
              <Link href="/api/exit-preview">
                <a className="underline hover:text-cyan duration-200 transition-colors">
                  Click here
                </a>
              </Link>{" "}
              to exit preview mode.
            </>
          ) : (
            <>
              The source code for this site is{" "}
              <a
                href={`https://github.com/cbetz/cbetz`}
                className="underline hover:text-success duration-200 transition-colors"
              >
                available on GitHub
              </a>
              .
            </>
          )}
        </div>
      </Container>
    </div>
  );
}
