"use client";

import React from 'react'
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  const isLoginPage = pathname === "/auth/login";
  const isRegisterPage = pathname === "/auth/register";
  const isHomePage = pathname === "/";

  // If on the login or register page, don't render the navbar
  if (isLoginPage || isRegisterPage || isHomePage) {
    return null;
  }

  return (
    <div>Footer</div>
  )
}

export default Footer