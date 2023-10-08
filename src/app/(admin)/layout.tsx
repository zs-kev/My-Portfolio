import { Providers } from "../../lib/providers/ThemeProvider/providers";
import {
  butlerBlack,
  butlerBold,
  butlerMedium,
  sansProBold,
  sansProExtraBold,
  sansProMedium,
  sansProMediumItalic,
  sansProRegular,
  sansProSemiBold,
} from "../../styles/fonts";
import "../../styles/globals.css";

const fonts = `${sansProRegular.variable} ${sansProMedium.variable} ${sansProSemiBold.variable} ${sansProBold.variable} ${sansProExtraBold.variable} ${sansProMediumItalic.variable} ${butlerMedium.variable} ${butlerBold.variable} ${butlerBlack.variable}`;

export const metadata = {
  title: "Kevin Simon Studio",
  description: "Kevin Simon Studio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={fonts}>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
