import React from "react";
import Card from "@/app/_landing/card";

const cardData = [
  {
    id: 1,
    firstWord: "Compatible",
    secondWord: "SDK",
    description:
      "Use our protocol on any device or browser without browser extensions or plugins.",
    color: "text-rose-400",
    bgColor: "bg-radial-gradient-secure",
    image: "/icons/secure.svg",
  },
  {
    id: 2,
    firstWord: "Onboard",
    secondWord: "masses",
    description:
      "Uncover hidden gems you never knew existed, with AI that learns your style beyond your usual choices.",
    color: "text-yellow-600",
    bgColor: "bg-radial-gradient-personalised",
    image: "/icons/personalised.svg",
  },
  {
    id: 3,
    firstWord: "Accessible",
    secondWord: "login",
    description:
      "Login in just one click, with Stellock allowing you to use web3 dApps seamlessly.",
    color: "text-indigo-700",
    bgColor: "bg-radial-gradient-effortless",
    image: "/icons/effortless.svg",
  },
];

const Features = () => {
  return (
    <div className="min-h-screen w-full p-16">
      <div className="flex justify-center">
        <div className="w-[666px] hidden md:flex text-center text-black text-2xl font-semibold font-playfair leading-[28.80px]">
          Our mission is to Empower 5 Billion Web2 users with a robust gateway
          to Web3
        </div>
      </div>
      <div className="flex gap-8 justify-center items-center pt-8 lg:pt-28 flex-col lg:flex-row">
        {cardData.map((card, index) => (
          <Card
            key={card.id}
            firstWord={card.firstWord}
            secondWord={card.secondWord}
            description={card.description}
            color={card.color}
            bgColor={card.bgColor}
            image={card.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Features;
