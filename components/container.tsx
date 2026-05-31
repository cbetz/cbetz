import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// One reading column for everything — chrome and content share a left edge for
// a cohesive, refined-minimal feel. `wide` is reserved for any future
// full-bleed surface (e.g. a project gallery).
export default function Container({
  children,
  size = "content",
  className,
}: {
  children: ReactNode;
  size?: "content" | "wide";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6",
        size === "wide" ? "max-w-[68rem]" : "max-w-[42rem]",
        className
      )}
    >
      {children}
    </div>
  );
}
