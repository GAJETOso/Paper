"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { categories } from "@/data/products";

/**
 * Quotation/contact form. Client-side validation; posts to /api/contact
 * (wire to CRM service in production). Pre-fills from ?product= and ?topic=.
 */
export function ContactForm() {
  const params = useSearchParams();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div
        className="card !border-forest-200 !bg-forest-50 text-center dark:!border-forest-900 dark:!bg-forest-950"
        role="status"
      >
        <p className="text-3xl" aria-hidden>
          ✅
        </p>
        <h3 className="mt-2 font-semibold text-forest-800 dark:text-forest-200">
          Request received
        </h3>
        <p className="prose-muted mt-2 text-sm">
          Reference emailed to you. Standard quotations are issued within one business hour.
        </p>
      </div>
    );
  }

  const field =
    "mt-1 w-full rounded-lg border border-paper-200 bg-transparent px-3 py-2.5 text-sm outline-none transition-colors focus:border-forest-500 dark:border-ink-700";

  return (
    <form onSubmit={onSubmit} className="card space-y-4" aria-label="Quotation request form">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm">
          <span className="text-ink-500">Full name *</span>
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="text-sm">
          <span className="text-ink-500">Company</span>
          <input name="company" autoComplete="organization" className={field} />
        </label>
        <label className="text-sm">
          <span className="text-ink-500">Email *</span>
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
        <label className="text-sm">
          <span className="text-ink-500">Phone / WhatsApp</span>
          <input name="phone" type="tel" autoComplete="tel" className={field} />
        </label>
      </div>
      <label className="block text-sm">
        <span className="text-ink-500">Topic</span>
        <select
          name="topic"
          defaultValue={params.get("topic") ?? "quotation"}
          className={`${field} dark:bg-ink-900`}
        >
          <option value="quotation">Product quotation</option>
          <option value="distributor">Become a distributor</option>
          <option value="supplier">Supplier registration</option>
          <option value="custom">Custom product development</option>
          <option value="support">Customer support</option>
          <option value="press">Press & media</option>
          <option value="investor">Investor relations</option>
        </select>
      </label>
      <label className="block text-sm">
        <span className="text-ink-500">Product category</span>
        <select name="category" className={`${field} dark:bg-ink-900`}>
          <option value="">— Select if relevant —</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm">
        <span className="text-ink-500">Message *</span>
        <textarea
          name="message"
          required
          rows={5}
          defaultValue={
            params.get("product")
              ? `Quotation request: ${params.get("product")}\n\nQuantity:\nDestination:\n`
              : ""
          }
          className={field}
        />
      </label>
      <label className="flex items-start gap-2 text-xs text-ink-500">
        <input type="checkbox" name="consent" required className="mt-0.5" />
        <span>
          I agree to the processing of this data to answer my request (GDPR/NDPR). We never sell
          your data and you can request deletion anytime.
        </span>
      </label>
      {status === "error" && (
        <p className="text-sm text-red-600" role="alert">
          Something went wrong — please retry or email hello@sylvara.com.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary w-full disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send request"}
      </button>
    </form>
  );
}
