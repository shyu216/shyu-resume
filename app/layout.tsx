import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme/theme-provider";
import "@/styles/globals.css";
import "@/styles/variables.css";
import "@/styles/base.css";
import "@/styles/resume.css";
import "@/styles/background.css";
import "@/styles/utilities.css";
import "@/styles/print.css";
import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FloatingActionButton } from "@/components/floating-action-button";
import { LanguageProvider } from "@/components/lang/language-provider";
import { JobTypeProvider } from "@/components/job/job-type-provider";
import { DynamicTitle } from "@/components/dynamic-title";
import { siteConfig } from "@/content/config";
import { PrintProvider } from "@/components/print-provider";

const lxgwWenKai = localFont({
  src: "../public/fonts/LXGWWenKaiTC-Regular.ttf",
  display: "swap",
  weight: "normal",
  style: "normal",
  variable: "--font-lxgw",
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: siteConfig.keywords.join(", "),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pageTitle = siteConfig.title;

  return (
    <html
      lang="en"
      className={`m-0 h-full p-0 antialiased ${lxgwWenKai.variable}`}
      suppressHydrationWarning
    >
      <head>
        <title>{pageTitle}</title>
      </head>
      <body className="flex h-full flex-col">
        <LanguageProvider>
          <JobTypeProvider>
            <ThemeProvider attribute="class" defaultTheme="system">
              <PrintProvider>
                <DynamicTitle />
                <div className="bg-grid-pattern" />
                <span className="bg-radial-glow" />

                <div className="fixed inset-0 flex justify-center sm:px-8">
                  <div className="flex w-full max-w-7xl lg:px-8">
                    <div className="bg-page-container" />
                  </div>
                </div>

                <div className="relative text-stone-700 dark:text-stone-300">
                  <Header />
                  <main>{children}</main>
                  <FloatingActionButton />
                  <Footer />
                </div>
              </PrintProvider>
            </ThemeProvider>
          </JobTypeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
