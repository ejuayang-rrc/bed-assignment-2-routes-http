import express, { Router } from "express";
import * as employeeController from "../controllers/employeeController";

const router: Router = express.Router();

/**
 * @openapi
 * /employees:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - position
 *               - department
 *               - email
 *               - phone
 *               - branchId
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 100
 *                 example: "Joseph Mother"
 *               position:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 100
 *                 example: "Branch Manager"
 *               department:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 100
 *                 example: "Management"
 *               email:
 *                 type: string
 *                 example: "email@business.com"
 *               phone:
 *                 type: string
 *                 example: "(123) 456-7890"
 *               branchId:
 *                 type: number
 *                 example: 1
 *     responses:
 *       '201':
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/validations/Employee'
 *       '400':
 *         description: Invalid body input
 *           content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/validations/Error'
 */
router.post("/", employeeController.createEmployee);

/**
 * @openapi
 * /api/v1/employees:
 *   get:
 *     summary: Get all employees, or filter by branch or department
 *     tags:
 *       - Employees
 *     parameters:
 *       - in: query
 *         name: branchId
 *         schema:
 *           type: number
 *         description: Filter employees by branch ID
 *       - in: query
 *         name: department
 *         schema:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *         description: Filter employees by department name
 *     responses:
 *       '200':
 *         description: List of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 employees:
 *                   type: array
 *                   items: 
 *                     $ref: '#/components/validations/Employee'
 *       '400':
 *         description: Invalid query parameter
 *       '404':
 *         description: No employees found
 */
router.get("/", employeeController.getEmployees);

/**
 * @openapi
 * /employees/{id}:
 *   get:
 *     summary: Get an employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The employee ID
 *     responses:
 *       '200':
 *         description: Employee found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       '404':
 *         description: Employee not found
 */
router.get("/:id", employeeController.getEmployeeById);

/**
 * @openapi
 * /employees/{id}:
 *   put:
 *     summary: Update an employee's position or phone number by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The employee ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               position:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 100
 *                 example: "Assistant Manager"
 *               phone:
 *                 type: string
 *                 example: "(123) 456-7890"
 *     responses:
 *       '200':
 *         description: Employee updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       '400':
 *         description: Invalid input
 *       '404':
 *         description: Employee not found
 */
router.put("/:id", employeeController.updateEmployee);

/**
 * @openapi
 * /employees/{id}:
 *   delete:
 *     summary: Delete an employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The employee ID
 *     responses:
 *       '200':
 *         description: Employee deleted successfully
 *       '404':
 *         description: Employee not found
 */
router.delete("/:id", employeeController.deleteEmployee);

export default router;
