/**
 * Messages Routes
 * ===============
 * CRUD for contact form submissions
 */
import { Router, Request, Response } from 'express';
import { query } from '../config/db.js';
import { authenticateToken } from '../middleware/auth.js';
import { globalLimiter } from '../middleware/rateLimiter.js';
import { messageSchema } from '../schema/validation.js';

const router = Router();

/**
 * POST /api/messages
 * Submit a new contact message (public)
 */
router.post('/', globalLimiter, async (req: Request, res: Response) => {
    try {
        // Validate input
        const parseResult = messageSchema.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({
                success: false,
                error: parseResult.error.errors[0]?.message || 'Invalid input',
            });
        }

        const { name, email, message } = parseResult.data;

        const result = await query(
            'INSERT INTO messages (name, email, message) VALUES ($1, $2, $3) RETURNING *',
            [name, email, message]
        );

        res.status(201).json({
            success: true,
            message: 'Message sent successfully',
            data: result.rows[0],
        });
    } catch (error) {
        console.error('Create message error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to send message',
        });
    }
});

/**
 * GET /api/messages
 * Get all messages (admin only)
 */
router.get('/', authenticateToken, async (req: Request, res: Response) => {
    try {
        const result = await query(
            'SELECT * FROM messages ORDER BY created_at DESC'
        );

        // Count unread
        const unreadResult = await query(
            'SELECT COUNT(*) as count FROM messages WHERE is_read = FALSE'
        );

        res.json({
            success: true,
            data: result.rows,
            unreadCount: parseInt(unreadResult.rows[0]?.count || '0'),
        });
    } catch (error) {
        console.error('Get messages error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch messages',
        });
    }
});

/**
 * PUT /api/messages/:id/read
 * Mark message as read (admin only)
 */
router.put('/:id/read', authenticateToken, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const result = await query(
            'UPDATE messages SET is_read = TRUE WHERE id = $1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Message not found',
            });
        }

        res.json({
            success: true,
            data: result.rows[0],
        });
    } catch (error) {
        console.error('Mark read error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update message',
        });
    }
});

/**
 * DELETE /api/messages/:id
 * Delete a message (admin only)
 */
router.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const result = await query(
            'DELETE FROM messages WHERE id = $1 RETURNING id',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Message not found',
            });
        }

        res.json({
            success: true,
            message: 'Message deleted',
        });
    } catch (error) {
        console.error('Delete message error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete message',
        });
    }
});

export default router;
