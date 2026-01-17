/**
 * Authentication Routes
 * =====================
 * OWASP A07:2021 - Identification and Authentication Failures
 */
import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { query } from '../config/db.js';
import { generateToken, authenticateToken } from '../middleware/auth.js';
import { validateBody } from '../middleware/validate.js';
import { loginSchema } from '../schema/validation.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = Router();

/**
 * POST /api/auth/login
 * Authenticate user and return JWT token
 */
router.post('/login', authLimiter, validateBody(loginSchema), async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const result = await query('SELECT * FROM users WHERE username = $1', [username]);

        if (result.rows.length === 0) {
            // OWASP: Don't reveal whether username exists
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials',
                message: 'Username or password is incorrect.',
            });
        }

        const user = result.rows[0];

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password_hash);

        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials',
                message: 'Username or password is incorrect.',
            });
        }

        // Generate JWT token
        const token = generateToken({ id: user.id, username: user.username });

        // Set httpOnly cookie (more secure than localStorage)
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.json({
            success: true,
            message: 'Login successful',
            user: {
                id: user.id,
                username: user.username,
            },
            token, // Also return token for clients that need it in header
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            error: 'Server error',
            message: 'An error occurred during login.',
        });
    }
});

/**
 * POST /api/auth/logout
 * Clear authentication cookie
 */
router.post('/logout', authenticateToken, (req: Request, res: Response) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
    });

    res.json({
        success: true,
        message: 'Logged out successfully',
    });
});

/**
 * GET /api/auth/me
 * Get current authenticated user
 */
router.get('/me', authenticateToken, (req: Request, res: Response) => {
    res.json({
        success: true,
        user: req.user,
    });
});

/**
 * POST /api/auth/verify
 * Verify if token is still valid
 */
router.post('/verify', authenticateToken, (req: Request, res: Response) => {
    res.json({
        success: true,
        valid: true,
        user: req.user,
    });
});

/**
 * POST /api/auth/change-password
 * Change user password (requires current password)
 */
router.post('/change-password', authenticateToken, async (req: Request, res: Response) => {
    try {
        const { currentPassword, newPassword } = req.body;

        // Validate input
        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                error: 'Both current and new password are required',
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                error: 'New password must be at least 6 characters',
            });
        }

        // Get user from database
        const userId = req.user?.id;
        const userResult = await query('SELECT * FROM users WHERE id = $1', [userId]);

        if (userResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'User not found',
            });
        }

        const user = userResult.rows[0];

        // Verify current password
        const isValidPassword = await bcrypt.compare(currentPassword, user.password_hash);

        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                error: 'Current password is incorrect',
            });
        }

        // Hash new password and update
        const newPasswordHash = await bcrypt.hash(newPassword, 12);
        await query('UPDATE users SET password_hash = $1 WHERE id = $2', [newPasswordHash, userId]);

        res.json({
            success: true,
            message: 'Password changed successfully',
        });
    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to change password',
        });
    }
});

export default router;
