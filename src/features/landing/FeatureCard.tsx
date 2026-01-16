import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type FeatureAccent = "primary" | "secondary" | "accent";

export interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  accent: FeatureAccent;
}

const accentClassMap: Record<FeatureAccent, string> = {
  accent: "text-accent bg-accent/15",
  secondary: "text-secondary bg-secondary/15",
  primary: "text-primary bg-primary/15",
};

export function FeatureCard({
  icon,
  title,
  description,
  accent,
}: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div
        className={cn(
          "flex size-20 items-center justify-center rounded-full",
          "ring-1 ring-inset ring-border/40",
          accentClassMap[accent]
        )}
      >
        {icon}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-base text-muted-foreground">{description}</p>
    </div>
  );
}
