"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Feedback from "./Feedback";
import SocialIcons from "./SocialIcons";

type SidebarProps = {
  setIsOpen: (value: boolean) => void;
};

export default function Sidebar({ setIsOpen }: SidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const route = usePathname();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClick = () => {
    setIsOpen(true);
    toggleSidebar();
  };
  return (
    <div>
      <button
        onClick={toggleSidebar}
        className={`text-lg font-medium text-[#3F3A3A] hover:text-gray-900 ${
          route === "/contact" && "invert hover:text-blue-400"
        }`}
      >
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 pr-2 pt-[5px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          <p className="font-normal text-[14px] leading-[16px] font-sans pt-1 pr-6 hidden sm:block">
            MENU
          </p>
        </div>
      </button>

      <div
        className={`fixed top-0 left-0 h-full z-50  w-[80%] sm:w-[60%] md:w-[40%] lg:w-[25%] bg-[#f1f5f9] text-center transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="flex justify-center items-center space-x-1 relative top-[6%]">
          {/* <div className="justify-items-center"> */}
          <Image
            src={"/Landscape.png"}
            alt={"Logo"}
            width={250}
            height={250}
            className={`w-48 h-36 `}
          />
          {/* </div> */}
        </div>
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 text-gray-800 hover:text-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="flex h-full flex-col justify-center items-center font-extralight space-y-6 text-[#3F3A3A]">
          <ul className="space-y-10 text-4xl">
            <li>
              <Link
                href="/"
                className={`block hover:border-b border-orange-500 rounded-lg ${
                  route === "/" &&
                  "border-b border-orange-500 text-orange-500 rounded-lg"
                }`}
              >
                HOME
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`block hover:border-b border-orange-500 rounded-lg ${
                  route === "/about" &&
                  "border-b border-orange-500 text-orange-500 rounded-lg"
                }`}
              >
                ABOUT
              </Link>
            </li>
            <li>
              <Link
                href={"/contact"}
                className={`block hover:border-b border-orange-500 rounded-lg ${
                  route === "/contact" &&
                  "border-b border-orange-500 text-orange-500 rounded-lg"
                }`}
              >
                CONTACT
              </Link>
            </li>

            <li
              className="justify-items-center mt-12 cursor-pointer hover:border-b border-orange-500 rounded-lg"
              onClick={handleClick}
            >
              <span className="text-lg mt-12">DROP REQUEST</span>
            </li>
          </ul>
          <SocialIcons />
        </div>
      </div>

      <div
        onClick={toggleSidebar}
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      ></div>
    </div>
  );
}
