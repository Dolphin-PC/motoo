import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SessionProvider from "./SessionProvider";
import clsx from "clsx";
import LogoSvg from "@assets/icons/main_icon.svg";

const inter = Inter({ subsets: ["latin"] });

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
        <SessionProvider>
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
            <main className="m-auto w-full sm:w-9/12 md:w-6/12 lg:w-5/12 lg:translate-x-20 bg-white h-screen overflow-auto">
              {children}
            </main>
          </div>
        </SessionProvider>
        {/* </QueryClientProvider> */}
      </body>
    </html>
  );
}
