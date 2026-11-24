// Accent: a heading with its one italic phrase (spec 0.2, 6.4). `text` is
// split once on `accent`, and the phrase is wrapped in <em>. The phrase is
// ink everywhere and vermilion-ink only in the hero statement (CSS).
export function Accent({ text, accent }: { text: string; accent?: string }) {
  if (!accent) return text;
  const at = text.indexOf(accent);
  // A phrase that is not in its heading is a content error: fail the build
  // instead of quietly dropping the italic.
  if (at < 0) throw new Error(`Accent "${accent}" is not part of "${text}"`);
  return (
    <>
      {text.slice(0, at)}
      <em className="site-accent">{accent}</em>
      {text.slice(at + accent.length)}
    </>
  );
}
