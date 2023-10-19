export type FeaturedPostType = {
  _id: string;
  featuredOne: {
    client: {
      altLogo: Image;
      clientColorPrimary: Color;
    };
    slug: {
      current: string;
      _type: string;
    };
    _type: string;
  };
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
