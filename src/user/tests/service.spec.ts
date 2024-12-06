import { executeQuery } from "../../db/db";
import { CreateUserDto, User } from "../model";
import { createUserService, getAllUsersService, getUserByIdService, updateUserService, deleteUserService } from "../service";
import { validUserMock } from "./mocks";

jest.mock("../../db/db");

describe("User Service", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("createUserService", () => {
    it("should create a new user", async () => {
      const createUserDto: CreateUserDto = validUserMock;

      const expectedUser: User = {
        id: 1,
        username: "testUser",
        firstName: "Test",
        lastName: "User",
        email: "test@example.com",
        dateOfBirth: "1990-01-01",
        profilePic: null,
        passwordHash: "hashedPassword",
        createdAt: new Date(),
        updatedAt: null
      };

      (executeQuery as jest.Mock).mockResolvedValue([expectedUser]);

      const result = await createUserService(createUserDto);
      
      expect(executeQuery).toHaveBeenCalledWith(
        expect.stringContaining("INSERT INTO users"),
        [
          createUserDto.username,
          createUserDto.first_name,
          createUserDto.last_name,
          createUserDto.email,
          createUserDto.date_of_birth,
          createUserDto.profile_pic,
          createUserDto.password_hash
        ]
      );

      expect(result).toEqual(expectedUser);
    });
  });

  describe("getAllUsersService", () => {
    it("should return all users", async () => {
      const expectedUsers: User[] = [
        { id: 1, username: "user1", firstName: "", lastName: "", email: "", dateOfBirth: "", profilePic: "", passwordHash: "", createdAt: new Date(), updatedAt: null },
        { id: 2, username: "user2", firstName: "", lastName: "", email: "", dateOfBirth: "", profilePic: "", passwordHash: "", createdAt: new Date(), updatedAt: null }
      ];

      (executeQuery as jest.Mock).mockResolvedValue(expectedUsers);

      const result = await getAllUsersService();
      
      expect(executeQuery).toHaveBeenCalledWith(
        expect.stringContaining("SELECT"),
        []
      );

      expect(result).toEqual(expectedUsers);
    });
  });

  describe("getUserByIdService", () => {
    it("should return a user by ID", async () => {
      const userId = 1;
      const expectedUser: User = { id: userId, username: "testUser", firstName: "", lastName: "", email: "", dateOfBirth: "", profilePic: "", passwordHash: "", createdAt: new Date(), updatedAt: null };

      (executeQuery as jest.Mock).mockResolvedValue([expectedUser]);

      const result = await getUserByIdService(userId);
      
      expect(executeQuery).toHaveBeenCalledWith(
        expect.stringContaining("WHERE id = $1"),
        [userId]
      );

      expect(result).toEqual(expectedUser);
    });

    it("should return null if user not found", async () => {
      const userId = 999;
      (executeQuery as jest.Mock).mockResolvedValue([]);

      const result = await getUserByIdService(userId);
      
      expect(result).toBeNull();
    });
  });

  describe("updateUserService", () => {
    it("should update an existing user", async () => {
      const userId = 1;
      const updateData: Partial<User> = {
        firstName: "Updated",
        lastName: "Name"
      };

      const expectedUser: User = { id: userId, username: "", firstName: "Updated", lastName: "Name", email: "", dateOfBirth: "", profilePic: "", passwordHash: "", createdAt: new Date(), updatedAt: new Date() };

      (executeQuery as jest.Mock).mockResolvedValue([expectedUser]);

      const result = await updateUserService({ ...updateData, id: userId });
      
      expect(executeQuery).toHaveBeenCalledWith(
        expect.stringContaining("UPDATE users"),
        [
          updateData.firstName,
          updateData.lastName,
          undefined,
          undefined,
          undefined,
          undefined,
          userId
        ]
      );

      expect(result).toEqual(expectedUser);
    });

    it("should return null if user not found", async () => {
      const userId = 999;
      const updateData: Partial<User> = { firstName: "Updated" };

      (executeQuery as jest.Mock).mockResolvedValue([]);

      const result = await updateUserService({ ...updateData, id: userId });
      
      expect(result).toBeNull();
    });
  });

  describe("deleteUserService", () => {
    it("should delete a user", async () => {
      const userId = 1;

      (executeQuery as jest.Mock).mockResolvedValue([{ id: userId }]);

      const result = await deleteUserService(userId);
      
      expect(executeQuery).toHaveBeenCalledWith(
        expect.stringContaining("DELETE FROM users WHERE id = $1"),
        [userId]
      );

      expect(result).toBe(true);
    });

    it("should return false if user not found", async () => {
      const userId = 999;

      (executeQuery as jest.Mock).mockResolvedValue([]);

      const result = await deleteUserService(userId);
      
      expect(result).toBe(false);
    });
  });
});