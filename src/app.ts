import express from "express";
import knex from "knex";
import dotenv from "dotenv";
import { userService } from "./user/service";

dotenv.config();

const app = express();
app.use(express.json());

const db = knex({
  client: "pg",
  connection: {
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || "your_user",
    password: process.env.DB_PASSWORD || "your_password",
    database: process.env.DB_NAME || "your_database",
  },
});

const userServiceInstance = userService(db);

// Routes for testing
app.get("/users", async (req, res) => {
  try {
    const users = await userServiceInstance.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users", details: err });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await userServiceInstance.getUserById(Number(req.params.id));
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user", details: err });
  }
});

app.post("/users", async (req, res) => {
  try {
    const newUser = await userServiceInstance.createUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to create user", details: err });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const updatedUser = await userServiceInstance.updateUser(
      Number(req.params.id),
      req.body
    );
    if (!updatedUser) return res.status(404).json({ error: "User not found" });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to update user", details: err });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const deleted = await userServiceInstance.deleteUser(Number(req.params.id));
    if (deleted === 0) return res.status(404).json({ error: "User not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete user", details: err });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});