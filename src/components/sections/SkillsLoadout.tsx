import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Zap, Film, Box, Hammer, MonitorPlay, Star, Trophy } from 'lucide-react';

// --- Data Structure ---
type SkillCategory = {
    id: string;
    title: string;
    level: string; // e.g. "Level 1 / 4"
    icon: React.ReactNode;
    color: string; // Main accent color
    progress: number;
    totalSkills: number;
    equipment: string[]; // BADGES
    achievements: string[]; // LIST ITEMS
};

const skillData: SkillCategory[] = [
    {
        id: 'foundations',
        title: 'FOUNDATIONS',
        level: 'Level 1 / 4',
        icon: <Hammer className="w-6 h-6" />,
        color: '#fbbf24', // Gold/Yellow
        progress: 90,
        totalSkills: 6,
        equipment: ['HTML', 'CSS', 'JAVASCRIPT', 'TYPESCRIPT', 'A11Y', 'TESTING'],
        achievements: [
            'Semantic HTML with ARIA patterns and component tokens.',
            'CSS architecture with utility layering and theming.',
            'Typed pipelines with strict lint gates and CI checks.',
        ]
    },
    {
        id: 'frontend',
        title: 'FRONTEND',
        level: 'Level 2 / 4',
        icon: <Zap className="w-6 h-6" />,
        color: '#2DD4BF', // Teal
        progress: 85,
        totalSkills: 6,
        equipment: ['REACT', 'NEXT.JS', 'TAILWIND', 'FRAMER MOTION', 'ZUSTAND', 'TANSTACK QUERY'],
        achievements: [
            'State management architecture for complex apps.',
            'Performance optimization and bundle size reduction.',
            'Component library design and documentation.',
        ]
    },
    {
        id: 'motion',
        title: 'MOTION & SCROLL',
        level: 'Level 3 / 4',
        icon: <Film className="w-6 h-6" />,
        color: '#F43F5E', // Pink/Red
        progress: 75,
        totalSkills: 5,
        equipment: ['GSAP', 'FRAMER', 'THREE.JS', 'CANVAS', 'SVG ANIMATION'],
        achievements: [
            'Scroll-triggered storytelling experiences.',
            'Micro-interactions and gesture-based UI.',
            '3D scene composition and optimization.',
        ]
    },
    {
        id: 'backend',
        title: 'BUILD & BACKEND',
        level: 'Level 4 / 4',
        icon: <Box className="w-6 h-6" />,
        color: '#3B82F6', // Blue
        progress: 80,
        totalSkills: 6,
        equipment: ['NODE.JS', 'POSTGRES', 'GRAPHQL', 'DOCKER', 'AWS', 'FIREBASE'],
        achievements: [
            'API schema design and implementation.',
            'Database modeling and performance tuning.',
            'CI/CD pipeline configuration and automation.',
        ]
    }
];

