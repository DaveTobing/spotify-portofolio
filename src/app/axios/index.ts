import axiosDefault from "axios";

const axios = axiosDefault.create({
  baseURL: "https://api.spotify.com/v1",
});

export default axios