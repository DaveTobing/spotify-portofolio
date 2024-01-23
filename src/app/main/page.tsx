"use client";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import MusicPage from "@/app/discover/page";
import querystring from "querystring";
import { fetchTracks } from "@/components/api/track";
import { useQuery } from "@tanstack/react-query";
import { fetchPlaylists } from "@/components/api/artist";

const page = () => {
  const [getToken, setToken] = useState("");

  const { data: tracks, isLoading: trackIsLoading } = useQuery({
    queryKey: ["tracks"],
    queryFn: fetchTracks,
  });
  const { data: playlists, isLoading: playlistsIsLoading } = useQuery({
    queryKey: ["playlists"],
    queryFn: fetchPlaylists,
  });

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
          redirect_uri: "http://localhost:3000/main",
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
      <div className='flex flex-row'>
        {!playlistsIsLoading && !trackIsLoading && (
          <MusicPage playlists={playlists || []} tracks={tracks || []} />
        )}
      </div>
    </>
  );
};

export default page;
