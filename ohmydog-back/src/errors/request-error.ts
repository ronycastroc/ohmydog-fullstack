import { RequestError } from "@/protocols";

export const requestError = (message: string): RequestError => {
  return {
    name: "RequestError",
    message,
  };
};
