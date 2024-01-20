"use client";
import React from 'react'
import {useEffect, useState} from "react";

import { GetSpotifyPlaylist } from "../../interface/playlist";
import { userPlaylists } from "@/data/playlist";

import MusicPage from '@/app/discover/page';
import { SpotifyAlbum } from '@/interface/album';
import { UserAlbum } from '@/data/album';

const page = () => {
  const [token, setToken] = useState("")
  const [playlists, setPlaylists] = useState<GetSpotifyPlaylist[]>([]);
  const [albums, setAlbums] = useState<SpotifyAlbum[]>([]);

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
            setPlaylists(fetchedPlaylists);
          }
        } catch (error) {
          console.error('Error fetching playlists:', error);
        }
      };
  
      fetchPlaylists();
    }, []);

    useEffect(() => {
      const fetchAlbums = async () => {
        try {
          const token = localStorage.getItem('token');
          if (token) {
            const fetchedAlbums = await UserAlbum(token);
            setAlbums(fetchedAlbums);
          }
        } catch (error) {
          console.error('Error fetching playlists:', error);
        }
      };
  
      fetchAlbums();
    }, []);

  return (
    <div className='flex flex-row'>
        <MusicPage playlists={playlists} Album={albums}/>
    </div>
  )
}

export default page