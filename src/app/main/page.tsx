"use client";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";

import { GetSpotifyPlaylist } from "../../interface/playlist";
import { userPlaylists } from "@/data/playlist";

import MusicPage from "@/app/discover/page";

import { SpotifyTrack } from "@/interface/track";
import { topTracks } from "@/data/track";

import { SpotifyArtist } from "@/interface/artist";
import { topArtists } from "@/data/artist";
import { ReqAccessToken } from "@/data/token";
import querystring from "querystring";

const page = () => {
  const [getToken, setToken] = useState("");
  const [AccessToken, setAccessToken] = useState("");
  const [artist, setArtist] = useState<SpotifyArtist[]>([]);
  const [playlists, setPlaylists] = useState<GetSpotifyPlaylist[]>([]);
  const [tracks, setTracks] = useState<SpotifyTrack[]>([]);

  // useEffect(() => {
  //   const hash = window.location.hash;
  //   let token = window.localStorage.getItem("token");
  //   try {
  //     if (!token && hash) {
  //       const hashToken = hash
  //         .substring(1)
  //         .split("&")
  //         .find((elem) => elem.startsWith("access_token"))
  //         ?.split("=")[1];

  //       if (hashToken) {
  //         token = hashToken;
  //         window.location.hash = "";
  //         // Store the token in localStorage
  //         window.localStorage.setItem("token", token);
  //         setToken(token);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error saving token:", error);
  //   }
  // }, []);

  // useEffect(() => {
  //   let Accesstoken: string | null = window.localStorage.getItem("Accesstoken");
  //   const fetchData = async () => {
  //     try {
  //       Accesstoken = await ReqAccessToken();
  //       window.location.hash = "";
  //       // Store the token in localStorage
  //       window.localStorage.setItem("Accesstoken", Accesstoken || ""); // Ensure it's not storing `null`
  //       setAccessToken(Accesstoken || ""); // Ensure it's not setting `null`
  //       console.log(Accesstoken);
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };
  //   // Call the fetchData function
  //   fetchData();
  // }, []);

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
          redirect_uri: "http://localhost:3000/main", // Update with your redirect_uri
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
          console.log(response)
          const temp_token = response.data.access_token;
          console.log(temp_token)
          // Do something with the token
          window.location.hash = "";
          // Store the token in localStorage
          window.localStorage.setItem("token", temp_token);
          setToken(temp_token);
        })
        .catch((error) => {
          // Handle token request error
          console.error("Error requesting token:", error);
        });

      // Optional: Redirect to remove the code from the URL
      const urlWithoutCode = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, urlWithoutCode);
    }
  }, []);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const fetchedArtist = await topArtists(token);
          setArtist(fetchedArtist);
        }
      } catch (error) {
        console.error('Error fetching top artist:', error);
      }
    };

    fetchArtist();
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

  // useEffect(() => {
  //   const fetchTopTracks = async () => {
  //     try {
  //       const token = localStorage.getItem('token');
  //       if (token) {
  //         const fetchedTracks = await RecommendedTracks(token);
  //         console.log(fetchedTracks)
  //         setRecommendedTracks(fetchedTracks);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching playlists:', error);
  //     }
  //   };

  //   fetchTopTracks();
  // }, []);

  return (
    <div className='flex flex-row'>
      <MusicPage playlists={playlists} tracks={tracks} />
    </div>
  );
};

export default page;
