import type { HeadingPart } from "./MixedHeading";

/** Splits existing copy into the two voices without changing a letter:
 *  the phrases in `serif` (each must occur in `text`) are set in the serif
 *  voice, the rest in the bold sans. "Start a conversation." with
 *  ["conversation."] gives START A (sans) + CONVERSATION. (serif). */
export function mixParts(text: string, serif: readonly string[] = [], extra: Partial<HeadingPart> = {}): HeadingPart[] {
  const parts: HeadingPart[] = [];
  let rest = text;
  while (rest.length > 0) {
    let hit = -1;
    let phrase = "";
    for (const candidate of serif) {
      const at = candidate ? rest.indexOf(candidate) : -1;
      if (at >= 0 && (hit < 0 || at < hit)) {
        hit = at;
        phrase = candidate;
      }
    }
    if (hit < 0) {
      parts.push({ ...extra, text: rest.trim(), voice: "sans" });
      break;
    }
    const before = rest.slice(0, hit).trim();
    if (before) parts.push({ ...extra, text: before, voice: "sans" });
    parts.push({ ...extra, text: phrase.trim(), voice: "serif" });
    rest = rest.slice(hit + phrase.length);
  }
  return parts.filter((part) => part.text !== "");
}
