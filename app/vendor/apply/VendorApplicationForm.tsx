"use client";

import { useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileText,
  Loader2,
  ShieldCheck,
  Upload,
} from "lucide-react";

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

type Application = {
  id: string;
  vendor_id: string;
  application_reference: string;
  status: string;
  submitted_at: string | null;
  decision_notes: string | null;
  country_code: string | null;
  verification_route: string | null;
};

type Props = {
  initialRole: "customer" | "vendor";
  initialApplication: Application | null;
  countries: CountryRequirement[];
  userEmail: string;
};

type FormState = {
  businessName: string;
  ownerFullName: string;
  businessType: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  route: "business_registration" | "address_utility";
  registrationNumber: string;
};

const inputClass =
  "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100";

const emptyForm = (email: string): FormState => ({
  businessName: "",
  ownerFullName: "",
  businessType: "",
  phone: "",
  email,
  address: "",
  city: "",
  state: "",
  country: "",
  route: "address_utility",
  registrationNumber: "",
});

export default function VendorApplicationForm({
  initialRole,
  initialApplication,
  countries,
  userEmail,
}: Props) {
  const supabase = useMemo(() => createClient(), []);
  const [role, setRole] = useState(initialRole);
  const [application, setApplication] = useState(initialApplication);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(emptyForm(userEmail));
  const [identityFile, setIdentityFile] = useState<File | null>(null);
  const [registrationFile, setRegistrationFile] = useState<File | null>(null);
  const [addressFile, setAddressFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const selectedCountry = countries.find(
    (country) => country.country_code === form.country
  );

  const requiresRegistration =
    form.route === "business_registration" &&
    Boolean(selectedCountry?.formal_registration_supported);

  const requiresAddress = form.route === "address_utility";

  const update = (key: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setError("");
  };

  const requestVendorRole = async () => {
    setBusy(true);
    setError("");

    const { data: currentRole } = await supabase
      .from("user_roles")
      .select("role")
      .single();

    if (currentRole?.role !== "customer") {
      setError("Your account is not currently eligible for vendor onboarding.");
      setBusy(false);
      return;
    }

    const { error: roleError } = await supabase
      .from("user_roles")
      .update({ role: "vendor" })
      .eq("user_id", (await supabase.auth.getClaims()).data?.claims?.sub ?? "");

    if (roleError) {
      setError(roleError.message);
      setBusy(false);
      return;
    }

    setRole("vendor");
    setMessage("Vendor onboarding has been enabled for your account.");
    setBusy(false);
  };

  const validateStep = () => {
    if (step === 0) {
      if (!form.businessName || !form.ownerFullName || !form.businessType) {
        setError("Please complete all business information fields.");
        return false;
      }
    }

    if (step === 1) {
      if (
        !form.address ||
        !form.city ||
        !form.state ||
        !form.country ||
        !selectedCountry
      ) {
        setError("Please complete your physical business address and country.");
        return false;
      }

      if (
        selectedCountry.formal_registration_required &&
        form.route !== "business_registration"
      ) {
        setError("This country requires formal business registration.");
        return false;
      }
    }

    if (step === 2) {
      if (
        form.route === "business_registration" &&
        !form.registrationNumber
      ) {
        setError(
          selectedCountry?.registration_number_label ||
            "Please enter your business registration number."
        );
        return false;
      }
    }

    if (step === 3) {
      if (!identityFile) {
        setError("Please upload an identity document.");
        return false;
      }
      if (requiresRegistration && !registrationFile) {
        setError("Please upload your business registration certificate.");
        return false;
      }
      if (requiresAddress && !addressFile) {
        setError("Please upload a recent address or utility document.");
        return false;
      }
    }

    setError("");
    return true;
  };

  const next = () => {
    if (validateStep()) {
      setStep((current) => Math.min(current + 1, 4));
    }
  };

  const uploadDocument = async (
    vendorId: string,
    userId: string,
    file: File,
    documentType: string
  ) => {
    const extension = file.name.split(".").pop()?.toLowerCase() || "bin";
    // Storage RLS scopes vendor files to the authenticated user folder.
    // The database vendor_id remains the ownership reference for the document row.
    const path = `${userId}/${documentType}-${crypto.randomUUID()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("vendor-documents")
      .upload(path, file, {
        contentType: file.type || "application/octet-stream",
        upsert: false,
      });

    if (uploadError) {
      throw new Error(`Could not upload ${documentType}: ${uploadError.message}`);
    }

    const { error: documentError } = await supabase
      .from("vendor_documents")
      .insert({
        vendor_id: vendorId,
        document_type: documentType,
        file_path: path,
        original_file_name: file.name,
        status: "pending",
      });

    if (documentError) {
      await supabase.storage.from("vendor-documents").remove([path]);
      throw new Error(
        `Could not save ${documentType}: ${documentError.message}`
      );
    }
  };

  const submit = async () => {
    if (!validateStep()) return;

    setBusy(true);
    setError("");
    setMessage("");

    try {
      const { data: claimsData } = await supabase.auth.getClaims();
      const userId = claimsData?.claims?.sub;

      if (!userId) {
        throw new Error("Your session has expired. Please sign in again.");
      }

      let createdApplication = application;

      if (!createdApplication) {
        const { data: applicationData, error: onboardingError } =
          await supabase.rpc("start_vendor_onboarding", {
            p_business_name: form.businessName,
            p_owner_full_name: form.ownerFullName,
            p_business_type: form.businessType,
            p_phone: form.phone,
            p_email: form.email,
            p_business_address: form.address,
            p_city: form.city,
            p_state: form.state,
            p_country: form.country,
            p_verification_route: form.route,
            p_business_registration_authority:
              selectedCountry?.business_registration_authority ?? null,
            p_business_registration_number:
              form.route === "business_registration"
                ? form.registrationNumber
                : null,
            p_business_registration_status:
              form.route === "business_registration"
                ? "registered"
                : "not_registered",
          });

        if (onboardingError || !applicationData) {
          throw new Error(
            onboardingError?.message || "Could not start your vendor application."
          );
        }

        createdApplication = Array.isArray(applicationData)
          ? applicationData[0]
          : applicationData;
      }

      if (!createdApplication?.vendor_id || !createdApplication?.id) {
        throw new Error("Vendor application is missing its identifier.");
      }

      if (identityFile) {
        await uploadDocument(
          createdApplication.vendor_id,
          userId,
          identityFile,
          "identity_document"
        );
      }

      if (registrationFile && requiresRegistration) {
        await uploadDocument(
          createdApplication.vendor_id,
          userId,
          registrationFile,
          "business_registration_certificate"
        );
      }

      if (addressFile && requiresAddress) {
        await uploadDocument(
          createdApplication.vendor_id,
          userId,
          addressFile,
          "utility_bill"
        );
      }

      const { data: submittedApplication, error: submitError } = await supabase
        .from("vendor_applications")
        .update({ status: "submitted" })
        .eq("id", createdApplication.id)
        .select(
          "id, vendor_id, application_reference, status, submitted_at, decision_notes, country_code, verification_route"
        )
        .single();

      if (submitError || !submittedApplication) {
        throw new Error(
          submitError?.message || "Documents uploaded, but submission failed."
        );
      }

      const { error: requestError } = await supabase
        .from("vendor_verification_requests")
        .insert({
          vendor_id: createdApplication.vendor_id,
          verification_route: form.route,
          status: "submitted",
          submitted_at: submittedApplication.submitted_at,
        });

      if (requestError) {
        throw new Error(
          `Application submitted, but the verification request could not be created: ${requestError.message}`
        );
      }

      setApplication(submittedApplication);
      setMessage("Your vendor application has been submitted to ACE Global Group.");
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Something went wrong while submitting your application."
      );
    } finally {
      setBusy(false);
    }
  };

  if (application && application.status !== "draft") {
    const statusLabel =
      application.status === "submitted"
        ? "Submitted — awaiting ACE review"
        : application.status === "under_review"
          ? "Under review"
          : application.status === "approved"
            ? "Approved"
            : application.status === "rejected"
              ? "Action required"
              : application.status;

    return (
      <main className="min-h-screen bg-slate-50 px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
              <CheckCircle2 size={30} />
            </div>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              ACE Vendor Network
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
              Vendor application
            </h1>
            <p className="mt-3 text-slate-600">
              Reference: <span className="font-semibold">{application.application_reference}</span>
            </p>

            <div className="mt-8 rounded-2xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Current status</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">{statusLabel}</p>
              {application.decision_notes && (
                <p className="mt-3 text-sm text-slate-600">{application.decision_notes}</p>
              )}
            </div>

            <p className="mt-6 text-sm leading-6 text-slate-600">
              ACE will review your business information and verification documents.
              Vendors are not eligible to fulfil ACE customer orders until verification
              is completed.
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (role === "customer") {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <ShieldCheck className="text-emerald-700" size={38} />
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              ACE Vendor Network
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-950">
              Apply to become an ACE supplier
            </h1>
            <p className="mt-4 leading-7 text-slate-600">
              ACE works with farmers, producers, processors, distributors and other
              businesses across Africa. We verify every supplier before they can fulfil
              ACE customer orders.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ["1", "Business details"],
                ["2", "Verification"],
                ["3", "ACE review"],
              ].map(([number, title]) => (
                <div key={number} className="rounded-2xl bg-slate-50 p-4">
                  <div className="font-semibold text-emerald-700">{number}</div>
                  <div className="mt-1 text-sm font-medium text-slate-900">{title}</div>
                </div>
              ))}
            </div>

            {error && (
              <div className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            {message && (
              <div className="mt-6 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800">
                {message}
              </div>
            )}

            <button
              type="button"
              onClick={requestVendorRole}
              disabled={busy}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {busy && <Loader2 className="animate-spin" size={17} />}
              Start vendor application
            </button>
          </div>
        </div>
      </main>
    );
  }

  const steps = ["Business", "Location", "Verification", "Documents", "Review"];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
            ACE Global Group
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
            Vendor application
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Tell us about your business. Your information and documents are kept within
            the ACE verification workflow and are not exposed to customers.
          </p>
        </div>

        <div className="mb-6 grid grid-cols-5 gap-2">
          {steps.map((title, index) => (
            <div key={title}>
              <div
                className={`h-1.5 rounded-full ${
                  index <= step ? "bg-emerald-700" : "bg-slate-200"
                }`}
              />
              <p
                className={`mt-2 hidden text-xs font-medium sm:block ${
                  index === step ? "text-slate-950" : "text-slate-400"
                }`}
              >
                {title}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          {error && (
            <div className="mb-6 rounded-xl bg-red-50 p-4 text-sm leading-6 text-red-700">
              {error}
            </div>
          )}

          {message && (
            <div className="mb-6 rounded-xl bg-emerald-50 p-4 text-sm leading-6 text-emerald-800">
              {message}
            </div>
          )}

          {step === 0 && (
            <section>
              <h2 className="text-xl font-semibold text-slate-950">Business information</h2>
              <p className="mt-1 text-sm text-slate-500">
                Start with the basic details ACE will use to identify your business.
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-medium text-slate-700">
                  Business name
                  <input
                    className={inputClass}
                    value={form.businessName}
                    onChange={(e) => update("businessName", e.target.value)}
                    placeholder="Your registered or trading name"
                  />
                </label>

                <label className="text-sm font-medium text-slate-700">
                  Owner / responsible person
                  <input
                    className={inputClass}
                    value={form.ownerFullName}
                    onChange={(e) => update("ownerFullName", e.target.value)}
                    placeholder="Full name"
                  />
                </label>

                <label className="text-sm font-medium text-slate-700">
                  Business type
                  <select
                    className={inputClass}
                    value={form.businessType}
                    onChange={(e) => update("businessType", e.target.value)}
                  >
                    <option value="">Select one</option>
                    <option value="farmer">Farmer / farm</option>
                    <option value="producer">Producer</option>
                    <option value="processor">Processor</option>
                    <option value="distributor">Distributor</option>
                    <option value="manufacturer">Manufacturer</option>
                    <option value="logistics">Logistics provider</option>
                    <option value="trader">Trader / market vendor</option>
                    <option value="other">Other</option>
                  </select>
                </label>

                <label className="text-sm font-medium text-slate-700">
                  Phone
                  <input
                    className={inputClass}
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="+234..."
                  />
                </label>

                <label className="text-sm font-medium text-slate-700 sm:col-span-2">
                  Business email
                  <input
                    className={inputClass}
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="business@example.com"
                  />
                </label>
              </div>
            </section>
          )}

          {step === 1 && (
            <section>
              <h2 className="text-xl font-semibold text-slate-950">Location</h2>
              <p className="mt-1 text-sm text-slate-500">
                ACE needs a real physical address for supplier verification.
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-medium text-slate-700 sm:col-span-2">
                  Physical business / operating address
                  <textarea
                    className={`${inputClass} min-h-28`}
                    value={form.address}
                    onChange={(e) => update("address", e.target.value)}
                    placeholder="Street, building, farm, workshop or operating location"
                  />
                </label>

                <label className="text-sm font-medium text-slate-700">
                  City
                  <input
                    className={inputClass}
                    value={form.city}
                    onChange={(e) => update("city", e.target.value)}
                  />
                </label>

                <label className="text-sm font-medium text-slate-700">
                  State / Province
                  <input
                    className={inputClass}
                    value={form.state}
                    onChange={(e) => update("state", e.target.value)}
                  />
                </label>

                <label className="text-sm font-medium text-slate-700 sm:col-span-2">
                  Country
                  <select
                    className={inputClass}
                    value={form.country}
                    onChange={(e) => {
                      const country = countries.find(
                        (item) => item.country_code === e.target.value
                      );
                      update("country", e.target.value);
                      if (country?.formal_registration_required) {
                        setForm((current) => ({
                          ...current,
                          country: e.target.value,
                          route: "business_registration",
                        }));
                      }
                    }}
                  >
                    <option value="">Select your country</option>
                    {countries.map((country) => (
                      <option key={country.country_code} value={country.country_code}>
                        {country.country_name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </section>
          )}

          {step === 2 && (
            <section>
              <h2 className="text-xl font-semibold text-slate-950">Verification route</h2>
              <p className="mt-1 text-sm text-slate-500">
                Choose the verification route that matches your business.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {selectedCountry?.formal_registration_supported && (
                  <button
                    type="button"
                    onClick={() => update("route", "business_registration")}
                    className={`rounded-2xl border p-5 text-left transition ${
                      form.route === "business_registration"
                        ? "border-emerald-600 bg-emerald-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <FileText className="text-emerald-700" size={25} />
                    <p className="mt-4 font-semibold text-slate-950">
                      Formal business registration
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {selectedCountry.business_registration_authority} registration
                      and certificate.
                    </p>
                  </button>
                )}

                {selectedCountry?.alternative_verification_allowed && (
                  <button
                    type="button"
                    onClick={() => update("route", "address_utility")}
                    className={`rounded-2xl border p-5 text-left transition ${
                      form.route === "address_utility"
                        ? "border-emerald-600 bg-emerald-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <ShieldCheck className="text-emerald-700" size={25} />
                    <p className="mt-4 font-semibold text-slate-950">
                      Address-based verification
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Physical address, recent utility/address proof and identity
                      verification.
                    </p>
                  </button>
                )}
              </div>

              {form.route === "business_registration" && (
                <label className="mt-6 block text-sm font-medium text-slate-700">
                  {selectedCountry?.registration_number_label || "Business registration number"}
                  <input
                    className={inputClass}
                    value={form.registrationNumber}
                    onChange={(e) => update("registrationNumber", e.target.value)}
                    placeholder="Enter registration number"
                  />
                </label>
              )}

              {selectedCountry?.notes && (
                <div className="mt-6 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                  {selectedCountry.notes}
                </div>
              )}
            </section>
          )}

          {step === 3 && (
            <section>
              <h2 className="text-xl font-semibold text-slate-950">Verification documents</h2>
              <p className="mt-1 text-sm text-slate-500">
                Upload clear PDF, JPG or PNG files. ACE will review them before approval.
              </p>

              <div className="mt-6 space-y-5">
                <FileField
                  label="Identity document"
                  hint="Government-issued ID for the owner or responsible person."
                  file={identityFile}
                  onChange={setIdentityFile}
                />

                {requiresRegistration && (
                  <FileField
                    label="Business registration certificate"
                    hint={`Certificate issued by ${selectedCountry?.business_registration_authority || "the relevant authority"}.`}
                    file={registrationFile}
                    onChange={setRegistrationFile}
                  />
                )}

                {requiresAddress && (
                  <FileField
                    label="Address / utility proof"
                    hint={`Recent document supporting the physical address, normally within ${selectedCountry?.address_proof_max_age_months || 6} months.`}
                    file={addressFile}
                    onChange={setAddressFile}
                  />
                )}
              </div>
            </section>
          )}

          {step === 4 && (
            <section>
              <h2 className="text-xl font-semibold text-slate-950">Review & submit</h2>
              <p className="mt-1 text-sm text-slate-500">
                Check your information before sending it to ACE.
              </p>

              <div className="mt-6 grid gap-3 rounded-2xl bg-slate-50 p-5 text-sm">
                <Summary label="Business" value={form.businessName} />
                <Summary label="Responsible person" value={form.ownerFullName} />
                <Summary label="Business type" value={form.businessType} />
                <Summary label="Email" value={form.email} />
                <Summary
                  label="Location"
                  value={`${form.city}, ${form.state}, ${selectedCountry?.country_name || form.country}`}
                />
                <Summary
                  label="Verification"
                  value={
                    form.route === "business_registration"
                      ? `Formal registration — ${form.registrationNumber}`
                      : "Address-based verification"
                  }
                />
              </div>

              <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-5 text-sm leading-6 text-emerald-900">
                By submitting, you confirm that the information and documents supplied
                are accurate and that ACE may verify them. Vendor approval is required
                before your business can fulfil ACE customer orders.
              </div>
            </section>
          )}

          <div className="mt-8 flex items-center justify-between gap-4 border-t border-slate-100 pt-6">
            <button
              type="button"
              onClick={() => setStep((current) => Math.max(current - 1, 0))}
              disabled={step === 0 || busy}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:invisible"
            >
              <ArrowLeft size={17} />
              Back
            </button>

            {step < 4 ? (
              <button
                type="button"
                onClick={next}
                disabled={busy}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:opacity-60"
              >
                Continue
                <ArrowRight size={17} />
              </button>
            ) : (
              <button
                type="button"
                onClick={submit}
                disabled={busy}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:opacity-60"
              >
                {busy ? <Loader2 className="animate-spin" size={17} /> : <CheckCircle2 size={17} />}
                Submit application
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function FileField({
  label,
  hint,
  file,
  onChange,
}: {
  label: string;
  hint: string;
  file: File | null;
  onChange: (file: File | null) => void;
}) {
  return (
    <label className="block cursor-pointer rounded-2xl border border-dashed border-slate-300 p-5 transition hover:border-emerald-500 hover:bg-emerald-50/40">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
          <Upload size={20} />
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-slate-900">{label}</p>
          <p className="mt-1 text-sm leading-6 text-slate-500">{hint}</p>
          {file && (
            <p className="mt-2 truncate text-sm font-medium text-emerald-700">
              {file.name}
            </p>
          )}
        </div>
      </div>
      <input
        type="file"
        className="sr-only"
        accept=".pdf,.png,.jpg,.jpeg"
        onChange={(event) => onChange(event.target.files?.[0] || null)}
      />
    </label>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-slate-200 pb-3 last:border-b-0 last:pb-0 sm:flex-row sm:justify-between">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-slate-900 sm:text-right">{value}</span>
    </div>
  );
}
