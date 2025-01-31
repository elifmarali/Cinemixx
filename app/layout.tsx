"use client";
import "@/styles/reset.css";
import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/context/providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
          <Providers>
            <body className={`homeContainer`}>
              <Header />
              <main>{children}</main>
              <Footer />
            </body>
          </Providers>
    </html>
  );
}
