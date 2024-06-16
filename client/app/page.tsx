import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";
import logo from "@/public/logo.webp"
import Hero from "./_landing/hero";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (
    <main className="">
      <Hero />
      <div className="space-y-6 text-center flex justify-center flex-col items-center">
      </div>
    </main>
  );
}
