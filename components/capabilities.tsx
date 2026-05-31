import type { ComponentType, SVGProps } from "react";
import { Brain, Layers, Smartphone, Users } from "lucide-react";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const ITEMS: { icon: IconComponent; label: string; sub: string }[] = [
  {
    icon: Brain,
    label: "Applied AI in healthcare",
    sub: "LLM and agent pipelines for clinical decisions, with evaluation and governance.",
  },
  {
    icon: Users,
    label: "Engineering leadership",
    sub: "Building and scaling teams that own outcomes. Twice a CTO before Altitude.",
  },
  {
    icon: Layers,
    label: "Full-stack product engineering",
    sub: "From data plumbing and APIs to the product people actually touch.",
  },
  {
    icon: Smartphone,
    label: "Mobile apps",
    sub: "Native and cross-platform iOS and Android, shipped to the app stores.",
  },
];

export default function Capabilities() {
  return (
    <section className="reveal">
      <p className="eyebrow mb-6">What I do</p>
      <ul className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2">
        {ITEMS.map(({ icon: Icon, label, sub }) => (
          <li key={label} className="flex gap-3.5">
            <Icon
              className="mt-0.5 size-5 shrink-0 text-foreground"
              strokeWidth={1.75}
              aria-hidden
            />
            <div>
              <h3 className="font-medium leading-snug">{label}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {sub}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
