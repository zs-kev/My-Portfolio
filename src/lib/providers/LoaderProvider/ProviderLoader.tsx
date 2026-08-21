"use client";

import Loader from "@/components/home/loader/Loader";
import { useCallback, useState, useSyncExternalStore } from "react";

const SEEN_KEY = "hasSeenLoader";

// Nothing here changes over a page's lifetime, so there is nothing to
// subscribe to — the snapshot is read once per mount.
const subscribe = () => () => {};

// Whether the intro should play is a client-only question: it depends on
// sessionStorage and a media query. useSyncExternalStore reads both without a
// hydration mismatch and without calling setState from an effect.
const shouldPlayOnClient = () => {
  try {
    if (sessionStorage.getItem(SEEN_KEY) === "true") return false;
  } catch {
    // Private mode or storage disabled: skip rather than replay every load.
    return false;
  }
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

// Server render never includes the overlay, so the HTML sent to crawlers and
// to a JS-less client is the real page.
const shouldPlayOnServer = () => false;

export function ProviderLoader({ children }: { children: React.ReactNode }) {
  const shouldPlay = useSyncExternalStore(
    subscribe,
    shouldPlayOnClient,
    shouldPlayOnServer
  );
  const [finished, setFinished] = useState(false);

  const handleFinish = useCallback(() => {
    // Written when the loader actually finishes. It used to be written in the
    // effect's cleanup, which does not run on a normal page load, so the flag
    // was rarely set and the intro replayed on every visit.
    try {
      sessionStorage.setItem(SEEN_KEY, "true");
    } catch {
      // Storage unavailable; the intro simply plays again next session.
    }
    setFinished(true);
  }, []);

  // children always render. The loader is a sibling overlay on top of them,
  // never a replacement for them.
  return (
    <>
      {children}
      {shouldPlay && !finished && <Loader onFinish={handleFinish} />}
    </>
  );
}
