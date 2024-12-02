import { pool } from "./db";

const createUsersTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            date_of_birth DATE NOT NULL,
            profile_pic VARCHAR(255),
            password_hash VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
        );
    `;
    await pool.query(query);
    console.log('Users table created or already exists');
};

const createEventsTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS events (
            id SERIAL PRIMARY KEY,
            event_name VARCHAR(255) NOT NULL,
            start_time TIMESTAMP NOT NULL,
            end_time TIMESTAMP NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
        );
    `;
    await pool.query(query);
    console.log('Events table created or already exists');
};

const createEventRolesTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS event_roles (
            id SERIAL PRIMARY KEY,
            event_id INT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
            user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            role VARCHAR(50) NOT NULL CHECK (role IN ('owner', 'admin', 'participant', 'invited')),
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW(),
            UNIQUE (event_id, user_id, role)
        );
    `;
    await pool.query(query);
    console.log('EventRoles table created or already exists');
};

const createEventRelationships = async () => {
    const query = `
        ALTER TABLE events
        ADD COLUMN IF NOT EXISTS event_owner INT REFERENCES users(id);
    `;
    await pool.query(query);
    console.log('Event relationships updated');
};

export const initializeDatabase = async () => {
    try {
        await createUsersTable();
        await createEventsTable();
        await createEventRolesTable();
        await createEventRelationships();
        console.log('Database initialized');
    } catch (err) {
        console.error('Error initializing database', err);
        throw err;
    }
};