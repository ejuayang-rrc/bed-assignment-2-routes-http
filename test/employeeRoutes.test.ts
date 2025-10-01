import request from "supertest";
import app from "../src/app";
import * as employeeController from "../src/api/v1/controllers/employeeController";
import { HTTP_STATUS } from "../src/constants/httpConstants";

// Mock CRUD Operations
jest.mock("../src/api/v1/controllers/employeeController", () => ({
    createEmployee: jest.fn((req, res) => res.status(HTTP_STATUS.CREATED).send()),
    getAllEmployees: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    getEmployeeById: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    updateEmployee: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    deleteEmployee: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
}));

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
            expect(employeeController.createEmployee).toHaveBeenCalled();
            expect(response.status).toBe(HTTP_STATUS.CREATED);
        });

        it("should return 400 with missing parameters", async () => {
            // // ARRANGE: Mocking the function to to simulate a http status of 400
            // (employeeController.createEmployee as jest.Mock)
            // .mockImplementation((req, res) => {
            //     return res.status(HTTP_STATUS.BAD_REQUEST).send({});
            // });

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
            expect(employeeController.getAllEmployees).toHaveBeenCalled();
        })
    });

    describe("GET /api/v1/employees/:id", () => {
        it("should retrieve an employee successfully", async () => {
            // ACT:
            await request(app).get("/api/v1/employees/1");

            // ASSERT:
            expect(employeeController.getEmployeeById).toHaveBeenCalled();
        })

        it("should return all employees when ID parameter is missing", async () => {
            // ACT:
            await request(app).get("/api/v1/employees/");

            // ASSERT:
            expect(employeeController.getAllEmployees).toHaveBeenCalled();
        })
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
            expect(employeeController.updateEmployee).toHaveBeenCalled();
        })

        it("should return 404 when ID parameter is missing", async () => {
            // ACT:
            const response = await request(app).put("/api/v1/employees/");

            // ASSERT:
            expect(response.status).toBe(HTTP_STATUS.NOT_FOUND);
        })
    });

    describe("DELETE /api/v1/employees/:id", () => {
        it("should successfully delete an employee", async () => {
            // ACT:
            await request(app).delete("/api/v1/employees/1");

            // ASSERT:
            expect(employeeController.deleteEmployee).toHaveBeenCalled();
        })

        it("should return 404 when ID parameter is missing", async () => {
            // ACT:
            const response = await request(app).delete("/api/v1/employees/");

            // ASSERT:
            expect(response.status).toBe(HTTP_STATUS.NOT_FOUND);
        })
    });
})
