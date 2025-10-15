import * as employeeService from "../src/api/v1/services/employeeService";
import * as firestoreRepository from "../src/api/v1/repositories/firestoreRepository";
import { Employee } from "../src/api/v1/models/employeeModel";

// Mock the repository module
jest.mock("../src/api/v1/repositories/firestoreRepository");

describe("Employee Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create an employee successfully", async () => {
        // ARRANGE:
        const mockData: {
            name: string;
            position: string;
            department: string;
            email: string;
            phone: string;
            branchId: number;
        } = {
            name: "Test Name",
            position: "Test Position",
            department: "Test Department",
            email: "email@test.com",
            phone: "123-345-4567",
            branchId: 3
        };
        
        const mockDocumentId: number = 1;

        (firestoreRepository.createDocument as jest.Mock).mockResolvedValue(
            mockDocumentId
        );

        // ACT:
        const result: Employee = await employeeService.createEmployee(mockData);

        // ASSERT:
        expect(firestoreRepository.createDocument).toHaveBeenCalledWith(
            "employees",
            expect.objectContaining({
                name: mockData.name,
                position: mockData.position,
                department: mockData.department,
                email: mockData.email,
                phone: mockData.phone,
                branchId: mockData.branchId
            }),
            "1"
        );
        expect(result.id).toBe(mockDocumentId);
        expect(result.name).toBe(mockData.name);
    });
});
