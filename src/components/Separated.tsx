// Text joined by middle dots ("A · B · C"), set so a dot only shows between
// two items on the same line and never starts or ends a line (eyebrows, the
// hero credential line, venture categories). Each item carries its own dot
// in the margin before it; the line that an item starts pulls that margin
// under a clip (globals.css, .site-seps). The dot is real text (" · " in a
// .site-seps-dot span inside each item after the first), so the page text,
// copy and paste, reader views, no-CSS readers and assistive tech all get the
// stored string exactly once, with its separators.
//
// A section number ("03 · AI Decision and Acceleration Center") stays glued
// to its title with no-break spaces, so the number never sits alone on a
// line above a title that wraps.
const SEPARATOR = " · ";
const GLUED = " · ";

export function Separated({ text }: { text: string }) {
  const parts = text.split(SEPARATOR);
  if (parts.length > 1 && /^\d+$/.test(parts[0])) parts.splice(0, 2, parts[0] + GLUED + parts[1]);
  if (parts.length < 2) return parts[0];
  return (
    <span className="site-seps">
      <span className="site-seps-inner">
        {parts.map((part, index) => (
          <span key={index}>
            {index > 0 ? <span className="site-seps-dot">{SEPARATOR}</span> : null}
            {part}
          </span>
        ))}
      </span>
    </span>
  );
}
