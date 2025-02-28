"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const { getUser, getRoles } = getKindeServerSession();
const user = await getUser();
const roles = await getRoles();

export async function WelcomeBanner() {
  return (
    <div className="text-center my-8">
      <h1 className="text-3xl font-bold">Welcome, {user?.given_name}!</h1>
      <p className="text-lg text-muted-foreground">
        Role: {roles?.[0]?.name || "No role assigned"}
      </p>
    </div>
  );
}
