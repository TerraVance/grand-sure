"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Field, SelectInput, TextArea, TextInput } from "@/components/ui/Input";
import { useQuote } from "@/features/quote/QuoteProvider";
import { quoteWhatsAppText, whatsAppHref } from "@/lib/contact";
import { quoteFieldErrors, quoteSchema } from "@/lib/quote-schema";
import type { Product } from "@/types/content";
import type { QuoteResponse } from "@/types/quote";

type Errors = Record<string, string | undefined>;

const empty = {
  name: "",
  phone: "",
  email: "",
  city: "",
  monthlyBill: "",
  productId: "",
  message: "",
  companyWebsite: "",
};

export function QuoteForm({ products, whatsapp }: { products: Product[]; whatsapp: string }) {
  const { draft } = useQuote();
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formError, setFormError] = useState("");
  const [appliedDraft, setAppliedDraft] = useState({ productId: "", monthlyBill: null as number | null });

  if (draft.productId !== appliedDraft.productId || draft.monthlyBill !== appliedDraft.monthlyBill) {
    setAppliedDraft({ productId: draft.productId, monthlyBill: draft.monthlyBill });
    setValues((current) => ({
      ...current,
      productId: draft.productId || current.productId,
      monthlyBill: draft.monthlyBill ? String(draft.monthlyBill) : current.monthlyBill,
    }));
  }

  const productName = useMemo(
    () => products.find((product) => product.id === values.productId)?.name,
    [products, values.productId],
  );

  function setField(key: keyof typeof empty, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    const payload = {
      ...values,
      monthlyBill: values.monthlyBill === "" ? undefined : Number(values.monthlyBill),
    };
    const parsed = quoteSchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors = quoteFieldErrors(parsed.error);
      setErrors({
        name: fieldErrors.name?.[0],
        phone: fieldErrors.phone?.[0],
        email: fieldErrors.email?.[0],
        city: fieldErrors.city?.[0],
        monthlyBill: fieldErrors.monthlyBill?.[0],
        message: fieldErrors.message?.[0],
      });
      setStatus("idle");
      return;
    }

    setErrors({});
    setStatus("submitting");
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const body = (await response.json()) as QuoteResponse;
      if (!response.ok || !body.ok) {
        if (body.fieldErrors) {
          setErrors({
            name: body.fieldErrors.name?.[0],
            phone: body.fieldErrors.phone?.[0],
            email: body.fieldErrors.email?.[0],
            city: body.fieldErrors.city?.[0],
            message: body.fieldErrors.message?.[0],
          });
        }
        setFormError(body.error ?? "We could not send your request. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setFormError("We could not send your request. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    const href = whatsAppHref(
      whatsapp,
      quoteWhatsAppText({
        name: values.name,
        city: values.city,
        productName,
        monthlyBill: values.monthlyBill ? Number(values.monthlyBill) : undefined,
        message: values.message,
      }),
    );
    return (
      <div className="rounded-card border border-line bg-white p-6 shadow-card" role="status">
        <h3 className="font-display text-3xl font-semibold text-black">{"We'll contact you"}</h3>
        <p className="mt-3 text-muted leading-7">
          Your note is with the Grand Sure team. If you would rather continue the conversation now, WhatsApp is open.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button href={href}>Continue on WhatsApp</Button>
          <Button variant="secondary" onClick={() => setStatus("idle")}>
            Send another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form className="grid gap-4 rounded-card border border-line bg-white p-6 shadow-card" onSubmit={onSubmit} noValidate>
      <Field id="quote-name" label="Name" error={errors.name}>
        <TextInput
          id="quote-name"
          name="name"
          autoComplete="name"
          value={values.name}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "quote-name-error" : undefined}
          onChange={(event) => setField("name", event.target.value)}
        />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="quote-phone" label="Phone" error={errors.phone}>
          <TextInput
            id="quote-phone"
            name="phone"
            autoComplete="tel"
            inputMode="tel"
            value={values.phone}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "quote-phone-error" : undefined}
            onChange={(event) => setField("phone", event.target.value)}
          />
        </Field>
        <Field id="quote-email" label="Email" error={errors.email}>
          <TextInput
            id="quote-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "quote-email-error" : undefined}
            onChange={(event) => setField("email", event.target.value)}
          />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="quote-city" label="City" error={errors.city}>
          <TextInput
            id="quote-city"
            name="city"
            autoComplete="address-level2"
            value={values.city}
            aria-invalid={Boolean(errors.city)}
            aria-describedby={errors.city ? "quote-city-error" : undefined}
            onChange={(event) => setField("city", event.target.value)}
          />
        </Field>
        <Field id="quote-bill" label="Monthly bill (optional)" error={errors.monthlyBill}>
          <TextInput
            id="quote-bill"
            name="monthlyBill"
            inputMode="numeric"
            value={values.monthlyBill}
            aria-invalid={Boolean(errors.monthlyBill)}
            aria-describedby={errors.monthlyBill ? "quote-bill-error" : undefined}
            onChange={(event) => setField("monthlyBill", event.target.value)}
          />
        </Field>
      </div>
      <Field id="quote-product" label="Product interest">
        <SelectInput
          id="quote-product"
          name="productId"
          value={values.productId}
          onChange={(event) => setField("productId", event.target.value)}
        >
          <option value="">Not sure yet</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </SelectInput>
      </Field>
      <Field id="quote-message" label="Message" error={errors.message}>
        <TextArea
          id="quote-message"
          name="message"
          value={values.message}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "quote-message-error" : undefined}
          onChange={(event) => setField("message", event.target.value)}
        />
      </Field>
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="companyWebsite">Company website</label>
        <input
          id="companyWebsite"
          name="companyWebsite"
          tabIndex={-1}
          autoComplete="off"
          value={values.companyWebsite}
          onChange={(event) => setField("companyWebsite", event.target.value)}
        />
      </div>
      {formError ? (
        <p className="text-sm text-rose-800" role="alert">
          {formError}
        </p>
      ) : null}
      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending" : "Request quote"}
      </Button>
    </form>
  );
}
