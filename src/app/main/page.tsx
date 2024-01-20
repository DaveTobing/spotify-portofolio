"use client";
import { PlaylistHolder } from '@/components/Playlist-holder';
import Account from '@/components/account'
import React from 'react'
import {useEffect, useState} from "react";

import { GetSpotifyPlaylist } from "../../interface/playlist";
import { userPlaylists } from "@/data/playlist";


const page = () => {
  const [token, setToken] = useState("")
  const [playlists, setPlaylists] = useState<GetSpotifyPlaylist[]>([]);

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

    useEffect(() => {
      const fetchPlaylists = async () => {
        try {
          const token = localStorage.getItem('token');
          if (token) {
            const fetchedPlaylists = await userPlaylists(token);
            console.log(fetchedPlaylists)
            setPlaylists(fetchedPlaylists);
            console.log(playlists)
          }
        } catch (error) {
          console.error('Error fetching playlists:', error);
        }
      };
  
      fetchPlaylists();
    }, []);

  return (
    <div className='flex flex-row'>
        <Account/>
        <PlaylistHolder playlists={playlists}/>
    </div>
  )
}

export default page