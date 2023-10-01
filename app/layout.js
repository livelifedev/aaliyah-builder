import Head from "next/head";
import localFont from "next/font/local";
import { Hammersmith_One, Poppins } from "next/font/google";
import "./globals.css";

const breathing = localFont({
  src: "../fonts/Breathing.ttf",
  variable: "--primary-font",
});
const hammersmithOne = Hammersmith_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--secondary-font",
});
const poppins = Poppins({
  weight: ["400", "600"],
  style: ["italic", "normal"],
  subsets: ["latin"],
  variable: "--tertiary-font",
});

export const metadata = {
  title: "Aaliyah Rubio",
  description: "Aaliyah Rubio - Holistic therapy positive psychology coach",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>Aaliyah Rubio</title>
        <meta
          name="description"
          content="Aaliyah Rubio - Holistic therapy positive psychology coach"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body
        className={[
          hammersmithOne.variable,
          poppins.variable,
          breathing.variable,
        ].join(" ")}
      >
        {children}
      </body>
    </html>
  );
}
