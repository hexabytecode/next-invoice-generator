"use client";

import { usePathname } from "next/navigation";
import { AuthenticatedButtons, UnauthenticatedButtons } from "./ui/authButtons";
import { UserType } from "../types/userTypes";
import { ThemeToggle } from "./ui/themeToggle";

export default function UserNav({ user }: { user: UserType }) {
  const pathname = usePathname();

  return (
    <div className="flex gap-4">
      <ThemeToggle />
      {user ? (
        <AuthenticatedButtons pathname={pathname} />
      ) : (
        <UnauthenticatedButtons />
      )}
    </div>
  );
}
