"use client";

import urlFor from "@/lib/urlFor";
import Image from "next/image";
import { useRef, useState } from "react";
import styles from "./Touchpoints.module.css";

type Hotspot = { _key?: string; details?: string; x?: number; y?: number };

type Props = {
  image: any;
  alt?: string;
  hotspots?: Hotspot[];
};

export default function Touchpoints({ image, alt, hotspots }: Props) {
  const spots = (hotspots ?? []).filter((spot) => spot.details);
  const [active, setActive] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  if (!image) return null;

  const select = (index: number) => {
    const next = (index + spots.length) % spots.length;
    setActive(next);
    tabsRef.current[next]?.focus();
  };

  // The markers are a tablist, which is exactly what this is: one selected
  // point, one panel of detail. It also gives arrow-key navigation, which
  // matters because the markers are small hit targets on a diagram.
  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      select(active + 1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      select(active - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      select(0);
    } else if (event.key === "End") {
      event.preventDefault();
      select(spots.length - 1);
    }
  };

  return (
    <section className={styles.section} aria-labelledby="touchpoints-heading">
      <div className={`max-width-wrapper ${styles.grid}`}>
        <div className={styles.imageColumn}>
          <div className={styles.imageFrame}>
            <Image
              src={urlFor(image).width(1600).fit("max").url()}
              alt={alt ?? "Project detail"}
              width={1200}
              height={800}
              sizes="(max-width: 62rem) 92vw, 55vw"
              className={styles.image}
            />

            {spots.length > 0 && (
              <div
                className={styles.markers}
                role="tablist"
                aria-label="Touchpoints"
                onKeyDown={onKeyDown}
              >
                {spots.map((spot, index) => (
                  <button
                    key={spot._key ?? index}
                    ref={(el) => {
                      tabsRef.current[index] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`touchpoint-tab-${index}`}
                    aria-controls="touchpoint-panel"
                    aria-selected={index === active}
                    // Only the selected tab stays in the page tab order; the
                    // rest are reached with the arrow keys, per the pattern.
                    tabIndex={index === active ? 0 : -1}
                    onClick={() => setActive(index)}
                    className={`${styles.marker} ${
                      index === active ? styles.markerActive : ""
                    }`}
                    style={
                      {
                        "--x": `${spot.x ?? 50}%`,
                        "--y": `${spot.y ?? 50}%`,
                      } as React.CSSProperties
                    }
                  >
                    <span className={styles.markerLabel}>{index + 1}</span>
                    <span className={styles.srOnly}>
                      Touchpoint {index + 1}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={styles.textColumn}>
          <h2 id="touchpoints-heading" className={styles.heading}>
            Touchpoints
          </h2>

          {spots.length > 0 && (
            <div
              className={styles.panel}
              role="tabpanel"
              id="touchpoint-panel"
              aria-labelledby={`touchpoint-tab-${active}`}
              tabIndex={0}
            >
              <span className={styles.panelNumber} aria-hidden="true">
                {active + 1}
              </span>
              <p className={styles.panelText}>{spots[active]?.details}</p>
            </div>
          )}

          {spots.length > 1 && (
            <p className={styles.hint}>
              Select a point on the image to read about it.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
