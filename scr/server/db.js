// db.js
import mysql from 'mysql2/promise';
import { config } from 'dotenv';
config();  // This loads the .env variables into process.env

/**
 * Create a MySQL connection pool and return a promise-based instance of it.
 */
function createConnectionPool() {
    try {
        const pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
        console.log("Database connection successfully established.");
        return pool;
    } catch (error) {
        console.error("Database connection failed:", error);
        throw error;
    }
}

const dbPool = createConnectionPool();

export default dbPool;
