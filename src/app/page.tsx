import Link from "next/link";
import { Sprout, Users, Rocket } from "lucide-react";
import { FeatureCard } from "@/components/landing/FeatureCard";
import { FooterLink } from "@/components/landing/FooterLink";

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <main className="flex-1">
        <section className="max-w-5xl mx-auto px-6 py-24 sm:py-28 text-center flex flex-col items-center gap-10">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
            Welcome to Growteer
          </h1>

          <div className="grid w-full gap-10 md:grid-cols-3">
            <FeatureCard
              icon={<Sprout className="size-12" />}
              title="Nurture Your Ideas"
              description="Turn ambitious concepts into thriving initiatives with curated guidance and resources."
              accent="accent"
            />
            <FeatureCard
              icon={<Users className="size-12" />}
              title="Connect with Mentors"
              description="Collaborate with experienced growers who are ready to champion your growth journey."
              accent="secondary"
            />
            <FeatureCard
              icon={<Rocket className="size-12" />}
              title="Grow Faster Together"
              description="Access tools, workshops, and community feedback designed to accelerate meaningful progress."
              accent="primary"
            />
          </div>

          <div className="flex flex-col items-center gap-6 pt-6">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Start Growing Today
            </h2>
            <Link
              href="#join"
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow-sm transition hover:shadow-md focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Join Our Community
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-background">
        <div className="max-w-5xl mx-auto flex flex-col gap-4 px-6 py-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <span>
            © {new Date().getFullYear()} Growteer. All rights reserved.
          </span>
          <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <FooterLink href="/privacy">Privacy</FooterLink>
            <FooterLink href="/terms">Terms &amp; Conditions</FooterLink>
            <FooterLink href="/imprint">Imprint</FooterLink>
          </nav>
        </div>
      </footer>
    </div>
  );
}
