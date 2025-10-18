import Link from "next/link";
import type { ReactNode } from "react";

export interface FooterLinkProps {
  href: string;
  children: ReactNode;
}

export function FooterLink({ href, children }: FooterLinkProps) {
  return (
    <Link
      href={href}
      className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
    >
      {children}
    </Link>
  );
}
