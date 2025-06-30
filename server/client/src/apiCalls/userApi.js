import axios from "axios";

//fetching a user
export const fetchUser = async () => {
  const response = await axios.get("/api/currentuser", {
    withCredentials: true,
  });
  try {
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

//route to signin

export const signinUser = async () => {
  const response = await axios.get("/auth/google");
  return response;
};
