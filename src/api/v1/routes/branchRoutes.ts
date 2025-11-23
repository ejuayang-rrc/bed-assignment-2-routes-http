import express, { Router } from "express";
import * as branchController from "../controllers/branchController";

const router: Router = express.Router();

/**
 * @openapi
 * /branch:
 *   post:
 *     summary: Create a new branch
 *     tags: [Branches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - address
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 100
 *                 example: "Downtown Branch"
 *               address:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 100
 *                 example: "123 Main St"
 *               phone:
 *                 type: string
 *                 example: "(204) 555-1234"
 *     responses:
 *       '201':
 *         description: Branch created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 *       '400':
 *         description: Invalid body input
 */
router.post("/", branchController.createBranch);

/**
 * @openapi
 * /branch:
 *   get:
 *     summary: Get all branches
 *     tags: [Branches]
 *     responses:
 *       '200':
 *         description: List of branches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Branch'
 */
router.get("/", branchController.getAllBranches);

/**
 * @openapi
 * /branch/{id}:
 *   get:
 *     summary: Get a branch by ID
 *     tags: [Branches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The branch ID
 *     responses:
 *       '200':
 *         description: Branch found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 *       '404':
 *         description: Branch not found
 */
router.get("/:id", branchController.getBranchById);

/**
 * @openapi
 * /branch/{id}:
 *   put:
 *     summary: Update a branch's address or phone number by ID
 *     tags: [Branches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The branch ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 100
 *                 example: "456 New Ave"
 *               phone:
 *                 type: string
 *                 example: "(204) 555-5678"
 *     responses:
 *       '200':
 *         description: Branch updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 *       '400':
 *         description: Invalid input
 *       '404':
 *         description: Branch not found
 */
router.put("/:id", branchController.updateBranch);

/**
 * @openapi
 * /branch/{id}:
 *   delete:
 *     summary: Delete a branch by ID
 *     tags: [Branches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The branch ID
 *     responses:
 *       '200':
 *         description: Branch deleted successfully
 *       '404':
 *         description: Branch not found
 */
router.delete("/:id", branchController.deleteBranch);

export default router;
