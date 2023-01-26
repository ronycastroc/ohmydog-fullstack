import { RequestError } from "@/protocols";

type ApplicationInvalidateDataError = RequestError & {
  details: string[];
};

export const invalidDataError = (details: string[]): ApplicationInvalidateDataError => {
  return {
    name: "InvalidDataError",
    message: "Invalid Data",
    details,
  };
};
