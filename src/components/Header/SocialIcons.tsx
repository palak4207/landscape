import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SocialIcons = () => {
  const route = usePathname();
  return (
    <div className="flex items-center ">
      <Link
        href="https://www.facebook.com/Architectureslandscape?rdid=Z3LFozy1pizDxUQL&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18k2ydYz2u%2F#"
        className={`text-[#3F3A3A] hover:text-gray-900 pr-4 `}
        target="blank"
      >
        <img src="/fbIcon.png" alt="icon" width={20} height={20} />
      </Link>
      <Link
        href="https://www.instagram.com/landscape_archist?igsh=eWo5dHNpdmd0cnY="
        className={`text-[#3F3A3A] hover:text-gray-900 `}
        target="blank"
      >
        <img src="/instagram.png" alt="icon" width={20} height={20} />
      </Link>
    </div>
  );
};

export default SocialIcons;
