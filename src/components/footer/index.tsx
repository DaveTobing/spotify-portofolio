"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Footer = () => {
  const pathname = usePathname();

  const isLoginPage = pathname === "/login";
  const isHomePage = pathname === "/";

  // If on the login or register page, don't render the navbar
  if (isLoginPage || isHomePage) {
    return null;
  }

  return (
    <div>
      <div className='w-full h-full flex flex-col justify-center text-center gap-2 pt-10'>
        <p>
          Built with NextJs –{" "}
          <Link href={"https://github.com/DaveTobing/spotify-portofolio"}>
            Github
          </Link>
        </p>
        <p>© 2024 Dave Tobing.</p>
      </div>
    </div>
  );
};

export default Footer;
