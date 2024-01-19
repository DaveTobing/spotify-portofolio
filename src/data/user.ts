import { SpotifyUser } from "../interface/user";
import axios from "../app/axios";

export async function userProfile(token: string): Promise<SpotifyUser> {
  try {
    const res = await axios.get("/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;

  } catch (error) {
    console.error("Error fetching user playlists:", error);
    throw new Error("Failed to fetch user playlists");
  }
}
