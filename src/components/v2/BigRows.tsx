import Link from "next/link";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { RowDisclosure } from "./RowDisclosure";

// Tables in big bold uppercase rows (spec 4.2, Lando's results tables):
// hairlines between rows, columns aligned on one grid, a tint and an arrow
// on hover. Used for journeys, roles, articles and ventures.
//
// A row is one of three kinds: a link (the whole row; another site opens in a
// new tab and says so), a disclosure (`detail`: a native <details>, so it
// works without JavaScript, opened and closed smoothly by RowDisclosure, the
// classic Disclosure's logic; rows sharing `group` open one at a time;
// `open` starts it open), or plain.
// The column headings are shown once above the rows and repeated to screen
// readers inside each cell, so a row reads "Year: 2019, Title: ...".

export type BigRowColumn = {
  /** Heading above the column (a neutral label from content/v2.ts). */
  header?: string;
  /** A CSS grid track, such as "8rem" or "minmax(0, 2fr)". */
  width: string;
  /** big: bold uppercase; small: mono label; text: body copy. */
  kind?: "big" | "small" | "text";
};

export type BigRow = {
  key: string;
  cells: readonly ReactNode[];
  href?: string;
  detail?: ReactNode;
  /** A detail row that starts open. */
  open?: boolean;
  /** A row-specific wrapper class (the venture preview hooks into it). */
  className?: string;
};

export function BigRows({
  columns,
  rows,
  group,
  newTabLabel = " (opens in a new tab)",
  className,
}: {
  columns: readonly BigRowColumn[];
  rows: readonly BigRow[];
  /** Disclosure rows with the same group open one at a time. */
  group?: string;
  newTabLabel?: string;
  className?: string;
}) {
  const style = { "--v2-row-cols": columns.map((column) => column.width).join(" ") } as CSSProperties;
  const hasHeaders = columns.some((column) => column.header);

  const cells = (row: BigRow) =>
    row.cells.map((cell, index) => {
      const column = columns[index];
      return (
        <span key={index} className={`v2-cell v2-cell--${column?.kind ?? "big"}`}>
          {column?.header ? <span className="v2-sr-only">{column.header}: </span> : null}
          {cell}
        </span>
      );
    });

  return (
    <div className={["v2-rows", className].filter(Boolean).join(" ")} style={style}>
      {hasHeaders ? (
        <div className="v2-rows-head v2-label" aria-hidden="true">
          {columns.map((column, index) => (
            <span key={index}>{column.header}</span>
          ))}
        </div>
      ) : null}
      <ul className="v2-rows-list">
        {rows.map((row) => {
          const external = row.href ? /^https?:\/\//.test(row.href) : false;
          let inner: ReactNode;
          if (row.detail) {
            inner = (
              <RowDisclosure
                group={group}
                defaultOpen={row.open}
                summary={
                  <>
                    {cells(row)}
                    <Plus className="v2-row-arrow" size={22} strokeWidth={2} aria-hidden="true" />
                  </>
                }
              >
                {row.detail}
              </RowDisclosure>
            );
          } else if (row.href && external) {
            inner = (
              <a className="v2-row-inner" href={row.href} target="_blank" rel="noopener noreferrer">
                {cells(row)}
                <span className="v2-sr-only">{newTabLabel}</span>
                <ArrowUpRight className="v2-row-arrow" size={24} strokeWidth={2} aria-hidden="true" />
              </a>
            );
          } else if (row.href) {
            inner = (
              <Link className="v2-row-inner" href={row.href}>
                {cells(row)}
                <ArrowRight className="v2-row-arrow" size={24} strokeWidth={2} aria-hidden="true" />
              </Link>
            );
          } else {
            inner = <div className="v2-row-inner">{cells(row)}</div>;
          }
          return (
            <li key={row.key} className={["v2-row", row.className].filter(Boolean).join(" ")}>
              {inner}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
