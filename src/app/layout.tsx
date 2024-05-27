import React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextAuthProvider from "./SessionProvider";
import clsx from "clsx";
import LogoSvg from "@assets/icons/main_icon.svg";

const inter = Inter({ subsets: ["latin"] });
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export const metadata: Metadata = {
  title: "Motoo",
  description: "주식 모의투자",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="kr">
      <body className={clsx(inter.className, "bg-primary-150 h-screen")}>
        {/* FIXME 주석 해제 시 오류발생 */}
        {/* <QueryClientProvider client={new QueryClient()}> */}
        <NextAuthProvider>
          <div className="flex h-full">
            <aside
              className="hidden top-1/2 fixed transform -translate-y-1/2
              lg:flex flex-col items-center justify-center w-4/12 
              text-primary-500
            "
            >
              <LogoSvg className="w-20 h-20 transfrom rotate-45" />
              <h1>모투</h1>
            </aside>
            <main className="m-auto w-full sm:w-9/12 md:w-6/12 lg:w-5/12 lg:translate-x-20 h-screen overflow-hidden">
              {children}
            </main>
          </div>
        </NextAuthProvider>
        {/* </QueryClientProvider> */}
      </body>
    </html>
  );
}
