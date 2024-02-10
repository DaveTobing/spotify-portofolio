"use client";
import React, { useState } from "react";
import { BarList, DonutChart } from "@tremor/react";
import { topGenres } from "@/data/genre";
import { useQuery } from "@tanstack/react-query";
import { fetchTopArtist } from "@/components/api/artist";
import { ModeToggle } from "@/components/darkmode";
import { Tabs, TabsContent } from "@radix-ui/react-tabs";
import { Separator } from "@radix-ui/react-separator";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface Bar {
  name: string;
  value: number;
}

export default function StatsPage() {
  const colors = [
    "#ff5733",
    "#33a2ff",
    "#33ff5b",
    "#8c33ff",
    "#ff3357",
    "#ffcc33",
    "#ff884d",
    "#4da6ff",
    "#4dff88",
    "#af4dff",
    "#ff4d6a",
    "#ffd633",
    "#33ffbd",
    "#b84dff",
    "#d633ff",
    "#ffb84d",
    "#5dff33",
    "#3388ff",
    "#ff33a6",
    "#a633ff",
  ];

  const [value, setValue] = useState(null);
  const { data: TopArtist, isLoading: TopartistsIsLoading } = useQuery({
    queryKey: ["Artist"],
    queryFn: fetchTopArtist,
  });

  const dataGenre = topGenres(TopArtist || []);

  const dataGenreBars: Bar[] = dataGenre.map((genre) => ({
    name: genre.name,
    value: genre.total,
  }));

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
                      <div className='ml-auto'>
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
                            Top Artist Genre&apos;s Stats
                          </h2>
                          <p className='text-sm text-muted-foreground'>
                            Insights into your music taste based on your Top
                            Artist
                          </p>
                        </div>
                      </div>
                      <Separator className='my-4' />
                      <div className='relative'>
                        {TopartistsIsLoading ? (
                          "Empty"
                        ) : (
                          <div className='flex flex-row justify-center items-center'>
                            <div>
                              <Card className={cn("w-[1200px]")}>
                                <CardContent className='grid gap-2 grid-cols-2 items-center'>
                                  <div>
                                    <DonutChart
                                      className='mt-6'
                                      data={dataGenre}
                                      category='total'
                                      index='name'
                                      colors={colors}
                                      onValueChange={(v) => setValue(v)}
                                    />
                                  </div>
                                  <div>
                                    <BarList
                                      data={dataGenreBars}
                                      className='mt-2'
                                      color={"#33a2ff"}
                                    />
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className='mt-6 space-y-1'>
                        <h2 className='text-2xl font-semibold tracking-tight'>
                          Playlist Genre&apos;s Stats
                        </h2>
                        <p className='text-sm text-muted-foreground'>
                          Insights into your music taste based on your Personal
                          Artist
                        </p>
                      </div>
                      <Separator className='my-4' />
                      {/* <div className='relative'>
                        <ScrollArea>
                          {playlistsIsLoading ? (
                            <SquareLoader />
                          ) : (
                            <div className='flex space-x-4 pb-4'>
                              {playlists?.map((playlist) => (
                                <PlaylistHolder
                                  key={playlist.id}
                                  playlists={[playlist]}
                                  className='w-[150px] '
                                  aspectRatio='square'
                                  width={150}
                                  height={150}
                                />
                              ))}
                            </div>
                          )}
                          <ScrollBar orientation='horizontal' />
                        </ScrollArea>
                      </div> */}
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
}
