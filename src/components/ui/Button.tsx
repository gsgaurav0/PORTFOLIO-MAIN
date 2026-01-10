import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({
    className,
    variant = 'primary',
    size = 'md',
    children,
    ...props
}) => {
    const baseStyles = "font-display border-3 border-retro-dark shadow-retro transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-retro-sm hover:translate-y-[-2px] hover:shadow-retro-lg rounded-lg";

    const variants = {
        primary: "bg-retro-orange text-white",
        secondary: "bg-deep-green text-white",
        outline: "bg-white text-retro-dark hover:bg-cream",
    };

    const sizes = {
        sm: "px-4 py-2 text-xs",
        md: "px-6 py-3 text-sm",
        lg: "px-8 py-4 text-base",
    };

    return (
        <button
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
