"use client";

import ButtonUnderline from "@/components/buttons/underlineButton/ButtonUnderLine";
import { client } from "@/lib/sanity.client";
import urlFor from "@/lib/urlFor";
import { groq } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FeaturedPostType } from "../../../../typings";
import styles from "./PortfolioSelected.module.css";

export interface PortfolioSelectedProps {}

const query = groq`
*[_type=='featured'] {
  ...,
  featuredOne-> {
    client -> {
      altLogo,
      clientColorPrimary
    },
    slug
  },
}
`;

const PortfolioSelected: React.FC<PortfolioSelectedProps> = () => {
  // Typed explicitly: useState([]) infers never[], which made every property
  // access on an item typecheck against never instead of the real shape.
  const [portfolio, setPortfolio] = useState<FeaturedPostType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPortfolio = await client.fetch(query);
        setPortfolio(fetchedPortfolio);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const firstItem: FeaturedPostType | undefined = portfolio[0];
  const firstFeatured = firstItem?.featuredOne;
  const firstAltLogoAsset = firstFeatured?.client?.altLogo?.asset;
  const firstImageUrl = firstAltLogoAsset
    ? urlFor(firstAltLogoAsset).url()
    : "";
  const firstHref = firstFeatured?.slug?.current
    ? `/${firstFeatured.slug.current}`
    : "/portfolio";
  const firstColor = firstFeatured?.client?.clientColorPrimary?.hex ?? "";

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
          <Link className={styles.secondItem} href={firstHref}>
            <div
              className={styles.logoItem}
              style={{ backgroundColor: firstColor }}
            >
              {/* Only render once a URL resolves: next/image with src="" makes
                  the browser re-request the current page as an image. */}
              {firstImageUrl && (
                <Image
                  src={firstImageUrl}
                  alt="Featured project logo"
                  width="0"
                  height="0"
                  className={styles.image}
                />
              )}
              {/* <div className="bg-[#3E3E3E] absolute w-full h-full -translate-x-full"></div> */}
            </div>
          </Link>
          <Link className={styles.thirdItem} href={""}>
            <div className={styles.logoItem}></div>
          </Link>
          <Link className={styles.fourthItem} href={""}>
            <div className={styles.logoItem}>
              <Image
                src="/assets/images/logos/huddle-logo-white.svg"
                alt="Huddle Project Logo"
                width="0"
                height="0"
                className={styles.image}
              />
              <div className="third-cover"></div>
            </div>
          </Link>
          <div className={styles.fifthItem}>
            <div className={styles.testimonial}>
              <h3>What they saying</h3>
              <p className={styles.quote}>
                &quot;Great person to work with! Did the job faster than the
                initial due date, great service and great communication. Thank
                You!&quot;
              </p>
              <p>Mabel Jones</p>
            </div>
          </div>
          <Link className={styles.sixthItem} href={""}>
            <div className={styles.logoItem}></div>
          </Link>
          <Link className={styles.seventhItem} href={""}>
            <div className={styles.logoItem}></div>
          </Link>
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
