/**
 * Interface representing an employee.
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
