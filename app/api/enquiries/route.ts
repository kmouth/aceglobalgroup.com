import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type EnquiryRequest = {
  fullName?: string;
  companyName?: string;
  email?: string;
  phone?: string;
  service?: string;
  pickupLocation?: string;
  deliveryLocation?: string;
  cargoProduct?: string;
  quantity?: string;
  preferredDate?: string;
  requirements?: string;
};

function generateEnquiryReference() {
  const year = new Date().getFullYear();
  const randomNumber = Math.floor(100000 + Math.random() * 900000);

  return `ACE-ENQ-${year}-${randomNumber}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as EnquiryRequest;

    const {
      fullName,
      companyName,
      email,
      phone,
      service,
      pickupLocation,
      deliveryLocation,
      cargoProduct,
      quantity,
      preferredDate,
      requirements,
    } = body;

    // --------------------------------------------------
    // Validate required fields
    // --------------------------------------------------

    if (!fullName || !email || !phone || !service) {
      return NextResponse.json(
        {
          status: false,
          message:
            "Full name, email, phone number and service are required.",
        },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    const emailIsValid =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

    if (!emailIsValid) {
      return NextResponse.json(
        {
          status: false,
          message: "Please provide a valid email address.",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // Supabase server configuration
    // --------------------------------------------------

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

    if (!supabaseUrl || !supabaseSecretKey) {
      console.error(
        "Supabase environment variables are not configured."
      );

      return NextResponse.json(
        {
          status: false,
          message: "Database service is not configured.",
        },
        { status: 500 }
      );
    }

    // IMPORTANT:
    // This client uses the secret key and therefore MUST remain
    // inside this server-side route. Never move this key to a
    // NEXT_PUBLIC_ environment variable.
    const supabase = createClient(
      supabaseUrl,
      supabaseSecretKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // --------------------------------------------------
    // Find existing customer
    // --------------------------------------------------

    const { data: existingCustomer, error: customerLookupError } =
      await supabase
        .from("customers")
        .select("id")
        .eq("email", normalizedEmail)
        .maybeSingle();

    if (customerLookupError) {
      console.error(
        "Supabase customer lookup failed:",
        customerLookupError
      );

      return NextResponse.json(
        {
          status: false,
          message: "Unable to process your enquiry.",
        },
        { status: 500 }
      );
    }

    let customerId: string;

    // --------------------------------------------------
    // Update existing customer
    // --------------------------------------------------

    if (existingCustomer) {
      customerId = existingCustomer.id;

      const { error: customerUpdateError } =
        await supabase
          .from("customers")
          .update({
            full_name: fullName.trim(),
            company_name: companyName?.trim() || null,
            phone: phone.trim(),
          })
          .eq("id", customerId);

      if (customerUpdateError) {
        console.error(
          "Supabase customer update failed:",
          customerUpdateError
        );

        return NextResponse.json(
          {
            status: false,
            message:
              "Unable to update customer information.",
          },
          { status: 500 }
        );
      }
    } else {
      // --------------------------------------------------
      // Create new customer
      // --------------------------------------------------

      const { data: createdCustomer, error: customerCreateError } =
        await supabase
          .from("customers")
          .insert({
            full_name: fullName.trim(),
            company_name: companyName?.trim() || null,
            email: normalizedEmail,
            phone: phone.trim(),
          })
          .select("id")
          .single();

      if (customerCreateError) {
        console.error(
          "Supabase customer creation failed:",
          customerCreateError
        );

        return NextResponse.json(
          {
            status: false,
            message: "Unable to create customer record.",
          },
          { status: 500 }
        );
      }

      customerId = createdCustomer.id;
    }

    // --------------------------------------------------
    // Create enquiry
    // --------------------------------------------------

    const reference = generateEnquiryReference();

    const { data: savedEnquiry, error: enquiryError } =
      await supabase
        .from("enquiries")
        .insert({
          reference,
          customer_id: customerId,
          service: service.trim(),
          pickup_location:
            pickupLocation?.trim() || null,
          delivery_location:
            deliveryLocation?.trim() || null,
          cargo_product:
            cargoProduct?.trim() || null,
          quantity: quantity?.trim() || null,
          preferred_date:
            preferredDate || null,
          additional_requirements:
            requirements?.trim() || null,
          status: "new",
        })
        .select("id, reference, status")
        .single();

    if (enquiryError) {
      console.error(
        "Supabase enquiry creation failed:",
        enquiryError
      );

      return NextResponse.json(
        {
          status: false,
          message:
            "Unable to save your enquiry. Please try again.",
        },
        { status: 500 }
      );
    }

    // --------------------------------------------------
    // Success
    // --------------------------------------------------

    console.log("ACE ENQUIRY SAVED:", {
      reference: savedEnquiry.reference,
      customerId,
      enquiryId: savedEnquiry.id,
      service,
    });

    return NextResponse.json({
      status: true,
      message: "Enquiry submitted successfully.",
      data: {
        reference: savedEnquiry.reference,
        status: savedEnquiry.status,
      },
    });
  } catch (error) {
    console.error("ACE enquiry error:", error);

    return NextResponse.json(
      {
        status: false,
        message:
          "Unable to submit your enquiry. Please try again.",
      },
      { status: 500 }
    );
  }
}