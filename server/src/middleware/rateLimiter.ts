/**
 * Rate Limiting Middleware
 * ========================
 * OWASP A05:2021 - Security Misconfiguration
 * Prevents brute force and DoS attacks
 */
import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';

/**
 * Standard JSON error response for rate limit exceeded
 */
const rateLimitHandler = (req: Request, res: Response) => {
    res.status(429).json({
        success: false,
        error: 'Too many requests',
        message: 'You have exceeded the rate limit. Please try again later.',
        retryAfter: res.getHeader('Retry-After'),
    });
};

/**
 * Global rate limiter - applies to all routes
 * 100 requests per 15 minutes per IP
 */
export const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: { error: 'Too many requests from this IP' },
    standardHeaders: true, // Return rate limit info in headers
    legacyHeaders: false,
    handler: rateLimitHandler,
    // Skip rate limiting entirely in development
    skip: () => process.env.NODE_ENV === 'development',
});

/**
 * Auth rate limiter - stricter for login attempts
 * 5 requests per 15 minutes per IP (brute force protection)
 */
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,
    message: { error: 'Too many login attempts. Please try again in 15 minutes.' },
    standardHeaders: true,
    legacyHeaders: false,
    handler: rateLimitHandler,
    // Don't skip in development - we want to test this
});

/**
 * Admin rate limiter - for authenticated admin endpoints
 * 30 requests per 15 minutes per user
 */
export const adminLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 300, // Increased for admin dashboard usage
    message: { error: 'Too many admin requests. Please slow down.' },
    standardHeaders: true,
    legacyHeaders: false,
    handler: rateLimitHandler,
    // Use user ID as key instead of IP for authenticated routes
    keyGenerator: (req: Request) => {
        // @ts-ignore - user is added by auth middleware
        return req.user?.id || req.ip || 'unknown';
    },
    // Skip rate limiting for trusted IPs (development)
    skip: (req) => process.env.NODE_ENV === 'development',
});

/**
 * Strict limiter for sensitive operations (password change, etc.)
 * 3 requests per hour per IP
 */
export const strictLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3,
    message: { error: 'Too many sensitive requests. Please try again in an hour.' },
    standardHeaders: true,
    legacyHeaders: false,
    handler: rateLimitHandler,
});
