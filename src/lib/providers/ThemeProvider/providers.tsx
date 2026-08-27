"use client";

import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: any }) {
  // reducedMotion="user" routes every framer entrance through the OS setting,
  // so the header animations respect it the way the GSAP ones now do.
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeProvider>
  );
}
