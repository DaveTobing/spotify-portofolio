"use client";
import React from 'react'
import {useEffect, useState} from "react";

import { GetSpotifyPlaylist } from "../../interface/playlist";
import { userPlaylists } from "@/data/playlist";

import MusicPage from '@/app/discover/page';

import { SpotifyTrack } from '@/interface/track';
import { topTracks } from '@/data/track';

import { SpotifyArtist } from '@/interface/artist';
import { topArtists } from '@/data/artist';


const page = () => {
  const [token, setToken] = useState("")
  const [artist, setArtist] = useState<SpotifyArtist[]>([]);
  const [playlists, setPlaylists] = useState<GetSpotifyPlaylist[]>([]);
  const [tracks, setTracks] = useState<SpotifyTrack[]>([]);

  useEffect(() => {
      const hash = window.location.hash;
      let token = window.localStorage.getItem("token");

      try {
          if (!token && hash) {
          const hashToken = hash.substring(1).split("&").find(elem => elem.startsWith("access_token"))?.split("=")[1];
      
          if (hashToken) {
              token = hashToken;
              
              window.location.hash = "";
              // Store the token in localStorage
              window.localStorage.setItem("token", token);
              
              setToken(token);
              }
          }
      }

      catch (error) {
          console.error("Error saving token:", error);
        }

    }, []);

    // useEffect(() => {
    //   const fetchTracks = async () => {
    //     try {
    //       const token = localStorage.getItem('token');
    //       console.log(token)
    //       if (token) {
    //         const fetchedTracks = await topTracks(token);
    //         setTracks(fetchedTracks);
    //       }
    //     } catch (error) {
    //       console.error('Error fetching top tracks:', error);
    //     }
    //   };
  
    //   fetchTracks();
    // }, []);

    useEffect(() => {
      const fetchPlaylists = async () => {
        try {
          const token = localStorage.getItem('token');
          console.log(token)
          if (token) {
            const fetchedPlaylists = await userPlaylists(token);
            setPlaylists(fetchedPlaylists);
          }
        } catch (error) {
          console.error('Error fetching playlists:', error);
        }
      };
  
      fetchPlaylists();
    }, []);



    // useEffect(() => {
    //   const fetchArtist = async () => {
    //     try {
    //       const token = localStorage.getItem('token');
    //       console.log(token)
    //       if (token) {
    //         const fetchedArtist = await topArtists(token);
    //         console.log(fetchedArtist)
    //         setArtist(fetchedArtist);
    //       }
    //     } catch (error) {
    //       console.error('Error fetching top artist:', error);
    //     }
    //   };
  
    //   fetchArtist();
    // }, []);

    // useEffect(() => {
    //   const fetchRecommendedTracks = async () => {
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
  
    //   fetchRecommendedTracks();
    // }, []);

  return (
    <div className='flex flex-row'>
        <MusicPage playlists={playlists} tracks={tracks}/>
    </div>
  )
}

export default page