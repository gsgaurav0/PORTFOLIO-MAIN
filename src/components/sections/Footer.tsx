import { useState, useEffect } from 'react';
import SectionWrapper from '../ui/SectionWrapper';
import { ArrowUp, Github, Linkedin, Twitter, Mail } from 'lucide-react';

const Footer = () => {
    const [time, setTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const socialLinks = [
        { icon: <Github className="w-5 h-5" />, href: "#", label: "GitHub" },
        { icon: <Linkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
        { icon: <Twitter className="w-5 h-5" />, href: "#", label: "Twitter" },
        { icon: <Mail className="w-5 h-5" />, href: "mailto:contactgauravb@gmail.com", label: "Email" }
    ];

    return (
        <SectionWrapper id="footer" className="py-20 min-h-[60vh] flex flex-col justify-between relative">

            {/* Top Bar */}
            <div className="flex justify-between items-end font-mono text-[10px] uppercase text-retro-dark/60 mb-12">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-retro-dark rounded-full bg-retro-dark flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-retro-orange rounded-full border border-retro-dark"></div>
                    </div>
                    online
                </div>
                <div>
                    Local time: {time}
                </div>
            </div>

            {/* Main CTA */}
            <div className="flex-1 flex flex-col items-center justify-center mb-20 relative z-10">
                <h2 className="text-[12vw] leading-[0.85] font-body font-extrabold text-white stroke-text-white-3 text-center tracking-tight select-none pointer-events-none drop-shadow-sm">
                    LET'S BUILD<br />
                    SOMETHING<br />
                    EPIC
                </h2>

                <a href="mailto:contactgauravb@gmail.com" className="mt-12 px-8 py-3 bg-white border-2 border-retro-dark shadow-[4px_4px_0_0_#1f2937] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_#1f2937] transition-all font-display text-xs uppercase tracking-widest">
                    contactgauravb@gmail.com
                </a>
            </div>

            {/* Bottom Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 border-t-2 border-retro-dark/10 pt-8">
                <div className="font-mono text-[10px] text-retro-dark/60 order-2 md:order-1">
                    © 2026 All rights reserved.
                </div>

                {/* Social Icons */}
                <div className="flex gap-4 order-1 md:order-2">
                    {socialLinks.map((social, idx) => (
                        <a
                            key={idx}
                            href={social.href}
                            className="p-2 bg-white border-2 border-retro-dark rounded-lg shadow-retro-sm hover:shadow-retro hover:translate-y-[-2px] transition-all text-retro-dark"
                            aria-label={social.label}
                        >
                            {social.icon}
                        </a>
                    ))}
                </div>

                <button
                    onClick={scrollToTop}
                    className="px-6 py-2 bg-white border-2 border-retro-dark shadow-[2px_2px_0_0_#1f2937] hover:translate-y-[-1px] hover:shadow-[3px_3px_0_0_#1f2937] active:shadow-none active:translate-y-[1px] transition-all font-display text-[10px] uppercase flex items-center gap-2 order-3"
                >
                    BACK TO TOP <ArrowUp className="w-3 h-3" />
                </button>
            </div>

        </SectionWrapper>
    );
};

export default Footer;
