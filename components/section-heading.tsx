import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

// Consistent eyebrow + heading + optional trailing action across every section.
export default function SectionHeading({
  eyebrow,
  title,
  action,
  as = "h2",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  action?: ReactNode;
  as?: ElementType;
  className?: string;
}) {
  const Heading = as;
  return (
    <div className={cn("mb-7 flex items-end justify-between gap-4", className)}>
      <div>
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <Heading className="text-2xl md:text-[1.75rem] font-semibold tracking-tight leading-tight">
          {title}
        </Heading>
      </div>
      {action && <div className="shrink-0 pb-1">{action}</div>}
    </div>
  );
}
