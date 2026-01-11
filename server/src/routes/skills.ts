/**
 * Skills Routes
 * =============
 * CRUD operations for skills with validation
 */
import { Router, Request, Response } from 'express';
import { query } from '../config/db.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateBody, validateParams } from '../middleware/validate.js';
import { createSkillSchema, updateSkillSchema, uuidSchema } from '../schema/validation.js';
import { adminLimiter } from '../middleware/rateLimiter.js';
import { z } from 'zod';

const router = Router();
const idParamSchema = z.object({ id: uuidSchema });

/**
 * GET /api/skills
 * Public - List all skills
 */
router.get('/', async (req: Request, res: Response) => {
    try {
        const result = await query('SELECT * FROM skills ORDER BY title');
        res.json({
            success: true,
            data: result.rows,
        });
    } catch (error) {
        console.error('Get skills error:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch skills' });
    }
});

/**
 * GET /api/skills/:id
 */
router.get('/:id', validateParams(idParamSchema), async (req: Request, res: Response) => {
    try {
        const result = await query('SELECT * FROM skills WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Skill not found' });
        }
        res.json({ success: true, data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch skill' });
    }
});

/**
 * POST /api/skills
 */
router.post('/', authenticateToken, adminLimiter, validateBody(createSkillSchema), async (req: Request, res: Response) => {
    try {
        const { title, level, color, progress, totalSkills, equipment, achievements } = req.body;
        const result = await query(
            `INSERT INTO skills (title, level, color, progress, total_skills, equipment, achievements)
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [title, level || '', color || '#000000', progress || 0, totalSkills || 0, equipment || [], achievements || []]
        );
        res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to create skill' });
    }
});

/**
 * PUT /api/skills/:id
 */
router.put('/:id', authenticateToken, adminLimiter, validateParams(idParamSchema), validateBody(updateSkillSchema), async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const fields = Object.keys(updates);
        if (fields.length === 0) {
            return res.status(400).json({ success: false, error: 'No fields to update' });
        }
        // Map camelCase to snake_case for DB
        const fieldMap: Record<string, string> = { totalSkills: 'total_skills' };
        const dbFields = fields.map(f => fieldMap[f] || f);
        const setClause = dbFields.map((field, i) => `${field} = $${i + 2}`).join(', ');
        const values = [id, ...fields.map((f) => updates[f])];

        const result = await query(`UPDATE skills SET ${setClause} WHERE id = $1 RETURNING *`, values);
        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Skill not found' });
        }
        res.json({ success: true, data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to update skill' });
    }
});

/**
 * DELETE /api/skills/:id
 */
router.delete('/:id', authenticateToken, adminLimiter, validateParams(idParamSchema), async (req: Request, res: Response) => {
    try {
        const result = await query('DELETE FROM skills WHERE id = $1 RETURNING id', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Skill not found' });
        }
        res.json({ success: true, message: 'Skill deleted' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to delete skill' });
    }
});

export default router;
