import { z } from "zod";
import { userSchema, User } from "./model";
import { Request, Response } from "express";

export const createUserController = (req: Request, res: Response) => {
  try {
    const validatedData = userSchema.parse(req.body);
    res.status(200).json({ message: "User created successfully", data: validatedData });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllUsersController = (req: Request, res: Response) => {
  try {
    const users:User[] = [];
    res.status(200).json({ message: "Users retrieved successfully", data: users });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserByIdController = (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    // TODO: Validate userId (e.g., check if it exists)
    
    // TODO: Call actual get user by id function here
    const user = {};
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json({ message: "User retrieved successfully", data: user });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUserController = (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    // TODO: Validate userId 
    
    const validatedData = userSchema.partial().parse(req.body);
    
    // TODO: Call actual update user function here
    res.status(200).json({ message: "User updated successfully", data: validatedData });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteUserController = (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    // TODO: Validate userId 
    // TODO: Call actual delete user function here
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};