import { Employee, employees } from "src/data/employees";

/**
 * Creates a new employee with the given information
 * @param employeeData - Details of the employee
 * @returns The new employee and their information
 */
export const createEmployee = async (
    employeeData: {
        name: string;
        position: string;
        department: string;
        email: string;
        phone: string;
        branchId: number;
    }
): Promise<Employee> => {
    let newId: number = 0;
    let isNotUnique: boolean = true;

    // Goes through employees until new ID doesn't match existing IDs
    while (isNotUnique) {
        newId += 1;
        isNotUnique = false;

        for (const key in employees) {
            if (newId === employees[key].id) {
                isNotUnique = true;
                break
            }
        }
    }
    
    const newEmployee: Employee = {
        id: newId,
        name: employeeData.name,
        position: employeeData.position,
        department: employeeData.department,
        email: employeeData.email,
        phone: employeeData.phone,
        branchId: employeeData.branchId
    };

    employees.push(newEmployee);
    return structuredClone(newEmployee);
};

/**
 * Retrieves all employees with details
 * @returns Array of all employees
 */
export const getAllEmployees = async (): Promise<Employee[]> => {
    return structuredClone(employees);
};

/**
 * Retrieves an employee by ID 
 * @param id - ID of the employee
 * @returns An employee with matching given ID
 * @throws Error if employee with given ID is not found
 */
export const getEmployeeById = async (
    id: number
): Promise<Employee> => {
    // Get index with matching employee with given id
    const index: number = employees.findIndex(
        (employee: Employee) => employee.id === id
    );

    // If employee with given ID is not found
    if (index === -1) {
        throw new Error(`Couldn't find Employee with ID:${id}`);
    }

    return structuredClone(employees[index]);
};

/**
 * Updates an existing employee's position or phone number
 * @param id - The ID of the employee to update
 * @param employeeData - The fields to update (position or phone number)
 * @returns The updated Employee
 * @throws Error if employee with given ID is not found
 */
export const updateEmployee = async (
    id: number,
    employeeData: Pick<Employee, "position" | "phone">
): Promise<Employee> => {
    // Get index with matching employee with given id
    const index: number = employees.findIndex(
        (employee: Employee) => employee.id === id
    );

    // If employee with given ID is not found
    if (index === -1) {
        throw new Error(`Couldn't find Employee with ID:${id}`);
    }

    // Updates the employee with given fields
    employees[index] = {
        ...employees[index],
        ...employeeData,
    };

    return structuredClone(employees[index]);
};

/**
 * Deletes an employee from database
 * @param id - The ID of the employee to delete
 * @throws Error if employee with given ID is not found
 */
export const deleteEmployee = async (
    id: number
): Promise<void> => {
    // Get index with matching employee with given id
    const index: number = employees.findIndex(
        (employee: Employee) => employee.id === id
    );

    // If employee with given ID is not found
    if (index === -1) {
        throw new Error(`Couldn't find Employee with ID:${id}`);
    }

    employees.splice(index, 1);
};
