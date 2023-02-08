import api from "./api";

export const postSignIn = async (body) => {
  const response = await api.post("/sign-in", body);

  return response.data;
};