import Joi from "joi";
import { Music } from "../protocols";

const musicSchema = Joi.object<Music>({
  title: Joi.string().required(),
  artist: Joi.string().required()
})

export default musicSchema;
