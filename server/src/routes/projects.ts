/**
 * Projects Routes
 * ===============
 * CRUD operations for projects with validation
 */
import { Router, Request, Response } from 'express';
import { query } from '../config/db.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateBody, validateParams } from '../middleware/validate.js';
import { createProjectSchema, updateProjectSchema, uuidSchema } from '../schema/validation.js';
import { adminLimiter } from '../middleware/rateLimiter.js';
import { z } from 'zod';

const router = Router();

// Param validation schema
const idParamSchema = z.object({ id: uuidSchema });

/**
 * GET /api/projects
 * Public - List all projects
 */
router.get('/', async (req: Request, res: Response) => {
    try {
        const result = await query('SELECT * FROM projects ORDER BY created_at DESC');
        res.json({
            success: true,
            data: result.rows,
        });
    } catch (error) {
        console.error('Get projects error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch projects',
        });
    }
});

/**
 * GET /api/projects/:id
 * Public - Get single project
 */
router.get('/:id', validateParams(idParamSchema), async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await query('SELECT * FROM projects WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Project not found',
            });
        }

        res.json({
            success: true,
            data: result.rows[0],
        });
    } catch (error) {
        console.error('Get project error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch project',
        });
    }
});

/**
 * POST /api/projects
 * Protected - Create new project
 */
router.post('/', authenticateToken, adminLimiter, validateBody(createProjectSchema), async (req: Request, res: Response) => {
    try {
        const { title, subtitle, stack, features, link, image } = req.body;

        const result = await query(
            `INSERT INTO projects (title, subtitle, stack, features, link, image)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *`,
            [title, subtitle || '', stack || [], features || [], link || '', image || '']
        );

        res.status(201).json({
            success: true,
            message: 'Project created successfully',
            data: result.rows[0],
        });
    } catch (error) {
        console.error('Create project error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create project',
        });
    }
});

/**
 * PUT /api/projects/:id
 * Protected - Update project
 */
router.put('/:id', authenticateToken, adminLimiter, validateParams(idParamSchema), validateBody(updateProjectSchema), async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Build dynamic UPDATE query
        const fields = Object.keys(updates);
        if (fields.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'No fields to update',
            });
        }

        const setClause = fields.map((field, i) => `${field} = $${i + 2}`).join(', ');
        const values = [id, ...fields.map((f) => updates[f])];

        const result = await query(
            `UPDATE projects SET ${setClause} WHERE id = $1 RETURNING *`,
            values
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Project not found',
            });
        }

        res.json({
            success: true,
            message: 'Project updated successfully',
            data: result.rows[0],
        });
    } catch (error) {
        console.error('Update project error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update project',
        });
    }
});

/**
 * DELETE /api/projects/:id
 * Protected - Delete project
 */
router.delete('/:id', authenticateToken, adminLimiter, validateParams(idParamSchema), async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const result = await query('DELETE FROM projects WHERE id = $1 RETURNING id', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Project not found',
            });
        }

        res.json({
            success: true,
            message: 'Project deleted successfully',
        });
    } catch (error) {
        console.error('Delete project error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete project',
        });
    }
});

export default router;
