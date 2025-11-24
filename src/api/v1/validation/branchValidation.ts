import Joi from "joi";
import { Branch } from "src/api/v1/models/branchModel";

/**
 * @openapi
 * components:
 *   schemas:
 *     Branch:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - phone
 *       properties:
 *         id:
 *           type: string
 *           example: "abc123def"
 *         name:
 *           type: string
 *           minLength: 3
 *           maxLength: 100
 *           example: "Joseph Mother"
 *         address:
 *           type: string
 *           minLength: 3
 *           maxLength: 100
 *           example: "123 Birthday Street"
 *         phone:
 *           type: string
 *           example: "(123) 456-7890"
 */
export const branchSchema: Joi.ObjectSchema<Branch> = Joi.object<Branch>({
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

/**
 * @openapi
 * components:
 *   schemas:
 *     Branch:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - phone
 *       properties:
 *         id:
 *           type: string
 *           example: "abc123def"
 *         name:
 *           type: string
 *           minLength: 3
 *           maxLength: 100
 *           example: "Joseph Mother"
 *         address:
 *           type: string
 *           minLength: 3
 *           maxLength: 100
 *           example: "123 Birthday Street"
 *         phone:
 *           type: string
 *           example: "(123) 456-7890"
 */
export const branchUpdateSchema: Joi.ObjectSchema<Branch> = Joi.object<Branch>({
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
