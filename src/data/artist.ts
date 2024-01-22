import axios from "../app/axios";
import { SpotifyArtist } from "../interface/artist";

export async function topArtists(token: string): Promise<SpotifyArtist[]> {
  try {
    const res = await axios.get("/me/top/artists", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: 10,
        time_range: "short_term",
      },
    });
    const topArtists = res.data.items;
    return topArtists; 
    // return res.data?.items || [];
  } catch (error) {
    console.log(error)
    console.error("Error fetching user top artist:", error);
    throw new Error("Failed to fetch user top artist");
  }
}