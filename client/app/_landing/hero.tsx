"use client";
import Content from "../_landing/content";
import Image from "next/image";
import hero from "@/public/hero.png";

const Hero = () => {
  return (
    <div className="flex flex-col md:min-h-screen h-screen relative">
      <div className="flex flex-1 flex-col-reverse justify-end md:flex-row">
        <div className="w-full md:w-1/2 px-4 flex justify-center items-center">
          <Content
            title="Simplicity is key, Keys aren't simple"
            subtitle="Web3 transactions with existing traditional social logins"
          />
        </div>
        <div className="w-full md:w-1/2 flex lg:justify-center lg:items-center justify-start">
          <Image
            src={hero}
            alt="hero"
            width={600}
            className="rounded-md shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
