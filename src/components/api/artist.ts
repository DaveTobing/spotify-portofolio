import { userPlaylists } from "@/data/playlist";

export const fetchPlaylists = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const fetchedPlaylists = await userPlaylists(token);
        return fetchedPlaylists;
      }
    } catch (error) {
      console.error("Error fetching top tracks:", error);
    }
  };

