import axiosDefault from "axios";
import { SpotifyToken } from "../interface/token";

const axios = axiosDefault.create({
  baseURL: "https://api.spotify.com/v1",
});

export async function accessToken() {
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  const refreshToken = localStorage.getItem("token");

  axios.interceptors.request.clear();

  try {
    const response = await axios.post<SpotifyToken>(
      "https://accounts.spotify.com/api/token",
      {
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: CLIENT_ID,
      },
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    // Assuming the response contains accessToken and refreshToken properties
    const { access_token, refresh_token: newRefreshToken } = response.data;

    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", newRefreshToken);
  } catch (error) {
    console.error("Error refreshing token:", error);
  }
}

export default axios;
