import { useState } from 'react';
import { Menu, X, Gamepad2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { label: 'Home', href: '#home' },
        { label: 'About', href: '#about' },
        { label: 'Skills', href: '#skills' },
        { label: 'Projects', href: '#projects' },
        { label: 'Experience', href: '#experience' },
        { label: 'Reviews', href: '#reviews' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-40 px-4 py-4">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white border-3 border-retro-dark shadow-retro rounded-full px-6 py-3 flex items-center justify-between">

                    {/* Logo */}
                    <a href="#" className="flex items-center gap-2 group">
                        <div className="bg-retro-orange p-1.5 rounded-lg border-2 border-retro-dark group-hover:rotate-12 transition-transform">
                            <Gamepad2 className="w-6 h-6 text-white" />
                        </div>
                    </a>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="font-display text-xs hover:text-retro-teal transition-colors uppercase tracking-wide"
                            >
                                {item.label}
                            </a>
                        ))}
                        <a
                            href="#contact"
                            className="bg-deep-green text-white px-6 py-2 rounded-full font-display text-xs border-2 border-retro-dark shadow-retro-sm hover:translate-y-[-2px] hover:shadow-retro transition-all active:translate-y-[0px] active:shadow-none flex items-center justify-center"
                        >
                            CONTACT ME
                        </a>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden p-2 hover:bg-cream rounded-lg transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden absolute top-20 left-4 right-4 z-30"
                    >
                        <div className="bg-white border-3 border-retro-dark shadow-retro rounded-2xl p-6 flex flex-col gap-4 text-center">
                            {navItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className="font-display text-sm hover:text-retro-orange transition-colors py-2 border-b-2 border-cream last:border-0"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </a>
                            ))}
                            <a
                                href="#contact"
                                onClick={() => setIsOpen(false)}
                                className="bg-deep-green text-white px-6 py-3 rounded-xl font-display text-sm border-2 border-retro-dark shadow-retro-sm mt-2 flex items-center justify-center"
                            >
                                CONTACT ME
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
