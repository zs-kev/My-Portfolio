import PortfolioList from "@/components/portfolio/allItems/PortfolioList";
import { client } from "@/lib/sanity.client";
import { groq } from "next-sanity";

const query = groq`
*[_type=='post'] | order(_createdAt desc) {
  slug,
  client->{
    title,
  },
  categories[]->{
    title
  }
}
`;

export default async function Portfolio() {
  const posts = await client.fetch(query);

  return (
    <>
      <section>
        <h1>Bigger. Bolder. Better.</h1>
        <p>
          I work with people who are as dedicated to their craft as I am to
          mine. And, I do everything with my core values of honesty, hard work,
          and trust.
        </p>
        <PortfolioList posts={posts} />
      </section>
    </>
  );
}
