import api from "./api";

export const getDogPic = async () => {
  const response = await api.get("https://dog.ceo/api/breeds/image/random");

  return response.data;
};