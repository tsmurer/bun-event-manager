import { Knex } from 'knex';

export interface User {
  id: number;
  userName: string;
  email: string;
  dateOfBirth: Date;
  profilePic: string;
  passwordHash: string;
}

export const userService = (db: Knex) => {
  const tableName = 'users';

  return {
    getAllUsers: () => 
      db(tableName).select('*'),

    getUserById: (id: number) => 
      db(tableName).where({ id }).first(),

    createUser: (userData: Partial<User>) => 
      db(tableName)
        .insert(userData)
        .returning('*')
        .then(users => users[0]),

    updateUser: (id: number, updates: Partial<User>) => 
      db(tableName)
        .where({ id })
        .update(updates)
        .returning('*')
        .then(users => users[0]),

    deleteUser: (id: number) => 
      db(tableName).where({ id }).delete()
  };
};
