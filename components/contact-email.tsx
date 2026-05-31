"use client";

import { useSyncExternalStore } from "react";
import { CONTACT_EMAIL_DOMAIN, CONTACT_EMAIL_USER } from "@/lib/site";

// Light obfuscation: server-renders a non-clickable "user [at] domain" form so
// naive scrapers don't harvest a mailto, then upgrades to a real link once
// hydrated on the client. useSyncExternalStore gives a clean server/client
// split with no setState-in-effect.
const subscribe = () => () => {};

export default function ContactEmail({ className }: { className?: string }) {
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  if (!hydrated) {
    return (
      <span className={className}>
        {CONTACT_EMAIL_USER} [at] {CONTACT_EMAIL_DOMAIN}
      </span>
    );
  }

  const address = `${CONTACT_EMAIL_USER}@${CONTACT_EMAIL_DOMAIN}`;
  return (
    <a href={`mailto:${address}`} className={className}>
      {address}
    </a>
  );
}
