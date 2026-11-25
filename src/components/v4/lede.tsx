import type { ReactNode } from "react";
import { ParaText, isPara } from "@/components/ParaText";
import type { Para } from "@/content/types";

/** A section lede as the content files hold it (a string, or a `Para` with
 *  quoted fragments), as a React node. */
export function lede(value: string | Pick<Para, "parts"> | undefined): ReactNode {
  if (value === undefined) return null;
  return isPara(value) ? <ParaText para={value} /> : value;
}
