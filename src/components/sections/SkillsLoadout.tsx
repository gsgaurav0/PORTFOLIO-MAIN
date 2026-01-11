import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Zap, Film, Box, Hammer, MonitorPlay, Star, Trophy } from 'lucide-react';

// --- Data Structure ---


import { usePortfolioStore } from '../../store/useStore';

// Helper to map string IDs to Icons (since we can't persist React Nodes easily)
const getIcon = (id: string) => {
    switch (id) {
        case 'foundations': return <Hammer className="w-6 h-6" />;
        case 'frontend': return <Zap className="w-6 h-6" />;
        case 'motion': return <Film className="w-6 h-6" />;
        case 'backend': return <Box className="w-6 h-6" />;
        default: return <Settings className="w-6 h-6" />;
    }
};

const SkillsLoadout = () => {
    const skillData = usePortfolioStore((state) => state.skills);
    const [activeTabId, setActiveTabId] = useState('foundations');
    const activeCategory = skillData.find(s => s.id === activeTabId) || skillData[0];

    if (!activeCategory) return null;

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
                            <span className={activeTabId === cat.id ? 'opacity-100' : 'opacity-70'}>{getIcon(cat.id)}</span>
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
                                {React.cloneElement(getIcon(activeCategory.id) as React.ReactElement, { className: "w-16 h-16 text-[#fbbf24] drop-shadow-md" })}
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
                                            {getIcon(cat.id)}
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
