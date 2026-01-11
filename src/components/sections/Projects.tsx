import { useState } from 'react';
import SectionWrapper from '../ui/SectionWrapper';
import { ExternalLink, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { usePortfolioStore } from '../../store/useStore';

const Projects = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const projects = usePortfolioStore((state) => state.projects);

    const nextProject = () => {
        setCurrentIndex((prev) => (prev + 1) % projects.length);
    };

    const prevProject = () => {
        setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    };

    return (
        <SectionWrapper id="projects" className="py-20 relative">

            {/* Heavy Header */}
            <div className="text-center mb-16 relative z-10">
                <h2 className="text-5xl md:text-7xl font-display text-white stroke-text-white-2 tracking-wide drop-shadow-[4px_4px_0_rgba(0,0,0,1)] uppercase">
                    PROJECTS
                </h2>
                <div className="text-sm md:text-base font-body text-retro-dark/60 mt-2 font-medium flex items-center justify-center gap-2">
                    Showcasing my work with a retro game twist <Zap className="w-4 h-4 text-retro-yellow fill-retro-yellow" />
                </div>
            </div>

            {projects.length === 0 ? (
                <div className="text-center font-mono text-retro-dark/50">Loading projects...</div>
            ) : (
                <div className="max-w-6xl mx-auto px-4 relative">

                    {/* Main Window Frame */}
                    <div className="bg-pastel-yellow border-4 border-retro-dark rounded-xl shadow-retro-lg overflow-hidden relative z-10">

                        {/* Window Toolbar */}
                        <div className="border-b-4 border-retro-dark p-3 flex justify-between items-center bg-pastel-yellow">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-400 border border-retro-dark"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-400 border border-retro-dark"></div>
                                <div className="w-3 h-3 rounded-full bg-green-400 border border-retro-dark"></div>
                            </div>
                            <div className="font-display text-[10px] uppercase tracking-widest text-retro-dark/80">
                                RETRO PROJECT WINDOW
                            </div>
                            <div className="font-mono text-[8px] text-retro-dark/50">
                                Arrow keys • Click dots
                            </div>
                        </div>

                        {/* White Content Area */}
                        <div className="bg-white min-h-[500px] relative p-6 md:p-12 flex flex-col md:flex-row gap-8 items-center bg-[linear-gradient(rgba(18,18,18,0.02)_1px,transparent_1px)] bg-[size:100%_4px]">

                            {/* Left: Monitor/Screen */}
                            <div className="w-full md:w-1/2">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentIndex}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.3 }}
                                        className="aspect-video bg-retro-dark rounded-xl border-4 border-retro-dark shadow-retro-sm overflow-hidden relative group"
                                    >
                                        {projects[currentIndex].image.match(/^(http|\/)/) ? (
                                            <img
                                                src={projects[currentIndex].image}
                                                alt={projects[currentIndex].title}
                                                className="absolute inset-0 w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className={`absolute inset-0 ${projects[currentIndex].image} flex items-center justify-center`}>
                                                <div className="font-display text-white/20 text-4xl uppercase">
                                                    Preview
                                                </div>
                                            </div>
                                        )}

                                        {/* Floating overlay on image */}
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <div className="bg-white border-2 border-retro-dark px-4 py-2 font-display text-xs rounded-full">
                                                PLAY VIDEO
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Right: Info */}
                            <div className="w-full md:w-1/2 flex flex-col justify-center">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentIndex}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <h3 className="text-3xl md:text-4xl font-display text-retro-orange mb-2 drop-shadow-sm uppercase">
                                            {projects[currentIndex].title}
                                        </h3>
                                        <p className="text-gray-600 font-medium mb-6 text-lg leading-snug">
                                            {projects[currentIndex].subtitle}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-8">
                                            {projects[currentIndex].stack.map(tech => (
                                                <div key={tech} className="px-3 py-1 bg-white border-2 border-retro-dark rounded-md font-display text-[10px] shadow-[2px_2px_0_0_#1f2937]">
                                                    {tech}
                                                </div>
                                            ))}
                                        </div>

                                        <ul className="space-y-3 mb-8">
                                            {projects[currentIndex].features.map((feat, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm font-medium text-gray-700">
                                                    <div className="w-1.5 h-1.5 bg-retro-dark mt-1.5 shadow-[1px_1px_0_0_#aaa]"></div>
                                                    {feat}
                                                </li>
                                            ))}
                                        </ul>

                                        <a
                                            href={projects[currentIndex].link || '#'}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-6 py-3 bg-white border-3 border-retro-dark rounded-lg font-display text-xs uppercase shadow-[4px_4px_0_0_#1f2937] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_#1f2937] transition-all w-fit group"
                                        >
                                            VIEW PROJECT <ExternalLink className="w-4 h-4 group-hover:text-retro-blue" />
                                        </a>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                        </div>

                        {/* Bottom Footer Toolbar */}
                        <div className="bg-pastel-yellow border-t-4 border-retro-dark p-4 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
                            <div className="flex gap-4 w-full sm:w-auto justify-center sm:justify-start">
                                <button
                                    onClick={prevProject}
                                    className="flex-1 sm:flex-none px-4 py-2 bg-white border-2 border-retro-dark rounded font-display text-[10px] flex items-center justify-center gap-1 hover:bg-cream shadow-[2px_2px_0_0_#1f2937] active:translate-y-[1px] active:shadow-none transition-all"
                                >
                                    <ChevronLeft className="w-3 h-3" /> PREV
                                </button>
                                <button
                                    onClick={nextProject}
                                    className="flex-1 sm:flex-none px-4 py-2 bg-white border-2 border-retro-dark rounded font-display text-[10px] flex items-center justify-center gap-1 hover:bg-cream shadow-[2px_2px_0_0_#1f2937] active:translate-y-[1px] active:shadow-none transition-all"
                                >
                                    NEXT <ChevronRight className="w-3 h-3" />
                                </button>
                            </div>

                            <div className="flex gap-2">
                                {projects.map((_, i) => (
                                    <div
                                        key={i}
                                        className={`w-3 h-3 rounded-full border-2 border-retro-dark transition-colors ${i === currentIndex ? 'bg-retro-dark' : 'bg-white'}`}
                                    ></div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Side Arrows (Absolute outside the window) */}
                    <button
                        onClick={prevProject}
                        className="hidden md:flex absolute top-1/2 -left-8 -translate-y-1/2 w-12 h-12 bg-white border-3 border-retro-dark rounded-full items-center justify-center shadow-retro hover:scale-110 transition-transform z-20"
                    >
                        <ChevronLeft className="w-6 h-6 text-retro-orange" />
                    </button>

                    <button
                        onClick={nextProject}
                        className="hidden md:flex absolute top-1/2 -right-8 -translate-y-1/2 w-12 h-12 bg-white border-3 border-retro-dark rounded-full items-center justify-center shadow-retro hover:scale-110 transition-transform z-20"
                    >
                        <ChevronRight className="w-6 h-6 text-retro-orange" />
                    </button>

                </div>
            )}

        </SectionWrapper>
    );
};

export default Projects;
