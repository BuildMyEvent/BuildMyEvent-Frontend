"use client";
import { useContext, useEffect, useState } from "react";
import { NavBarInterface } from "@/types/interfaces";
import Link from "next/link";
import Image from "next/image";
import BMELogo from "../../public/BME-Logos/BME-Logo-Over-White1.svg";
import { AvatarButton } from "./AvatarButton";
import { LoginButton } from "./LogInButton";
import { useAccount } from 'wagmi';
import WalletWrapper from "./WalletWrapper";
import { AuthContext } from "@/context/AuthContext";

const navItems: NavBarInterface[] = [
  { title: "Home", url: "/#modules" },
  { title: "Features", url: "/#opinions" },
  { title: "Events", url: "/#events" },
  { title: "Documentation", url: "/#docs" },
];

interface NavBarComponentProps {
  logo?: string;
}

const NavBarComponent = ({ logo }: NavBarComponentProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { address } = useAccount();
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);

      const sections = ["modules", "opinions", "functionalities", "contact"];
      const offset = 400;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isVisible =
            rect.top < window.innerHeight - offset && rect.bottom >= offset;

          if (isVisible) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <header
      className={`fixed top-0 z-30 w-full mx-auto transition-all duration-300 px-4 ${isScrolled ? "mt-2" : "md:mt-0 mt-0"
        }`}
    >
      <nav
        className={` flex items-center justify-between transition-[max-width] duration-500 px-4 
             mx-auto
            ${isScrolled ? "py-2" : "py-4"}
            ${isScrolled ? "md:w-max" : "max-w-full"} 
            text-[16px] font-medium rounded-full ${isScrolled
            ? "text-gray-600 dark:text-gray-200 bg-white/50 shadow-lg ring-1 backdrop-blur ring-white/10"
            : ""
          }`}
      >
        <Link href="/">
          <Image
            src={logo ?? BMELogo} // Use the logo state here
            alt="Logo"
            width={40}
            height={40}
            className={`mr-6 cursor-pointer transition-all duration-200 ${isScrolled ? "h-[2rem] ml-2 mt-[3.5px] w-auto" : "md:h-[4rem] h-[3rem] w-auto"}`}
          // onClick={() => (window.location.href = "/#")}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="flex">
          <ul
            className={`my-auto hidden md:flex space-x-4 transition-all duration-300 ${isScrolled ? "text-[17.5px]" : "text-lg"
              }`}
          >
            {navItems.map(({ title, url }: NavBarInterface) => (
              <li key={title}>
                <Link
                  className={`relative hover:text-blue-500 block px-2 py-2 transition-colors duration-300 ${activeSection === url.slice(1)
                    ? "text-blue-500"
                    : "text-gray-600"
                    }`}
                  href={url}
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="ml-2 my-auto">
            <LoginButton />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {/* Hamburger Icon */}
          <svg
            className="w-6 h-6 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col space-y-2 px-4 py-4">
            {navItems.map(({ title, url }: NavBarInterface) => (
              <li key={title}>
                <Link
                  className={`block hover:text-blue-500 px-2 py-2 transition-colors duration-300 ${activeSection === url.slice(1)
                    ? "text-blue-500"
                    : "text-gray-600"
                    }`}
                  href={url}
                  onClick={() => setIsMenuOpen(false)} // Close menu on link click
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default NavBarComponent;
