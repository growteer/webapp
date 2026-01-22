import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/routing";
import { Sprout, Users, Rocket } from "lucide-react";
import { FeatureCard } from "@/features/landing/FeatureCard";
import { FooterLink } from "@/features/landing/FooterLink";

export default async function Home() {
  const t = await getTranslations();

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <main className="flex-1">
        <section className="max-w-5xl mx-auto px-6 py-24 sm:py-28 text-center flex flex-col items-center gap-10">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
            {t("landing.nurtureTitle")}
          </h1>

          <div className="grid w-full gap-10 md:grid-cols-3">
            <FeatureCard
              icon={<Sprout className="size-12" />}
              title={t("landing.nurtureTitle")}
              description={t("landing.nurtureDescription")}
              accent="primary"
            />
            <FeatureCard
              icon={<Users className="size-12" />}
              title={t("landing.connectTitle")}
              description={t("landing.connectDescription")}
              accent="accent"
            />
            <FeatureCard
              icon={<Rocket className="size-12" />}
              title={t("landing.growTitle")}
              description={t("landing.growDescription")}
              accent="secondary"
            />
          </div>

          <div className="flex flex-col items-center gap-6 pt-6">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              {t("landing.startGrowing")}
            </h2>
            <Link
              href="#join"
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow-sm transition hover:shadow-md focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {t("landing.joinCommunity")}
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-background">
        <div className="max-w-5xl mx-auto flex flex-col gap-4 px-6 py-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <span>{t("footer.copyright", { year: new Date().getFullYear() })}</span>
          <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <FooterLink href="/privacy">{t("footer.privacy")}</FooterLink>
            <FooterLink href="/terms">{t("footer.terms")}</FooterLink>
            <FooterLink href="/imprint">{t("footer.imprint")}</FooterLink>
          </nav>
        </div>
      </footer>
    </div>
  );
}
