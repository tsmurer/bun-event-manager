import express from 'express';
import { initializeDatabase } from './db/init-db';

const PORT = 3000;

async function main() {
    await initializeDatabase();

    const app = express();
    
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

main().catch(err => {
    console.error('Error in main function:', err);
});