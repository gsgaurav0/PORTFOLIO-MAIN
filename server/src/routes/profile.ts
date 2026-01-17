/**
 * Profile Routes
 * ==============
 * Single profile (one row in DB)
 */
import { Router, Request, Response } from 'express';
import { query } from '../config/db.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateBody } from '../middleware/validate.js';
import { updateProfileSchema } from '../schema/validation.js';
import { adminLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const result = await query('SELECT * FROM profile LIMIT 1');
        if (result.rows.length === 0) {
            return res.json({ success: true, data: null });
        }
        res.json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('❌ Profile Fetch Error:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch profile' });
    }
});

router.put('/', authenticateToken, adminLimiter, validateBody(updateProfileSchema), async (req: Request, res: Response) => {
    try {
        const updates = req.body;
        const fields = Object.keys(updates);

        if (fields.length === 0) {
            return res.status(400).json({ success: false, error: 'No fields to update' });
        }

        // Check if profile exists
        const existing = await query('SELECT id FROM profile LIMIT 1');

        if (existing.rows.length === 0) {
            // Create new profile
            const cols = fields.join(', ');
            const vals = fields.map((_, i) => `$${i + 1}`).join(', ');
            const result = await query(
                `INSERT INTO profile (${cols}) VALUES (${vals}) RETURNING *`,
                fields.map((f) => updates[f])
            );
            return res.status(201).json({ success: true, data: result.rows[0] });
        }

        // Update existing
        const id = existing.rows[0].id;
        const setClause = fields.map((field, i) => `${field} = $${i + 2}`).join(', ');
        const values = [id, ...fields.map((f) => updates[f])];

        const result = await query(`UPDATE profile SET ${setClause} WHERE id = $1 RETURNING *`, values);
        res.json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ success: false, error: 'Failed to update profile' });
    }
});

export default router;
