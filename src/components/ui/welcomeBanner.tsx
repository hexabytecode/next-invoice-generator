"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Badge } from "@/components/ui/badge";

const { getUser, getRoles } = getKindeServerSession();
const user = await getUser();
const roles = await getRoles();

export async function WelcomeBanner() {
  const roleName = roles?.[0]?.name || "No role assigned";
  const roleId = roles?.[0]?.id || "default";

  const roleVariant =
    roleId === "paid-user"
      ? "success"
      : roleName === "trial-user"
      ? "warning"
      : "outline";

  return (
    <div className="text-center my-8">
      <h1 className="text-3xl font-bold">Welcome, {user?.given_name}!</h1>
      <div className="text-lg text-muted-foreground">
        Role: <Badge variant={roleVariant}>{roleName}</Badge>
      </div>
    </div>
  );
}
