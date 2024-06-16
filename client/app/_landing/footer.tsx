import Image from "next/image";
import React from "react";
import {
  FaHome,
  FaBook,
  FaCode,
  FaTwitter,
  FaGithub,
  FaLinkedin,
  FaRocket,
} from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="border-t-1 border-black text-black py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <Image src="/logo.webp" alt="logo" width={60} height={60} className="rounded-md shadow-md"/>
            <h1 className="text-2xl font-bold">Stellock</h1>
          </div>
        </div>
        <nav className="flex space-x-4 mb-4 md:mb-0">
          <a href="/home" className="flex items-center space-x-1">
            <FaHome />
            <span>Home</span>
          </a>
          <a href="/docs" className="flex items-center space-x-1">
            <FaBook />
            <span>Docs</span>
          </a>
          <a href="/sdk" className="flex items-center space-x-1">
            <FaCode />
            <span>SDK</span>
          </a>
        </nav>
        <div className="flex space-x-4">
          <a
            href="https://twitter.com"
            className="text-xl"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
          <a href="https://github.com" className="text-xl" aria-label="GitHub">
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com"
            className="text-xl"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;