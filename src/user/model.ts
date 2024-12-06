import { z } from "zod";

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string; 
  profilePic?: string | null;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface CreateUserDto {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth: string;
  profile_pic?: string | null;
  password_hash: string;
}


export const userSchema = z.object({
  username: z.string().min(1, "Username is required"),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Email is required"),
  date_of_birth: z.coerce.date(),
  profile_pic: z.nullable(z.string()),
  password_hash: z.string()
})