import request from "supertest";
import app from "../src/app";
import { HTTP_STATUS } from "../src/constants/httpConstants";
import * as branchService from "../src/api/v1/services/branchService";

// Mock CRUD Operations
jest.mock("../src/api/v1/services/branchService");

describe("Branch API Endpoints", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("POST /api/v1/branch/", () => {
        it("should create a new branch with valid data", async () => {
            // ARRANGE:
            const mockBranch = {
                name: "Test Name",
                address: "Test Position",
                phone: "123-234-5678",
            };

            // ACT:
            const response = 
            await request(app).post("/api/v1/branch/").send(mockBranch);

            // ASSERT:
            expect(branchService.createBranch).toHaveBeenCalled();
        });

        it("should return 400 with missing parameters", async () => {
            // ACT:
            const response = await request(app).post("/api/v1/branch/").send({});

            // ASSERT: 
            expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST);
        });
    });

    describe("GET /api/v1/branch/", () => {
        it("should retrieve all branches", async () => {
            // ACT:
            await request(app).get("/api/v1/branch/");

            // ASSERT:
            expect(branchService.getAllBranches).toHaveBeenCalled();
        })
    });

    describe("GET /api/v1/branch/:id", () => {
        it("should retrieve a branch successfully", async () => {
            // ACT:
            await request(app).get("/api/v1/branch/1");

            // ASSERT:
            expect(branchService.getBranchById).toHaveBeenCalled();
        })

        it("should return all branches when ID parameter is missing", async () => {
            // ACT:
            await request(app).get("/api/v1/branch/");

            // ASSERT:
            expect(branchService.getAllBranches).toHaveBeenCalled();
        })
    });

    describe("PUT /api/v1/branch/:id", () => {
        it("should successfully update a branch", async () => {
            // ARRANGE:
            const mockItem = {
                address: "Updated Address",
                phone: "098-875-1234",
            };

            // ACT:
            await request(app).put("/api/v1/branch/1").send(mockItem);

            // ASSERT:
            expect(branchService.updateBranch).toHaveBeenCalled();
        })

        it("should return 404 when ID parameter is missing", async () => {
            // ACT:
            const response = await request(app).put("/api/v1/branch/");

            // ASSERT:
            expect(response.status).toBe(HTTP_STATUS.NOT_FOUND);
        })
    });

    describe("DELETE /api/v1/branch/:id", () => {
        it("should successfully delete a branch", async () => {
            // ACT:
            await request(app).delete("/api/v1/branch/1");

            // ASSERT:
            expect(branchService.deleteBranch).toHaveBeenCalled();
        })

        it("should return 404 when ID parameter is missing", async () => {
            // ACT:
            const response = await request(app).delete("/api/v1/branch/");

            // ASSERT:
            expect(response.status).toBe(HTTP_STATUS.NOT_FOUND);
        })
    });
})
