import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ResponsiveAppBar from "./components/navbar/Navbar";

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
  title: "Todo List",
  description: "App to control todos of the client.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header>
          <ResponsiveAppBar />
        </header>
        
        {children}
      </body>
    </html>
  );
}
