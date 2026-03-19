import ThemeProvider from "@/components/theme/theme-provider";
import "./globals.css";
import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import LanguageProvider from "@/components/lang/language-provider";
import { JobTypeProvider } from "@/components/job/job-type-provider";
import { FontProvider } from "@/components/font/font-provider";
import { FontContextProvider } from "@/components/font/font-context-provider";
import { ColorProvider } from "@/components/color/color-provider";
import { ColorContextProvider } from "@/components/color/color-context-provider";
import { SummaryEditProvider } from "@/components/summary/summary-edit-provider";
import { HeaderWithEdit } from "@/components/header-with-edit";
import { siteConfig } from "@/content/config";

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

  const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <FontProvider>
      <FontContextProvider>
        <ColorProvider>
          <ColorContextProvider>
            {children}
          </ColorContextProvider>
        </ColorProvider>
      </FontContextProvider>
    </FontProvider>
  );
};

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
            <AllProviders>
              <ThemeProvider attribute="class" defaultTheme="system">
                <SummaryEditProvider>
                  <div className="bg-grid-pattern" />
                  <span className="bg-radial-glow" />

                  <div className="fixed inset-0 flex justify-center sm:px-8">
                    <div className="flex w-full max-w-7xl lg:px-8">
                      <div className="bg-page-container" />
                    </div>
                  </div>

                  <div className="relative text-stone-700 dark:text-stone-300">
                    <HeaderWithEdit />
                    <main>{children}</main>
                    <Footer />
                  </div>
                </SummaryEditProvider>
              </ThemeProvider>
            </AllProviders>
          </JobTypeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
