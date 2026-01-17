/**
 * JWT Authentication Middleware
 * =============================
 * OWASP A07:2021 - Identification and Authentication Failures
 * - Secure token verification
 * - httpOnly cookie support
 */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend Express Request type to include user
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                username: string;
            };
        }
    }
}

/**
 * Verify JWT token from Authorization header or cookie
 * OWASP: Tokens should be in httpOnly cookies for web apps
 */
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    // Check for token in cookie first (more secure), then header
    const tokenFromCookie = req.cookies?.token;
    const authHeader = req.headers['authorization'];
    const tokenFromHeader = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    const token = tokenFromCookie || tokenFromHeader;

    if (!token) {
        return res.status(401).json({
            success: false,
            error: 'Unauthorized',
            message: 'Authentication required. Please log in.',
        });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        console.error('❌ JWT_SECRET not configured');
        return res.status(500).json({
            success: false,
            error: 'Server configuration error',
        });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret) as { id: string; username: string };
        req.user = decoded;
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                success: false,
                error: 'Token expired',
                message: 'Your session has expired. Please log in again.',
            });
        }
        return res.status(403).json({
            success: false,
            error: 'Invalid token',
            message: 'Authentication failed. Please log in again.',
        });
    }
};

/**
 * Optional authentication - doesn't fail if no token
 * Useful for public routes that behave differently for logged-in users
 */
export const optionalAuth = (req: Request, res: Response, next: NextFunction) => {
    const tokenFromCookie = req.cookies?.token;
    const authHeader = req.headers['authorization'];
    const tokenFromHeader = authHeader && authHeader.split(' ')[1];

    const token = tokenFromCookie || tokenFromHeader;

    if (!token) {
        return next();
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        return next();
    }

    try {
        const decoded = jwt.verify(token, jwtSecret) as { id: string; username: string };
        req.user = decoded;
    } catch {
        // Token invalid, but we don't fail - just proceed without user
    }
    next();
};

/**
 * Generate JWT token
 */
export const generateToken = (payload: { id: string; username: string }): string => {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error('JWT_SECRET not configured');
    }
    return jwt.sign(payload, jwtSecret, { expiresIn: '7d' });
};
