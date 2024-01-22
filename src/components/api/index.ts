import { topTracks } from "@/data/track";

export const fetchTracks = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const fetchedTracks = await topTracks(token);
        return fetchedTracks;
      }
    } catch (error) {
      console.error("Error fetching top tracks:", error);
    }
  };

