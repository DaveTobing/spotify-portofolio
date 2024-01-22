"use client"
import React from "react";
import { Sidebar } from "../sidebar";
import Footer from "../footer";
import { LayoutProps } from "./interface";
import { useEffect, useState } from 'react';

import { userPlaylists } from "@/data/playlist";
import { userProfile } from "@/data/user";

import { SpotifyUser } from "../../interface/user";
import { GetSpotifyPlaylist } from "../../interface/playlist";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [playlists, setPlaylists] = useState<GetSpotifyPlaylist[]>([]);
  const [user, setUser] = useState<SpotifyUser>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const fetchedUser = await userProfile(token);
          console.log(fetchedUser)
          setUser(fetchedUser);
        }
      } catch (error) {
        console.error('Error fetching User:', error);
      }
    };

    fetchUser();
  }, []);


  return (
    <div className='h-screen flex flex-col'>
      <div className='flex flex-row'>
        <Sidebar users={user} />
        <div className='flex-grow'>{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
