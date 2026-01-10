import SectionWrapper from '../ui/SectionWrapper';
import avatarImg from '../../assets/avatar-robot.jpg';

const Contact = () => {
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
                    <div className="bg-white border-4 border-retro-dark rounded-xl p-8 shadow-retro-lg relative">
                        <form className="space-y-6">
                            <div>
                                <label className="block font-display text-xs uppercase mb-2 text-retro-dark">Your Name</label>
                                <input
                                    type="text"
                                    className="w-full bg-pastel-yellow border-3 border-retro-dark rounded-lg p-3 font-display text-sm focus:outline-none focus:shadow-retro-sm transition-shadow h-12"
                                />
                            </div>
                            <div>
                                <label className="block font-display text-xs uppercase mb-2 text-retro-dark">Email</label>
                                <input
                                    type="email"
                                    className="w-full bg-pastel-yellow border-3 border-retro-dark rounded-lg p-3 font-display text-sm focus:outline-none focus:shadow-retro-sm transition-shadow h-12"
                                />
                            </div>
                            <div>
                                <label className="block font-display text-xs uppercase mb-2 text-retro-dark">Message</label>
                                <textarea
                                    rows={6}
                                    className="w-full bg-pastel-yellow border-3 border-retro-dark rounded-lg p-3 font-display text-sm focus:outline-none focus:shadow-retro-sm transition-shadow resize-none"
                                ></textarea>
                            </div>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 gap-6 sm:gap-0">
                                <div className="flex gap-3 w-full sm:w-auto">
                                    <button type="button" className="flex-1 sm:flex-none px-6 py-3 bg-retro-orange text-white font-display text-sm border-3 border-retro-dark shadow-[4px_4px_0px_0px_#1f2937] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#1f2937] active:translate-y-[0px] active:shadow-[2px_2px_0px_0px_#1f2937] transition-all rounded-lg uppercase tracking-wide">
                                        SEND
                                    </button>
                                    <button type="reset" className="flex-1 sm:flex-none px-6 py-3 bg-white text-retro-dark font-display text-sm border-3 border-retro-dark shadow-[4px_4px_0px_0px_#1f2937] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#1f2937] active:translate-y-[0px] active:shadow-[2px_2px_0px_0px_#1f2937] transition-all rounded-lg uppercase tracking-wide">
                                        RESET
                                    </button>
                                </div>

                                <div className="flex gap-2 w-full sm:w-auto">
                                    <button type="button" className="flex-1 sm:flex-none px-4 py-2 bg-pastel-yellow text-retro-dark font-display text-xs border-3 border-retro-dark shadow-[2px_2px_0px_0px_#1f2937] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_#1f2937] transition-all rounded-md">
                                        Email
                                    </button>
                                    <button type="button" className="flex-1 sm:flex-none px-4 py-2 bg-pastel-yellow text-retro-dark font-display text-xs border-3 border-retro-dark shadow-[2px_2px_0px_0px_#1f2937] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_#1f2937] transition-all rounded-md">
                                        Discord
                                    </button>
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
                                <h3 className="font-display text-lg mb-1">Gaurav Gupta</h3>
                                <p className="text-xs font-mono text-gray-500 mb-4">Frontend • Creator</p>
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
                            {/* Bar 1 */}
                            <div className="h-4 w-full bg-gray-200 border-2 border-retro-dark rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-retro-orange to-retro-yellow w-full"></div>
                            </div>
                            {/* Bar 2 */}
                            <div className="h-4 w-full bg-gray-200 border-2 border-retro-dark rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-retro-orange to-retro-yellow w-[70%] relative">
                                    {/* White tip */}
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

