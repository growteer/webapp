import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/routing";
import { Sprout, Users, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FeatureCard } from "@/features/landing/FeatureCard";
import { FooterLink } from "@/features/landing/FooterLink";

export default async function Home() {
  const t = await getTranslations();

  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="mx-auto flex max-w-5xl flex-col items-center gap-10 px-6 py-24 text-center sm:py-28">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
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
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {t("landing.startGrowing")}
            </h2>
            <Button size="lg" className="rounded-full px-8" asChild>
              <Link href="#join">{t("landing.joinCommunity")}</Link>
            </Button>
          </div>
        </section>
      </main>

      <Separator />

      <footer className="bg-background">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
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
