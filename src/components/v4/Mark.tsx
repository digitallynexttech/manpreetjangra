// The highlighter mark (plan/versions-spec.md, V4 palette): marigold drawn
// behind a few phrases, `linear-gradient(transparent 60%, marigold 60%)`,
// swept in as the phrase enters the viewport (v4.css, scroll-driven) or,
// on the cover, once after load. `text` is split once on `phrase`; the
// phrase must be part of the text, or the build fails.
export function Marked({ text, phrase, load = false }: { text: string; phrase?: string; load?: boolean }) {
  if (!phrase) return text;
  const at = text.indexOf(phrase);
  if (at < 0) throw new Error(`Marked phrase "${phrase}" is not part of "${text}"`);
  return (
    <>
      {text.slice(0, at)}
      <mark className={load ? "v4-mark v4-mark--load" : "v4-mark"}>{phrase}</mark>
      {text.slice(at + phrase.length)}
    </>
  );
}
