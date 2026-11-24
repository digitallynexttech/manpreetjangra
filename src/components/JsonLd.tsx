// Structured data for search engines (spec 9.4), rendered by the root layout.
// `<` is escaped as < so no string inside the data can close the script
// tag early (the sanitising step the Next.js JSON-LD guide recommends).
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
