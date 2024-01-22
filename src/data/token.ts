import axios from "axios";
import { SpotifyToken } from "@/interface/token";

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET;
const SCOPES = 'user-top-read';
const encodedToken = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
  "base64"
);

export async function ReqAccessToken() {
  console.log(encodedToken);
  console.log(CLIENT_ID);
  console.log(CLIENT_SECRET);
  try {
    const res = await axios.post<SpotifyToken>(
      "https://accounts.spotify.com/api/token",
      {
        grant_type: "client_credentials",
      },
      {
        headers: {
          Authorization: `Basic ${encodedToken}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (res.status === 200) {
      const token = res.data.access_token;
      return token;
    }
  } catch (error) {
    console.log("test");
    console.error("Error:", error);
  }
  return null
}
