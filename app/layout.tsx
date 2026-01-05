import ThemeProvider from "@/components/theme/theme-provider";
import "./globals.css";
import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import LanguageProvider from "@/components/lang/language-provider";
import grid from "@/public/grid.svg";

export const metadata: Metadata = {
  title: "ShYu Resume",
  description: "A Resume",
  keywords: "YUSIHONG, SIHONG, Resume, CV, Portfolio, 余思宏",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pageTitle = "ShYu Resume";

  return (
    <html
      lang="en"
      className="m-0 h-full p-0 antialiased"
      suppressHydrationWarning
    >
      <head>
        <title>{pageTitle}</title>
      </head>
      <body className="flex h-full flex-col">
        <LanguageProvider>
          <ThemeProvider attribute="class" defaultTheme="system">
            <div
              className="pointer-events-none fixed inset-0 select-none bg-top bg-repeat invert brightness-10 dark:invert-0 dark:brightness-100"
              style={{
                backgroundImage: `url(${grid.src})`,
              }}
            />

            <span className="pointer-events-none fixed top-0 block h-[600px] w-full select-none bg-[radial-gradient(103.72%_46.58%_at_50%_0%,rgba(34,197,94,0.5)_0%,rgba(0,0,0,0)_100%)] dark:bg-[radial-gradient(103.72%_46.58%_at_50%_0%,rgba(59,130,246,0.5)_0%,rgba(255,255,255,0)_100%)]" />

            <div className="fixed inset-0 flex justify-center sm:px-8">
              <div className="flex w-full max-w-7xl lg:px-8">
                <div className="w-full bg-stone-50/70 ring-1 ring-stone-500/50 dark:bg-stone-900/80" />
              </div>
            </div>

            <div className="relative text-stone-700 dark:text-stone-300">
              <Header />
              <main>{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
