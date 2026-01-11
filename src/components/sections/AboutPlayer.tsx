
import { motion } from 'framer-motion';
import { Target, Zap, Trophy, Cpu, Code2, Rocket, Gamepad2 } from 'lucide-react';
import Button from '../ui/Button';
import robotImg from '../../assets/robot.jpg';

import { usePortfolioStore } from '../../store/useStore';

const AboutPlayer = () => {
    const { profile } = usePortfolioStore();

    return (
        // Forced background style to match Skills section exactly
        <div id="about" className="py-20 text-white font-body">
            <div className="max-w-6xl mx-auto px-4">

                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-6xl font-display uppercase tracking-wider mb-2 drop-shadow-lg text-white">
                        ABOUT • PLAYER
                    </h2>
                    <div className="flex items-center justify-center gap-3 text-green-200 font-mono text-sm md:text-base tracking-wide">
                        <Gamepad2 className="w-5 h-5" />
                        <span>Game-inspired developer • Motion-first design • Retro arcade polish</span>
                    </div>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* LEFT COLUMN (Stack) */}
                    <div className="lg:col-span-2 flex flex-col gap-6">

                        {/* 1. MISSION CARD */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-[#155e48] rounded-2xl p-8 border-[5px] border-[#0f4534] shadow-xl relative overflow-hidden group"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-red-500 p-2 rounded-lg text-white shadow-md">
                                    <Target className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-display text-white tracking-wide">MISSION</h3>
                            </div>

                            <p className="text-green-100 text-lg leading-relaxed mb-8 max-w-2xl">
                                {profile.bio || "I craft game-inspired web experiences that are fast, tactile, and deliberately playful. Motion-first UI with careful performance optimization and interfaces that feel like a controller in your hands."}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    className="w-full sm:w-auto bg-[#fbbf24] hover:bg-[#f59e0b] text-black font-bold border-b-4 border-[#b45309] active:border-b-0 active:translate-y-1 transition-all rounded-lg"
                                    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                                >
                                    VIEW PROJECTS_
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full sm:w-auto bg-[#10b981] hover:bg-[#059669] text-white font-bold border-b-4 border-[#047857] active:border-b-0 active:translate-y-1 transition-all rounded-lg border-t-0 border-l-0 border-r-0"
                                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                >
                                    CONTACT ME
                                </Button>
                            </div>
                        </motion.div>

                        {/* 2. CORE ABILITIES */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="flex-1 bg-[#155e48] rounded-2xl p-8 border-[5px] border-[#0f4534] shadow-xl"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-blue-500 p-2 rounded-lg text-white shadow-md">
                                    <Zap className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-display text-white tracking-wide">CORE ABILITIES</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[
                                    { icon: <Code2 />, label: "Clean Code Architecture" },
                                    { icon: <Cpu />, label: "Scalable Systems" },
                                    { icon: <Rocket />, label: "Performance First" }
                                ].map((ability, idx) => (
                                    <div key={idx} className="bg-[#0f4534]/50 p-4 rounded-xl flex flex-col items-center text-center gap-3 border-2 border-green-800/30 hover:border-[#fbbf24] transition-colors group">
                                        <div className="text-green-300 group-hover:text-[#fbbf24] transition-colors">{ability.icon}</div>
                                        <span className="font-bold text-sm text-green-100">{ability.label}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* 3. PLAYER STATS */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-[#155e48] rounded-2xl p-8 border-[5px] border-[#0f4534] shadow-xl"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-yellow-500 p-2 rounded-lg text-black shadow-md">
                                    <Trophy className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-display text-white tracking-wide">PLAYER STATS</h3>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    { val: profile.projects_count || "0", label: "PROJECTS", color: "text-white" },
                                    { val: profile.years || "0", label: "YEARS XP", color: "text-[#10b981]" },
                                    { val: profile.awesomeness || "100%", label: "STATUS", color: "text-[#fbbf24]" }
                                ].map((stat, idx) => (
                                    <div key={idx} className="bg-[#0a3f32] p-4 rounded-xl text-center border border-green-800 shadow-inner">
                                        <div className={`text-3xl md:text-4xl font-display mb-1 ${stat.color}`}>{stat.val}</div>
                                        <div className="text-[10px] md:text-xs uppercase tracking-widest text-green-400 font-bold">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                    </div>

                    {/* RIGHT COLUMN (Character Card) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-1 bg-[#262626] rounded-2xl border-[6px] border-[#155e48] shadow-2xl relative overflow-hidden min-h-[500px] lg:min-h-auto flex items-center justify-center p-4"
                    >
                        {/* Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900" />

                        {/* Character Image */}
                        <div className="relative z-10 w-full h-full flex items-center justify-center">
                            <div className="relative w-full aspect-[3/4] max-w-sm">
                                {/* Glow behind character */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/20 blur-[100px] rounded-full" />

                                <img
                                    src={robotImg}
                                    alt="Player Character"
                                    className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </div>

                        {/* Decoration */}
                        <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-md p-3 rounded-lg border border-white/10 text-center">
                            <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">Model: T-800 Dev Unit</span>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default AboutPlayer;
