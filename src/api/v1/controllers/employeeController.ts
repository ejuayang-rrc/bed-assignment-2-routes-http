import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as employeeService from "../services/employeeService";
import { Employee } from "src/api/v1/models/employeeModel";

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
): Promise<void> => {
    try {
        if (!req.body.name) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Employee's Name is required",
            });
            return; 
        } else if (!req.body.position) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Employee's Position is required",
            });
            return; 
        } else if (!req.body.department) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Employee's Department is required",
            });
            return; 
        } else if (!req.body.email) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Employee's Email is required",
            });
            return; 
        } else if (!req.body.phone) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Employee's Phone Number is required",
            });
            return;
        } else if (!req.body.branchId) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Employee's Branch ID is required",
            });
            return; 
        } else if (isNaN(req.body.branchId)) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Employee's Branch ID is not numeric",
            });
            return;
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
 * Manages requests and responses to retrieve a list of Employees
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const getEmployees = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { branchId, department } = req.query;

        // GET employees in branch
        if (typeof branchId === "string") {
            if (branchId.length === 0) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({
                    message: `Branch ID cannot be left blank`,
                });
                return;
            }

            const branchEmployees: Employee[] = await
            employeeService.getBranchEmployees(parseInt(branchId));
            
            if (branchEmployees.length <= 0) {
                res.status(HTTP_STATUS.NOT_FOUND).json({
                    message: `Employees from branch ${branchId} not found`,
                });
                return;
            } 

            res.status(HTTP_STATUS.OK).json({
                message: `Employees from branch ${branchId} retrieved successfully`,
                data: branchEmployees
            });
            return;

        // GET employees in department
        } else if (typeof department === "string") {
            if (department.length === 0) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({
                    message: `Department cannot be left blank`,
                });
                return;
            }

            const departmentEmployees: Employee[] = await
            employeeService.getDepartmentEmployees(department);
            
            if (departmentEmployees.length <= 0) {
                res.status(HTTP_STATUS.NOT_FOUND).json({
                    message: `Employees from ${department} not found`
                });
                return;
            } 

            res.status(HTTP_STATUS.OK).json({
                message: `Employees from ${department} retrieved successfully`,
                data: departmentEmployees
            });
            return;

        // default GET all employees
        } else {
            const employees: Employee[] = 
            await employeeService.getAllEmployees();

            res.status(HTTP_STATUS.OK).json({
                message: "Employees retrieved successfully",
                data: employees
            });
        }
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
