import HomeHero from "@/components/hero/homeHero/HomeHero";
import { PortfolioSelectedWork } from "@/components/portfolioSelected";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <HomeHero />
      <section id="about-home" className="dark:bg-night bg-seasalt py-24">
        <div className="max-w-6xl m-auto">
          <div className="max-w-3xl m-[0_0_0_auto]">
            <p className="text-3xl font-sansProExtraBold mb-6">
              I am a self-taught web developer based in vibrant Johannesburg,
              South Africa. With a deep passion for creating beautiful and
              engaging websites, I thrive on taking projects from a blank code
              editor and watching them grow alongside my skills.
            </p>
            <p className="text-3xl font-sansProExtraBold">
              Front-end development with React and Next.js truly captivates me,
              but what drives me even more is the opportunity to infuse
              everything I do with my core values of honesty, hard work, and
              trust. With these values as my compass, I strive to deliver
              exceptional digital experiences that leave a lasting impact.
            </p>
            <div className="flex justify-between mt-16">
              <Image
                src="/assets/images/kevin-simon-sig.svg"
                alt="Kevin Simon"
                width="0"
                height="0"
                className="h-full w-44"
              />
              <div className="see-all">
                <a href="#" className="uppercase font-sansProBold">
                  About Me
                  <div></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <PortfolioSelectedWork />
      </section>
    </>
  );
}
