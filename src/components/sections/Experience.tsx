import { useState } from 'react';
import SectionWrapper from '../ui/SectionWrapper';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { usePortfolioStore } from '../../store/useStore';

const Experience = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const experiences = usePortfolioStore((state) => state.experiences);

    const nextRole = () => {
        setActiveIndex((prev) => (prev + 1) % experiences.length);
    };

    const prevRole = () => {
        setActiveIndex((prev) => (prev - 1 + experiences.length) % experiences.length);
    };

    return (
        <SectionWrapper id="experience" className="py-20">
            <div className="text-center mb-16">
                <h2 className="text-5xl md:text-6xl font-display text-white stroke-text-white-2 tracking-wide drop-shadow-[4px_4px_0_rgba(0,0,0,1)] uppercase">
                    EXPERIENCE
                </h2>
                <p className="font-mono text-xs text-retro-dark/60 mt-2">
                    Analog switchboard • CRT boot dossier
                </p>
            </div>

            {experiences.length === 0 ? (
                <div className="text-center font-mono text-retro-dark/50 p-20">Initializing boot sequence...</div>
            ) : (
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Left: Switchboard */}
                    <div className="lg:col-span-5 bg-cream border-4 border-retro-dark rounded-xl overflow-hidden shadow-retro-lg flex flex-col h-full min-h-[500px]">
                        <div className="bg-pastel-yellow border-b-4 border-retro-dark p-3 flex justify-between items-center">
                            <span className="font-display text-xs uppercase text-retro-dark">SWITCHBOARD</span>
                            <span className="font-mono text-[9px] text-retro-dark/50">Flip a toggle to route signal</span>
                        </div>

                        <div className="p-6 flex-1 space-y-4">
                            {experiences.map((exp, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveIndex(idx)}
                                    className={`w-full border-4 border-retro-dark rounded-lg p-4 flex items-center justify-between transition-all group relative ${idx === activeIndex
                                        ? 'bg-retro-yellow shadow-[4px_4px_0_0_#1f2937] translate-x-[2px] translate-y-[2px]'
                                        : 'bg-white shadow-[2px_2px_0_0_#1f2937] hover:bg-white/80'
                                        }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className={`font-display text-xs uppercase ${idx === activeIndex ? 'text-retro-dark' : 'text-gray-600'}`}>
                                            {exp.company}
                                        </span>
                                        {idx === activeIndex && (
                                            <div className="w-2 h-2 rounded-full bg-retro-dark animate-pulse"></div>
                                        )}
                                    </div>

                                    {/* Toggle Switch Graphic */}
                                    <div className={`w-12 h-6 border-3 border-retro-dark rounded-full p-0.5 flex items-center transition-all ${idx === activeIndex ? 'bg-white justify-end' : 'bg-gray-200 justify-start'
                                        }`}>
                                        <div className="w-4 h-4 rounded-full bg-retro-dark border border-retro-dark"></div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="bg-pastel-yellow border-t-4 border-retro-dark p-3">
                            <p className="font-mono text-[9px] text-retro-dark/50 text-center">
                                Arrow keys navigate • Toggles select • Enter to skip boot
                            </p>
                        </div>
                    </div>

                    {/* Right: CRT Monitor */}
                    <div className="lg:col-span-7 bg-cream border-4 border-retro-dark rounded-xl overflow-hidden shadow-retro-lg flex flex-col h-full min-h-[500px]">
                        <div className="bg-pastel-yellow border-b-4 border-retro-dark p-3 flex justify-between items-center">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-400 border border-retro-dark"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-400 border border-retro-dark"></div>
                                <div className="w-3 h-3 rounded-full bg-green-400 border border-retro-dark"></div>
                            </div>
                            <span className="font-display text-xs uppercase text-retro-dark">CRT MONITOR</span>
                            <span className="font-mono text-[9px] text-retro-dark/50">boot sequence on toggle</span>
                        </div>

                        <div className="p-8 flex-1 bg-[linear-gradient(rgba(18,18,18,0.02)_1px,transparent_1px)] bg-[size:100%_3px] relative">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="h-full flex flex-col"
                                >
                                    <div className="flex flex-col md:flex-row gap-6 mb-6">
                                        <div className="bg-pastel-yellow border-3 border-retro-dark p-4 rounded-lg shadow-retro-sm md:w-1/3 shrink-0 h-fit -rotate-1">
                                            <h3 className="font-display text-sm leading-tight mb-1">{experiences[activeIndex].role}</h3>
                                            <div className="text-xs text-gray-500 font-medium">{experiences[activeIndex].company}</div>
                                            <div className="text-[10px] font-mono mt-4 text-retro-dark/60">{experiences[activeIndex].period}</div>
                                        </div>

                                        <div>
                                            <h3 className="text-2xl font-display text-retro-orange mb-4">
                                                {experiences[activeIndex].company}
                                            </h3>
                                            <p className="text-gray-700 text-sm font-medium leading-relaxed mb-4">
                                                {experiences[activeIndex].description}
                                            </p>
                                            <ul className="space-y-2 mb-6">
                                                {experiences[activeIndex].achievements.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-xs font-semibold text-retro-dark/80">
                                                        <div className="w-1.5 h-1.5 bg-retro-dark mt-1.5"></div>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="mt-auto">
                                        <div className="flex flex-wrap gap-2">
                                            {experiences[activeIndex].stack.map((tech) => (
                                                <div key={tech} className="px-3 py-1 bg-white border-2 border-retro-dark rounded font-display text-[10px] shadow-sm hover:translate-y-[-1px] transition-transform">
                                                    {tech}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <div className="bg-pastel-yellow border-t-4 border-retro-dark p-3 flex justify-between items-center">
                            <p className="font-mono text-[9px] text-retro-dark/50 hidden md:block">
                                Toggles route signal • Enter to skip boot
                            </p>
                            <div className="flex gap-2 ml-auto">
                                <button
                                    onClick={prevRole}
                                    className="px-3 py-1.5 bg-white border-2 border-retro-dark rounded font-display text-[10px] flex items-center gap-1 shadow-[2px_2px_0_0_#1f2937] hover:bg-retro-orange hover:text-white transition-colors"
                                >
                                    <ChevronLeft className="w-3 h-3" /> PREV
                                </button>
                                <button
                                    onClick={nextRole}
                                    className="px-3 py-1.5 bg-white border-2 border-retro-dark rounded font-display text-[10px] flex items-center gap-1 shadow-[2px_2px_0_0_#1f2937] hover:bg-retro-orange hover:text-white transition-colors"
                                >
                                    NEXT <ChevronRight className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            )}

        </SectionWrapper>
    );
};

export default Experience;
