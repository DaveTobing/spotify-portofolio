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

    const Userplaylists: GetSpotifyPlaylist[] = res.data?.items || [];

    return Userplaylists.filter((playlist) => playlist.public);
  } catch (error) {
    console.error("Error fetching user playlists:", error);
    throw new Error("Failed to fetch user playlists");
  }
}

export async function MadeforYouPlaylists(
  token: string
): Promise<GetSpotifyPlaylist[]> {
  try {
    const res = await axios.get("/me/playlists", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const MadeforYouplaylists: GetSpotifyPlaylist[] = res.data?.items || [];

    console.log(MadeforYouplaylists)

    console.log(MadeforYouplaylists.filter((playlist) => playlist.owner.display_name === "spotify"))

    return MadeforYouplaylists.filter((playlist) => playlist.owner.display_name === "Spotify");
  } catch (error) {
    console.error("Error fetching user playlists:", error);
    throw new Error("Failed to fetch user playlists");
  }
}
