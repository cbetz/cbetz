import Container from "./container";
import Link from "next/link";

export default function Alert({ preview }) {
  return (
    <div>
      <Container>
        <div className="py-2 text-center text-sm">
          {preview ? (
            <>
              This is page is a preview.{" "}
              <Link
                href="/api/exit-preview">
                
                  Click here
                
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
