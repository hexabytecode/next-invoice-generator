import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Dashboard() {
  const { getUser, getRoles } = getKindeServerSession();
  const user = await getUser();
  const roles = await getRoles();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="p-4">
        <p>Welcome, {user?.given_name}!</p>
        <p>Role: {roles?.[0]?.name || "No role assigned"}</p>
      </main>
    </div>
  );
}
