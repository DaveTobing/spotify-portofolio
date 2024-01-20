import axios from "../app/axios";
import { SpotifyTrack } from "../interface/track";

export async function topTracks(token: string): Promise<SpotifyTrack[]> {
  try {
    const res = await axios.get("/me/top/tracks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: 10,
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
