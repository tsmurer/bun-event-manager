import { executeQuery } from "../db/db"
import { CreateUserDto, User } from "./model";

export const createUserService = async (createUserData: CreateUserDto): Promise<User> => {
  const [user] = await executeQuery<User>(
    `INSERT INTO users (username, first_name, last_name, email, date_of_birth, profile_pic, password_hash, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NULL)
     RETURNING 
     id, 
     username, 
     first_name AS "firstName", 
     last_name AS "lastName", 
     email, 
     date_of_birth AS "dateOfBirth", 
     profile_pic AS "profilePic", 
     password_hash AS "passwordHash", 
     created_at AS "createdAt", 
     updated_at AS "updatedAt"`,
    [
      createUserData.username,
      createUserData.first_name,
      createUserData.last_name,
      createUserData.email,
      createUserData.date_of_birth,
      createUserData.profile_pic || null,
      createUserData.password_hash
    ]
  );
  return user;
};

export const getAllUsersService = async (): Promise<User[]> => {
  const users = await executeQuery<User>(
    `SELECT 
      id, 
      username, 
      first_name AS "firstName", 
      last_name AS "lastName", 
      email, 
      date_of_birth AS "dateOfBirth", 
      profile_pic AS "profilePic", 
      password_hash AS "passwordHash", 
      created_at AS "createdAt", 
      updated_at AS "updatedAt"
    FROM users 
    ORDER BY id ASC`,
    []
  );
  return users;
};

export const getUserByIdService = async (id: number): Promise<User | null> => {
  const [user] = await executeQuery<User>(
    `SELECT 
      id, 
      username, 
      first_name AS "firstName", 
      last_name AS "lastName", 
      email, 
      date_of_birth AS "dateOfBirth", 
      profile_pic AS "profilePic", 
      password_hash AS "passwordHash", 
      created_at AS "createdAt", 
      updated_at AS "updatedAt"
    FROM users 
    WHERE id = $1`,
    [id]
  );
  return user || null;
};

export const updateUserService = async (updateUserData: Partial<User>): Promise<User | null> => {
  const { id, firstName, lastName, email, dateOfBirth, profilePic, passwordHash } = updateUserData;
  const [user] = await executeQuery<User>(
    `UPDATE users
     SET
     first_name = COALESCE($1, first_name),
     last_name = COALESCE($2, last_name),
     email = COALESCE($3, email),
     date_of_birth = COALESCE($4, date_of_birth),
     profile_pic = COALESCE($5, profile_pic),
     password_hash = COALESCE($6, password_hash),
     updated_at = NOW()
     WHERE id = $7
     RETURNING 
     id, 
     username, 
     first_name AS "firstName", 
     last_name AS "lastName", 
     email, 
     date_of_birth AS "dateOfBirth", 
     profile_pic AS "profilePic", 
     password_hash AS "passwordHash", 
     created_at AS "createdAt", 
     updated_at AS "updatedAt"`,
    [
      firstName,
      lastName,
      email,
      dateOfBirth,
      profilePic,
      passwordHash,
      id
    ]
  );
  return user;
};

export const deleteUserService = async (id: number): Promise<boolean> => {
  const result = await executeQuery<User>(
    'DELETE FROM users WHERE id = $1',
    [id]
  );
  return Array.isArray(result) && result.length > 0;
};