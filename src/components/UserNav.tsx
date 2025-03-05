"use client";

import { usePathname } from "next/navigation";
import { AuthenticatedButtons, UnauthenticatedButtons } from "./ui/authButtons";
import { ThemeToggle } from "./ui/themeToggle";

export default function UserNav({ authenticated }: { authenticated: boolean }) {
  const pathname = usePathname();

  return (
    <div className="flex gap-4">
      <ThemeToggle />
      {authenticated ? (
        <AuthenticatedButtons pathname={pathname} />
      ) : (
        <UnauthenticatedButtons />
      )}
    </div>
  );
}
