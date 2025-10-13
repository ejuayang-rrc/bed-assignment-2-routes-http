import Joi from "joi";
import { Employee } from "../../../data/employees";

export const employeeSchema = Joi.object<Employee>({
    name: Joi.string().trim().min(3).max(100).required(),
    position: Joi.string().trim().min(3).max(100).required(),
    email: Joi.string().email().required(),
    branchId: Joi.string()
    .regex(/^\d+$/)
    .required()
    .messages({
        "string.pattern.base": "Branch ID should be numeric"
    }),
});
