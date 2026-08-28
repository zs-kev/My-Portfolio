import urlFor from "@/lib/urlFor";
import Image from "next/image";
import Link from "next/link";
import styles from "./PortfolioList.module.css";

export interface PortfolioListProps {
  portfolioItems: any;
}

const PortfolioList: React.FC<PortfolioListProps> = ({ portfolioItems }) => {
  return (
    <div className={styles.portfolioList}>
      {portfolioItems.map((item: any) => (
        // key was item.title, which the query never selected — every key was
        // undefined, so React reconciled by index and mutated nodes in place
        // when the CMS order changed. href was a bare slug relying on relative
        // resolution.
        <Link
          href={`/${item.slug?.current}`}
          key={item._id ?? item.slug?.current}
        >
          <div>
            <Image
              src={urlFor(item.featureImage.asset).url()}
              // alt="" declares an image decorative. These are the primary
              // content of the page and the proof of the work.
              alt={
                item.featureImage?.alt ??
                `${item.title ?? item.client?.title} project screenshot`
              }
              width={330}
              height={400}
            />
          </div>
          {/* The project title was never fetched, so every card was headed by
              the client name and each internal link carried no descriptive
              anchor text about the work itself. */}
          <h3>{item.title ?? item.client?.title}</h3>
          {item.title && item.client?.title && (
            <p className={styles.clientName}>{item.client.title}</p>
          )}
          <div className={styles.categoryWrapper}>
            {(item.categories ?? []).map((category: any, index: number) => (
              <p key={index}>{category.title}</p>
            ))}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PortfolioList;
