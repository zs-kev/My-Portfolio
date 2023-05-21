import Image from 'next/image';

export const PortfolioSelectedWork = () => {
  return (
    <div className="max-w-6xl py-24 m-auto">
      <div className="w-full">
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(80px,_130px))] grid-rows-[repeat(9,_130px)] gap-24">
          <div className="col-[1/3] row-[1/2]">
            <div className="max-w-xs text-right">
              <p className="text-[0.6rem] text-gray uppercase mb-4 tracking-widest">
                Selected Projects
              </p>
              <p className="font-butlerMedium text-2xl">
                I do everything with my core values of honesty, hard
                work, and trust.
              </p>
            </div>
          </div>
          <div className="col-[3/7] row-[1/4]">
            <div className="h-full w-full bg-[#F93822] flex items-center justify-center relative overflow-hidden ">
              <Image
                src="/assets/images/logos/axio-logo-white.svg"
                alt="axio connect Project Logo"
                width="0"
                height="0"
                className="relative z-[1] w-full p-[20%]"
              />
              {/* <div className="bg-[#3E3E3E] absolute w-full h-full -translate-x-full"></div> */}
            </div>
          </div>
          <div className="col-[1/3] row-[2/5]">
            <div className="bg-[#9192A4] w-full h-full flex items-center justify-center relative overflow-hidden"></div>
          </div>
          <div className="col-[3/7] row-[4/6]">
            <div className="bg-[#00252e] w-full h-full flex items-center justify-center relative overflow-hidden">
              <Image
                src="/assets/images/logos/huddle-logo-white.svg"
                alt="Huddle Project Logo"
                width="0"
                height="0"
                className="relative z-[1] w-full h-full p-[20%]"
              />
              <div className="third-cover"></div>
            </div>
          </div>
          <div className="col-[1/3] row-[5/7] self-center">
            <div className="max-w-xs text-right">
              <h3 className="text-6xl font-butlerBold mb-8">
                What they saying
              </h3>
              <p className="text-gray font-sansProMediumItalic mb-8">
                &quot;Great person to work with! Did the job faster
                than the initial due date, great service and great
                communication. Thank You!&quot;
              </p>
              <p className="font-sansProBold uppercase text-xs">
                <small>Mabel Jones</small>
              </p>
            </div>
          </div>
          <div className="col-[1/4] row-[7/10]">
            <div className="bg-[#9192A4] w-full h-full"></div>
          </div>
          <div className="col-[4/7] row-[6/9]">
            <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-black">
              <Image
                src=""
                alt="kevin Project Logo"
                width="0"
                height="0"
              />
              <div className="overlay"></div>
            </div>
          </div>
          <div className="col-[4/7] row-start-[9] self-end">
            <div className="see-all">
              <a href="#" className="uppercase font-sansProBold">
                See all Projects
                <div></div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
