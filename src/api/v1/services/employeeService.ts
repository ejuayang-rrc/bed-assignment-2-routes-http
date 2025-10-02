import { Employee, employees } from "../../../data/employees";

/**
 * Creates a new employee with the given information
 * @param employeeData - Details of the employee
 * @returns The new employee and their details
 */
export const createEmployee = async (
    employeeData: Omit<Employee, "id">
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
    // Get index with matching employee with given ID
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
 * @param employeeData - The fields to update (position and/or phone number)
 * @returns The updated employee
 * @throws Error if employee with given ID is not found
 */
export const updateEmployee = async (
    id: number,
    employeeData: Pick<Employee, "position" | "phone">
): Promise<Employee> => {
    // Get index of matching employee with given ID
    const index: number = employees.findIndex(
        (employee: Employee) => employee.id === id
    );

    // If employee with given ID is not found
    if (index === -1) {
        throw new Error(`Couldn't find Employee with ID:${id}`);
    }

    // Updates the employee object with the given fields
    employees[index] = {
        ...employees[index],
        ...employeeData,
    };

    return structuredClone(employees[index]);
};

/**
 * Deletes an employee from the database
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

/**
 * Retrieves employees belonging to the specified branch
 * @param id - ID of the branch to search in
 * @returns Employees within the same branch
 */
export const getBranchEmployees = async (
    id: number
): Promise<Employee[]> => {
    let branchEmployees: Employee[] = [];

    for (const index in employees) {
        if (id === employees[index].branchId) {
            branchEmployees.push(employees[index]);
        }
    }

    return structuredClone(branchEmployees);
};

/**
 * Retrieves employees belonging to the specified department
 * @param id - Name of the department to search in
 * @returns Employees within the same department
 */
export const getDepartmentEmployees = async (
    department: string
): Promise<Employee[]> => {
    const matchingEmployees: Employee[] = employees.filter((employee: Employee) =>
        employee.department.toLowerCase().includes(department.toLowerCase())
    );

    return structuredClone(matchingEmployees);
};