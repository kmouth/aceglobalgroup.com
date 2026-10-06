import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

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

    const {
      data: existingCustomer,
      error: customerLookupError,
    } = await supabase
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
            message: "Unable to update customer information.",
          },
          { status: 500 }
        );
      }
    } else {
      // --------------------------------------------------
      // Create new customer
      // --------------------------------------------------

      const {
        data: createdCustomer,
        error: customerCreateError,
      } = await supabase
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

    const {
      data: savedEnquiry,
      error: enquiryError,
    } = await supabase
      .from("enquiries")
      .insert({
        reference,
        customer_id: customerId,
        service: service.trim(),
        pickup_location: pickupLocation?.trim() || null,
        delivery_location: deliveryLocation?.trim() || null,
        cargo_product: cargoProduct?.trim() || null,
        quantity: quantity?.trim() || null,
        preferred_date: preferredDate || null,
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
    // Send emails with Resend
    // --------------------------------------------------

    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.error(
        "RESEND_API_KEY is not configured. Enquiry was saved, but emails were not sent."
      );
    } else {
      const resend = new Resend(resendApiKey);

      try {
        // --------------------------------------------------
        // Email 1: Internal ACE notification
        // --------------------------------------------------

        await resend.emails.send({
          from: "ACE Global Group <hello@aceglobalgroup.africa>",
          to: ["info.aceglobalgroup@gmail.com"],
          replyTo: normalizedEmail,
          subject: `New Service Enquiry — ${savedEnquiry.reference}`,
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">
              <h2 style="margin-bottom: 8px;">New ACE Global Group Enquiry</h2>

              <p>A new service enquiry has been submitted through the ACE Global Group website.</p>

              <hr style="border: 0; border-top: 1px solid #ddd; margin: 20px 0;" />

              <h3>Customer Information</h3>

              <p><strong>Reference:</strong> ${savedEnquiry.reference}</p>
              <p><strong>Full Name:</strong> ${fullName}</p>
              <p><strong>Company:</strong> ${companyName || "Not provided"}</p>
              <p><strong>Email:</strong> ${normalizedEmail}</p>
              <p><strong>Phone:</strong> ${phone}</p>

              <h3>Service Details</h3>

              <p><strong>Service:</strong> ${service}</p>
              <p><strong>Pickup Location:</strong> ${pickupLocation || "Not provided"}</p>
              <p><strong>Delivery Location:</strong> ${deliveryLocation || "Not provided"}</p>
              <p><strong>Cargo / Product:</strong> ${cargoProduct || "Not provided"}</p>
              <p><strong>Quantity:</strong> ${quantity || "Not provided"}</p>
              <p><strong>Preferred Date:</strong> ${preferredDate || "Not provided"}</p>

              <h3>Additional Requirements</h3>

              <p>${requirements || "No additional requirements provided."}</p>

              <hr style="border: 0; border-top: 1px solid #ddd; margin: 20px 0;" />

              <p><strong>Status:</strong> New</p>

              <p style="color: #666; font-size: 13px;">
                This notification was generated automatically by the ACE Global Group website.
              </p>
            </div>
          `,
        });

        // --------------------------------------------------
        // Email 2: Customer confirmation
        // --------------------------------------------------

        await resend.emails.send({
          from: "ACE Global Group <hello@aceglobalgroup.africa>",
          to: [normalizedEmail],
          replyTo: "info.aceglobalgroup@gmail.com",
          subject: `Enquiry Received — ${savedEnquiry.reference}`,
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">
              <h2 style="margin-bottom: 8px;">Thank You for Contacting ACE Global Group</h2>

              <p>Dear ${fullName},</p>

              <p>
                Thank you for submitting your service enquiry to ACE Global Group.
                We have received your request and our team will review it shortly.
              </p>

              <div style="
                background: #f5f7f4;
                border-radius: 8px;
                padding: 18px;
                margin: 20px 0;
              ">
                <p style="margin: 0;">
                  <strong>Your Enquiry Reference:</strong><br />
                  <span style="font-size: 20px;">${savedEnquiry.reference}</span>
                </p>
              </div>

              <p>
                Please keep this reference number for your records.
              </p>

              <p>
                If you need to provide additional information, simply reply to this email.
              </p>

              <p>
                Best regards,<br />
                <strong>ACE Global Group</strong>
              </p>

              <p style="color: #666; font-size: 13px;">
                Building with purpose. Scaling with systems. Leading with integrity.
              </p>
            </div>
          `,
        });

        console.log(
          "ACE ENQUIRY EMAILS SENT:",
          savedEnquiry.reference
        );
      } catch (emailError) {
        // The enquiry has already been successfully saved.
        // Email failure should not make the customer's enquiry fail.

        console.error(
          "Resend email delivery failed:",
          emailError
        );
      }
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