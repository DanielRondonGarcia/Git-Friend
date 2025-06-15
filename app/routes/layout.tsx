import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Git Friend - Make Git Simple Again",
  description:
    "Git Friend simplifies complex Git workflows, making version control intuitive and collaborative for developers of all skill levels.",
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
              <Suspense>{children}</Suspense>
              <Toaster />
            </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
