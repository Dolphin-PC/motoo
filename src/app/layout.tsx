import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
      <body className={inter.className}>
        {/* FIXME 주석 해제 시 오류발생 */}
        {/* <QueryClientProvider client={new QueryClient()}> */}
        {children}
        {/* </QueryClientProvider> */}
      </body>
    </html>
  );
}
