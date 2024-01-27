"use client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent } from "@/components/ui/tabs";

import { PlaylistHolder } from "@/components/Playlist-holder";
import { TrackHolder } from "@/components/Tracks-Holder";

import { ModeToggle } from "@/components/darkmode";

import axios from "axios";
import { useEffect, useState } from "react";
import querystring from "querystring";
import {fetchTracks } from "@/components/api/track";
import { useQuery } from "@tanstack/react-query";
import { fetchGenreByPlaylistId, fetchPlaylists } from "@/components/api/playlists";
import { RectangleLoader, SquareLoader } from "@/components/Loader";
// import { PlaylistGenres } from "@/data/genre";

export default function MusicPage() {
  const [getToken, setToken] = useState("");

  const { data: tracks, isLoading: trackIsLoading } = useQuery({
    queryKey: ["tracks"],
    queryFn: fetchTracks,
  });

  const { data: playlists, isLoading: playlistsIsLoading } = useQuery({
    queryKey: ["playlists"],
    queryFn: fetchPlaylists,
  });

  // const handlePlaylistLoop = async () => {
  //   if (playlists && playlists.length > 0) {
  //     for (const playlist of playlists) {
  //       console.log(playlist)
  //       console.log(playlist.id)
  //       await fetchGenreByPlaylistId();
  //     }
  //   }
  // };

  // useEffect(() => {
  //   handlePlaylistLoop();
  // }, [playlists]);


  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
    const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET;

    if (code) {
      if (state === null) {
        // Handle state mismatch error
        const errorParams = new URLSearchParams({
          error: "state_mismatch",
        });
        window.location.href = `/#${errorParams.toString()}`;
        return;
      }
      // Convert the following code to TypeScript
      const authOptions = {
        url: "https://accounts.spotify.com/api/token",
        form: {
          code: code,
          redirect_uri: "http://localhost:3000/discover",
          grant_type: "authorization_code",
        },
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
        },
        json: true,
      };

      // Use `axios` or another HTTP library to make the token request
      // and handle the response accordingly
      axios
        .post(authOptions.url, querystring.stringify(authOptions.form), {
          headers: authOptions.headers,
        })
        .then((response) => {
          const temp_token = response.data.access_token;
          window.location.hash = "";
          window.localStorage.setItem("token", temp_token);
          setToken(temp_token);
        })
        .catch((error) => {
          console.error("Error requesting token:", error);
        });

      // Optional: Redirect to remove the code from the URL
      const urlWithoutCode = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, urlWithoutCode);
    }
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
                          {trackIsLoading ? (
                            <RectangleLoader />
                          ) : (
                            <div className='flex space-x-4 pb-4'>
                              {tracks?.map((track) => (
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
                          )}
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
