import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const allowedStatuses = [
  "new",
  "reviewing",
  "quoted",
  "accepted",
  "rejected",
  "converted",
  "closed",
] as const;

type EnquiryStatus = (typeof allowedStatuses)[number];

export async function POST(request: Request) {
  try {
    const authClient = await createClient();

    const { data } = await authClient.auth.getClaims();
    const claims = data?.claims ?? null;

    if (!claims) {
      return NextResponse.redirect(
        new URL("/login", request.url)
      );
    }

    const formData = await request.formData();

    const reference = String(
      formData.get("reference") || ""
    ).trim();

    const status = String(
      formData.get("status") || ""
    ).trim() as EnquiryStatus;

    if (!reference || !allowedStatuses.includes(status)) {
      return NextResponse.json(
        {
          error: "Invalid enquiry reference or status.",
        },
        {
          status: 400,
        }
      );
    }

    const supabase = createAdminClient();

    const { error } = await supabase
      .from("enquiries")
      .update({
        status,
      })
      .eq("reference", reference);

    if (error) {
      console.error(
        "Enquiry status update failed:",
        error
      );

      return NextResponse.json(
        {
          error: "Unable to update enquiry status.",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.redirect(
      new URL(
        `/admin/enquiries/${encodeURIComponent(reference)}`,
        request.url
      )
    );
  } catch (error) {
    console.error(
      "Unexpected enquiry status update error:",
      error
    );

    return NextResponse.json(
      {
        error: "An unexpected error occurred.",
      },
      {
        status: 500,
      }
    );
  }
}