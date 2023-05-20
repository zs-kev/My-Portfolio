import { PortfolioSelectedWork } from '@/components/portfolioSelected';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <section className="h-screen relative">
        <div>
          <p className="font-sansProExtraBold text-5xl absolute bottom-[50%] -translate-y-[250%] left-[50%] -translate-x-[225%] text-gray tracking-tighter">
            Hello, I am
          </p>
          <h1 className="text-[12.5rem] absolute bottom-[50%] translate-y-[50%] left-[50%] -translate-x-[120%] z-20 bg-gradient-to-b from-pumpkin to-pink inline-block text-transparent bg-clip-text">
            Kevin
          </h1>
          <h2 className="bg-gradient-to-b from-pumpkin to-pink inline-block text-transparent bg-clip-text text-[12.5rem] absolute bottom-[50%] translate-y-[50%] left-[50%] translate-x-[10%] z-[1]">
            Simon
          </h2>
          <div className="absolute bottom-[50%] translate-y-[250%] left-[50%] translate-x-[110%]">
            <div className="max-w-sm  ">
              <p className="text-gray font-sansProBold text-xl">
                I am an aspiring full-stack developer based in South
                Africa. With a growing expertise in front-end and
                back-end technologies.
              </p>
            </div>
          </div>
          <Link
            href={'#about-home'}
            className="uppercase tracking-[0.2em] text-xs font-sansProBold w-36 h-36 dark:bg-white bg-black dark:text-black text-white rounded-full bottom-[20%] left-[50%] -translate-x-[425%] absolute flex justify-center items-center"
          >
            <span>Let&apos;s Meet</span>
          </Link>
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
        <div className="max-w-3xl m-[0_0_0_auto]">
          <p className="text-3xl font-sansProExtraBold mb-6">
            I am a self-taught web developer based in vibrant
            Johannesburg, South Africa. With a deep passion for
            creating beautiful and engaging websites, I thrive on
            taking projects from a blank code editor and watching them
            grow alongside my skills.
          </p>
          <p className="text-3xl font-sansProExtraBold">
            Front-end development with React and Next.js truly
            captivates me, but what drives me even more is the
            opportunity to infuse everything I do with my core values
            of honesty, hard work, and trust. With these values as my
            compass, I strive to deliver exceptional digital
            experiences that leave a lasting impact.
          </p>
        </div>
      </section>
      <PortfolioSelectedWork />
    </>
  );
}
