import { useState } from 'react';
import { usePortfolioStore } from '../../store/useStore';
import SectionWrapper from '../ui/SectionWrapper';
import avatarImg from '../../assets/avatar-robot.jpg';
import { messagesApi } from '../../services/api';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

const Contact = () => {
    const { socials, profile } = usePortfolioStore();
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const rawEmail = socials.find(s => s.platform === 'email')?.href;
    const emailLink = rawEmail
        ? (rawEmail.startsWith('mailto:') ? rawEmail : `mailto:${rawEmail}`)
        : "mailto:contact@example.com";

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // ... (rest of submit logic remains same)
        e.preventDefault();
        setStatus('sending');
        setErrorMsg('');

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            message: formData.get('message') as string,
        };

        if (!data.name || !data.email || !data.message) {
            setStatus('error');
            setErrorMsg('All fields are required.');
            return;
        }

        try {
            await messagesApi.send(data);
            setStatus('success');
            (e.target as HTMLFormElement).reset();
            setTimeout(() => setStatus('idle'), 3000);
        } catch (error: any) {
            console.error('Failed to send message:', error);
            setStatus('error');
            setErrorMsg('Failed to send message. Please try again.');
        }
    };

    return (
        <SectionWrapper id="contact" className="py-20 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-12">
                <div className="bg-white px-4 py-2 border-3 border-retro-dark shadow-retro-sm font-display text-sm uppercase">
                    CONTACT
                </div>
                <div className="font-display text-xs text-retro-dark/60 uppercase tracking-widest">
                    // Insert Coin
                </div>
                <div className="ml-auto flex gap-2">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="w-3 h-3 rounded-full border-2 border-retro-dark bg-white"></div>
                    ))}
                    <span className="text-xs font-mono ml-2">Status</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left Column: Form */}
                <div className="lg:col-span-7">
                    <div className="bg-white border-4 border-retro-dark rounded-xl p-8 shadow-retro-lg relative transition-all duration-300">
                        {status === 'success' ? (
                            <div className="absolute inset-0 z-10 bg-white/95 flex flex-col items-center justify-center rounded-xl p-8 text-center animate-in fade-in zoom-in duration-300">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 border-2 border-green-500">
                                    <CheckCircle className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="font-display text-xl uppercase mb-2">Transmission Received!</h3>
                                <p className="text-gray-600 font-mono text-sm">I'll get back to you shortly.</p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="mt-6 px-6 py-2 bg-retro-dark text-white font-display text-xs uppercase rounded-lg hover:bg-gray-800 transition-colors"
                                >
                                    Send Another
                                </button>
                            </div>
                        ) : null}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block font-display text-xs uppercase mb-2 text-retro-dark">Your Name</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    disabled={status === 'sending'}
                                    className="w-full bg-pastel-yellow border-3 border-retro-dark rounded-lg p-3 font-display text-sm focus:outline-none focus:shadow-retro-sm transition-shadow h-12 disabled:opacity-50"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block font-display text-xs uppercase mb-2 text-retro-dark">Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    disabled={status === 'sending'}
                                    className="w-full bg-pastel-yellow border-3 border-retro-dark rounded-lg p-3 font-display text-sm focus:outline-none focus:shadow-retro-sm transition-shadow h-12 disabled:opacity-50"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block font-display text-xs uppercase mb-2 text-retro-dark">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={6}
                                    disabled={status === 'sending'}
                                    className="w-full bg-pastel-yellow border-3 border-retro-dark rounded-lg p-3 font-display text-sm focus:outline-none focus:shadow-retro-sm transition-shadow resize-none disabled:opacity-50"
                                    required
                                ></textarea>
                            </div>

                            {status === 'error' && (
                                <div className="flex items-center gap-2 text-red-600 text-xs font-mono bg-red-50 p-3 rounded-lg border border-red-200">
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    {errorMsg}
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 gap-6 sm:gap-0">
                                <div className="flex gap-3 w-full sm:w-auto">
                                    <button
                                        type="submit"
                                        disabled={status === 'sending'}
                                        className="flex-1 sm:flex-none px-6 py-3 bg-retro-orange text-white font-display text-sm border-3 border-retro-dark shadow-[4px_4px_0px_0px_#1f2937] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#1f2937] active:translate-y-[0px] active:shadow-[2px_2px_0px_0px_#1f2937] transition-all rounded-lg uppercase tracking-wide flex items-center gap-2 disabled:opacity-70 disabled:pointer-events-none"
                                    >
                                        {status === 'sending' ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                                            </>
                                        ) : (
                                            'SEND MESSAGE'
                                        )}
                                    </button>
                                    <button
                                        type="reset"
                                        disabled={status === 'sending'}
                                        onClick={() => { setStatus('idle'); setErrorMsg(''); }}
                                        className="flex-1 sm:flex-none px-6 py-3 bg-white text-retro-dark font-display text-sm border-3 border-retro-dark shadow-[4px_4px_0px_0px_#1f2937] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#1f2937] active:translate-y-[0px] active:shadow-[2px_2px_0px_0px_#1f2937] transition-all rounded-lg uppercase tracking-wide disabled:opacity-50"
                                    >
                                        RESET
                                    </button>
                                </div>

                                <div className="flex gap-2 w-full sm:w-auto">
                                    <a
                                        href={emailLink}
                                        className="flex-1 sm:flex-none px-4 py-2 bg-pastel-yellow text-retro-dark font-display text-xs border-3 border-retro-dark shadow-[2px_2px_0px_0px_#1f2937] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_#1f2937] transition-all rounded-md text-center flex items-center justify-center no-underline"
                                    >
                                        Email
                                    </a>
                                    <a
                                        href={socials.find(s => s.platform === 'discord')?.href || "https://discord.com"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 sm:flex-none px-4 py-2 bg-pastel-yellow text-retro-dark font-display text-xs border-3 border-retro-dark shadow-[2px_2px_0px_0px_#1f2937] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_#1f2937] transition-all rounded-md text-center flex items-center justify-center no-underline"
                                    >
                                        Discord
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Right Column: Profile & Stats */}
                <div className="lg:col-span-5 space-y-8">
                    {/* Profile Card */}
                    <div className="bg-white border-4 border-retro-dark rounded-xl p-6 shadow-retro relative">
                        <div className="flex gap-6 items-start">
                            <div className="w-24 h-24 bg-retro-orange/20 rounded-lg border-3 border-retro-dark overflow-hidden shrink-0">
                                <img src={avatarImg} alt="Avatar" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h3 className="font-display text-lg mb-1">{profile.name}</h3>
                                <p className="text-xs font-mono text-gray-500 mb-4">{profile.role}</p>
                            </div>
                        </div>

                        <p className="text-sm text-gray-700 mt-4 mb-6 leading-relaxed font-medium">
                            Want collabs, streaming hooks, packaging, or consulting? Ping me — I respond quickly.
                        </p>

                        <div className="flex gap-4">
                            <button className="flex-1 py-3 bg-pastel-yellow border-3 border-retro-dark font-display text-xs uppercase rounded-lg shadow-[3px_3px_0px_0px_#1f2937] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_#1f2937] transition-all font-bold">
                                Pricing
                            </button>
                            <button className="flex-1 py-3 bg-pastel-yellow border-3 border-retro-dark font-display text-xs uppercase rounded-lg shadow-[3px_3px_0px_0px_#1f2937] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_#1f2937] transition-all font-bold">
                                Availability
                            </button>
                        </div>
                    </div>

                    {/* Connect Card */}
                    <div className="bg-white border-4 border-retro-dark rounded-xl p-6 shadow-retro relative">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="font-display text-xs uppercase text-retro-dark/70">CONNECT</h4>
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-retro-orange border border-retro-dark"></div>
                                <div className="w-3 h-3 rounded-full bg-gray-400 border border-retro-dark"></div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="h-4 w-full bg-gray-200 border-2 border-retro-dark rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-retro-orange to-retro-yellow w-full"></div>
                            </div>
                            <div className="h-4 w-full bg-gray-200 border-2 border-retro-dark rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-retro-orange to-retro-yellow w-[70%] relative">
                                    <div className="absolute right-0 top-0 bottom-0 w-8 bg-white/50"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Floating Stats */}
                    <div className="flex justify-end gap-4 mt-8">
                        <div className="bg-white p-4 border-3 border-retro-dark shadow-retro w-24 h-24 flex items-center justify-center -rotate-3">
                            <span className="font-display text-xs">HP 100</span>
                        </div>
                        <div className="bg-white p-4 border-3 border-retro-dark shadow-retro w-24 h-24 flex items-center justify-center rotate-3 translate-y-8">
                            <span className="font-display text-xs">XP 39%</span>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};

export default Contact;
