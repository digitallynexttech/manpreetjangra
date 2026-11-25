import { hero, journey, words } from "@/content/home";
import { labels } from "@/content/v2";
import { quoteView } from "@/lib/views";
import { ThreadDraw } from "../ThreadDraw";
import { ThreadField } from "../ThreadField";
import { WordReveal } from "../WordReveal";
import { WordsScene } from "./HomeScenes";

// 4.1 items 2 and 3, Lando's "Message from Lando" and his manifesto, on
// night. First a pinned stage: a mono label, a raised panel with her Women
// Entrepreneurs Review line in the serif italic, and a marigold thread drawn
// across the bottom of the panel as you scroll (under the words, never
// through them). Then her statement set huge and centred, lighting up word
// by word, with the AI centre's name in the serif voice.

export function HerWords() {
  const quote = quoteView(words.featured);
  return (
    <section className="v2-surface v2-words" data-v2-theme="night" aria-labelledby="v2-words-title">
      <WordsScene className="v2-words-stage">
        <ThreadField seed={21} count={10} drift={0} />
        <h2 id="v2-words-title" className="v2-label v2-words-label">
          {labels.inHerWords}
        </h2>
        <figure className="v2-words-panel">
          <blockquote>
            <p className="v2-words-quote">
              <q className="v2-quote">{quote.text}</q>
            </p>
          </blockquote>
          <figcaption className="v2-label v2-words-cite">{quote.attribution}</figcaption>
          <ThreadDraw variant="loop" trigger="manual" tone="marigold" className="v2-words-loop" />
        </figure>
      </WordsScene>
    </section>
  );
}

export function Manifesto() {
  return (
    <section className="v2-surface v2-manifesto" data-v2-theme="night" aria-labelledby="v2-manifesto-title">
      <ThreadField seed={33} count={9} />
      <div className="v2-wrap v2-manifesto-inner">
        <div className="v2-manifesto-head">
          <svg className="v2-manifesto-mark" viewBox="0 0 64 40" aria-hidden="true" focusable="false">
            <path d="M4 30 C 14 30 18 8 30 8 C 40 8 38 26 30 26 C 22 26 26 10 40 10 C 50 10 54 22 60 22" />
          </svg>
          <h2 id="v2-manifesto-title" className="v2-label">
            {journey.title}
          </h2>
        </div>
        <WordReveal text={hero.statement} accent={hero.accent} className="v2-manifesto-text" />
      </div>
    </section>
  );
}
