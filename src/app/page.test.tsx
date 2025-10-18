import type { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import Home from "./page";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href }: { children: ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe("Home page", () => {
  it("renders the hero heading and call-to-action", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: "Welcome to Growteer", level: 1 })
    ).toBeVisible();

    const ctaLink = screen.getByRole("link", { name: "Join Our Community" });
    expect(ctaLink).toBeVisible();
    expect(ctaLink).toHaveAttribute("href", "#join");
  });

  it("highlights the three core features", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: "Nurture Your Ideas", level: 3 })
    ).toBeVisible();
    expect(
      screen.getByRole("heading", { name: "Connect with Mentors", level: 3 })
    ).toBeVisible();
    expect(
      screen.getByRole("heading", { name: "Grow Faster Together", level: 3 })
    ).toBeVisible();
  });

  it("shows footer metadata and navigation links", () => {
    render(<Home />);

    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(`© ${currentYear} Growteer. All rights reserved.`)
    ).toBeVisible();

    expect(screen.getByRole("link", { name: "Privacy" })).toHaveAttribute(
      "href",
      "/privacy"
    );
    expect(
      screen.getByRole("link", { name: "Terms & Conditions" })
    ).toHaveAttribute("href", "/terms");
    expect(screen.getByRole("link", { name: "Imprint" })).toHaveAttribute(
      "href",
      "/imprint"
    );
  });
});
