import { GetSpotifyPlaylist } from "../interface/playlist";
import axios from "../app/axios";

export async function userPlaylists(
  token: string
): Promise<GetSpotifyPlaylist[]> {
  try {
    const res = await axios.get("/me/playlists", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const playlists: GetSpotifyPlaylist[] = res.data?.items || [];

    return playlists.filter((playlist) => playlist.public);
  } catch (error) {
    console.error("Error fetching user playlists:", error);
    throw new Error("Failed to fetch user playlists");
  }
}
