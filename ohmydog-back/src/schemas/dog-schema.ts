import { CreateDogParams } from "@/service/dog-service";
import joi from "joi";

export const createDogSchema = joi.object<CreateDogParams>({
  name: joi.string().min(2).max(50).required(),
  age: joi.string().valid("Puppy", "Adolescent", "Adult", "Elderly").required(),
  genre: joi.string().valid("Male", "Female").required(),
  description: joi.string().required(),
  urlImage: joi.string().required(),
});
