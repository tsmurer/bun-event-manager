export interface User {
    id: number;
    userName: string;
    email: string;
    dateOfBirth: Date;
    profilePic: string;
    passwordHash: string;
  }


export interface CreateUserDto {
    email: string;
    username: string;
    password: string;
    role_id: number | string;
    date_of_birth: string;
}
  