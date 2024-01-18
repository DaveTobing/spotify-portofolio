"use client";
// import axios from 'axios';
const login = () => {
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  // Access CLIENT_ID from environment variables
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

  return (
    <div className='bg-black'>
      <div className='flex flex-col justify-center items-center py-10'>
        <h1 className='text-green-800 text-4xl font-bold'>Welcome</h1>
        <a
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
          className='text-green-800 flex'
        >
          Login to your spotify account
        </a>
      </div>
    </div>
  );
};

export default login;
