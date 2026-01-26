import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <Card className="flex flex-col items-center gap-4 text-center">
      <CardHeader className="flex flex-col items-center gap-4 pb-0">
        <div
          className={cn(
            "flex size-20 items-center justify-center rounded-full",
            "ring-1 ring-inset ring-border/40",
            accentClassMap[accent]
          )}
        >
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
