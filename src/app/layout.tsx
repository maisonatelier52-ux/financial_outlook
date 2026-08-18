import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ReadingProgress from "@/components/ReadingProgress/ReadingProgress";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

import { getAllArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "newsTimes",
  description: "Independent journalism for a world in motion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const allArticles = getAllArticles();
  const latestNews = allArticles.slice(0, 5).map(a => ({ headline: a.headline, slug: a.slug }));

  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <ReadingProgress />
        <Header latestNews={latestNews} />
        <main style={{ }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
