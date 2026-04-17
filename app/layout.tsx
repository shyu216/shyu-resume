import { ThemeProvider } from "@/components/theme/theme-provider";
import "./globals.css";
import "./bg-styles/backgrounds.css";
import "./pdf-styles/pdf-styles.css";
import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { LanguageProvider } from "@/components/lang/language-provider";
import { JobTypeProvider } from "@/components/job/job-type-provider";
import { DynamicTitle } from "@/components/dynamic-title";
import { siteConfig } from "@/content/config";
import { PrintProvider } from "@/components/print-provider";
import { BgStyleProvider } from "@/app/bg-styles/bg-style-provider";
import { PdfStyleProvider } from "@/app/pdf-styles/pdf-style-provider";

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
      className="m-0 h-full p-0 antialiased"
      suppressHydrationWarning
    >
      <head>
        <title>{pageTitle}</title>
      </head>
      <body className="flex h-full flex-col">
        <LanguageProvider>
          <JobTypeProvider>
            <ThemeProvider attribute="class" defaultTheme="system">
              <BgStyleProvider>
                <PdfStyleProvider>
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
                      <Footer />
                    </div>
                  </PrintProvider>
                </PdfStyleProvider>
              </BgStyleProvider>
            </ThemeProvider>
          </JobTypeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
