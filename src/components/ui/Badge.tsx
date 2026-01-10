import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'outline' | 'accent';
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'default' }) => {
    const styles = {
        default: "bg-retro-teal/20 text-deep-green border-2 border-retro-dark",
        outline: "bg-white border-2 border-retro-dark text-retro-dark",
        accent: "bg-retro-yellow text-retro-dark border-2 border-retro-dark",
    };

    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-display uppercase tracking-wide shadow-sm ${styles[variant]}`}>
            {children}
        </span>
    );
};

export default Badge;
