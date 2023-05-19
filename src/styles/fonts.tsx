import localFont from 'next/font/local';

// Cerebri Sans Pro Regular Fonts
const sansProRegular = localFont({
  src: './fonts/CerebriSansPro-Regular.ttf',
  variable: '--font-sansProRegular',
});
const sansProMedium = localFont({
  src: './fonts/CerebriSansPro-Medium.ttf',
  variable: '--font-sansProMedium',
});
const sansProSemiBold = localFont({
  src: './fonts/CerebriSansPro-SemiBold.ttf',
  variable: '--font-sansProSemiBold',
});
const sansProBold = localFont({
  src: './fonts/CerebriSansPro-Bold.ttf',
  variable: '--font-sansProBold',
});
const sansProExtraBold = localFont({
  src: './fonts/CerebriSansPro-ExtraBold.ttf',
  variable: '--font-sansProExtraBold',
});

// Cerebri Sans Pro Italic Fonts
const sansProMediumItalic = localFont({
  src: './fonts/CerebriSansPro-MediumItalic.ttf',
  variable: '--font-sansProMediumItalic',
});

// Butler Regular Fonts
const butlerMedium = localFont({
  src: './fonts/Butler_Medium.ttf',
  variable: '--font-butlerMedium',
});
const butlerBold = localFont({
  src: './fonts/Butler_Bold.ttf',
  variable: '--font-butlerBold',
});
const butlerBlack = localFont({
  src: './fonts/Butler_Black.ttf',
  variable: '--font-butlerBlack',
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
