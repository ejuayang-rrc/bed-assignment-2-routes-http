/**
 * @openapi
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       required:
 *         - name
 *         - position
 *         - department
 *         - email
 *         - phone
 *         - branchId
 *       properties:
 *         id:
 *           type: string
 *           example: "abc123def"
 *         name:
 *           type: string
 *           minLength: 3
 *           maxLength: 100
 *           example: "Joseph Mother"
 *         position:
 *           type: string
 *           minLength: 3
 *           maxLength: 100
 *           example: "Branch Manager"
 *         department:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *           example: "Management"
 *         email:
 *           type: string
 *           example: "email@business.com"
 *         phone:
 *           type: string
 *           example: "(123) 456-7890"
 *         branchId:
 *           type: number
 *           example: 1
 */
export interface Employee {
    /** ID of the employee */
    id: number;

    /** The employee's full name */
    name: string;

    /** Position of the employee */
    position: string;

    /** The department the employee works under */
    department: string;

    /** The employee's email */
    email: string;

    /** The employee's phone number */
    phone: string;

    /** The branch ID of the employee */
    branchId: number;
}
