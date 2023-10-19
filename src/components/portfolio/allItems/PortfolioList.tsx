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
        <Link href={item.slug.current} key={item.title}>
          <div>
            <Image
              src={urlFor(item.featureImage.asset).url()}
              alt=""
              width={330}
              height={400}
            />
          </div>
          <h3>{item.client.title}</h3>
          <div className={styles.categoryWrapper}>
            {item.categories.map((category: any, index: number) => (
              <p key={index}>{category.title}</p>
            ))}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PortfolioList;
