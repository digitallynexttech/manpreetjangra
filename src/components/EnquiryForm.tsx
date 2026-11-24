"use client";

import { Copy } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type InvalidEvent } from "react";
import type { form as formCopy } from "@/content/contact";
import { Button, LinkIcon } from "./Button";

// The contact form (spec 4.6.2), ported from the sibling site
// (E:\deepkgoel\app\components\EnquiryForm.tsx) with the email channel only:
// no phone field and no WhatsApp. Nothing is sent from the site. "Prepare
// email" checks the fields, builds the email and shows it below the form;
// "Open email draft" hands it to the visitor's own email app.
//
// The page (a server component) passes every string and the final address
// of each enquiry type as props, so this file imports no content values
// (spec 7.5; the import above is a type only).

type EnquiryType = { key: string; label: string; recipient: string };
type Draft = { recipient: string; body: string; href: string };

/** The visible "*" after a required field's label; the field itself is
 *  `required`, which screen readers announce. */
function Required() {
  return <span aria-hidden="true"> *</span>;
}

export function EnquiryForm({
  types,
  copy,
  headingId,
}: {
  types: readonly EnquiryType[];
  copy: typeof formCopy;
  /** The id of the form's H2; the page's section is labelled by it. */
  headingId: string;
}) {
  const [draft, setDraft] = useState<Draft | null>(null);
  const [copyStatus, setCopyStatus] = useState("");
  const result = useRef<HTMLDivElement>(null);
  const select = useRef<HTMLSelectElement>(null);
  const { fields } = copy;

  // "/contact?type=speaking" chooses "Speaking, panels or events". Read from
  // the address after the page has loaded, never with useSearchParams (that
  // would take the page out of static prerendering); no state changes.
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("type");
    if (t && types.some((x) => x.key === t) && select.current) select.current.value = t;
  }, [types]);

  // An empty required text field says "Please fill in this field." in the
  // site's own words instead of the browser's.
  function flagEmpty(event: InvalidEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const field = event.currentTarget;
    if (field.validity.valueMissing) field.setCustomValidity(copy.requiredMessage);
  }

  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    // A field holding only spaces passes `required`, so check it here too.
    for (const name of ["name", "email", "message"]) {
      const field = form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement;
      field.setCustomValidity(field.value.trim() ? "" : copy.requiredMessage);
    }
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const value = (name: string) => String(data.get(name) || "").trim();
    const type = types.find((x) => x.key === value("type"));
    if (!type) return;
    // The draft prints the type's label, never its key; the empty
    // Organisation line is dropped, the two blank lines are kept.
    const body = [
      copy.draft.greeting,
      "",
      value("message"),
      "",
      `${copy.draft.about} ${type.label}`,
      `${copy.draft.name} ${value("name")}`,
      `${copy.draft.email} ${value("email")}`,
      value("organisation") ? `${copy.draft.organisation} ${value("organisation")}` : "",
    ]
      .filter((line, index) => line || index === 1 || index === 3)
      .join("\n");
    const subject = `${copy.draft.subjectPrefix} ${type.label} - ${value("name")}`;
    setDraft({
      recipient: type.recipient,
      body,
      href: `mailto:${type.recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    });
    setCopyStatus("");
    requestAnimationFrame(() => result.current?.focus());
  }

  async function copyDraft() {
    if (!draft) return;
    // Cleared first, so a second copy is announced again.
    setCopyStatus("");
    try {
      await navigator.clipboard.writeText(draft.body);
      setCopyStatus(copy.draft.copied);
    } catch {
      setCopyStatus(copy.draft.copyFailed);
    }
  }

  const [goesTo, afterRecipient] = copy.draft.text.split("{recipient}");

  return (
    <form
      className="site-enquiry"
      aria-labelledby={headingId}
      data-reveal
      onSubmit={prepare}
      onInput={(event) => {
        // Editing any field clears its message and any draft on show, so a
        // draft never disagrees with the form.
        const target = event.target as HTMLInputElement;
        target.setCustomValidity?.("");
        setDraft(null);
      }}
    >
      <h2 id={headingId} className="site-section-title site-enquiry-title">
        {copy.title}
      </h2>
      <div className="site-form-row">
        <div className="site-field">
          <label htmlFor="enquiry-name">
            {fields.name.label}
            <Required />
          </label>
          <input
            id="enquiry-name"
            name="name"
            autoComplete="name"
            placeholder={fields.name.placeholder}
            maxLength={fields.name.maxLength}
            required
            onInvalid={flagEmpty}
          />
        </div>
        <div className="site-field">
          <label htmlFor="enquiry-email">
            {fields.email.label}
            <Required />
          </label>
          <input
            id="enquiry-email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder={fields.email.placeholder}
            maxLength={fields.email.maxLength}
            required
            onInvalid={flagEmpty}
          />
        </div>
      </div>
      <div className="site-form-row">
        <div className="site-field">
          <label htmlFor="enquiry-organisation">{fields.organisation.label}</label>
          <input
            id="enquiry-organisation"
            name="organisation"
            autoComplete="organization"
            placeholder={fields.organisation.placeholder}
            maxLength={fields.organisation.maxLength}
          />
        </div>
        <div className="site-field">
          <label htmlFor="enquiry-type">
            {fields.type.label}
            <Required />
          </label>
          <select id="enquiry-type" name="type" ref={select} defaultValue="" required>
            <option value="" disabled>
              {fields.type.placeholder}
            </option>
            {types.map((type) => (
              <option key={type.key} value={type.key}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="site-field">
        <label htmlFor="enquiry-message">
          {fields.message.label}
          <Required />
        </label>
        <textarea
          id="enquiry-message"
          name="message"
          placeholder={fields.message.placeholder}
          maxLength={fields.message.maxLength}
          rows={fields.message.rows}
          required
          onInvalid={flagEmpty}
        />
      </div>
      <p className="site-form-note">{copy.note}</p>
      <div className="site-form-actions">
        <button className="site-button" type="submit">
          {copy.submit}
          <LinkIcon name="arrow-right" />
        </button>
      </div>
      {draft ? (
        <div className="site-draft" ref={result} tabIndex={-1} aria-labelledby="enquiry-draft-title">
          <h3 id="enquiry-draft-title" className="site-draft-title">
            {copy.draft.title}
          </h3>
          <p>
            {goesTo}
            <span className="site-draft-recipient">{draft.recipient}</span>
            {afterRecipient}
          </p>
          <pre>{draft.body}</pre>
          <div className="site-form-actions">
            <Button href={draft.href}>{copy.draft.open}</Button>
            <button className="site-text-link" type="button" onClick={copyDraft}>
              {copy.draft.copy}
              <Copy className="site-arrow" size={18} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
          <p className="site-status" role="status">
            {copyStatus}
          </p>
        </div>
      ) : null}
    </form>
  );
}
