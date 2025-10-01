import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as branchService from "../services/branchService";
import { Branch } from "src/data/branches";

/**
 * Manages requests and responses to create a Branch
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const createBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (!req.body.name) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Branch Name is required",
            });
        } else if (!req.body.address) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Branch Email is required",
            });
        } else if (!req.body.phone) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Branch Phone Number is required",
            });
        } else {
            const { 
                name,
                address,
                phone
            } = req.body;

            const newBranch: Branch = 
            await branchService.createBranch({
                name,
                address,
                phone
            });

            res.status(HTTP_STATUS.CREATED).json({
                message: `Branch ${newBranch.id} created successfully`,
                data: newBranch
            });
        }
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages requests and responses to retrieve all Branches
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const getAllBranches = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const branches: Branch[] = 
        await branchService.getAllBranches();

        res.status(HTTP_STATUS.OK).json({
            message: "Branches retrieved successfully",
            data: branches
        });
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages requests and responses to retrieve a Branch
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const getBranchById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;

        const branch: Branch = 
        await branchService.getBranchById(parseInt(id));

        res.status(HTTP_STATUS.OK).json({
            message: `Branch ${id} retrieved successfully`,
            data: branch
        });
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages requests and responses to update a Branch
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const updateBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const { address, phone } = req.body;

        const updatedBranch: Branch = 
        await branchService.updateBranch(
            parseInt(id),
            { address, phone }
        );

        res.status(HTTP_STATUS.OK).json({
            message: `Branch ${id} updated successfully`,
            data: updatedBranch
        });
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages requests and responses to delete a Branch
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const deleteBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id: number = parseInt(req.params.id);

        await branchService.deleteBranch(id);
        res.status(HTTP_STATUS.OK).json({
            message: `Branch ${id} deleted successfully`,
        });
    } catch (error: unknown) {
        next(error);
    }
};
