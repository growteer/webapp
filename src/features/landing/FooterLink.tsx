import type { ReactNode } from "react";
import { Link } from "@/lib/i18n/routing";
import { Button } from "@/components/ui/button";

export interface FooterLinkProps {
  href: string;
  children: ReactNode;
}

export function FooterLink({ href, children }: FooterLinkProps) {
  return (
    <Button variant="link" size="sm" asChild className="text-muted-foreground h-auto p-0 font-normal hover:text-foreground">
      <Link href={href}>{children}</Link>
    </Button>
  );
}
