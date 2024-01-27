import { userPlaylists, MadeforYouPlaylists, GetTracks } from "@/data/playlist";

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


  export const fetchMadeforYouPlaylists = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const fetchedMadeforYouPlaylists = await MadeforYouPlaylists(token);
        return fetchedMadeforYouPlaylists;
      }
    } catch (error) {
      console.error("Error fetching top tracks:", error);
    }
  };

  export const fetchGenreByPlaylistId = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const fetchedTracks =  await GetTracks(token, '2b0USCXtBCqFgceQcDslZy');
        console.log(fetchedTracks)
        return fetchedTracks;
      }
    } catch (error) {
      console.log(error)
      console.error("Error fetching top tracks:", error);
    }
  };

