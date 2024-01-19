"use client";
import { Button } from "@/components/ui/button";
import { FaSpotify } from "react-icons/fa6";

const login = () => {
  const REDIRECT_URI = "http://localhost:3000/main";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  // Access CLIENT_ID from environment variables
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

  return (
    <div className=''>
      <div className='flex flex-col items-center'>
        <a
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
          className='text-green-800 flex'
        >
          <Button variant='outline' type='button'>
            <div className="flex flex-row items-center gap-10">
                <FaSpotify style={{ fontSize: "1.5rem" }}/> <span className="text-lg"> Spotify </span>
            </div>
          </Button>
        </a>
      </div>
    </div>
  );
};

export default login;
