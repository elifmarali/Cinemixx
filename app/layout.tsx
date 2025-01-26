"use client";
import { Inter } from "@next/font/google";
import "@/styles/reset.css";
import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/context/providers";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <AppRouterCacheProvider options={{ key: "css" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Providers>
            <body className="homeContainer">
              <Header />
              <main>{children}</main>
              <Footer />
            </body>
          </Providers>
        </LocalizationProvider>
      </AppRouterCacheProvider>
    </html>
  );
}
