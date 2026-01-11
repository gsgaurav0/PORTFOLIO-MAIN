/**
 * Socials Routes
 * ==============
 */
import { Router, Request, Response } from 'express';
import { query } from '../config/db.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateBody } from '../middleware/validate.js';
import { updateSocialSchema } from '../schema/validation.js';
import { adminLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const result = await query('SELECT * FROM socials ORDER BY platform');
        res.json({ success: true, data: result.rows });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch socials' });
    }
});

/**
 * PUT /api/socials/:platform
 * Update a social link by platform name
 */
router.put('/:platform', authenticateToken, adminLimiter, validateBody(updateSocialSchema), async (req: Request, res: Response) => {
    try {
        const { platform } = req.params;
        const { href, label } = req.body;

        const result = await query(
            `UPDATE socials SET href = $1, label = $2 WHERE platform = $3 RETURNING *`,
            [href, label, platform]
        );

        if (result.rows.length === 0) {
            // If not found, insert it
            const insertResult = await query(
                `INSERT INTO socials (platform, href, label) VALUES ($1, $2, $3) RETURNING *`,
                [platform, href, label]
            );
            return res.status(201).json({ success: true, data: insertResult.rows[0] });
        }

        res.json({ success: true, data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to update social' });
    }
});

export default router;
