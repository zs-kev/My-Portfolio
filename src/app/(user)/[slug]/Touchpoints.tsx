import urlFor from "@/lib/urlFor";
import Image from "next/image";
import styles from "./Touchpoints.module.css";

type Hotspot = { _key?: string; details?: string; x?: number; y?: number };

type Props = {
  image: any;
  alt?: string;
  hotspots?: Hotspot[];
};

// The hotspots array is {details, x, y} with x/y as 0-100 percentages placed on
// featuresImage in the Studio. Statically that gives us a numbered walkthrough
// beside the image; 4c turns the same data into a scroll-linked pan, which is
// why the coordinates are already carried through as CSS custom properties.
export default function Touchpoints({ image, alt, hotspots }: Props) {
  if (!image) return null;

  const spots = (hotspots ?? []).filter((spot) => spot.details);

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
            {spots.map((spot, index) => (
              <span
                key={spot._key ?? index}
                className={styles.marker}
                style={
                  {
                    "--x": `${spot.x ?? 50}%`,
                    "--y": `${spot.y ?? 50}%`,
                  } as React.CSSProperties
                }
                aria-hidden="true"
              >
                {index + 1}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.textColumn}>
          <h2 id="touchpoints-heading" className={styles.heading}>
            Touchpoints
          </h2>
          {spots.length > 0 ? (
            <ol className={styles.list}>
              {spots.map((spot, index) => (
                <li key={spot._key ?? index} className={styles.item}>
                  <span className={styles.itemNumber} aria-hidden="true">
                    {index + 1}
                  </span>
                  <p>{spot.details}</p>
                </li>
              ))}
            </ol>
          ) : null}
        </div>
      </div>
    </section>
  );
}
