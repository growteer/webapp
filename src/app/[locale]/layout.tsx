import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { redirect } from "next/navigation";
import { routing } from "@/lib/i18n/routing";
import { ReactQueryProvider } from "@lib/react-query/provider";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale)) {
    redirect(`/${routing.defaultLocale}`);
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </NextIntlClientProvider>
  );
}
