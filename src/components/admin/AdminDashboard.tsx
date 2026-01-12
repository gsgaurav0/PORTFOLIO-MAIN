import { useEffect, useState } from 'react';
import { messagesApi } from '../../services/api';
import { usePortfolioStore } from '../../store/useStore';
import { Loader2, FolderOpen, Hammer, Mail, Activity } from 'lucide-react';

const AdminDashboard = () => {
    const { projects, skills, fetchAllData, isLoading } = usePortfolioStore();
    const [messagesStats, setMessagesStats] = useState({ total: 0, unread: 0 });
    // Local loading state only for messages if needed, or rely on store
    const [messagesLoading, setMessagesLoading] = useState(true);

    useEffect(() => {
        // 1. Ensure store data is populated (background if already has data)
        fetchAllData();

        // 2. Fetch Messages (Dynamic, not in store)
        const fetchMessages = async () => {
            try {
                const res = await messagesApi.getAll();
                setMessagesStats({
                    total: res.data?.length || 0,
                    unread: res.unreadCount || 0
                });
            } catch (error) {
                console.error('Failed to fetch messages:', error);
            } finally {
                setMessagesLoading(false);
            }
        };

        fetchMessages();
    }, [fetchAllData]);

    const showSpinner = isLoading && projects.length === 0;

    if (showSpinner) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 text-retro-blue animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-top-4">
            <div className="flex items-center justify-between border-b border-[#333] pb-6">
                <div>
                    <h2 className="text-3xl font-display text-white uppercase tracking-widest">System Overview</h2>
                    <p className="text-gray-500 font-mono text-xs mt-1">Mainframe Status: ONLINE</p>
                </div>
                <div className="flex items-center gap-2 text-green-400 bg-green-400/10 px-3 py-1 rounded-full border border-green-400/20">
                    <Activity className="w-4 h-4" />
                    <span className="text-[10px] font-mono uppercase tracking-widest animate-pulse">System Normal</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* Projects Card */}
                <div className="bg-[#1f1f1f] p-6 rounded-xl border border-[#333] relative overflow-hidden group hover:border-retro-blue transition-colors">
                    <div className="absolute right-[-10px] top-[-10px] bg-retro-blue/10 w-24 h-24 rounded-full blur-2xl group-hover:bg-retro-blue/20 transition-all"></div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-retro-blue/20 rounded-lg text-retro-blue">
                                <FolderOpen className="w-6 h-6" />
                            </div>
                            <span className="text-[10px] font-mono text-gray-500 uppercase">Total Projects</span>
                        </div>
                        <div className="text-4xl font-display text-white">{projects.length}</div>
                    </div>
                </div>

                {/* Skills Card */}
                <div className="bg-[#1f1f1f] p-6 rounded-xl border border-[#333] relative overflow-hidden group hover:border-retro-yellow transition-colors">
                    <div className="absolute right-[-10px] top-[-10px] bg-retro-yellow/10 w-24 h-24 rounded-full blur-2xl group-hover:bg-retro-yellow/20 transition-all"></div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-retro-yellow/20 rounded-lg text-retro-yellow">
                                <Hammer className="w-6 h-6" />
                            </div>
                            <span className="text-[10px] font-mono text-gray-500 uppercase">Active Skills</span>
                        </div>
                        <div className="text-4xl font-display text-white">{skills.length}</div>
                    </div>
                </div>

                {/* Messages Card */}
                <div className="bg-[#1f1f1f] p-6 rounded-xl border border-[#333] relative overflow-hidden group hover:border-retro-orange transition-colors">
                    <div className="absolute right-[-10px] top-[-10px] bg-retro-orange/10 w-24 h-24 rounded-full blur-2xl group-hover:bg-retro-orange/20 transition-all"></div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-retro-orange/20 rounded-lg text-retro-orange">
                                <Mail className="w-6 h-6" />
                            </div>
                            <span className="text-[10px] font-mono text-gray-500 uppercase">Messages</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            {messagesLoading ? (
                                <span className="text-xs font-mono text-gray-500 animate-pulse">SYNCING...</span>
                            ) : (
                                <>
                                    <div className="text-4xl font-display text-white">{messagesStats.unread}</div>
                                    <div className="text-xs font-mono text-gray-500">/ {messagesStats.total} Total</div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;
