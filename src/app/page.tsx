import Image from 'next/image';

export default function Home() {
  return (
    <div className="h-screen relative pointer-events-none">
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
        <div className="max-w-md absolute bottom-[50%] translate-y-[250%] left-[50%] translate-x-[80%]">
          <p className="text-gray font-sansProBold">
            I am an aspiring full-stack developer based in South
            Africa. With a growing expertise in front-end and back-end
            technologies, I&apos;m passionate about creating dynamic
            and engaging web applications.
          </p>
        </div>
        <div className="absolute bottom-0 left-2/4 -translate-x-2/4 z-10">
          <Image
            src={'/assets/images/kevin-simon.png'}
            alt={'Kevin Simon Portrait'}
            priority
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-[85vh]"
          />
        </div>
      </div>
      <div className="absolute left-2/4 -translate-x-2/4 w-60 h-72 dark:bg-white bg-black z-0 rounded-full blur-[150px] bottom-60"></div>
    </div>
  );
}
