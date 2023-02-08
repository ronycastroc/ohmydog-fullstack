import api from "./api";

export const postSignIn = async (body) => {
  const response = await api.post("/sign-in", body);

  return response.data;
};

export const postSignUp = async (body) => {
  const response = await api.post("/sign-up", body);

  return response.data;
};
