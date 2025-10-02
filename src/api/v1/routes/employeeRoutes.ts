import express, { Router } from "express";
import * as employeeController from "../controllers/employeeController";

const router: Router = express.Router();

// Routes for "/api/v1/employees"
router.post("/", employeeController.createEmployee);
router.get("/", employeeController.getAllEmployees);
router.get("/:id", employeeController.getEmployeeById);
router.put("/:id", employeeController.updateEmployee);
router.delete("/:id", employeeController.deleteEmployee);
router.get("/branch/:branchId", employeeController.getBranchEmployees);
router.get("/department/:department", employeeController.getDepartmentEmployees);

export default router;
