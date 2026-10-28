import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Police très propre type "Inter"
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider"; // On va le créer juste après

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mon Portfolio | Développeur Web",
  description: "Portfolio de développeur Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100`}>
        {/* Le ThemeProvider permet de gérer le mode sombre sur tout le site */}
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
        </ThemeProvider>
      </body>
    </html>
  );
}