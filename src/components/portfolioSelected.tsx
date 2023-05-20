export const PortfolioSelectedWork = () => {
  return (
    <div className="selected-projects">
      <div className="selected-grid-container">
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(80px,_130px))] grid-rows-[repeat(9,_130px)] gap-[100px]">
          <div>
            <div className="intro-text col-span-[1/3] row-[1/2]">
              <p>Selected Projects</p>
              <p>
                I do everything with my core values of honesty, hard
                work, and trust.
              </p>
            </div>
          </div>
          <div
            id="featured-project"
            className="axio col-span-[3/7] row-[1/4]"
          >
            <div className="first-project">
              <img
                src="assets/images/logos/axio-logo-white.svg"
                alt="axio connect Project Logo"
              />
              <div className="first-cover"></div>
            </div>
          </div>
          <div>
            <div className="second-project col-span-[1/3] row-[2/5]"></div>
          </div>
          <div
            id="featured-project"
            className="huddle col-span-[3/7] row-[4/6]"
          >
            <div className="third-project">
              <img
                src="assets/images/logos/huddle-logo-white.svg"
                alt="Huddle Project Logo"
              />
              <div className="third-cover"></div>
            </div>
          </div>
          <div className="col-span-[1/3] row-[5/7]">
            <div className="testimonial">
              <h3>What they&apos;re saying</h3>
              <p>
                &quot;Great person to work with! Did the job faster
                than the initial due date, great service and great
                communication. Thank You!&quot;
              </p>
              <p>
                <small>Mabel Jones</small>
              </p>
            </div>
          </div>
          <div className="col-span-[1/4] row-[7/10]">
            <div className="forth-project"></div>
          </div>
          <div
            id="featured-project"
            className="kevin col-span-[4/7] row-[6/9]"
          >
            <div className="fith-project">
              <img
                src="assets/images/logos/kevin-logo-white.svg"
                alt="kevin Project Logo"
              />
              <div className="overlay"></div>
            </div>
          </div>
          <div className="col-span-[4/7] row-end-[9]">
            <div className="see-all">
              <a href="#">
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
