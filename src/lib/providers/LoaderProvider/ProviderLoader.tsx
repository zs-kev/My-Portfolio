"use client";

import Loader from "@/components/home/loader/Loader";
import { gsap } from "gsap";
import { useLayoutEffect, useState } from "react";

export function ProviderLoader({ children }: { children: any }) {
  const [loaderFinished, setLoaderFinished] = useState(false);
  const [timeLine, setTimeLine] = useState<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    let context: any;
    const hasSeenLoader = sessionStorage.getItem("hasSeenLoader");

    if (hasSeenLoader) {
      setLoaderFinished(true);
    } else {
      context = gsap.context(() => {
        const tl = gsap.timeline({
          onComplete: () => setLoaderFinished(true),
        });
        setTimeLine(tl);
      });
    }

    return () => {
      if (context) {
        context.revert();
        sessionStorage.setItem("hasSeenLoader", "true");
      }
    };
  }, []);

  return <>{loaderFinished ? children : <Loader timeline={timeLine} />}</>;
}
