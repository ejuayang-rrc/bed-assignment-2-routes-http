import Joi from "joi";
import { Branch } from "../../../data/branches";

export const branchSchema = Joi.object<Branch>({
    name: Joi.string().trim().min(3).max(100).required(),
    address: Joi.string().trim().min(3).max(100).required(),
    phone: Joi.string()
    .regex(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g)
    .required()
    .messages({
        "string.pattern.base": "Phone Number is invalid"
    })
});
