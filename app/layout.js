import "./globals.css";
import { Hammersmith_One, Poppins } from "@next/font/google";

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
