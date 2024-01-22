"use client";
import { Button } from "@/components/ui/button";
import { FaSpotify } from "react-icons/fa6";
import { useEffect } from "react";

const login = () => {
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  const REDIRECT_URI = "http://localhost:3000/main";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "code";

  const startSpotifyLoginServer = () => {
    const state = generateRandomString(16);
    const scope = 'user-read-private user-read-email user-top-read';

    // Redirect the user to Spotify authorization URL
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${scope}&state=${state}`;
  };
  
  const generateRandomString = (length: number): string => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  return (
    <div className=''>
      <div className='flex flex-col items-center'>
          <Button variant='outline' type='button' onClick={startSpotifyLoginServer}>
            <div className='flex flex-row items-center gap-10'>
              <FaSpotify style={{ fontSize: "1.5rem" }} />{" "}
              <span className='text-lg'> Spotify </span>
            </div>
          </Button>
      </div>
    </div>
  );
};

export default login;
