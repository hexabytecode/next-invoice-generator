import { Button } from "@/components/ui/button";
import {
  LogoutLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Dashboard() {
  const { getUser, getRoles } = getKindeServerSession();
  const user = await getUser();
  const roles = await getRoles();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex justify-between p-4 border-b">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <Button variant="outline">
          <LogoutLink>Log out</LogoutLink>
        </Button>
      </header>
      <main className="p-4">
        <p>Welcome, {user?.given_name}!</p>
        <p>Role: {roles?.[0]?.name || "No role assigned"}</p>
      </main>
    </div>
  );
}
