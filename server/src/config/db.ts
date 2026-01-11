/**
 * Database Configuration
 * ======================
 * PostgreSQL connection using pg Pool
 * OWASP: Connection pooling prevents resource exhaustion attacks
 */
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Validate required environment variables
if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL environment variable is required');
    process.exit(1);
}

/**
 * PostgreSQL connection pool
 * - max: 20 connections (prevents connection exhaustion)
 * - idleTimeoutMillis: Close idle connections after 30s
 * - connectionTimeoutMillis: Fail fast if DB is down
 */
export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
    // SSL for production
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

// Test connection on startup
pool.on('connect', () => {
    console.log('✅ Connected to PostgreSQL');
});

pool.on('error', (err) => {
    console.error('❌ PostgreSQL pool error:', err);
});

/**
 * Query helper with automatic error logging
 */
export const query = async (text: string, params?: any[]) => {
    const start = Date.now();
    try {
        const result = await pool.query(text, params);
        const duration = Date.now() - start;
        if (process.env.NODE_ENV === 'development') {
            console.log(`📊 Query executed in ${duration}ms`);
        }
        return result;
    } catch (error) {
        console.error('❌ Query error:', error);
        throw error;
    }
};

export default pool;
