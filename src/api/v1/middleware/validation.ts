import { Request, Response, NextFunction } from "express";
import Joi from "joi";

import { Employee } from "../models/employeeModel";
import { Branch } from "../models/branchModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { branchSchema, branchUpdateSchema } from "../validation/branchValidation";
import { employeeSchema, employeeUpdateSchema } from "../validation/employeeValidation";

/**
 * Validates request data against the Joi schemas
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const validationMiddleware = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try {
        /**
         * Validates the request data against a Joi schema
         * @param joiSchema - Joi schema to validate against
         * @returns The stripped/validated data
         */
        const validateData = (
            joiSchema: Joi.ObjectSchema,
            requestData: Employee | Branch
        ): Employee | Branch => {
            const { error, value } = joiSchema.validate(requestData);
            if (error) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({
                    message: error.message
                });
                next(error);
            }
            return value;
        };

        // Employee route validation
        if (req.path.startsWith("/api/v1/employees")) {
            if (req.method === "PUT") {
                req.body = validateData(employeeUpdateSchema, req.body);
                next();
                return;
            }
            req.body = validateData(employeeSchema, req.body);
        }

        // Branch route validation
        if (req.path.startsWith("/api/v1/branch")) {
            if (req.method === "PUT") {
                req.body = validateData(branchUpdateSchema, req.body);
                next();
                return;
            }
            req.body = validateData(branchSchema, req.body);
        }
        next();
    } catch {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Error occurred during validation"
        });
        next();
    }
};
