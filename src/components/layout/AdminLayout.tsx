import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, FolderOpen, Hammer, MonitorPlay, LogOut, ExternalLink, Share2, UserCircle, Settings, Bell } from 'lucide-react';

const AdminLayout = () => {
    const location = useLocation();

    const navItems = [
        { path: '/admin', icon: <LayoutDashboard className="w-4 h-4" />, label: 'Overview' },
        { path: '/admin/projects', icon: <FolderOpen className="w-4 h-4" />, label: 'Projects' },
        { path: '/admin/skills', icon: <Hammer className="w-4 h-4" />, label: 'Skills' },
        { path: '/admin/experience', icon: <MonitorPlay className="w-4 h-4" />, label: 'Experience' },
        { path: '/admin/socials', icon: <Share2 className="w-4 h-4" />, label: 'Socials' },
        { path: '/admin/profile', icon: <UserCircle className="w-4 h-4" />, label: 'Identity' },
        { path: '/admin/messages', icon: <Bell className="w-4 h-4" />, label: 'Messages' },
        { path: '/admin/settings', icon: <Settings className="w-4 h-4" />, label: 'Settings' },
    ];

    return (
        <div className="flex h-screen bg-[#111] text-retro-white font-body overflow-hidden">

            {/* Sidebar */}
            <aside className="w-64 bg-[#0a0a0a] border-r border-[#333] flex flex-col">
                <div className="p-6 border-b border-[#333]">
                    <h1 className="font-display text-xl text-retro-orange tracking-widest uppercase">
                        COMMAND<br />CENTER
                    </h1>
                    <p className="text-[10px] font-mono text-gray-500 mt-2">v2.0.0 • ADMIN MODULE</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`
                                    flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-xs uppercase tracking-wider transition-all
                                    ${isActive
                                        ? 'bg-retro-dark text-retro-yellow border border-retro-yellow/20 shadow-[0_0_10px_rgba(251,191,36,0.1)]'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }
                                `}
                            >
                                {item.icon}
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-[#333] space-y-2">
                    <Link to="/" target="_blank" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-retro-blue transition-colors font-mono text-xs uppercase">
                        <ExternalLink className="w-4 h-4" />
                        View Site
                    </Link>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors font-mono text-xs uppercase">
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-[#1a1a1a]">
                <div className="p-8">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </div>
            </main>

        </div>
    );
};

export default AdminLayout;
