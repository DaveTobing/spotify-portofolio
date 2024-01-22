"use client";
import React from "react";
import { useEffect, useState } from "react";
import { SpotifyArtist } from "@/interface/artist";
import { topArtists, FollowedArtists } from "@/data/artist";
import { ArtistHolder } from "@/components/Artist-Holder";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ModeToggle } from "@/components/darkmode";

const page = () => {
  const [Topartists, setTopArtist] = useState<SpotifyArtist[]>([]);
  const [FollowedArtist, setFollowedArtist] = useState<SpotifyArtist[]>([]);

  useEffect(() => {
    const fetchTopArtist = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const fetchedTopArtist = await topArtists(token);
          setTopArtist(fetchedTopArtist);
        }
      } catch (error) {
        console.error("Error fetching top artist:", error);
      }
    };

    fetchTopArtist();
  }, []);

  useEffect(() => {
    const fetchFollowedArtist = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const fetchedFollowedArtist = await FollowedArtists(token);
          setFollowedArtist(fetchedFollowedArtist);
        }
      } catch (error) {
        console.error("Error fetching top artist:", error);
      }
    };

    fetchFollowedArtist();
  }, []);

  return (
    <>
      <div className='hidden md:block'>
        <div className='border-t'>
          <div className='bg-background'>
            <div className='grid lg:grid-cols-3'>
              <div className='col-span-3 lg:col-span-4 lg:border-l'>
                <div className='h-full px-4 py-6 lg:px-8'>
                  <Tabs defaultValue='music' className='h-full space-y-6'>
                    <div className='space-between flex items-center'>
                      <div className='ml-auto mr-4'>
                        <ModeToggle />
                      </div>
                    </div>
                    <TabsContent
                      value='music'
                      className='border-none p-0 outline-none'
                    >
                      <div className='flex items-center justify-between'>
                        <div className='space-y-1'>
                          <h2 className='text-2xl font-semibold tracking-tight'>
                            Top Artist
                          </h2>
                          <p className='text-sm text-muted-foreground'>
                            Here are your Top Artist.
                          </p>
                        </div>
                      </div>
                      <Separator className='my-4' />
                      <div className='relative'>
                        <ScrollArea>
                          <div className='flex space-x-4 pb-4'>
                            {Topartists.map((artist) => (
                              <ArtistHolder
                                key={artist.id}
                                artists={[artist]}
                                className='w-[250px]'
                                aspectRatio='portrait'
                                width={250}
                                height={330}
                              />
                            ))}
                          </div>
                          <ScrollBar orientation='horizontal' />
                        </ScrollArea>
                      </div>
                      <Separator className='my-4' />
                      <div className='flex items-center justify-between'>
                        <div className='space-y-1'>
                          <h2 className='text-2xl font-semibold tracking-tight'>
                            Followed Artist
                          </h2>
                          <p className='text-sm text-muted-foreground'>
                          Followed Artist by you.
                          </p>
                        </div>
                      </div>
                      <Separator className='my-4' />
                      <div className='relative'>
                        <ScrollArea>
                          <div className='flex space-x-4 pb-4'>
                            {FollowedArtist.map((artist) => (
                              <ArtistHolder
                                key={artist.id}
                                artists={[artist]}
                                className='w-[250px]'
                                aspectRatio='portrait'
                                width={250}
                                height={330}
                              />
                            ))}
                          </div>
                          <ScrollBar orientation='horizontal' />
                        </ScrollArea>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
