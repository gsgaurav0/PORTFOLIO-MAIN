import React from 'react';

interface SectionProps {
    id: string;
    className?: string;
    children: React.ReactNode;
}

const SectionWrapper: React.FC<SectionProps> = ({ id, className = "", children }) => {
    return (
        <section id={id} className={`w-full scroll-mt-32 ${className}`}>
            {children}
        </section>
    );
};

export default SectionWrapper;
