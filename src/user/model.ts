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