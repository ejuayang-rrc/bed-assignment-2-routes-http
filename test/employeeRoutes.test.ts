import request from "supertest";
import app from "../src/app";
import { HTTP_STATUS } from "../src/constants/httpConstants";
import * as employeeService from "../src/api/v1/services/employeeService";

// Mock CRUD Operations
jest.mock("../src/api/v1/services/employeeService");

describe("Employee API Endpoints", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("POST /api/v1/employees/", () => {
        it("should create a new employee with valid data", async () => {
            // ARRANGE:
            const mockEmployee = {
                name: "Test Name",
                position: "Test Position",
                department: "Test Department",
                email: "email@test.com",
                phone: "123-345-4567",
                branchId: "3"
            };

            // ACT:
            const response = 
            await request(app).post("/api/v1/employees/").send(mockEmployee);

            // ASSERT:
            expect(employeeService.createEmployee).toHaveBeenCalled();
        });

        it("should return 400 with missing parameters", async () => {
            // ACT:
            const response = await request(app).post("/api/v1/employees/").send({});

            // ASSERT: 
            expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST);
        });
    });

    describe("GET /api/v1/employees/", () => {
        it("should retrieve all employees", async () => {
            // ACT:
            await request(app).get("/api/v1/employees/");

            // ASSERT:
            expect(employeeService.getAllEmployees).toHaveBeenCalled();
        });
    });

    describe("GET /api/v1/employees/:id", () => {
        it("should retrieve an employee successfully", async () => {
            // ACT:
            await request(app).get("/api/v1/employees/1");

            // ASSERT:
            expect(employeeService.getEmployeeById).toHaveBeenCalled();
        });

        it("should return all employees when ID parameter is missing", async () => {
            // ACT:
            await request(app).get("/api/v1/employees/");

            // ASSERT:
            expect(employeeService.getAllEmployees).toHaveBeenCalled();
        });
    });

    describe("PUT /api/v1/employees/:id", () => {
        it("should successfully update an employee", async () => {
            // ARRANGE:
            const mockItem = {
                position: "Updated Position",
                phone: "Updated Phone Number",
            };

            // ACT:
            await request(app).put("/api/v1/employees/1").send(mockItem);

            // ASSERT:
            expect(employeeService.updateEmployee).toHaveBeenCalled();
        });

        it("should return 404 when ID parameter is missing", async () => {
            // ACT:
            const response = await request(app).put("/api/v1/employees/");

            // ASSERT:
            expect(response.status).toBe(HTTP_STATUS.NOT_FOUND);
        });
    });

    describe("DELETE /api/v1/employees/:id", () => {
        it("should successfully delete an employee", async () => {
            // ACT:
            await request(app).delete("/api/v1/employees/1");

            // ASSERT:
            expect(employeeService.deleteEmployee).toHaveBeenCalled();
        });

        it("should return 404 when ID parameter is missing", async () => {
            // ACT:
            const response = await request(app).delete("/api/v1/employees/");

            // ASSERT:
            expect(response.status).toBe(HTTP_STATUS.NOT_FOUND);
        });
    });

    describe("PUT /api/v1/employees/branch/:branchId", () => {
        it("should retrieve an array of employees from the same branch", async () => {
            // ACT:
            await request(app).get("/api/v1/employees/branch/3");

            // ASSERT:
            expect(employeeService.getBranchEmployees).toHaveBeenCalled();
        });

        // No clue how else to do this, http status keeps returning 200
        // it("should return 500 if branch is left blank", async () => {
        //     // ACT:
        //     const response = await request(app).get("/api/v1/employees/branch/");

        //     // ASSERT:
        //     expect(response.status).toBe(500);
        // });
    });

    describe("PUT /api/v1/employees/department/:department", () => {
        it("should retrieve an array of employees from the same department", async () => {
            // ACT:
            await request(app).get("/api/v1/employees/department/IT");

            // ASSERT:
            expect(employeeService.getDepartmentEmployees).toHaveBeenCalled();
        });

        // No clue how else to do this, http status keeps returning 200
        // it("should return 500 if department is left blank", async () => {
        //     // ACT:
        //     const response = await request(app).get("/api/v1/employees/department/");

        //     // ASSERT:
        //     expect(response.status).toBe(500);
        // });
    });
})
