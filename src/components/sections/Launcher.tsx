import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Music, VolumeX, Box, Circle, Square } from 'lucide-react';

interface LauncherProps {
    onEnter: (withMusic: boolean) => void;
}

const Launcher = ({ onEnter }: LauncherProps) => {
    const [progress, setProgress] = useState(0);
    const [isReady, setIsReady] = useState(false);
    const [typedText, setTypedText] = useState('');
    const fullText = "> Ready to Enter Portfolio\nChoose how you want to launch\n> Awaiting user input_";

    // Simulate boot sequence loading
    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setIsReady(true);
                    return 100;
                }
                return prev + 2; // loads in ~2.5s (50 steps * 50ms)
            });
        }, 30);

        return () => clearInterval(timer);
    }, []);

    // Typing effect logic
    useEffect(() => {
        if (isReady) {
            let i = 0;
            const typingInterval = setInterval(() => {
                setTypedText(fullText.slice(0, i));
                i++;
                if (i > fullText.length) clearInterval(typingInterval);
            }, 30);
            return () => clearInterval(typingInterval);
        }
    }, [isReady]);

    // Background floating particles
    const particles = Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        rotate: Math.random() * 360,
        Component: [Box, Circle, Square][i % 3]
    }));

    return (
        <div className="fixed inset-0 bg-pastel-yellow z-[100] flex items-center justify-center overflow-hidden font-mono text-retro-dark">

            {/* Ambient Background Particles */}
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    initial={{ x: `${p.x}vw`, y: `${p.y}vh`, rotate: p.rotate, opacity: 0.1 }}
                    animate={{
                        y: [`${p.y}vh`, `${(p.y + 10) % 100}vh`],
                        rotate: [p.rotate, p.rotate + 90]
                    }}
                    transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, ease: "linear" }}
                    className="absolute text-retro-dark/20 pointer-events-none"
                >
                    <p.Component className="w-8 h-8" strokeWidth={1.5} />
                </motion.div>
            ))}

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative bg-white border-3 border-retro-dark rounded-lg shadow-[8px_8px_0_0_#1f2937] w-full max-w-lg mx-4 overflow-hidden"
            >
                {/* Title Bar */}
                <div className="bg-pastle-yellow border-b-2 border-retro-dark p-2 flex items-center justify-between bg-yellow-100">
                    <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider font-display">LAUNCHER // Boot_sequence</span>
                    </div>
                    <div className="flex gap-1">
                        <div className="w-3 h-3 rounded-full bg-retro-orange border border-retro-dark" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400 border border-retro-dark" />
                    </div>
                </div>

                {/* Content Area */}
                <div className="p-8 space-y-6">

                    {/* Terminal Text */}
                    <div className="h-20 font-bold text-sm md:text-base leading-relaxed whitespace-pre-line text-retro-dark/80 font-mono">
                        {isReady ? typedText : (
                            <span className="animate-pulse">&gt; Initializing system resources...</span>
                        )}
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest text-gray-400 font-display">
                            <span>Installation Progress</span>
                            <span>{progress}%</span>
                        </div>
                        <div className="h-5 border-2 border-retro-dark rounded-md p-0.5 bg-white">
                            <motion.div
                                className="h-full bg-retro-orange rounded-sm"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                            <span>Assets: {progress}%</span>
                            <span>Shaders: {Math.min(progress + 20, 100)}%</span>
                            <span>Network: Online</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    {isReady && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4"
                        >
                            <button
                                onClick={() => onEnter(true)}
                                className="group relative bg-[#ff6b6b] text-white border-2 border-retro-dark p-4 rounded-lg shadow-[4px_4px_0_0_#1f2937] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_#1f2937] active:translate-y-[1px] active:shadow-none transition-all flex flex-col items-center gap-2"
                            >
                                <Music className="w-6 h-6 group-hover:animate-bounce" />
                                <span className="font-display uppercase text-xs tracking-wider">Enter With Music</span>
                            </button>

                            <button
                                onClick={() => onEnter(false)}
                                className="group bg-white text-retro-dark border-2 border-retro-dark p-4 rounded-lg shadow-[4px_4px_0_0_#1f2937] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_#1f2937] active:translate-y-[1px] active:shadow-none transition-all flex flex-col items-center gap-2 hover:bg-gray-50"
                            >
                                <VolumeX className="w-6 h-6" />
                                <span className="font-display uppercase text-xs tracking-wider">Enter Without Music</span>
                            </button>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default Launcher;
