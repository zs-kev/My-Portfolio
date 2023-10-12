import Link from "next/link";

export interface PortfolioListProps {
  posts: any;
}

const PortfolioList: React.FC<PortfolioListProps> = ({ posts }) => {
  return (
    <div>
      {posts.map((post: any) => (
        <Link href={post.slug.current} key={post.title}>
          <h3>{post.client.title}</h3>
          {post.categories.map((category: any, index: number) => (
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
