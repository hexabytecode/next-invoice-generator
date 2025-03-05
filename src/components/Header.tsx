"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import UserNav from "./UserNav";
import Link from "next/link";

export default function Header() {
  const { isAuthenticated, getUser } = useKindeBrowserClient();
  console.log(getUser());

  return (
    <header className="flex justify-between items-center p-4 border-b">
      <Link href={"/dashboard"}>
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="VyaparBill Logo" width={40} height={40} />
          <h1 className="text-xl font-bold">VyaparBill</h1>
        </div>
      </Link>
      <UserNav authenticated={isAuthenticated} />
    </header>
  );
}
