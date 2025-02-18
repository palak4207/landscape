"use client";
import React, { useState } from "react";
import SocialIcons from "./SocialIcons";
import Feedback from "./Feedback";
import Sidebar from "./Sidebar";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
  const route = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative w-full">
      <header className="py-6 px-6 flex items-center justify-between font-normal text-[14px] bg-[#f1f1f1] tracking-widest leading-[16px] font-sans pt-4 pr-6">
        {/* Left Section: Sidebar and Social Icons */}
        <div className="flex items-center space-x-2">
          <Sidebar setIsOpen={setIsOpen} />
          <div className="hidden sm:block">
            <SocialIcons />
          </div>
        </div>

        <div
          className="flex items-center space-x-1 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image
            src={"/logo1.png"}
            alt={"Logo"}
            width={60}
            height={60}
            className={`w-4 h-4 md:w-8 md:h-8  ${
              route === "/contact" && "filter invert"
            }`}
          />
          <Image
            src={"/logoText.png"}
            alt={"Logo Text"}
            width={120}
            height={50}
            className={`w-auto h-4 md:h-7 ${
              route === "/contact" && "filter invert"
            }`}
          />
        </div>
        <div>
          <Feedback setIsOpen={setIsOpen} isOpen={isOpen} />
        </div>
      </header>
    </div>
  );
};

export default Header;
