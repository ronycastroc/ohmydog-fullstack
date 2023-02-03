import api from "./api";

export const getDogFact = async () => {
  const response = await api.get("https://dog-api.kinduff.com/api/facts");

  return response.data;
};