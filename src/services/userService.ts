import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function fetchUserDetails() {
  const { getUser } = getKindeServerSession();
  return await getUser();
}
