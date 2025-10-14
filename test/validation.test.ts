import { Request, Response, NextFunction } from 'express';
import { validationMiddleware } from '../src/api/v1/middleware/validation';
import { HTTP_STATUS } from '../src/constants/httpConstants';

describe('validation for /api/v1/employees/ using schema', () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        mockReq = {
            headers: {},
            params: {},
            body: {},
            path: "/api/v1/employees/"
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            locals: {}
        };
        mockNext = jest.fn();
    });

    it('should pass for valid employee POST input', () => {
        // ARRANGE:
        mockReq.method = "POST";
        mockReq.body = {
            name: "First Last",
            position: "Position Name", 
            department: "Management", 
            email: "email@website.com", 
            phone: "123-345-6789", 
            branchId: "3"
        };

        // ACT:
        validationMiddleware(mockReq as Request, mockRes as Response, mockNext);

        // ASSERT:
        expect(mockRes.status).not.toHaveBeenCalled();
        expect(mockRes.json).not.toHaveBeenCalled();
        expect(mockNext).toHaveBeenCalled();
    });

    it('should fail for invalid employee POST input', () => {
        // ARRANGE:
        mockReq.method = "POST";
        mockReq.body = {             
            name: "First Last",
            position: "Position Name", 
            department: "Management", 
            email: "Not an Email", 
            phone: "123-345-6789", 
            branchId: "3" 
        };

        // ACT:
        validationMiddleware(mockReq as Request, mockRes as Response, mockNext);

        // ASSERT:
        expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: `\"Email\" must be a valid email`
        });
    });
});

describe('validation for /api/v1/employee/ PUT route using schemas', () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        mockReq = {
            headers: {},
            params: {},
            body: {},
            path: "/api/v1/employees/1"
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            locals: {}
        };
        mockNext = jest.fn();
    });

    it('should pass for valid employee PUT input', () => {
        // ARRANGE:
        mockReq.method = "PUT";
        mockReq.body = {
            position: "Position Name", 
            phone: "123-345-6789" 
        };

        // ACT:
        validationMiddleware(mockReq as Request, mockRes as Response, mockNext);

        // ASSERT:
        expect(mockRes.status).not.toHaveBeenCalled();
        expect(mockRes.json).not.toHaveBeenCalled();
        expect(mockNext).toHaveBeenCalled();
    });

    it('should fail for invalid employee PUT input', () => {
        // ARRANGE:
        mockReq.method = "PUT";
        mockReq.body = {             
            position: "P", 
            phone: "123-345-6789"
        };

        // ACT:
        validationMiddleware(mockReq as Request, mockRes as Response, mockNext);

        // ASSERT:
        expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: `\"Position\" length must be at least 3 characters long`
        });
    });
});

describe('validation for /api/v1/branch/ using schemas', () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        mockReq = {
            headers: {},
            params: {},
            body: {},
            path: "/api/v1/branch/"
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            locals: {}
        };
        mockNext = jest.fn();
    });

    it('should pass for valid branch POST input', () => {
        // ARRANGE:
        mockReq.method = "POST";
        mockReq.body = {
            name: "Test Branch",
            address: "130 Address St, City, MB, A1B 2C3",
            phone: "123-345-6789"
        };

        // ACT:
        validationMiddleware(mockReq as Request, mockRes as Response, mockNext);

        // ASSERT:
        expect(mockRes.status).not.toHaveBeenCalled();
        expect(mockRes.json).not.toHaveBeenCalled();
        expect(mockNext).toHaveBeenCalled();
    });

    it('should fail for invalid branch POST input', () => {
        // ARRANGE:
        mockReq.method = "POST";
        mockReq.body = {
            name: "Test Branch",
            address: "130 Address St, City, MB, A1B 2C3",
            phone: "Not a Phone Number"
        };

        // ACT:
        validationMiddleware(mockReq as Request, mockRes as Response, mockNext);

        // ASSERT:
        expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: `Phone Number is invalid`
        });
    });
});

describe('validation for /api/v1/branch/ PUT route using schemas', () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        mockReq = {
            headers: {},
            params: {},
            body: {},
            path: "/api/v1/branch/1"
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            locals: {}
        };
        mockNext = jest.fn();
    });

    it('should pass for valid branch PUT input', () => {
        // ARRANGE:
        mockReq.method = "PUT";
        mockReq.body = {
            address: "130 Address St, City, MB, A1B 2C3", 
            phone: "123-345-6789"
        };

        // ACT:
        validationMiddleware(mockReq as Request, mockRes as Response, mockNext);

        // ASSERT:
        expect(mockRes.status).not.toHaveBeenCalled();
        expect(mockRes.json).not.toHaveBeenCalled();
        expect(mockNext).toHaveBeenCalled();
    });

    it('should fail for invalid branch PUT input', () => {
        // ARRANGE:
        mockReq.method = "PUT";
        mockReq.body = {             
            address: "N", 
            phone: "123-345-6789"
        };

        // ACT:
        validationMiddleware(mockReq as Request, mockRes as Response, mockNext);

        // ASSERT:
        expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: `\"Address\" length must be at least 3 characters long`
        });
    });
});