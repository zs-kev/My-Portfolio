import ButtonUnderline from "@/components/buttons/underlineButton/ButtonUnderLine";
import ScrollCue from "@/components/scrollCue/ScrollCue";
import { client } from "@/lib/sanity.client";
import urlFor from "@/lib/urlFor";
import Image from "next/image";
import LaptopShowcase from "./LaptopShowcase";
import Touchpoints from "./Touchpoints";
import { groq } from "next-sanity";
import { SITE_NAME } from "@/lib/siteConfig";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

type Props = {
  // Next 15 made route params async; Next 16 removes sync access entirely.
  params: Promise<{
    slug: string;
  }>;
};

// Content changes in the Studio reach the live site within the window rather
// than waiting for a redeploy.
export const revalidate = 60;

const metaQuery = groq`
  *[_type=='portfolio' && slug.current == $slug][0] {
    title,
    description,
    "clientTitle": client->title,
    featureImage
  }
`;

// Every case study previously served the site-wide title and the description
// "My Portfolio Website" — the highest-intent pages on the site, indistinguish-
// able in search results, browser tabs and link previews.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch(metaQuery, { slug }).catch(() => null);
  if (!post) return {};

  const title = post.clientTitle
    ? `${post.title} — ${post.clientTitle}`
    : post.title;
  const image = post.featureImage
    ? urlFor(post.featureImage).width(1200).height(630).fit("crop").url()
    : undefined;

  return {
    title,
    description: post.description,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      type: "article",
      url: `/${slug}`,
      title: `${title} | ${SITE_NAME}`,
      description: post.description,
      images: image ? [{ url: image, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description: post.description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function PortfolioPiece({ params }: Props) {
  const { slug } = await params;

  const query = groq`
    *[_type=='portfolio' && slug.current == $slug][0] {
        ...,
        author->,
       client->,
       categories[]->{
        title,
       }
    }
`;

  const post = await client.fetch(query, { slug });

  // This route sits at the root, so it matches every unmatched top-level path.
  // The [0] projection returns null when nothing matches, and dereferencing
  // that produced a 500 for any mistyped link, deleted project or crawler
  // probing an old URL. Search engines read a 500 as "try again later" rather
  // than "gone".
  if (!post) notFound();

  return (
    <>
      <section className={styles.heroWrapper}>
        <div className="max-width-wrapper">
          <p className={styles.clientTitle}>{post.client?.title}</p>
          <h1>{post.title}</h1>
          <div className={styles.infoWrapper}>
            <div className={styles.infoDetails}>
              <div>
                <p className={styles.infoDetailsHeading}>Made by</p>
                <p className={styles.infoDetailsText}>{post.author?.name}</p>
              </div>
              <div>
                <p className={styles.infoDetailsHeading}>Client</p>
                <p className={styles.infoDetailsText}>{post.client?.title}</p>
              </div>
              <div>
                <p className={styles.infoDetailsHeading}>Date</p>
                <p className={styles.infoDetailsText}>{post.CompletedAt}</p>
              </div>
              <div>
                <p className={styles.infoDetailsHeading}>Role</p>
                <div className={styles.infoDetailsCat}>
                  {post.categories?.map((category: any, index: number) => (
                    <p key={index} className={styles.infoDetailsText}>
                      {category.title}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.infoDesc}>
              <div className={styles.infoDescLine} />
              <div>
                <p>{post.description}</p>
              </div>
            </div>
          </div>
          <div className={styles.heroLinksWrapper}>
            {post.websiteUrl && (
              <ButtonUnderline link={post.websiteUrl} target={"_blank"}>
                Visit Website
              </ButtonUnderline>
            )}
            {post.githubUrl && (
              <ButtonUnderline link={post.githubUrl} target={"_blank"}>
                Visit Github
              </ButtonUnderline>
            )}
          </div>
          {/* Centred under the hero links, with the mouse, as in the design. */}
          <ScrollCue className={styles.scrollCue} mouse />
        </div>
      </section>
      <section>
        <div className={`max-width-wrapper ${styles.challengeWrapper}`}>
          <div>
            <h2>The Challenge</h2>
            <p>{post.theChallenge}</p>
          </div>
          <div>
            <h2>My Approach</h2>
            <p>{post.myApproach}</p>
          </div>
        </div>
      </section>

      <LaptopShowcase image={post.mainImage} alt={post.mainImage?.alt} />

      <Touchpoints
        image={post.featuresImage}
        alt={post.featuresImage?.alt}
        hotspots={post.hotspots}
      />

      {post.quote && (
        <section className={styles.quoteSection}>
          <div className="max-width-wrapper">
            <figure className={styles.quoteFigure}>
              <blockquote className={styles.quote}>
                <p>&ldquo;{post.quote}&rdquo;</p>
              </blockquote>
              {post.quoteName && (
                <figcaption className={styles.quoteName}>
                  {post.quoteName}
                </figcaption>
              )}
            </figure>
          </div>
        </section>
      )}

      <Gallery post={post} />

      {(post.finalWords || post.websiteUrl || post.githubUrl) && (
        <section className={styles.finalSection}>
          <div className={`max-width-wrapper ${styles.finalInner}`}>
            {post.finalWords && (
              <>
                <h2 className={styles.finalHeading}>Final Words</h2>
                <p className={styles.finalWords}>{post.finalWords}</p>
              </>
            )}
            <div className={styles.finalLinks}>
              {post.websiteUrl && (
                <ButtonUnderline link={post.websiteUrl} target={"_blank"}>
                  Visit Website
                </ButtonUnderline>
              )}
              {post.githubUrl && (
                <ButtonUnderline link={post.githubUrl} target={"_blank"}>
                  View Github
                </ButtonUnderline>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

// The four gallery slots are separate fields rather than an array, so they are
// collected here and any unset slot is simply skipped.
function Gallery({ post }: { post: any }) {
  const images = [
    post.firstImage,
    post.secondImage,
    post.thirdImage,
    post.fourthImage,
  ].filter(Boolean);

  if (images.length === 0) return null;

  return (
    <section className={styles.gallerySection} aria-label="Project gallery">
      <div className={`max-width-wrapper ${styles.galleryGrid}`}>
        {images.map((image: any, index: number) => (
          <div key={index} className={styles.galleryItem}>
            <Image
              src={urlFor(image).width(1200).fit("max").url()}
              alt={image.alt ?? `Project screen ${index + 1}`}
              width={900}
              height={700}
              sizes="(max-width: 48rem) 92vw, 45vw"
              className={styles.galleryImage}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
