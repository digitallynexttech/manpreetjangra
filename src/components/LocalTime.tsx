"use client";
import { useSyncExternalStore } from "react";

// The time in New Delhi, for the footer (spec 3.4). The server renders only
// the prefix ("New Delhi · IST"); the time fills in once the page runs in the
// browser, so the static HTML never shows a stale time and hydration never
// disagrees (the server snapshot is empty).

const clock = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Kolkata",
});

// Checked every 30 s, so the minute never lags by more than half a minute.
function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 30_000);
  return () => clearInterval(id);
}
// A string, so React sees the same snapshot until the minute changes.
const now = () => clock.format(Date.now());
const onServer = () => "";

export function LocalTime({ prefix }: { prefix?: string }) {
  const time = useSyncExternalStore(subscribe, now, onServer);
  return (
    <>
      {prefix}
      {prefix && time ? " " : null}
      <time aria-label="Local time in New Delhi" dateTime={time || undefined}>
        {time}
      </time>
    </>
  );
}
