"use server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

export async function getOrCreateVariant(userId: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const { data: existing } = await supabase
    .from("cancellations")
    .select("downsell_variant")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (existing?.downsell_variant) return existing.downsell_variant as "A" | "B";

  const v = crypto.randomInt(0, 2) === 0 ? "A" : "B";
  // Option 1: create a pending row now, or store variant in a user-scoped table/column.
  await supabase.from("cancellations").insert({
    user_id: userId,
    downsell_variant: v,
    pending_cancellation: true,
  });
  return v;
}
