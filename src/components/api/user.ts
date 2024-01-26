import { userProfile } from "@/data/user";

export const fetchUser = async () => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const fetchedUser = await userProfile(token);
      return fetchedUser;
    }
  } catch (error) {
    console.error("Error fetching top tracks:", error);
  }
};
