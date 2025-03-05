"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import UserNav from "./UserNav";

export default async function Header() {
  const { isAuthenticated } = getKindeServerSession();
  const authenticated = await isAuthenticated();

  return (
    <header className="flex justify-between items-center p-4 border-b">
      <div className="flex items-center gap-2">
        <Image src="/logo.png" alt="VyaparBill Logo" width={40} height={40} />
        <h1 className="text-xl font-bold">VyaparBill</h1>
      </div>
      <UserNav authenticated={authenticated} />
    </header>
  );
}
