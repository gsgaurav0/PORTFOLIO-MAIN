import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Save, LogOut, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { authApi } from '../../services/api';

const AdminSettings = () => {
    const navigate = useNavigate();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        // Validation
        if (!currentPassword || !newPassword || !confirmPassword) {
            setMessage({ type: 'error', text: 'All fields are required' });
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage({ type: 'error', text: 'New passwords do not match' });
            return;
        }

        if (newPassword.length < 6) {
            setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
            return;
        }

        setLoading(true);

        try {
            const response = await authApi.changePassword(currentPassword, newPassword);
            if (response.success) {
                setMessage({ type: 'success', text: 'Password changed successfully!' });
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            }
        } catch (err: any) {
            setMessage({ type: 'error', text: err.message || 'Failed to change password' });
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await authApi.logout();
        } catch {
            // Continue with logout even if API fails
        }
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="space-y-8">
            <div className="border-b border-[#333] pb-6">
                <h2 className="text-2xl font-display text-white uppercase tracking-wider">System Settings</h2>
                <p className="text-gray-500 font-mono text-xs mt-1">Security and account management</p>
            </div>

            {/* Password Change Section */}
            <div className="bg-[#1f1f1f] border border-[#333] rounded-xl p-8 max-w-lg">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-retro-orange/20 rounded-lg flex items-center justify-center">
                        <Lock className="w-5 h-5 text-retro-orange" />
                    </div>
                    <div>
                        <h3 className="text-white font-display text-sm uppercase">Change Password</h3>
                        <p className="text-gray-500 text-xs">Update your admin credentials</p>
                    </div>
                </div>

                {message && (
                    <div className={`flex items-center gap-2 p-3 rounded-lg mb-4 ${message.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                        {message.type === 'success' ? (
                            <CheckCircle className="w-4 h-4" />
                        ) : (
                            <AlertCircle className="w-4 h-4" />
                        )}
                        <span className="text-sm">{message.text}</span>
                    </div>
                )}

                <form onSubmit={handleChangePassword} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-mono uppercase text-gray-400">Current Password</label>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full bg-[#0a0a0a] border border-[#333] rounded-md p-3 text-white focus:border-retro-orange focus:outline-none font-mono text-sm"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-mono uppercase text-gray-400">New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full bg-[#0a0a0a] border border-[#333] rounded-md p-3 text-white focus:border-retro-orange focus:outline-none font-mono text-sm"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-mono uppercase text-gray-400">Confirm New Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full bg-[#0a0a0a] border border-[#333] rounded-md p-3 text-white focus:border-retro-orange focus:outline-none font-mono text-sm"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-retro-orange text-white font-display text-xs uppercase rounded-lg shadow-[0_4px_0_0_#c2410c] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {loading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <>
                                <Save className="w-4 h-4" /> Update Password
                            </>
                        )}
                    </button>
                </form>
            </div>

            {/* Logout Section */}
            <div className="bg-[#1f1f1f] border border-[#333] rounded-xl p-8 max-w-lg">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-white font-display text-sm uppercase">Session</h3>
                        <p className="text-gray-500 text-xs mt-1">End your current admin session</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-6 py-3 bg-red-600 text-white font-display text-xs uppercase rounded-lg shadow-[0_4px_0_0_#991b1b] active:translate-y-[2px] active:shadow-none transition-all flex items-center gap-2"
                    >
                        <LogOut className="w-4 h-4" /> Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
