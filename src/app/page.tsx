import { PortfolioSelectedWork } from '@/components/portfolioSelected';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <section className="h-screen relative">
        <div className="grid place-content-center h-full gap-x-[8%]">
          <p className="font-sansProExtraBold text-5xl text-gray tracking-tighter mt-24 ml-40">
            Hello, I am
          </p>
          <h1 className="text-[12.5rem] bg-gradient-to-b from-pumpkin to-pink inline-block text-transparent bg-clip-text relative z-20 row-start-2 leading-tight">
            Kevin
          </h1>
          <h2 className="bg-gradient-to-b from-pumpkin to-pink inline-block text-transparent bg-clip-text text-[12.5rem] relative z-10 row-start-2 leading-tight">
            Simon
          </h2>
          <div className="flex flex-row-reverse justify-between row-start-3">
            <div className="max-w-[18rem]">
              <p className="text-gray font-sansProBold text-xl relative left-[15%]">
                I am an aspiring full-stack developer based in South
                Africa. With a growing expertise in front-end and
                back-end technologies.
              </p>
            </div>
          </div>
          <div className="relative row-start-3 col-start-1">
            <Link
              href={'#about-home'}
              className="uppercase tracking-[0.2em] text-xs font-sansProBold w-36 h-36 dark:bg-white bg-black dark:text-black text-white rounded-full flex justify-center items-center absolute left-8 top-32"
            >
              <span>Let&apos;s Meet</span>
            </Link>
          </div>
          <div className="absolute bottom-0 left-2/4 -translate-x-2/4 z-10">
            <Image
              src={'/assets/images/kevin-simon.png'}
              alt={'Kevin Simon Portrait'}
              priority
              width="0"
              height="0"
              sizes="100vw"
              className="w-auto max-w-none h-[85vh]"
            />
          </div>
        </div>
        <div className="absolute left-2/4 -translate-x-2/4 w-60 h-72 dark:bg-white bg-black z-0 rounded-full blur-[150px] bottom-60"></div>
      </section>

      <section
        id="about-home"
        className="dark:bg-night bg-seasalt py-24"
      >
        <div className="max-w-6xl m-auto">
          <div className="max-w-3xl m-[0_0_0_auto]">
            <p className="text-3xl font-sansProExtraBold mb-6">
              I am a self-taught web developer based in vibrant
              Johannesburg, South Africa. With a deep passion for
              creating beautiful and engaging websites, I thrive on
              taking projects from a blank code editor and watching
              them grow alongside my skills.
            </p>
            <p className="text-3xl font-sansProExtraBold">
              Front-end development with React and Next.js truly
              captivates me, but what drives me even more is the
              opportunity to infuse everything I do with my core
              values of honesty, hard work, and trust. With these
              values as my compass, I strive to deliver exceptional
              digital experiences that leave a lasting impact.
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
