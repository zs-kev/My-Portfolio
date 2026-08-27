import localFont from "next/font/local";

// Each localFont call creates its own single-face family. With no weight
// declared every face landed at 400 while headings ask for 700, so the browser
// synthesised the bold — redrawing each glyph offset, which reads as doubled
// strokes at display sizes. Declaring the real weight gives it a face to match.

// Cerebri Sans Pro Regular Fonts
const sansProRegular = localFont({
  src: "./fonts/CerebriSansPro-Regular.woff2",
  weight: "400",
  variable: "--font-sansProRegular",
});
const sansProMedium = localFont({
  src: "./fonts/CerebriSansPro-Medium.woff2",
  weight: "500",
  variable: "--font-sansProMedium",
});
const sansProSemiBold = localFont({
  src: "./fonts/CerebriSansPro-SemiBold.woff2",
  weight: "600",
  variable: "--font-sansProSemiBold",
});
const sansProBold = localFont({
  src: "./fonts/CerebriSansPro-Bold.woff2",
  weight: "700",
  variable: "--font-sansProBold",
});
const sansProExtraBold = localFont({
  src: "./fonts/CerebriSansPro-ExtraBold.woff2",
  weight: "800",
  variable: "--font-sansProExtraBold",
});

// Cerebri Sans Pro Italic Fonts
const sansProMediumItalic = localFont({
  src: "./fonts/CerebriSansPro-MediumItalic.woff2",
  weight: "500",
  style: "italic",
  variable: "--font-sansProMediumItalic",
});

// Butler Regular Fonts
const butlerMedium = localFont({
  src: "./fonts/Butler_Medium.woff2",
  weight: "500",
  variable: "--font-butlerMedium",
});
const butlerBold = localFont({
  src: "./fonts/Butler_Bold.woff2",
  weight: "700",
  variable: "--font-butlerBold",
});
const butlerBlack = localFont({
  src: "./fonts/Butler_Black.woff2",
  weight: "900",
  variable: "--font-butlerBlack",
});

export {
  sansProRegular,
  sansProMedium,
  sansProSemiBold,
  sansProBold,
  sansProExtraBold,
  sansProMediumItalic,
  butlerMedium,
  butlerBold,
  butlerBlack,
};
