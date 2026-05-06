import type { ReactNode } from "react";
import Alert from "../components/alert";
import Meta from "../components/meta";

export default function Layout({
  preview,
  children,
}: {
  preview?: boolean;
  children: ReactNode;
}) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <main>{children}</main>
      </div>
      <Alert preview={preview} />
    </>
  );
}
