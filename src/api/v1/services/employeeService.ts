import {
    QuerySnapshot,
    DocumentData,
    DocumentSnapshot,
} from "firebase-admin/firestore";

import * as firestoreRepository from "../repositories/firestoreRepository";
import { Employee } from "src/api/v1/models/employeeModel";

/**
 * Creates a new employee with the given information
 * @param employeeData - Details of the employee
 * @returns The new employee and their details
 */
export const createEmployee = async (
    employeeData: Omit<Employee, "id">
): Promise<Employee> => {
    try {
        const employees: Employee[] = await getAllEmployees();
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
        
        // Employee data setup w/out ID
        const newEmployee: Partial<Employee> = {
            name: employeeData.name,
            position: employeeData.position,
            department: employeeData.department,
            email: employeeData.email,
            phone: employeeData.phone,
            branchId: employeeData.branchId
        };

        // Push document to firestore
        await firestoreRepository.createDocument(
            "employees", 
            newEmployee, 
            newId.toString()
        );

        return structuredClone(
            { id: newId, ...newEmployee } as Employee
        );
    } catch (error: unknown) {
        throw error;
    }
};

/**
 * Retrieves all employees with details
 * @returns Array of all employees
 */
export const getAllEmployees = async (): Promise<Employee[]> => {
    try {
        // Get collection from firestore database
        const snapshot: QuerySnapshot = 
        await firestoreRepository.getDocuments("employees");

        // Goes through the snapshot, formatting to array of Employees
        const employees: Employee[] = snapshot.docs.map((doc) => {
            const data: DocumentData = doc.data();
            return {
                id: parseInt(doc.id),
                ...data,
            } as Employee;
        });

        return employees;
    } catch (error: unknown) {
        throw error;
    }
};

/**
 * Retrieves an employee by ID 
 * @param id - ID of the employee
 * @returns An employee with matching given ID
 * @throws Error if employee with given ID is not found
 */
export const getEmployeeById = async (
    id: string
): Promise<Employee> => {
    try {
        const doc: DocumentSnapshot | null = 
        await firestoreRepository.getDocumentById(
            "employees",
            id
        );

        if (!doc) {
            throw new Error(`Couldn't find Employee with ID:${id}`);
        }

        const data: DocumentData | undefined = doc.data();
        const employee: Employee = {
            id: parseInt(doc.id),
            ...data,
        } as Employee;

        return employee;
    } catch (error: unknown) {
        throw error;
    }
};

/**
 * Updates an existing employee's position or phone number
 * @param id - The ID of the employee to update
 * @param employeeData - The fields to update (position and/or phone number)
 * @returns The updated employee
 * @throws Error if employee with given ID is not found
 */
export const updateEmployee = async (
    id: string,
    employeeData: Pick<Employee, "position" | "phone">
): Promise<Employee> => {
    try {
        const employee: Employee = await getEmployeeById(id);

        if (!employee) {
            throw new Error(`Couldn't find Employee with ID:${id}`);
        }

        // Updates the employee object with the given fields
        const updatedEmployee: Omit<Employee, "id"> = {
            ...employee,
            ...employeeData
        };

        await firestoreRepository.updateDocument<Employee>(
            "employees",
            id,
            updatedEmployee
        );

        return structuredClone(
            { id: parseInt(id), ...updatedEmployee } as Employee
        );
    } catch (error: unknown) {
        throw error;
    }
};

/**
 * Deletes an employee from the database
 * @param id - The ID of the employee to delete
 * @throws Error if employee with given ID is not found
 */
export const deleteEmployee = async (
    id: string
): Promise<void> => {
    try {
        // To check of the employee exists
        const employee: Employee = await getEmployeeById(id);
        
        if (!employee) {
            throw new Error(`Couldn't find Employee with ID:${id}`);
        }

        await firestoreRepository.deleteDocument("employees", id);
    } catch (error: unknown) {
        throw error;
    }
};

/**
 * Retrieves employees belonging to the specified branch
 * @param id - ID of the branch to search in
 * @returns Employees within the same branch
 */
export const getBranchEmployees = async (
    id: number
): Promise<Employee[]> => {
    try {
        const employees: Employee[] = await getAllEmployees();
        const branchEmployees: Employee[] = [];

        for (const index in employees) {
            if (id === employees[index].branchId) {
                branchEmployees.push(employees[index]);
            }
        }

        return branchEmployees;
    } catch (error: unknown) {
        throw error;
    }
};

/**
 * Retrieves employees belonging to the specified department
 * @param department - Name of the department to search in
 * @returns Employees within the same department
 */
export const getDepartmentEmployees = async (
    department: string
): Promise<Employee[]> => {
    try {
        const employees: Employee[] = await getAllEmployees();
        const matchingEmployees: Employee[] = employees.filter((employee: Employee) =>
            employee.department.toLowerCase().includes(department.toLowerCase())
        );

        return matchingEmployees;
    } catch (error: unknown) {
        throw error;
    }
};