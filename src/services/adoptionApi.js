import api from "./api";
import { createHeaders } from "./createHeaders";

export const postAdoption = async (dogId) => {
  const config = createHeaders();
  const response = await api.post(`/adoptions/${dogId}`, {}, config);

  return response.data;
};