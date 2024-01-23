import { FollowedArtists, topArtists } from "@/data/artist";

export const fetchFollowedArtist = async () => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const fetchedFollowedArtist = await FollowedArtists(token);
      return fetchedFollowedArtist;
    }
  } catch (error) {
    console.error("Error fetching top artist:", error);
  }
};

export const fetchTopArtist = async () => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const fetchedTopArtist = await topArtists(token);
      return fetchedTopArtist;
    }
  } catch (error) {
    console.error("Error fetching top artist:", error);
  }
};
