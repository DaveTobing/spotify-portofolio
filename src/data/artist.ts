import axios from "../app/axios";
import { SpotifyArtist } from "../interface/artist";

export async function topArtists(token: string): Promise<SpotifyArtist[]> {
  try {
    const res = await axios.get("/me/top/artists", {
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