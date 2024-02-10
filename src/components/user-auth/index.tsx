"use client";
import { Button } from "@/components/ui/button";
import { FaSpotify } from "react-icons/fa6";

const Login = () => {
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  const REDIRECT_URI = "http://localhost:3000/discover";
  // const REDIRECT_URI = "http://portofoliofy.vercel.app/discover";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "code";

  const startSpotifyLoginServer = async () => {
    if (!CLIENT_ID) {
      console.error("Client ID is not defined.");
      return;
    }
    // Code Verifier
    const codeVerifier = generateRandomString(64);
    // Code Challenge
    // const hashed = await sha256(codeVerifier);
    // const codeChallenge = base64encode(hashed);
    const state = generateRandomString(16);
    const scope =
      "user-read-private user-read-email user-top-read user-follow-read playlist-read-private";

    window.localStorage.setItem("code_verifier", codeVerifier);
    // Redirect the user to Spotify authorization URL
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${scope}&state=${state}`;
    // const authUrl = new URL("https://accounts.spotify.com/authorize");
    // const params = {
    //   response_type: RESPONSE_TYPE,
    //   client_id: CLIENT_ID,
    //   scope: scope,
    //   redirect_uri: REDIRECT_URI,
    // };

    // authUrl.search = new URLSearchParams(params).toString();

    // // Redirect to Spotify for authorization
    // window.location.href = authUrl.toString();
  };

  // const sha256 = async (plain: string): Promise<ArrayBuffer> => {
  //   const encoder = new TextEncoder();
  //   const data = encoder.encode(plain);
  //   return window.crypto.subtle.digest("SHA-256", data);
  // };

  // const base64encode = (input: ArrayBuffer): string => {
  //   const bytes = new Uint8Array(input);
  //   return btoa(String.fromCharCode(...bytes))
  //     .replace(/=/g, "")
  //     .replace(/\+/g, "-")
  //     .replace(/\//g, "_");
  // };

  const generateRandomString = (length: number): string => {
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  };

  // const generateRandomString = (length: number): string => {
  //   const characters =
  //     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  //   let result = "";
  //   for (let i = 0; i < length; i++) {
  //     result += characters.charAt(
  //       Math.floor(Math.random() * characters.length)
  //     );
  //   }
  //   return result;
  // };

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
