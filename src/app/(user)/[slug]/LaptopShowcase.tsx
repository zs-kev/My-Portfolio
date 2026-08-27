import urlFor from "@/lib/urlFor";
import Image from "next/image";
import styles from "./LaptopShowcase.module.css";

type Props = {
  image: any;
  alt?: string;
};

// The laptop chrome is drawn in CSS rather than being an image asset: it stays
// crisp at any size, follows the theme, and — the reason that matters — 4b
// animates it open on scroll, which a flat screenshot could not do.
export default function LaptopShowcase({ image, alt }: Props) {
  if (!image) return null;

  return (
    <section className={styles.section} aria-label="Project screenshot">
      <div className={styles.stage}>
        <div className={styles.laptop}>
          <div className={styles.lid}>
            <span className={styles.camera} aria-hidden="true" />
            <div className={styles.screen}>
              {/* The screenshot is deliberately taller than the screen and
                anchored to the top, so 4b can scroll it within the bezel and
                make it read as a live site being browsed. */}
              <div className={styles.screenInner}>
                <Image
                  src={urlFor(image).width(2000).fit("max").url()}
                  alt={alt ?? "Project screenshot"}
                  width={1600}
                  height={1000}
                  sizes="(max-width: 48rem) 92vw, 70vw"
                  className={styles.shot}
                />
              </div>
            </div>
          </div>
          <div className={styles.base} aria-hidden="true">
            <div className={styles.notch} />
          </div>
        </div>
      </div>
    </section>
  );
}
