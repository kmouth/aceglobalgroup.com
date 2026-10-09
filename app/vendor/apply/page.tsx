
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import VendorApplicationForm from "./VendorApplicationForm";

export const dynamic = "force-dynamic";

type CountryRequirement = {
  country_code: string;
  country_name: string;
  business_registration_authority: string | null;
  registration_number_label: string | null;
  registration_document_type: string | null;
  formal_registration_supported: boolean;
  formal_registration_required: boolean;
  alternative_verification_allowed: boolean;
  address_proof_required: boolean;
  address_proof_max_age_months: number;
  accepted_address_documents: string[];
  identity_document_required: boolean;
  notes: string | null;
};

export default async function VendorApplyPage() {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();

  if (!claimsData?.claims?.sub) {
    redirect("/login");
  }

  const userId = claimsData.claims.sub;

  const [{ data: role }, { data: application }, { data: countries }] =
    await Promise.all([
      supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .single(),

      supabase
        .from("vendor_applications")
        .select(
          "id, vendor_id, application_reference, status, submitted_at, decision_notes, country_code, verification_route"
        )
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle(),

      supabase
        .from("vendor_country_requirements")
        .select(
          "country_code, country_name, business_registration_authority, registration_number_label, registration_document_type, formal_registration_supported, formal_registration_required, alternative_verification_allowed, address_proof_required, address_proof_max_age_months, accepted_address_documents, identity_document_required, notes"
        )
        .eq("is_active", true)
        .order("country_name"),
    ]);

  if (role?.role === "admin") {
    redirect("/admin");
  }

  const email =
    typeof claimsData.claims.email === "string"
      ? claimsData.claims.email
      : "";

  return (
    <VendorApplicationForm
      initialRole={role?.role === "vendor" ? "vendor" : "customer"}
      initialApplication={application ?? null}
      countries={(countries ?? []) as CountryRequirement[]}
      userEmail={email}
    />
  );
}
