export type FeaturedProject = {
  title?: string;
  slug?: {
    current: string;
  };
  client?: {
    title?: string;
    altLogo?: Image & { dimensions?: ImageDimensions };
    clientColorPrimary?: Color;
  };
};

// Sanity records these on upload. They are projected alongside the logo so
// <Image> can be given a real aspect ratio instead of 0x0.
export type ImageDimensions = {
  width?: number;
  height?: number;
};

// Every level is optional on purpose. A Featured document can be saved with a
// slot empty, a slot can point at a deleted project, and a client may have no
// alt logo or brand colour. Declaring these as always-present is what let
// unguarded access typecheck and then throw at runtime.
export type FeaturedPostType = {
  _id: string;
  testimonialQuote?: string;
  testimonialName?: string;
  testimonialRole?: string;
  featuredOne?: FeaturedProject;
  featuredTwo?: FeaturedProject;
  featuredThree?: FeaturedProject;
  featuredFour?: FeaturedProject;
  featuredFive?: FeaturedProject;
};

interface Image {
  alt: string;
  _type: "image";
  asset: Reference;
}

interface Reference {
  _ref: string;
  _type: "reference";
}

interface Color {
  alpha: number;
  hex: string;
  hsl: {
    h: number;
    l: number;
    a: number;
    s: number;
    _type: string;
  };
  hsv: {
    v: number;
    _type: string;
    h: number;
    a: number;
    s: number;
  };
  rgb: {
    _type: string;
    a: number;
    b: number;
    r: number;
    g: number;
  };
  _type: string;
}
