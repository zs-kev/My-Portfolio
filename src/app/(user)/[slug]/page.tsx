import { client } from "@/lib/sanity.client";
import { groq } from "next-sanity";
import Link from "next/link";

type Props = {
  params: {
    slug: string;
  };
};

export default async function PortfolioPiece({ params: { slug } }: Props) {
  const query = groq`
    *[_type=='post' && slug.current == $slug][0] {
        ...,
        author->,
       client->,
       categories[]->{
        title,
       }
    }
`;

  const post = await client.fetch(query, { slug });
  console.log(post);

  return (
    <>
      <section>
        <p>{post.client.title}</p>
        <h1>{post.title}</h1>
        <div>
          <div>
            <div>
              <p>Made by</p>
              <p>{post.author.name}</p>
            </div>
            <div>
              <p>Client</p>
              <p>{post.client.title}</p>
            </div>
            <div>
              <p>Date</p>
              <p>{post.CompletedAt}</p>
            </div>
            <div>
              <p>Role</p>
              {post.categories.map((category: any, index: number) => (
                <p key={index}>{category.title}</p>
              ))}
            </div>
          </div>
          <div>
            <div />
            <div>
              <p>{post.description}</p>
            </div>
          </div>
        </div>
        <div>
          {post.websiteUrl && (
            <Link href={post.websiteUrl}>
              Visit Website <div />
            </Link>
          )}
          {post.githubUrl && (
            <Link href={post.githubUrl}>
              Visit Github <div />
            </Link>
          )}
        </div>
      </section>
    </>
  );
}
