import React from "react";

interface HeaderProps {
  text: string;
}

const Header: React.FC<HeaderProps> = ({ text }) => {
  return (
    <div className="flex justify-center text-black text-2xl italic font-bold pt-8">
      {text.split("").map((char, index) => (
        <span
          key={index}
          className={index % 2 === 0 ? "font-dmSans" : "font-dmSans"}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

export default Header;
