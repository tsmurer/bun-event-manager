import { executeQuery, pool } from "../db/db"
import { CreateUserDto, User } from "./model";


export const getAllUsersService = async (): Promise<User[]> => {
    const users = await executeQuery<User>(
        'SELECT * FROM users ORDER BY id ASC',
        []
    );
    return users;
};

export const createUserService = async (createUserData: CreateUserDto): Promise<User> => {
    const { email, username, password, date_of_birth } = createUserData;

    const [user] = await executeQuery<User>(
        `INSERT INTO users (username, email, date_of_birth, password_hash)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [username, email, date_of_birth, password]
    );
    return user;
};

export const getUserByIdService = async (id: number): Promise<User | null> => {
    const [user] = await executeQuery<User>(
        'SELECT * FROM users WHERE id = $1',
        [id]
    );
    return user || null;
};

export const updateUserService = async (id: number, updateUserData: Partial<CreateUserDto>): Promise<User | null> => {
    const { email, username, password, role_id, date_of_birth } = updateUserData;

    const [user] = await executeQuery<User>(
        `UPDATE users
         SET 
            email = COALESCE($1, email),
            username = COALESCE($2, username),
            password = COALESCE($3, password),
            role_id = COALESCE($4, role_id),
            date_of_birth = COALESCE($5, date_of_birth),
            updated_at = NOW()
         WHERE id = $6
         RETURNING *`,
        [email, username, password, role_id, date_of_birth, id]
    );

    return user || null;
};


export const deleteUserService = async (id: number): Promise<boolean> => {
    const result = await executeQuery<{ count: string }>(
        'DELETE FROM users WHERE id = $1 RETURNING COUNT(*)',
        [id]
    );

    return result.length > 0;
};

