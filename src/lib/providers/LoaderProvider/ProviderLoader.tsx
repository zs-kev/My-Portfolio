"use client";

import Loader from "@/components/home/loader/Loader";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

const SEEN_KEY = "hasSeenLoader";

// The intro is a sequence, not a spinner: the loader plays, and only then does
// the hero and header animate in. Anything with an entrance animation reads
// this so it waits its turn instead of playing to nobody behind the overlay.
//
// Defaults to true so a component used outside this provider animates normally.
const IntroFinishedContext = createContext(true);

export const useIntroFinished = () => useContext(IntroFinishedContext);

// useLayoutEffect warns during SSR, but the whole point here is to settle
// before the browser paints, so a returning visitor never sees the overlay.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type IntroState = "pending" | "playing" | "done";

export function ProviderLoader({ children }: { children: React.ReactNode }) {
  // Starts "pending" so the overlay is part of the first paint. Deciding in a
  // passive effect instead would let the page flash into view for a frame
  // before the overlay dropped over it.
  const [intro, setIntro] = useState<IntroState>("pending");

  useIsomorphicLayoutEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "true";
    } catch {
      // Private mode or storage disabled: skip rather than replay every load.
      seen = true;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    setIntro(seen || prefersReducedMotion ? "done" : "playing");
  }, []);

  const handleFinish = useCallback(() => {
    // Written when the loader actually finishes. It used to be written in the
    // effect's cleanup, which does not run on a normal page load, so the flag
    // was rarely set and a returning visitor sat through the whole intro again.
    try {
      sessionStorage.setItem(SEEN_KEY, "true");
    } catch {
      // Storage unavailable; the intro simply plays again next session.
    }
    setIntro("done");
  }, []);

  // children always render, so the server HTML is the real page even while the
  // overlay sits on top of it.
  return (
    <IntroFinishedContext.Provider value={intro === "done"}>
      {children}
      {/* The overlay is dismissed by JS, so with scripting off it would sit
          over the page forever. That is already handled once, in the (user)
          layout, which hides [data-loader-overlay] inside <noscript>. */}
      {intro !== "done" && <Loader onFinish={handleFinish} />}
    </IntroFinishedContext.Provider>
  );
}
