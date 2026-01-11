import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, Gamepad2, Loader2 } from 'lucide-react';
import { authApi } from '../services/api';

const Login = () => {
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await authApi.login(username, password);
            if (response.success) {
                // Store token for frontend auth check
                localStorage.setItem('isAdmin', 'true');
                localStorage.setItem('token', response.token);
                navigate('/admin');
            }
        } catch (err: any) {
            setError(err.message || 'ACCESS DENIED');
            setTimeout(() => setError(''), 3000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#111] flex items-center justify-center p-4 font-mono">
            <div className="max-w-md w-full bg-[#1a1a1a] border-2 border-[#333] rounded-xl p-8 shadow-2xl relative overflow-hidden">

                {/* Decoration */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-retro-orange via-retro-blue to-retro-teal"></div>
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-retro-blue/10 rounded-full blur-3xl"></div>

                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-[#222] rounded-full mb-4 border border-[#333]">
                        <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                    <h1 className="text-2xl font-display text-white uppercase tracking-widest">System Access</h1>
                    <p className="text-xs text-gray-500 mt-2">Restricted Area • Authorized Personnel Only</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase text-gray-500 font-bold tracking-wider ml-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-[#0a0a0a] border-2 border-[#333] rounded-lg p-3 text-white focus:outline-none focus:border-retro-orange transition-colors font-display text-sm"
                            placeholder="admin"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] uppercase text-gray-500 font-bold tracking-wider ml-1">Passkey</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full bg-[#0a0a0a] border-2 ${error ? 'border-red-500 animate-pulse' : 'border-[#333]'} rounded-lg p-3 text-white focus:outline-none focus:border-retro-orange transition-colors font-display text-sm`}
                            placeholder="••••••••"
                            autoFocus
                        />
                        {error && <p className="text-red-500 text-xs text-center pt-2">{error}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-retro-blue hover:bg-blue-700 disabled:opacity-50 text-white font-display text-sm uppercase rounded-lg shadow-[0_4px_0_0_#1e3a8a] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2 group"
                    >
                        {loading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <>
                                Enter Mainframe <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-[#333] text-center">
                    <a href="/" className="text-xs text-gray-600 hover:text-white flex items-center justify-center gap-2 transition-colors">
                        <Gamepad2 className="w-3 h-3" /> Return to Arcade
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;
