import type { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { DEFAULT_LOCALE } from "@/lib/constants";
import { HomeContent } from "./HomeContent";
import messages from "@/locales/en/common.json";

jest.mock("next/navigation", () => ({
  usePathname: () => `/${DEFAULT_LOCALE}`,
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

function TestWrapper({ children }: { children: ReactNode }) {
  return (
    <NextIntlClientProvider locale={DEFAULT_LOCALE} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}

describe("Home page", () => {
  it("renders the hero heading and call-to-action", () => {
    render(
      <TestWrapper>
        <HomeContent />
      </TestWrapper>
    );

    expect(
      screen.getByRole("heading", { name: "Nurture Your Ideas", level: 1 })
    ).toBeVisible();

    const ctaLink = screen.getByRole("link", { name: "Join Our Community" });
    expect(ctaLink).toBeVisible();
    expect(ctaLink).toHaveAttribute("href", "#join");
  });

  it("highlights the three core features", () => {
    render(
      <TestWrapper>
        <HomeContent />
      </TestWrapper>
    );

    const nurture = screen.getAllByText("Nurture Your Ideas");
    expect(nurture.length).toBeGreaterThanOrEqual(1);
    expect(nurture[0]).toBeVisible();
    expect(screen.getByText("Connect with Mentors")).toBeVisible();
    expect(screen.getByText("Grow Faster Together")).toBeVisible();
  });

  it("shows footer metadata and navigation links", () => {
    render(
      <TestWrapper>
        <HomeContent />
      </TestWrapper>
    );

    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(`© ${currentYear} Growteer. All rights reserved.`)
    ).toBeVisible();

    expect(screen.getByRole("link", { name: "Privacy" })).toHaveAttribute(
      "href",
      `/${DEFAULT_LOCALE}/privacy`
    );
    expect(
      screen.getByRole("link", { name: "Terms & Conditions" })
    ).toHaveAttribute("href", `/${DEFAULT_LOCALE}/terms`);
    expect(screen.getByRole("link", { name: "Imprint" })).toHaveAttribute(
      "href",
      `/${DEFAULT_LOCALE}/imprint`
    );
  });
});
