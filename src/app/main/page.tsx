"use client";
import Account from '@/components/account'
import React from 'react'
import {useEffect, useState} from "react";

const page = () => {
  const [token, setToken] = useState("")

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

  return (
    <div className='flex flex-row'>
        <Account/>
    </div>
  )
}

export default page