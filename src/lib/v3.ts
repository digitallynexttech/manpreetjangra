import type { Metadata } from "next";
import type { PageMeta } from "@/content/types";
import { footer } from "@/content/shared";
import { chapters } from "@/content/v3";
import sources from "@/content/sources.json";
import { pageMetadata } from "./site";
import { SEQUENCES, footageProviders, type SequenceName } from "./sequences";

// Server helpers for the /v3 edition (plan/versions-spec.md 3, V3). Server
// only: this file reads content data, so a client component never imports it.

/** Metadata for a /v3 page (spec 1): the classic page's title, description
 *  and sharing tags, a canonical link to the matching /v1 page (pageMetadata
 *  builds it from `meta.path`), and robots noindex, follow, since /v3 is
 *  another edition of the same content. */
export function v3Metadata(meta: PageMeta): Metadata {
  return { ...pageMetadata(meta), robots: { index: false, follow: true } };
}

/** The frame sequences /v3 plays (spec V3): the cold open, her words, the
 *  talent scene, and the inner pages' title scenes. */
export const V3_SEQUENCES: readonly SequenceName[] = ["vermilion-silk", "bronze-silk", "needle-thread"];

/** The footage behind each inner page's title scene; the chapter list shows
 *  a still of it. Every name is in `V3_SEQUENCES`. */
export const TITLE_FOOTAGE = {
  about: "bronze-silk",
  work: "needle-thread",
  writing: "vermilion-silk",
  careers: "needle-thread",
  contact: "bronze-silk",
} as const satisfies Record<string, SequenceName>;

/** The chapter number of a /v3 page ("02" for /v3/about), as the chapter
 *  list and the footer number it. */
export function chapterNumber(href: string): string {
  return chapters.find((chapter) => chapter.href === href)?.number ?? "";
}

/** "Mixkit, Pexels": the footer's footage credit, from the sequences used. */
export function footageCredit(): string {
  return footageProviders(V3_SEQUENCES.map((name) => SEQUENCES[name])).join(", ");
}

export type ClipCredit = { provider: string; title: string; href: string };

/** One credit per clip, read from sources.json ("sequences"), whose `source`
 *  reads `Mixkit, "Red wavy fabric texture" (40213), https://...`: the end
 *  credits list the clip's provider and title and link to its page. */
export function clipCredits(): ClipCredit[] {
  return V3_SEQUENCES.flatMap((name) => {
    const entry = sources.sequences.find((item) => item.folder === `public/sequences/${name}/`);
    const match = entry?.source.match(/^([^,]+), "([^"]+)" \(\d+\), (https:\/\/\S+)$/);
    return match ? [{ provider: match[1], title: match[2], href: match[3] }] : [];
  });
}

/** The footer's copyright line: the classic credit with the year filled in.
 *  Its last sentence is about the generated textures behind the classic
 *  headings; /v3 shows none of them, so that sentence is left out. */
export function copyrightLine(): string {
  const text = footer.credit.text.replace("{year}", String(new Date().getFullYear()));
  return text
    .split(/(?<=\.) /)
    .filter((sentence) => !sentence.includes("textures"))
    .join(" ");
}

/** Splits a quote into subtitle lines for the cinema-subtitle scenes: breaks
 *  after a comma, semicolon or full stop where it can, otherwise at the last
 *  space before `max` characters. Not a letter is changed; joining the lines
 *  with spaces gives the quote back. */
export function subtitleLines(text: string, max = 48): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > max && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
    // Close the line at punctuation once it is long enough to stand alone.
    if (/[,;.:?!]$/.test(line) && line.length >= max * 0.5) {
      lines.push(line);
      line = "";
    }
  }
  if (line) lines.push(line);
  // No orphan: a last line of a word or two joins the line before it.
  if (lines.length > 1 && lines[lines.length - 1].length < max * 0.3) {
    const last = lines.pop();
    lines[lines.length - 1] += ` ${last}`;
  }
  return lines;
}
