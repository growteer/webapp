import createMiddleware from "next-intl/middleware";
import { routing } from "./src/lib/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(de|en)/:path*"],
};

