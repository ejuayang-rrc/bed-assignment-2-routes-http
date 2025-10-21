import Joi from "joi";
import { Employee } from "src/api/v1/models/employeeModel";

export const employeeSchema: Joi.ObjectSchema<Employee> = Joi.object<Employee>({
    name: Joi.string()
    .trim()
    .min(3).max(100)
    .required()
    .label('Name'),

    position: Joi.string()
    .trim()
    .min(3).max(100)
    .required()
    .label('Position'),

    department: Joi.string()
    .trim()
    .min(2).max(100)
    .required()
    .label('Department'),

    email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label('Email'),

    phone: Joi.string()
    .pattern(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/)
    .required()
    .messages({
        'string.pattern.base': 'Phone Number is invalid'
    })
    .label('Phone Number'),
    
    branchId: Joi.string()
    .pattern(/^\d+$/)
    .required()
    .messages({
        'string.pattern.base': 'Branch ID should be numeric'
    })
    .label('Branch ID')
});

export const employeeUpdateSchema: Joi.ObjectSchema<Employee> = Joi.object<Employee>({
    position: Joi.string()
    .trim()
    .min(3).max(100)
    .label('Position'),

    phone: Joi.string()
    .pattern(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/)
    .messages({
        'string.pattern.base': 'Phone Number is invalid'
    })
    .label('Phone Number')
});
