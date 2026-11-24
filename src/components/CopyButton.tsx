"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

// Copies a text (the bio for organisers, spec 4.2.6) to the clipboard and says
// so in a status line that screen readers announce. If the browser refuses,
// the status asks the visitor to select the text instead. The text arrives as
// a prop from the server page, so no content module is imported here
// (spec 7.5).
export function CopyButton({
  text,
  label,
  doneLabel,
  failLabel,
}: {
  text: string;
  label: string;
  doneLabel: string;
  failLabel: string;
}) {
  const [state, setState] = useState<"idle" | "done" | "failed">("idle");

  async function copy() {
    // Clear first, so a second copy is announced again.
    setState("idle");
    try {
      await navigator.clipboard.writeText(text);
      setState("done");
    } catch {
      setState("failed");
    }
  }

  const Icon = state === "done" ? Check : Copy;
  return (
    <div className="site-copy">
      <button type="button" className="site-button site-button--outline site-copy-button" onClick={copy}>
        {label}
        <Icon className="site-arrow" size={20} strokeWidth={1.5} aria-hidden="true" />
      </button>
      <p className="site-status site-copy-status" role="status">
        {state === "done" ? doneLabel : state === "failed" ? failLabel : ""}
      </p>
    </div>
  );
}
