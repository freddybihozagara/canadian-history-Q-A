import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Canadian History Q&A",
  description: "Learn about Canadian History through Q&A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="bg-blue-600 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-white font-bold text-xl">
              Canadian History Q&A
            </Link>
            <div className="space-x-4">
              <Link href="/askAi" className="text-white hover:text-blue-200">
                Ask AI
              </Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
