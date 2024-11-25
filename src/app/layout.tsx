import type { Metadata } from "next";
import "./globals.css";
import ResponsiveAppBar from "./components/navbar/Navbar";

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
      <body>
        <header>
            <ResponsiveAppBar />
        </header>
        
        {children}
      </body>
    </html>
  );
}
