import ButtonUnderline from "@/components/buttons/underlineButton/ButtonUnderLine";
import { client } from "@/lib/sanity.client";
import urlFor from "@/lib/urlFor";
import { groq } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { FeaturedPostType, FeaturedProject } from "../../../../typings";
import styles from "./PortfolioSelected.module.css";

export interface PortfolioSelectedProps {}

// Only featuredOne was ever dereferenced, so the other four slots the Studio
// offers produced nothing and the grid was padded with hardcoded placeholders.
const projection = `{
    title,
    slug,
    client -> {
      title,
      altLogo,
      clientColorPrimary
    }
  }`;

const query = groq`
*[_type=='featured'][0] {
  featuredOne-> ${projection},
  featuredTwo-> ${projection},
  featuredThree-> ${projection},
  featuredFour-> ${projection},
  featuredFive-> ${projection},
}
`;

// The grid places each slot by hand, so the slot order is also the layout.
const SLOTS = [
  { key: "featuredOne", className: styles.secondItem },
  { key: "featuredTwo", className: styles.thirdItem },
  { key: "featuredThree", className: styles.fourthItem },
  { key: "featuredFour", className: styles.sixthItem },
  { key: "featuredFive", className: styles.seventhItem },
] as const;

// A Server Component now. It has no interactivity, and fetching on the client
// meant the tiles were absent from the HTML — invisible to crawlers, and the
// main internal-linking hub pointing at the case studies. It also shipped the
// Sanity client and the query into the browser bundle on the two most-visited
// pages, and rendered an empty <Image src=""> on first paint.
const PortfolioSelected = async () => {
  let featured: FeaturedPostType | null = null;
  try {
    featured = await client.fetch(query);
  } catch (error) {
    // A homepage without the grid beats a homepage that 500s because the CMS
    // was briefly unreachable.
    console.error(
      "Selected Projects: could not load featured projects:",
      error
    );
  }

  const renderTile = (slotKey: string, className: string) => {
    const project: FeaturedProject | undefined = featured?.[
      slotKey as keyof FeaturedPostType
    ] as FeaturedProject | undefined;

    const slug = project?.slug?.current;
    const logoAsset = project?.client?.altLogo?.asset;

    // An empty slot, or one pointing at a deleted project, renders nothing at
    // all. It used to render a grey block that looked clickable and reloaded
    // the page the visitor was already on.
    if (!project || !slug) return null;

    const clientName = project.client?.title ?? project.title ?? "Project";

    return (
      <Link className={className} href={`/${slug}`} key={slotKey}>
        <div
          className={styles.logoItem}
          style={{
            backgroundColor: project.client?.clientColorPrimary?.hex ?? "",
          }}
        >
          {logoAsset && (
            <Image
              src={urlFor(logoAsset).url()}
              alt={project.client?.altLogo?.alt ?? `${clientName} logo`}
              width="0"
              height="0"
              sizes="(max-width: 48rem) 100vw, 33vw"
              className={styles.image}
            />
          )}
        </div>
      </Link>
    );
  };

  return (
    <section className="max-width-wrapper">
      <div>
        <div className={styles.container}>
          <div className={styles.firstItem}>
            <div className={styles.introText}>
              <h2>Selected Projects</h2>
              <p>
                I do everything with my core values of honesty, hard work, and
                trust.
              </p>
            </div>
          </div>

          {SLOTS.map(({ key, className }) => renderTile(key, className))}

          <div className={styles.fifthItem}>
            <div className={styles.testimonial}>
              <h3>What they&apos;re saying</h3>
              <p className={styles.quote}>
                &quot;Great person to work with! Did the job faster than the
                initial due date, great service and great communication. Thank
                You!&quot;
              </p>
              <p>Mabel Jones</p>
            </div>
          </div>

          <div className={styles.eightItem}>
            <ButtonUnderline link={"/portfolio"}>
              See all projects
            </ButtonUnderline>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSelected;
