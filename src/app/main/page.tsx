"use client";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";

import { GetSpotifyPlaylist } from "../../interface/playlist";
import { userPlaylists } from "@/data/playlist";

import MusicPage from "@/app/discover/page";

import { SpotifyTrack } from "@/interface/track";


import querystring from "querystring";
import { fetchTracks } from "@/components/api";
import { useQuery } from '@tanstack/react-query'
import { topTracks } from "@/data/track";

const page = () => {
  const [getToken, setToken] = useState("");
  const [playlists, setPlaylists] = useState<GetSpotifyPlaylist[]>([]);
  const [tracks, setTracks] = useState<SpotifyTrack[]>([]);

  // const {data:tracks, isLoading:track} = useQuery({ queryKey: ['tracks'], queryFn: fetchTracks })

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



  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const fetchedPlaylists = await userPlaylists(token);
          setPlaylists(fetchedPlaylists);
        }
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchPlaylists();
  }, []);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const fetchedTracks = await topTracks(token);
          setTracks(fetchedTracks);
        }
      } catch (error) {
        console.error("Error fetching top tracks:", error);
      }
    };

    fetchTracks();
  }, []);
  return (
    <div className='flex flex-row'>
      <MusicPage playlists={playlists} tracks={tracks} />
    </div>
  );
};

export default page;
