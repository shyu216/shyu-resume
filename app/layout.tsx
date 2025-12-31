import ThemeProvider from "@/components/theme/theme-provider";
import "./globals.css";
import type { Metadata } from "next";
import { Header } from "@/app/header";
import { Footer } from "@/app/footer";
import LanguageProvider from "@/components/lang/language-provider";

export const metadata: Metadata = {
  title: "SIHONG's Resume",
  description: "A Resume",
  keywords: "YUSIHONG, SIHONG, Resume, CV, Portfolio, 余思宏",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pageTitle = "SIHONG's Resume";

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
            <div className="pointer-events-none fixed inset-0 select-none bg-[url('/grid-red.svg')] bg-top bg-repeat dark:bg-[url('/grid.svg')]" />
            <span className="pointer-events-none fixed top-0 block h-[800px] w-full select-none bg-[radial-gradient(103.72%_46.58%_at_50%_0%,rgba(5,5,5,0.045)_0%,rgba(0,0,0,0)_100%)] dark:bg-[radial-gradient(103.72%_46.58%_at_50%_0%,rgba(255,255,255,0.09)_0%,rgba(255,255,255,0)_100%)]" />

            <div className="fixed inset-0 flex justify-center sm:px-8">
              <div className="flex w-full max-w-7xl lg:px-8">
                <div className="w-full bg-mygray-50/90 ring-1 ring-mygray-100 dark:bg-mygray-900/80 dark:ring-mygray-400/20" />
              </div>
            </div>

            <div className="relative text-mygray-600 dark:text-mygray-200">
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
