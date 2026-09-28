import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const orderReference = String(
      formData.get("orderReference") || ""
    ).trim();

    if (!orderReference) {
      return NextResponse.json(
        {
          error: "Order reference is required.",
        },
        { status: 400 }
      );
    }

    const baseUrl = new URL(request.url).origin;

    const response = await fetch(
      `${baseUrl}/api/paystack/initialize`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderReference,
        }),
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (
      !response.ok ||
      !data.status ||
      !data.data?.authorization_url
    ) {
      console.error(
        "Order payment initialization failed:",
        data
      );

      return NextResponse.json(
        {
          error:
            data.message ||
            "Unable to initialize payment.",
        },
        {
          status: response.status || 500,
        }
      );
    }

    return NextResponse.redirect(
      data.data.authorization_url
    );
  } catch (error) {
    console.error(
      "Order payment redirect error:",
      error
    );

    return NextResponse.json(
      {
        error: "Unable to start the payment.",
      },
      { status: 500 }
    );
  }
}