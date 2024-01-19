"use client";
import { cn } from "@/lib/utils";
import classNames from "classnames";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Playlist } from "../../data/playlist";

import {
  FaAnglesLeft,
  FaAnglesRight,
  FaCirclePlay,
  FaRegUser,
} from "react-icons/fa6";
import { RiPlayListLine } from "react-icons/ri";
import { BiLogOut, BiLibrary } from "react-icons/bi";
import { LuMusic2, LuMic2 } from "react-icons/lu";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  playlists: Playlist[];
}

export function Sidebar({ className, playlists }: SidebarProps) {
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
      ["w-80"]: !toggleCollapse,
      ["w-20"]: toggleCollapse,
    }
  );

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  const router = useRouter()

  const Logout = () => {
    window.localStorage.removeItem("token")
    router.push('/login')
  }

  return (
    <div
      className={wrapperClasses}
      style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      <div className='flex flex-col'>
        <div className='flex items-center justify-between relative'>
          <div className='flex items-center pl-2 gap-4'>
            <span
              className={classNames("mt-2 text-lg font-medium text-text", {
                hidden: toggleCollapse,
              })}
            >
              User Profile
            </span>
          </div>
          <Button variant='ghost' onClick={handleSidebarToggle}>
            {toggleCollapse ? (
              <FaAnglesLeft style={{ fontSize: "2rem" }} />
            ) : (
              <FaAnglesRight style={{ fontSize: "2rem" }} />
            )}
          </Button>
        </div>

        {!toggleCollapse && (
          <div className={cn("pb-12", className)}>
            <div className='space-y-4 py-4'>
              <div className='px-3 py-2'>
                <h2 className='mb-2 px-4 text-lg font-semibold tracking-tight'>
                  Discover
                </h2>
                <div className='space-y-1'>
                  <Button variant='ghost' className='w-full justify-start'>
                    <span className='flex gap-5 items-center'>
                      <FaCirclePlay />
                      Listen Now
                    </span>
                  </Button>
                </div>
              </div>
              <div className='px-3 py-2'>
                <h2 className='mb-2 px-4 text-lg font-semibold tracking-tight'>
                  Library
                </h2>
                <div className='space-y-1'>
                  <Button variant='ghost' className='w-full justify-start'>
                    <span className='flex gap-5 items-center'>
                      <RiPlayListLine />
                      Playlist
                    </span>
                  </Button>
                  <Button variant='ghost' className='w-full justify-start'>
                    <span className='flex gap-5 items-center'>
                      <LuMusic2 />
                      Songs
                    </span>
                  </Button>
                  <Button variant='ghost' className='w-full justify-start'>
                    <span className='flex gap-5 items-center'>
                      <FaRegUser />
                      Made for You
                    </span>
                  </Button>
                  <Button variant='ghost' className='w-full justify-start'>
                    <span className='flex gap-5 items-center'>
                      <LuMic2 />
                      Artists
                    </span>
                  </Button>
                  <Button variant='ghost' className='w-full justify-start'>
                    <span className='flex gap-5 items-center'>
                      <BiLibrary />
                      Albums
                    </span>
                  </Button>
                </div>
              </div>
              <div className='py-2'>
                <h2 className='relative px-7 text-lg font-semibold tracking-tight'>
                  Playlists
                </h2>
                <ScrollArea className='h-[300px] px-1'>
                  <div className='space-y-1 p-2'>
                    {playlists?.map((playlist, i) => (
                      <Button
                        key={`${playlist}-${i}`}
                        variant='ghost'
                        className='w-full justify-start font-normal'
                      >
                        <span className='flex gap-5 items-center'>
                          <RiPlayListLine />
                          {playlist}
                        </span>
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={`pl-2 py-4`}>
        <Button variant='ghost' className='w-full justify-start font-normal' onClick={Logout}>
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
  );
}
