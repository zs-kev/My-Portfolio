import urlFor from "@/lib/urlFor";
import Image from "next/image";
import Link from "next/link";

export interface PortfolioListProps {
  portfolioItems: any;
}

const PortfolioList: React.FC<PortfolioListProps> = ({ portfolioItems }) => {
  return (
    <div>
      {portfolioItems.map((item: any) => (
        <Link href={item.slug.current} key={item.title}>
          <div>
            <Image
              src={urlFor(item.featureImage.asset).url()}
              alt=""
              width={271}
              height={99}
            />
          </div>
          <h3>{item.client.title}</h3>
          {item.categories.map((category: any, index: number) => (
            <div key={index}>
              <p>{category.title}</p>
            </div>
          ))}
        </Link>
      ))}
    </div>
  );
};

export default PortfolioList;
