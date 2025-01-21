import { Inter } from "@next/font/google";
import "@/styles/reset.css";
import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Netfilm",
  description: "Stream the latest movies, TV shows, and exclusive series on Netfilm. Enjoy unlimited entertainment on any device, anytime, anywhere."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="homeContainer">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
