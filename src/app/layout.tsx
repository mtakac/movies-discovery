import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Movie App",
  description: "Interview project",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-[#111828]`}>
        <div className="p-5 max-w-6xl mx-auto bg-gray-900 min-h-screen text-white">
          <div className="flex flex-col gap-8 w-full">
            <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
              Movie discovery
            </h1>
            {children}
            {modal}
          </div>
        </div>
      </body>
    </html>
  );
}
