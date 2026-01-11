import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Save, User, BarChart, Loader2, CheckCircle } from 'lucide-react';
import { profileApi, type Profile } from '../../services/api';
import { usePortfolioStore } from '../../store/useStore';
import { useToast } from '../ui/Toast';

const AdminProfile = () => {
    const refreshData = usePortfolioStore(state => state.refreshData);
    const { showToast } = useToast();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const { register, handleSubmit, setValue } = useForm();

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await profileApi.get();
            if (response.data) {
                setProfile(response.data);
                setValue('name', response.data.name);
                setValue('role', response.data.role);
                setValue('bio', response.data.bio);
                setValue('years', response.data.years);
                setValue('projects_count', response.data.projects_count);
                setValue('awesomeness', response.data.awesomeness);
                setValue('expertise', response.data.expertise?.join(', ') || '');
            }
        } catch (error) {
            console.error('Failed to fetch profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = async (data: any) => {
        setSaving(true);
        setSaved(false);
        try {
            await profileApi.update({
                name: data.name,
                role: data.role,
                bio: data.bio,
                years: data.years,
                projects_count: data.projects_count,
                awesomeness: data.awesomeness,
                expertise: data.expertise.split(',').map((s: string) => s.trim()).filter(Boolean)
            });
            setSaved(true);
            refreshData(); // Trigger homepage data refresh
            showToast('Profile updated successfully!');
            setTimeout(() => setSaved(false), 2000);
        } catch (error) {
            console.error('Failed to save profile:', error);
            showToast('Failed to save profile', 'error');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 text-retro-blue animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="border-b border-[#333] pb-6">
                <h2 className="text-2xl font-display text-white uppercase tracking-wider">Identity Module</h2>
                <p className="text-gray-500 font-mono text-xs mt-1">Configure avatar parameters</p>
            </div>

            <div className="bg-[#1f1f1f] border border-[#333] rounded-xl p-8 max-w-4xl">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    {/* Core Identity */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-1 md:col-span-2">
                            <h3 className="text-retro-yellow font-display uppercase tracking-wide mb-4 text-sm flex items-center gap-2">
                                <User className="w-4 h-4" /> Core Data
                            </h3>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-mono uppercase text-gray-500">Player Name</label>
                            <input {...register('name')} className="w-full bg-[#0a0a0a] border border-[#333] rounded-md p-3 text-white focus:border-retro-blue focus:outline-none font-display uppercase text-lg" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-mono uppercase text-gray-500">Class / Role</label>
                            <input {...register('role')} className="w-full bg-[#0a0a0a] border border-[#333] rounded-md p-3 text-white focus:border-retro-blue focus:outline-none font-display text-lg" />
                        </div>

                        <div className="col-span-1 md:col-span-2 space-y-2">
                            <label className="text-[10px] font-mono uppercase text-gray-500">Mission Brief (Bio)</label>
                            <textarea {...register('bio')} rows={3} className="w-full bg-[#0a0a0a] border border-[#333] rounded-md p-3 text-white focus:border-retro-blue focus:outline-none font-mono text-sm leading-relaxed" />
                        </div>
                    </div>

                    {/* Stats & Expertise */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#333]/50">
                        <div className="col-span-1 md:col-span-3">
                            <h3 className="text-retro-blue font-display uppercase tracking-wide mb-4 text-sm flex items-center gap-2">
                                <BarChart className="w-4 h-4" /> Stats & Specs
                            </h3>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-mono uppercase text-gray-500">Years Exp</label>
                            <input {...register('years')} className="w-full bg-[#0a0a0a] border border-[#333] rounded-md p-3 text-retro-orange focus:border-retro-blue focus:outline-none font-display text-xl text-center" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono uppercase text-gray-500">Projects Count</label>
                            <input {...register('projects_count')} className="w-full bg-[#0a0a0a] border border-[#333] rounded-md p-3 text-retro-teal focus:border-retro-blue focus:outline-none font-display text-xl text-center" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono uppercase text-gray-500">Awesomeness</label>
                            <input {...register('awesomeness')} className="w-full bg-[#0a0a0a] border border-[#333] rounded-md p-3 text-green-400 focus:border-retro-blue focus:outline-none font-display text-xl text-center" />
                        </div>

                        <div className="col-span-1 md:col-span-3 space-y-2">
                            <label className="text-[10px] font-mono uppercase text-gray-500">Expertise Tags (Comma separated)</label>
                            <input {...register('expertise')} className="w-full bg-[#0a0a0a] border border-[#333] rounded-md p-3 text-white focus:border-retro-blue focus:outline-none font-mono text-sm" placeholder="Frontend, Backend, UI/UX" />
                        </div>
                    </div>

                    <div className="pt-6 border-t border-[#333] flex justify-end gap-4">
                        {saved && (
                            <div className="flex items-center gap-2 text-green-400 text-sm">
                                <CheckCircle className="w-4 h-4" /> Saved!
                            </div>
                        )}
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-8 py-3 bg-retro-blue text-white font-display text-xs uppercase rounded-lg shadow-[0_4px_0_0_#1e3a8a] active:translate-y-[2px] active:shadow-none transition-all flex items-center gap-2 disabled:opacity-50"
                        >
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Update Identity
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminProfile;
