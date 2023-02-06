import api from "./api";

export const getDogs = async () => {
  const response = await api.get("/dogs");

  return response.data;
};