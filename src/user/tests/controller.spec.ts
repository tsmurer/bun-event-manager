import { createUserController } from "../controller";
import { CreateUserDto } from "../model";
import { validUserMock } from "./mocks";
import { Request, Response } from 'express'

jest.mock("../service.ts");

describe("User Controller", () =>{
    let req: Partial<Request>;
    let res: Partial<Response>;

    describe("createUserController", () =>{
        it("should create user and return 200", () => {
            req = {
                body: validUserMock
            }

            res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            createUserController(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
        })
    })
    // describe("getAllUsersController", () =>{})
    // describe("getUserByIdController", () =>{})
    // describe("updateUserController", () =>{})
    // describe("deleteUserController", () =>{})

})