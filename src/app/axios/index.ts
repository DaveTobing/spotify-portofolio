import axiosDefault from "axios";

const Axios = axiosDefault.create({
  baseURL: "https://api.spotify.com/v1",
});

export default Axios