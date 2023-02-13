import api from "./api";
import { createHeaders } from "./createHeaders";

export const getDogs = async () => {
  const response = await api.get("/dogs");

  return response.data;
};

export const getDogById = async (dogId) => {
  const config = createHeaders();
  const response = await api.get(`/dogs/${dogId}`, config);

  return response.data;
};

export const postDog = async (body) => {
  const config = createHeaders();
  const response = await api.post("/dogs", body, config);

  return response.data;
};

export const updateDog = async ({ dogId, body }) => {
  const config = createHeaders();
  const response = await api.put(`/dogs/${dogId}`, body, config);

  return response.data;
};

export const deleteDog = async (dogId) => {
  const config = createHeaders();
  const response = await api.delete(`/dogs/${dogId}`, config);

  return response.data;
};