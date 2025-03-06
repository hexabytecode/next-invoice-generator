import crypto from "crypto";

export function hashUserId(userId: string) {
  return crypto.createHash("sha256").update(userId).digest("hex");
}
