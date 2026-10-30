import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kavin Deshpande — Software Engineer",
  description: "Computer Engineering student building practical AI, NLP and full-stack systems.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
