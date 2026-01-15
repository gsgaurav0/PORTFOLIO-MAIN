import React from 'react';

interface SectionProps {
    id: string;
    className?: string;
    children: React.ReactNode;
}

import { motion } from 'framer-motion';

const SectionWrapper: React.FC<SectionProps> = ({ id, className = "", children }) => {
    return (
        <motion.section
            id={id}
            className={`w-full scroll-mt-32 ${className}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {children}
        </motion.section>
    );
};

export default SectionWrapper;
