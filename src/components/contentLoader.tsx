"use client";

import ContentLoader from "react-content-loader";

export const LightDarkLoader = () => (
  <ContentLoader
    speed={2}
    width={122}
    height={34}
    viewBox="0 0 122 34"
    backgroundColor="#C6C6CC"
    foregroundColor="#A8A9BA"
  >
    <rect x="8" y="10" rx="3" ry="3" width="34" height="20" />
    <rect x="46" y="18" rx="3" ry="3" width="30" height="4" />
    <rect x="88" y="10" rx="3" ry="3" width="34" height="20" />
    <circle cx="73" cy="20" r="7" />
  </ContentLoader>
);
