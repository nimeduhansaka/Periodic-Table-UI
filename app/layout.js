import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bodyClassName = `${geistSans.variable} ${geistMono.variable} antialiased`.trim();

export const metadata = {
  title: "Periodic Table",
  description: "Minimalist animated periodic table with user-contributed details",
  icon: "/icon.svg",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={bodyClassName}>
        {children}
      </body>
    </html>
  );
}
