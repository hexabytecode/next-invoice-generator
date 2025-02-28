"use client";

import {
  LoginLink,
  RegisterLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ThemeToggle } from "./themeToggle";

export function UnauthenticatedButtons() {
  return (
    <div className="flex gap-2">
      <LoginLink>
        <Button variant="outline">Login</Button>
      </LoginLink>
      <RegisterLink>
        <Button variant="outline">Sign up</Button>
      </RegisterLink>
    </div>
  );
}

export function AuthenticatedButtons({ pathname }: { pathname: string }) {
  return (
    <div className="flex gap-2">
      <ThemeToggle />
      {pathname === "/" ? (
        <Link href="/dashboard">
          <Button variant="outline">Dashboard</Button>
        </Link>
      ) : (
        <LogoutLink>
          <Button variant="outline">Log out</Button>
        </LogoutLink>
      )}
    </div>
  );
}
