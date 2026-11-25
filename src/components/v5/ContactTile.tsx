import { Send } from "lucide-react";
import { contactBand } from "@/content/shared";
import { toV5 } from "@/content/v5";
import { V5Button } from "./Button";
import { HeadTile, ledeOf } from "./Heads";
import { Tile } from "./Tile";

// The contact band of the classic About and Work pages as one night tile
// (two columns wide): the band's head, "Get in touch" (to /v5/contact) and
// "Connect on LinkedIn". The page places it in its last bento row.
export function ContactTile({ id = "v5-contact-title" }: { id?: string }) {
  return (
    <Tile w={2} tone="night" labelledBy={id} tileClassName="v5-contact-tile">
      <HeadTile
        id={id}
        icon={<Send size={14} strokeWidth={2} aria-hidden="true" />}
        eyebrow={contactBand.eyebrow}
        title={contactBand.title}
        accent={contactBand.accent}
        lede={ledeOf(contactBand.lede)}
      >
        <div className="v5-actions">
          <V5Button href={toV5(contactBand.primary.href)}>{contactBand.primary.label}</V5Button>
          <V5Button href={contactBand.secondary.href} external variant="secondary">
            {contactBand.secondary.label}
          </V5Button>
        </div>
      </HeadTile>
    </Tile>
  );
}
