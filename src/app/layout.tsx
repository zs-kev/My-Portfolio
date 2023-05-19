import { Header } from '@/components/header';
import './globals.css';
import { Footer } from '@/components/footer';
import { Providers } from './providers';
import {
  sansProRegular,
  sansProMedium,
  sansProSemiBold,
  sansProBold,
  sansProExtraBold,
  sansProMediumItalic,
  butlerMedium,
  butlerBold,
  butlerBlack,
} from '../styles/fonts';

const fonts = `${sansProRegular.variable} ${sansProMedium.variable} ${sansProSemiBold.variable} ${sansProBold.variable} ${sansProExtraBold.variable} ${sansProMediumItalic.variable} ${butlerMedium.variable} ${butlerBold.variable} ${butlerBlack.variable}`;

export const metadata = {
  title: 'Kevin Simon',
  description: 'My Portfolio Website',
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
