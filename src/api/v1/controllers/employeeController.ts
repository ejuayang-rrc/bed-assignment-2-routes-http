import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as employeeService from "../services/employeeService";
import { Employee } from "src/data/employees";

/**
 * Manages requests and responses to create an Employee
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const createEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        if (!req.body.name) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Employee's Name is required",
            });
        } else if (!req.body.position) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Employee's Position is required",
            });
        } else if (!req.body.department) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Employee's Department is required",
            });
        } else if (!req.body.email) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Employee's Email is required",
            });
        } else if (!req.body.phone) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Employee's Phone Number is required",
            });
        } else if (!req.body.branchId) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Employee's Branch ID is required",
            });
        } else if (isNaN(req.body.branchId)) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Employee's Branch ID is not numeric",
            });
        } else {
            const { 
                name, 
                position, 
                department, 
                email, 
                phone,
                branchId
            } = req.body;

            const newEmployee: Employee = 
            await employeeService.createEmployee({
                name, 
                position, 
                department, 
                email, 
                phone, 
                branchId 
            });

            res.status(HTTP_STATUS.CREATED).json({
                message: `Employee ${newEmployee.id} created successfully`,
                data: newEmployee
            });
        }
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages requests and responses to retrieve all Employees
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const getAllEmployees = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const employees: Employee[] = 
        await employeeService.getAllEmployees();

        res.status(HTTP_STATUS.OK).json({
            message: "Employees retrieved successfully",
            data: employees
        });
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages requests and responses to retrieve an Employee
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const getEmployeeById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;

        const employee: Employee = 
        await employeeService.getEmployeeById(parseInt(id));

        res.status(HTTP_STATUS.OK).json({
            message: `Employee ${id} retrieved successfully`,
            data: employee
        });
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages requests and responses to update an Employee
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const updateEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const { position, phone } = req.body;

        const updatedEmployee: Employee = 
        await employeeService.updateEmployee(
            parseInt(id),
            { position, phone }
        );

        res.status(HTTP_STATUS.OK).json({
            message: `Employee ${id} updated successfully`,
            data: updatedEmployee
        });
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages requests and responses to delete an Employee
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const deleteEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id: number = parseInt(req.params.id);

        await employeeService.deleteEmployee(id);
        res.status(HTTP_STATUS.OK).json({
            message: `Employee ${id} deleted successfully`,
        });
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages requests and responses to retrieve Employees from a branch
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const getBranchEmployees = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;

        const branchEmployees: Employee[] = 
        await employeeService.getBranchEmployees(parseInt(id));

        if (branchEmployees.length === 0) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                message: `Couldn't find employees from branch ${id}`,
            });
        }
        else {
            res.status(HTTP_STATUS.OK).json({
                message: `Employees retrieved from branch ${id} successfully`,
                data: branchEmployees
            });
        }
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages requests and responses to retrieve Employees from a department
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const getDepartmentEmployees = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { department } = req.params;

        const departmentEmployees: Employee[] = 
        await employeeService.getDepartmentEmployees(department);

        if (departmentEmployees.length === 0) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                message: `Couldn't find employees from ${department}`,
            });
        }
        else {
            res.status(HTTP_STATUS.OK).json({
                message: `Employees retrieved from ${department} successfully`,
                data: departmentEmployees
            });
        }
    } catch (error: unknown) {
        next(error);
    }
};