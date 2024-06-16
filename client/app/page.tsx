import { Poppins } from "next/font/google";
import Hero from "./_landing/hero";
import Features from "./_landing/features";
import SDK from "./_landing/sdk";
import Footer from "./_landing/footer";
import Header from "./_landing/navbar";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (
    <main className="">
      <Header text="Stellock" />
      <Hero />
      <Features />
      <SDK />
      <Footer />
    </main>
  );
}
