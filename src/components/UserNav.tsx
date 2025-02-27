"use client";

import { usePathname } from "next/navigation";
import { AuthenticatedButtons, UnauthenticatedButtons } from "./ui/authButtons";
import { UserType } from "../types/userTypes";

export default function UserNav({ user }: { user: UserType }) {
  const pathname = usePathname();

  return user ? (
    <AuthenticatedButtons pathname={pathname} />
  ) : (
    <UnauthenticatedButtons />
  );
}
