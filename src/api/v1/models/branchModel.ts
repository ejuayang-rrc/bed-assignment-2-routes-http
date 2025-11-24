/**
 * @openapi
 * components:
 *   schemas:
 *     Branch:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - phone
 *       properties:
 *         id:
 *           type: string
 *           example: "abc123def"
 *         name:
 *           type: string
 *           minLength: 3
 *           maxLength: 100
 *           example: "Joseph Mother"
 *         address:
 *           type: string
 *           minLength: 3
 *           maxLength: 100
 *           example: "123 Birthday Street"
 *         phone:
 *           type: string
 *           example: "(123) 456-7890"
 */
export interface Branch {
    /** The branch's ID */
    id: number;

    /** Name of the branch */
    name: string;

    /** The branch's address */
    address: string;

    /** The phone number of the branch */
    phone: string;
}
