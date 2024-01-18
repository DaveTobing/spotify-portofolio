"use client";

import { cn } from "@/lib/utils";
import classNames from "classnames";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useState } from "react";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { BiLogOut } from "react-icons/bi";

import { Playlist } from "../../data/playlist";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  playlists: Playlist[];
}

export function Sidebar({ className, playlists }: SidebarProps) {
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
              Logo
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
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='mr-2 h-4 w-4'
                    >
                      <circle cx='12' cy='12' r='10' />
                      <polygon points='10 8 16 12 10 16 10 8' />
                    </svg>
                    Listen Now
                  </Button>
                </div>
              </div>
              <div className='px-3 py-2'>
                <h2 className='mb-2 px-4 text-lg font-semibold tracking-tight'>
                  Library
                </h2>
                <div className='space-y-1'>
                  <Button variant='ghost' className='w-full justify-start'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='mr-2 h-4 w-4'
                    >
                      <path d='M21 15V6' />
                      <path d='M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z' />
                      <path d='M12 12H3' />
                      <path d='M16 6H3' />
                      <path d='M12 18H3' />
                    </svg>
                    Playlists
                  </Button>
                  <Button variant='ghost' className='w-full justify-start'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='mr-2 h-4 w-4'
                    >
                      <circle cx='8' cy='18' r='4' />
                      <path d='M12 18V2l7 4' />
                    </svg>
                    Songs
                  </Button>
                  <Button variant='ghost' className='w-full justify-start'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='mr-2 h-4 w-4'
                    >
                      <path d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2' />
                      <circle cx='12' cy='7' r='4' />
                    </svg>
                    Made for You
                  </Button>
                  <Button variant='ghost' className='w-full justify-start'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='mr-2 h-4 w-4'
                    >
                      <path d='m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12' />
                      <circle cx='17' cy='7' r='5' />
                    </svg>
                    Artists
                  </Button>
                  <Button variant='ghost' className='w-full justify-start'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='mr-2 h-4 w-4'
                    >
                      <path d='m16 6 4 14' />
                      <path d='M12 6v14' />
                      <path d='M8 8v12' />
                      <path d='M4 4v16' />
                    </svg>
                    Albums
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
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          className='mr-2 h-4 w-4'
                        >
                          <path d='M21 15V6' />
                          <path d='M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z' />
                          <path d='M12 12H3' />
                          <path d='M16 6H3' />
                          <path d='M12 18H3' />
                        </svg>
                        {playlist}
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
        {!toggleCollapse && (
          <span
            className={classNames(
              "flex flex-row gap-5 text-lg font-bold items-center"
            )}
          >
            Logout <BiLogOut style={{ fontSize: "2rem" }} />
          </span>
        )}
      </div>
    </div>
  );
}
