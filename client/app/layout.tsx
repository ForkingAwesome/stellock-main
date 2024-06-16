import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { AlbedoProvider } from "@/components/context/albedo";
import { FreighterProvider } from "@/components/context/freighter";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stellock",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <FreighterProvider>
            <AlbedoProvider>{children}</AlbedoProvider>
          </FreighterProvider>
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
}
