import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/navigation/navbar";
import AuthInitializer from "@/components/authInitializer";


const roboto = Roboto({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PickOnePlay",
  description: "PickOnePlay is a 'would you rather' game",
};

/* COLORS

background: bg-slate-950
secondary background: bg-slate-900

text: text-white
secondary text: text-gray-300

main: text-cyan-300
secondary color: text-red-400

*/

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} background2 text-text1 flex flex-col min-h-screen `}
      >
        <AuthInitializer />

        <Navbar />

        <div className="flex flex-1 flex-col pt-16 md:pt-17 lg:pt-18">
          {children}
        </div>

        <Footer />
      </body>
    </html>
  );
}
