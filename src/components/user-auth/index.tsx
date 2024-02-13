"use client";
import { Button } from "@/components/ui/button";
import { FaSpotify } from "react-icons/fa6";

const Login = () => {
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  // const REDIRECT_URI = "http://localhost:3000/discover";
  const REDIRECT_URI = "http://portofoliofy.vercel.app/discover";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const startSpotifyLoginServer = async () => {
    if (!CLIENT_ID) {
      console.error("Client ID is not defined.");
      return;
    }

    const state = generateRandomString(16);
    const scope =
      "user-read-private user-read-email user-top-read user-follow-read playlist-read-private";

    // Redirect the user to Spotify authorization URL
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${scope}&state=${state}`;
  };


  const generateRandomString = (length: number): string => {
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  };

  return (
    <div className='flex flex-col items-center '>
      <Button variant='outline' type='button' onClick={startSpotifyLoginServer}>
        <div className='flex flex-row items-center gap-10'>
          <FaSpotify
            style={{ fontSize: "1.5rem" }}
            className='text-green-600'
          />
          <span className='text-lg text-green-600'> Spotify </span>
        </div>
      </Button>
    </div>
  );
};

export default Login;
