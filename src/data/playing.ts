import axios from "../app/axios";
import { PlayingTrack } from "../interface/playing";

export async function currentlyPlayingTrack(token: string): Promise<PlayingTrack | undefined> {
    try {
        const res = await axios.get("/me/player/currently-playing", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        return res.data;
    
      } catch (error) {
        console.error("Error fetching user currently Playing Track:", error);
        throw new Error("Failed to fetch user currently Playing Track");
      }
}