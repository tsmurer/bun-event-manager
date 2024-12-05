import express from 'express';
import { initializeDatabase } from './db/init-db';
import { CreateUserDto, User } from './user/model';
import { createUserService, getAllUsersService } from './user/service';

const PORT = 3000;

async function main() {
  await initializeDatabase();
  const app = express();

  try {
    // Create a sample user
    const newUserData: CreateUserDto = {
      email: 'john.doe@example.com',
      username: 'johndoe',
      password_hash: 'hashedpassword123', // In real app, use proper hashing
      first_name: 'John',
      last_name: 'Doe',
      date_of_birth: '1990-01-01'
    };

    const createdUser = await createUserService(newUserData);
    console.log('Created User:', createdUser);

    // Fetch and log all users
    const allUsers = await getAllUsersService();
    console.log('All Users:', allUsers);
  } catch (error) {
    console.error('Error creating or fetching users:', error);
  }

  const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

main().catch(err => {
  console.error('Error in main function:', err);
});