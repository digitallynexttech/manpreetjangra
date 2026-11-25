import {
  BriefcaseBusiness,
  Building2,
  Cpu,
  Handshake,
  Layers,
  Mic,
  Network,
  Quote,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { ParaText } from "@/components/ParaText";
import { V5Button } from "@/components/v5/Button";
import { ContactTile } from "@/components/v5/ContactTile";
import { HeadTile, ledeOf } from "@/components/v5/Heads";
import { LinkTile } from "@/components/v5/LinkTile";
import { PageHeader } from "@/components/v5/PageHeader";
import { QuoteBody } from "@/components/v5/QuoteBody";
import { RoleDots } from "@/components/v5/RoleDots";
import { SpringNumber } from "@/components/v5/SpringNumber";
import { Tile, type Tone } from "@/components/v5/Tile";
import { VentureTiles } from "@/components/v5/VentureTiles";
import { enquiryTypes } from "@/content/contact";
import { fullTime, hasRoles, roles } from "@/content/roles";
import { labels, toV5 } from "@/content/v5";
import { adac, clientStats, clientStory, group, how, intro, meta, operations, talent, ventures } from "@/content/work";
import { v5Metadata } from "@/lib/v5";
import { quoteView, ventureView } from "@/lib/views";

export const metadata = v5Metadata(meta);

// /v5/work (plan/versions-spec.md, V5 "Inner pages", Work): the bento header
// with Digitally Next as its accent tile; the operations bento (the operating
// model, the five service lines, the markets); talent beside its job-post
// line, the AI Decision and Acceleration Center on night beside "How I
// work"; the client story's figures as springing number tiles; the three
// organisations as tiles that turn over to show their website; and the
// contact row. All copy comes from src/content/work.ts (and shared.ts,
// contact.ts); the open-role figures come from roles.ts.

const SERVICE_TONES: readonly Tone[] = ["paper", "blush", "paper", "blush"];
const STAT_TONES: readonly Tone[] = ["paper", "marigold", "blush", "paper"];
const HOW_TONES: readonly Tone[] = ["marigold", "paper"];
const VENTURE_TONES: readonly Tone[] = ["paper", "blush", "marigold"];

// The figure in the operations title ("Five service lines, clients in 12
// markets."), shown big on the markets tile beside the list it counts.
const marketsCount = /(\d+) markets/.exec(operations.title)?.[1];
const digitallyNext = ventures[0];
const enquiry = (key: string) => enquiryTypes.find((type) => type.key === key);

export default function V5Work() {
  const lines = operations.serviceLines;
  const lastLine = lines[lines.length - 1];
  const partnership = enquiry("partnership");
  const speaking = enquiry("speaking");

  return (
    <>
      <PageHeader
        icon={<BriefcaseBusiness size={14} strokeWidth={2} aria-hidden="true" />}
        eyebrow={intro.eyebrow}
        title={intro.title}
        accent={intro.accent}
        lede={intro.lede}
      >
        <Tile tone="marigold" intro={2} tileClassName="v5-org-tile">
          <span className="v5-org-badge v5-depth" aria-hidden="true">
            <Building2 size={26} strokeWidth={1.75} />
          </span>
          <div className="v5-org">
            <p className="v5-org-name">{digitallyNext.name}</p>
            <p className="v5-tags">
              {digitallyNext.category.split(" · ").map((tag, index) => (
                <span key={tag} className="v5-tag">
                  {index > 0 ? <span className="v5-sr"> · </span> : null}
                  {tag}
                </span>
              ))}
            </p>
          </div>
        </Tile>
      </PageHeader>

      {/* 01 Operations: the model, five service lines and the markets. */}
      <section id={operations.id} className="v5-block" aria-labelledby="v5-operations-title">
        <div className="v5-wrap">
          <div className="v5-bento v5-bento--ops">
            <Tile w={2} tone="paper">
              <HeadTile
                id="v5-operations-title"
                icon={<Layers size={14} strokeWidth={2} aria-hidden="true" />}
                eyebrow={operations.eyebrow}
                title={operations.title}
                accent={operations.accent}
              >
                <p className="v5-caption">{operations.caption.text}</p>
              </HeadTile>
            </Tile>
            <Tile w={2} tone="marigold" tileClassName="v5-model-tile">
              <Sparkles className="v5-model-mark" size={24} strokeWidth={1.75} aria-hidden="true" />
              <p className="v5-model">
                <ParaText para={operations.model} />
              </p>
            </Tile>
            {lines.slice(0, -1).map((line, index) => (
              <Tile key={line.index} tone={SERVICE_TONES[index % SERVICE_TONES.length]} tileClassName="v5-service-tile">
                <span className="v5-service-index">{line.index}</span>
                <h3 className="v5-service">{line.text}</h3>
              </Tile>
            ))}
            <Tile w={2} tone="night" tileClassName="v5-service-tile v5-service-tile--wide">
              <div className="v5-service-top">
                <span className="v5-service-index">{lastLine.index}</span>
                <span className="v5-org-badge" aria-hidden="true">
                  <Cpu size={24} strokeWidth={1.75} />
                </span>
              </div>
              <h3 className="v5-service">{lastLine.text}</h3>
            </Tile>
            <Tile w={2} tone="paper" tileClassName="v5-markets-tile">
              {marketsCount ? <SpringNumber value={marketsCount} /> : null}
              <p className="v5-markets">{operations.markets.text}</p>
            </Tile>
          </div>
        </div>
      </section>

      {/* 02 Talent, 03 ADAC and How I work. */}
      <div className="v5-block">
        <div className="v5-wrap">
          <div className="v5-bento v5-bento--talent">
            <Tile id={talent.id} w={2} tone="blush" labelledBy="v5-talent-title" tileClassName="v5-talent-tile">
              <HeadTile
                id="v5-talent-title"
                icon={<UsersRound size={14} strokeWidth={2} aria-hidden="true" />}
                eyebrow={talent.eyebrow}
                title={talent.title}
                accent={talent.accent}
                lede={talent.paragraph.text}
              />
              <div className="v5-talent-foot">
                <V5Button href={toV5(talent.link.href)}>{talent.link.label}</V5Button>
                {hasRoles ? <RoleDots total={roles.length} filled={fullTime.length} /> : null}
              </div>
            </Tile>
            <Tile w={2} tone="paper" tileClassName="v5-quote-tile">
              <QuoteBody quote={quoteView(talent.quote.quote, talent.quote.linkLabel)} size="large" />
            </Tile>

            <Tile id={adac.id} w={2} h={2} mdH={1} tone="night" labelledBy="v5-adac-title" tileClassName="v5-adac-tile">
              <span className="v5-adac-glow v5-depth" aria-hidden="true" />
              <HeadTile
                id="v5-adac-title"
                icon={<Network size={14} strokeWidth={2} aria-hidden="true" />}
                eyebrow={adac.eyebrow}
                title={adac.title}
                accent={adac.accent}
              />
              <p className="v5-adac-text">
                <ParaText para={adac.paragraph} />
              </p>
              {adac.roles ? <p className="v5-adac-roles">{adac.roles.text}</p> : null}
            </Tile>

            <Tile id={how.id} w={2} tone="paper" labelledBy="v5-how-title">
              <HeadTile
                id="v5-how-title"
                icon={<Quote size={14} strokeWidth={2} aria-hidden="true" />}
                eyebrow={how.eyebrow}
                title={how.title}
                accent={how.accent}
                lede={ledeOf(how.lede)}
              />
            </Tile>
            {how.quotes.map((ref, index) => (
              <Tile key={ref.quote} tone={HOW_TONES[index % HOW_TONES.length]} tileClassName="v5-quote-tile">
                <QuoteBody quote={quoteView(ref.quote, ref.linkLabel)} cover />
              </Tile>
            ))}
          </div>
        </div>
      </div>

      {/* A client story: the four figures from her post, and her line on trust. */}
      <section id={clientStory.id} className="v5-block" aria-labelledby="v5-client-title">
        <div className="v5-wrap">
          <div className="v5-bento v5-bento--client">
            <Tile w={2} tone="paper">
              <HeadTile
                id="v5-client-title"
                icon={<Handshake size={14} strokeWidth={2} aria-hidden="true" />}
                eyebrow={clientStory.eyebrow}
                title={clientStory.title}
                accent={clientStory.accent}
                lede={ledeOf(clientStory.lede)}
              />
            </Tile>
            {clientStats.slice(0, 2).map((stat, index) => (
              <StatTile key={stat.label} value={stat.value} label={stat.label} tone={STAT_TONES[index]} />
            ))}
            {clientStats.slice(2).map((stat, index) => (
              <StatTile key={stat.label} value={stat.value} label={stat.label} tone={STAT_TONES[index + 2]} />
            ))}
            <Tile w={2} tone="field" tileClassName="v5-quote-tile v5-trust-tile">
              <QuoteBody quote={quoteView(clientStory.quote.quote, clientStory.quote.linkLabel)} size="large" />
              <div className="v5-actions">
                <V5Button href={clientStory.link.href} external={clientStory.link.external} variant="secondary">
                  {clientStory.link.label}
                </V5Button>
              </div>
            </Tile>
          </div>
        </div>
      </section>

      {/* Where I work: the three organisations of the group. */}
      <section id={group.id} className="v5-block" aria-labelledby="v5-group-title">
        <div className="v5-wrap">
          <div className="v5-bento v5-bento--group">
            <Tile w={2} tone="night">
              <HeadTile
                id="v5-group-title"
                icon={<Building2 size={14} strokeWidth={2} aria-hidden="true" />}
                eyebrow={group.eyebrow}
                title={group.title}
                accent={group.accent}
                lede={ledeOf(group.lede)}
              />
            </Tile>
            <VentureTiles
              ventures={ventures.map(ventureView)}
              tones={VENTURE_TONES}
              labels={{
                previewWebsite: labels.previewWebsite,
                previewThe: labels.previewThe,
                previewWindow: labels.previewWindow,
                closePreview: labels.closePreview,
                visit: labels.visit,
                newTab: labels.newTab,
              }}
            />
          </div>
        </div>
      </section>

      {/* Contact: the classic contact band as a night tile, and two enquiry tiles. */}
      <div className="v5-block">
        <div className="v5-wrap">
          <div className="v5-bento">
            <ContactTile />
            {partnership ? (
              <LinkTile
                icon={<Handshake size={22} strokeWidth={1.75} />}
                href={toV5(`/contact?type=${partnership.key}`)}
                label={partnership.label}
                tone="blush"
              />
            ) : null}
            {speaking ? (
              <LinkTile
                icon={<Mic size={22} strokeWidth={1.75} />}
                href={toV5(`/contact?type=${speaking.key}`)}
                label={speaking.label}
                tone="paper"
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

/** A client-story figure: the number springs to its value on enter. */
function StatTile({ value, label, tone }: { value: string; label: string; tone: Tone }) {
  return (
    <Tile tone={tone} tileClassName="v5-client-stat">
      <SpringNumber value={value} />
      <p className="v5-stat-label">{label}</p>
    </Tile>
  );
}