const SkillsLoadout = () => {
    const [activeTabId, setActiveTabId] = useState('foundations');
    const activeCategory = skillData.find(s => s.id === activeTabId) || skillData[0];

    return (
        // FORCED BACKGROUND COLOR STYLE
        <div id="skills" className="py-20 text-white">

            {/* Header */}
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-6xl font-display uppercase tracking-wider mb-2 drop-shadow-lg text-white">
                    SKILLS • LOADOUT
                </h2>
                <div className="flex items-center justify-center gap-2 text-green-200 font-mono text-sm md:text-base">
                    <Settings className="w-4 h-4" />
                    <span>Choose your class • Prove your mastery • Level up your game</span>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4">

                {/* Navigation Tabs (Top) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {skillData.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveTabId(cat.id)}
                            className={`
                relative flex items-center justify-center gap-2 p-4 rounded-lg font-bold uppercase tracking-wide transition-all duration-200 border-b-4
                ${activeTabId === cat.id
                                    ? 'bg-[#fbbf24] border-[#d97706] text-black shadow-[0_0_15px_rgba(251,191,36,0.3)] translate-y-0'
                                    : 'bg-[#1f5745] border-[#153e32] text-green-100/70 hover:bg-[#286f58] hover:border-[#1e5045] hover:text-white'
                                }
              `}
                            style={{ backgroundColor: activeTabId === cat.id ? '#fbbf24' : '#1f5745' }}
                        >
                            <span className={activeTabId === cat.id ? 'opacity-100' : 'opacity-70'}>{cat.icon}</span>
                            <span className="text-sm md:text-base font-display tracking-wider pr-2">{cat.title}</span>

                            {/* Corner Accents for active tab */}
                            {activeTabId === cat.id && (
                                <>
                                    <div className="absolute top-1 left-1 w-2 h-2 border-l-2 border-t-2 border-black/20" />
                                    <div className="absolute bottom-1 right-1 w-2 h-2 border-r-2 border-b-2 border-black/20" />
                                </>
                            )}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Content Area (Left - 2 Cols) */}
                    <div className="lg:col-span-2 rounded-2xl p-6 md:p-8 border-[6px] border-[#174536] shadow-2xl relative overflow-hidden" style={{ backgroundColor: '#1f5745' }}>

                        {/* Header Info */}
                        <div className="flex items-center gap-6 mb-8">
                            <div className="p-0"> {/* Icon Scaled Up */}
                                {React.cloneElement(activeCategory.icon as React.ReactElement, { className: "w-16 h-16 text-[#fbbf24] drop-shadow-md" })}
                            </div>
                            <div>
                                <h3 className="text-3xl md:text-4xl font-display uppercase text-white drop-shadow-sm leading-none mb-2">
                                    {activeCategory.title}
                                </h3>
                                <div className="flex items-center gap-2 text-[#fbbf24] font-mono text-sm uppercase tracking-wider">
                                    <Star className="w-4 h-4 fill-current" />
                                    <span>{activeCategory.level}</span>
                                </div>
                            </div>
                        </div>

                        <div className="h-0.5 bg-green-800/50 w-full mb-8" />

                        {/* Equipment Section */}
                        <div className="mb-10">
                            <div className="flex items-center gap-2 text-green-200/60 font-mono text-xs uppercase tracking-widest mb-4">
                                <Box className="w-4 h-4" />
                                <span>Equipment</span>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                {activeCategory.equipment.map((item) => (
                                    <motion.div
                                        key={item}
                                        whileHover={{ y: 2 }}
                                        className="
                         px-5 py-3 text-[#3f2e04] font-black font-display text-sm rounded-md cursor-default border-b-4 border-[#a16207]
                         shadow-lg active:border-b-0 active:translate-y-1 transition-all
                       "
                                        style={{ backgroundColor: '#eab308' }}
                                    >
                                        {item}
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Achievements Section */}
                        <div>
                            <div className="flex items-center gap-2 text-green-200/60 font-mono text-xs uppercase tracking-widest mb-4">
                                <Trophy className="w-4 h-4" />
                                <span>Achievements Unlocked</span>
                            </div>

                            <div className="space-y-4">
                                {activeCategory.achievements.map((ach, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="border-l-4 border-[#fbbf24] p-4 rounded-r-lg shadow-sm flex items-center"
                                        style={{ backgroundColor: '#2d7a63' }}
                                    >
                                        <div className="mr-4 w-2 h-2 rounded-full bg-[#fbbf24]" />
                                        <p className="text-white font-medium text-sm md:text-base leading-snug font-body">{ach}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar - Progress Cards */}
                    <div className="flex flex-col gap-4">
                        {skillData.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveTabId(cat.id)}
                                className={`
                    w-full text-left p-4 rounded-xl border-2 transition-all duration-300 group relative overflow-hidden
                    ${activeTabId === cat.id
                                        ? 'border-[#fbbf24] shadow-lg'
                                        : 'border-transparent hover:bg-[#266852] opacity-70 hover:opacity-100'
                                    }
                 `}
                                style={{ backgroundColor: activeTabId === cat.id ? '#2d7a63' : '#1f5745' }}
                            >
                                <div className="flex justify-between items-center mb-3">
                                    <div className="flex items-center gap-3">
                                        <span className={activeTabId === cat.id ? 'text-[#fbbf24]' : 'text-green-300'}>
                                            {cat.icon}
                                        </span>
                                        <div className="flex flex-col">
                                            <span className="font-bold font-display text-white text-base leading-none">{cat.title}</span>
                                            <span className="text-[10px] font-mono text-green-300 mt-1">{cat.totalSkills} Skills</span>
                                        </div>
                                    </div>
                                    {activeTabId === cat.id && (
                                        <div className="bg-[#fbbf24] text-black rounded px-1.5 py-0.5">
                                            <MonitorPlay className="w-3 h-3" />
                                        </div>
                                    )}
                                </div>

                                {/* Progress Bar */}
                                <div className="h-3 bg-black/40 rounded-full overflow-hidden mt-1">
                                    <motion.div
                                        className="h-full rounded-full"
                                        style={{ backgroundColor: activeTabId === cat.id ? '#fbbf24' : cat.color }} // Gold for active, original color for others
                                        initial={{ width: 0 }}
                                        animate={{ width: `${cat.progress}%` }}
                                        transition={{ duration: 1, ease: 'easeOut' }}
                                    />
                                </div>
                            </button>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SkillsLoadout;
