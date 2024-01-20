import axios from "../app/axios";
import { SpotifyAlbum } from "../interface/album";

export async function UserAlbum(token: string): Promise<SpotifyAlbum[]> {
  try {
    const res = await axios.get("/me/albums", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: 30,
        offset: 0,
        time_range: "short_term",
      },
    });

    return res.data?.items || [];
  } catch (error) {
    console.error("Error fetching user playlists:", error);
    throw new Error("Failed to fetch user playlists");
  }
}
