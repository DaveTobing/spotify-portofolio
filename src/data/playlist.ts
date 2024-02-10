import { GetSpotifyPlaylistById, GetSpotifyPlaylist } from "../interface/playlist";
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

    console.log()

    return MadeforYouplaylists.filter((playlist) => playlist.owner.display_name === 'Spotify');
  } catch (error) {
    console.error("Error fetching user playlists:", error);
    throw new Error("Failed to fetch user playlists");
  }
}

export async function GetTracks(token: string, id:string): Promise<GetSpotifyPlaylistById[]> {
  try {
    console.log(id)
    const res = await axios.get(`/playlists/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res)
    return res.data?.items || [];
  } catch (error) {
    console.log("test")
    console.error("Error fetching user playlists:", error);
    throw new Error("Failed to fetch user playlists");
  }
}