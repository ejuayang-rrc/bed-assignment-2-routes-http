import Joi from "joi";
import { Branch } from "src/api/v1/models/branchModel";

export const branchSchema = Joi.object<Branch>({
    name: Joi.string()
    .trim()
    .min(3).max(100)
    .required()
    .label("Name"),

    address: Joi.string()
    .trim()
    .min(3).max(100)
    .required()
    .label("Address"),

    phone: Joi.string()
    .pattern(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/)
    .required()
    .messages({
        "string.pattern.base": "Phone Number is invalid"
    })
    .label("Phone Number")
});

export const branchUpdateSchema = Joi.object<Branch>({
    address: Joi.string()
    .trim()
    .min(3).max(100)
    .label("Address"),

    phone: Joi.string()
    .pattern(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/)
    .messages({
        "string.pattern.base": "Phone Number is invalid"
    })
    .label("Phone Number")
});
