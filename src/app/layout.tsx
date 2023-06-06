import Footer from "@/components/footer";
import { Header } from "@/components/header/header";
import { Providers } from "../lib/providers/ThemeProvider/providers";
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
} from "../styles/fonts";
import "./globals.css";

const fonts = `${sansProRegular.variable} ${sansProMedium.variable} ${sansProSemiBold.variable} ${sansProBold.variable} ${sansProExtraBold.variable} ${sansProMediumItalic.variable} ${butlerMedium.variable} ${butlerBold.variable} ${butlerBlack.variable}`;

export const metadata = {
  title: "Kevin Simon",
  description: "My Portfolio Website",
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
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
