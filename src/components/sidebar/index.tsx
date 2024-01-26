"use client";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import classNames from "classnames";
import { Button } from "@/components/ui/button";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import {
  FaAnglesLeft,
  FaAnglesRight,
  FaCirclePlay,
  FaRegUser,
} from "react-icons/fa6";
import { BiLogOut, BiStats } from "react-icons/bi";
import { LuMusic2, LuMic2 } from "react-icons/lu";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../api/user";

export function Sidebar() {
  const { data: Users, isLoading: UsersIsLoading } = useQuery({
    queryKey: ["Users"],
    queryFn: fetchUser,
  });

  const pathname = usePathname();

  const isLoginPage = pathname === "/login";
  const isHomePage = pathname === "/";

  // If on the login or register page, don't render the navbar
  if (isLoginPage || isHomePage) {
    return null;
  }

  const [toggleCollapse, setToggleCollapse] = useState(false);

  const wrapperClasses = classNames(
    "h-screen px-4 pt-8 pb-4 bg-light flex justify-between flex-col",
    {
      ["w-[600px] max-w-[280px]"]: !toggleCollapse,
      ["w-20"]: toggleCollapse,
    }
  );

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  const router = useRouter();

  const Logout = () => {
    window.localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div
      className={wrapperClasses}
      style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      <div className='flex flex-col'>
        <div className='flex flex-row items-center justify-between relative'>
          {!toggleCollapse && (
            <div className='flex pl-2'>
              {!!Users && !UsersIsLoading && (
                <section className='flex flex-row items-center'>
                  <Link href={Users.external_urls.spotify}>
                    <Image
                      loading='lazy'
                      src={Users.images?.[0].url}
                      alt='User photo profile'
                      width={100}
                      height={100}
                      className='rounded-full mr-3 shadow-black shadow-sm w-12'
                    />
                  </Link>
                  <h1 className='text-xl'>{Users.display_name}</h1>
                </section>
              )}
            </div>
          )}
          <Button variant='ghost' onClick={handleSidebarToggle}>
            {toggleCollapse ? (
              <FaAnglesLeft style={{ fontSize: "2rem" }} />
            ) : (
              <FaAnglesRight style={{ fontSize: "2rem" }} />
            )}
          </Button>
        </div>

        {!toggleCollapse && (
          <div className={cn("pb-12", classNames)}>
            <div className='space-y-4 py-4'>
              <div className='px-3 py-2'>
                <h2 className='mb-2 px-4 text-lg font-semibold tracking-tight'>
                  Discover
                </h2>
                <div className='space-y-1'>
                  <Link href={"/main"}>
                    <Button variant='ghost' className='w-full justify-start'>
                      <span className='flex gap-5 items-center'>
                        <FaCirclePlay />
                        Listen Now
                      </span>
                    </Button>
                  </Link>
                  <Link href={"/stats"}>
                    <Button variant='ghost' className='w-full justify-start'>
                      <span className='flex gap-5 items-center'>
                        <BiStats />
                        Stats
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>
              <div className='px-3 py-2'>
                <h2 className='mb-2 px-4 text-lg font-semibold tracking-tight'>
                  Library
                </h2>
                <div className='space-y-1'>
                  <Link href={"/library/songs"}>
                    <Button variant='ghost' className='w-full justify-start'>
                      <span className='flex gap-5 items-center'>
                        <LuMusic2 />
                        Songs
                      </span>
                    </Button>
                  </Link>
                  <Link href={"/library/MadeforYou"}>
                    <Button variant='ghost' className='w-full justify-start'>
                      <span className='flex gap-5 items-center'>
                        <FaRegUser />
                        Made for You
                      </span>
                    </Button>
                  </Link>
                  <Link href={"/library/artist"}>
                    <Button variant='ghost' className='w-full justify-start'>
                      <span className='flex gap-5 items-center'>
                        <LuMic2 />
                        Artists
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className={`pl-2 py-4`}>
          <Button
            variant='ghost'
            className='w-full justify-start font-normal'
            onClick={Logout}
          >
            {!toggleCollapse && (
              <span
                className={classNames(
                  "flex flex-row gap-5 text-lg font-bold items-center"
                )}
              >
                Logout <BiLogOut style={{ fontSize: "2rem" }} />
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
