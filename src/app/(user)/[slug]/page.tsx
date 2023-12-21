import ButtonUnderline from "@/components/buttons/underlineButton/ButtonUnderLine";
import { client } from "@/lib/sanity.client";
import { groq } from "next-sanity";
import styles from "./page.module.css";

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
  console.log(post.theChallenge);

  return (
    <>
      <section className={styles.heroWrapper}>
        <div className="max-width-wrapper">
          <p className={styles.clientTitle}>{post.client.title}</p>
          <h1>{post.title}</h1>
          <div className={styles.infoWrapper}>
            <div className={styles.infoDetails}>
              <div>
                <p className={styles.infoDetailsHeading}>Made by</p>
                <p className={styles.infoDetailsText}>{post.author.name}</p>
              </div>
              <div>
                <p className={styles.infoDetailsHeading}>Client</p>
                <p className={styles.infoDetailsText}>{post.client.title}</p>
              </div>
              <div>
                <p className={styles.infoDetailsHeading}>Date</p>
                <p className={styles.infoDetailsText}>{post.CompletedAt}</p>
              </div>
              <div>
                <p className={styles.infoDetailsHeading}>Role</p>
                <div className={styles.infoDetailsCat}>
                  {post.categories.map((category: any, index: number) => (
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
    </>
  );
}
