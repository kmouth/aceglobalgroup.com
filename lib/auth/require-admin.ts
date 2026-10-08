import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requireAdmin() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims ?? null;

  if (!claims) {
    redirect("/login");
  }

  const userId = claims.sub;

  if (!userId) {
    redirect("/login");
  }

  const { data: role, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .single();

  if (error || role?.role !== "admin") {
    redirect("/");
  }

  return {
    userId,
    role: "admin" as const,
  };
}