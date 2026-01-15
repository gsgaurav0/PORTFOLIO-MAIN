import { query, pool } from './config/db';
import dotenv from 'dotenv';

dotenv.config();

const fixProfile = async () => {
    try {
        console.log('🔧 Updating profile data...');
        await query(`
            UPDATE profile 
            SET name = 'Gaurav Gupta', 
                role = 'Frontend • Creator'
        `);
        console.log('✅ Profile updated to: Gaurav Gupta / Frontend • Creator');
    } catch (error) {
        console.error('❌ Failed to update profile:', error);
    } finally {
        await pool.end();
        process.exit();
    }
};

fixProfile();
