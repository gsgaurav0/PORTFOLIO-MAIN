/**
 * Experiences Routes
 * ==================
 */
import { Router, Request, Response } from 'express';
import { query } from '../config/db.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateBody, validateParams } from '../middleware/validate.js';
import { createExperienceSchema, updateExperienceSchema, uuidSchema } from '../schema/validation.js';
import { adminLimiter } from '../middleware/rateLimiter.js';
import { z } from 'zod';

const router = Router();
const idParamSchema = z.object({ id: uuidSchema });

router.get('/', async (req: Request, res: Response) => {
    try {
        const result = await query('SELECT * FROM experiences ORDER BY created_at DESC');
        res.json({ success: true, data: result.rows });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch experiences' });
    }
});

router.get('/:id', validateParams(idParamSchema), async (req: Request, res: Response) => {
    try {
        const result = await query('SELECT * FROM experiences WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Experience not found' });
        }
        res.json({ success: true, data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch experience' });
    }
});

router.post('/', authenticateToken, adminLimiter, validateBody(createExperienceSchema), async (req: Request, res: Response) => {
    try {
        const { company, role, period, description, achievements, stack } = req.body;
        const result = await query(
            `INSERT INTO experiences (company, role, period, description, achievements, stack)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [company, role, period || '', description || '', achievements || [], stack || []]
        );
        res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to create experience' });
    }
});

router.put('/:id', authenticateToken, adminLimiter, validateParams(idParamSchema), validateBody(updateExperienceSchema), async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const fields = Object.keys(updates);
        if (fields.length === 0) {
            return res.status(400).json({ success: false, error: 'No fields to update' });
        }
        const setClause = fields.map((field, i) => `${field} = $${i + 2}`).join(', ');
        const values = [id, ...fields.map((f) => updates[f])];

        const result = await query(`UPDATE experiences SET ${setClause} WHERE id = $1 RETURNING *`, values);
        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Experience not found' });
        }
        res.json({ success: true, data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to update experience' });
    }
});

router.delete('/:id', authenticateToken, adminLimiter, validateParams(idParamSchema), async (req: Request, res: Response) => {
    try {
        const result = await query('DELETE FROM experiences WHERE id = $1 RETURNING id', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Experience not found' });
        }
        res.json({ success: true, message: 'Experience deleted' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to delete experience' });
    }
});

export default router;
