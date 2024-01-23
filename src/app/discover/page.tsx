import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { PlaylistHolder } from "@/components/Playlist-holder";
import { TrackHolder } from "@/components/Tracks-Holder";

import { GetSpotifyPlaylist } from "../../interface/playlist";
import { ModeToggle } from "@/components/darkmode";
import { SpotifyTrack } from "@/interface/track";
import { Progress } from "@/components/ui/progress"

interface MusicPageProps{
  playlists: GetSpotifyPlaylist[];
  tracks: SpotifyTrack[];
}

export default function MusicPage({playlists, tracks}: MusicPageProps ) {
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
                            Listen Now
                          </h2>
                          <p className='text-sm text-muted-foreground'>
                            Top tracks picks for you.
                          </p>
                        </div>
                      </div>
                      <Separator className='my-4' />
                      <div className='relative'>
                        <ScrollArea>
                          <div className='flex space-x-4 pb-4'>
                            {tracks.map((track) => (
                              <TrackHolder
                                key={track.id}
                                tracks={[track]}
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
                      <div className='mt-6 space-y-1'>
                        <h2 className='text-2xl font-semibold tracking-tight'>
                          Made By You
                        </h2>
                        <p className='text-sm text-muted-foreground'>
                          Your personal playlists.
                        </p>
                      </div>
                      <Separator className='my-4' />
                      <div className='relative'>
                        <ScrollArea>
                          <div className='flex space-x-4 pb-4'>
                          {playlists.map((playlist) => (
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
}
