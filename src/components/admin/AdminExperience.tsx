import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, X, Save, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { experiencesApi, type Experience } from '../../services/api';
import { useToast } from '../ui/Toast';
import ConfirmModal from '../ui/ConfirmModal';

const AdminExperience = () => {
    const { showToast } = useToast();
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [isAdding, setIsAdding] = useState(false);

    const [deleteId, setDeleteId] = useState<string | null>(null);
    const { register, handleSubmit, reset, setValue } = useForm();

    useEffect(() => {
        fetchExperiences();
    }, []);

    const fetchExperiences = async () => {
        try {
            const response = await experiencesApi.getAll();
            setExperiences(response.data || []);
        } catch (error) {
            console.error('Failed to fetch experiences:', error);
        } finally {
            setLoading(false);
        }
    };

    const startEdit = (exp: Experience) => {
        setIsEditing(exp.id);
        setIsAdding(false);
        setValue('company', exp.company);
        setValue('role', exp.role);
        setValue('period', exp.period);
        setValue('description', exp.description);
        setValue('achievements', exp.achievements?.join('\n') || '');
        setValue('stack', exp.stack?.join(', ') || '');
    };

    const onSubmit = async (data: any) => {
        setSaving(true);
        try {
            const expData = {
                company: data.company,
                role: data.role,
                period: data.period,
                description: data.description,
                achievements: data.achievements ? data.achievements.split('\n').map((s: string) => s.trim()).filter(Boolean) : [],
                stack: data.stack ? data.stack.split(',').map((s: string) => s.trim()).filter(Boolean) : []
            };

            if (isEditing) {
                await experiencesApi.update(isEditing, expData);
            } else {
                await experiencesApi.create(expData);
            }

            await fetchExperiences();
            setIsEditing(null);
            setIsAdding(false);
            reset();
            showToast(isEditing ? 'Experience updated successfully!' : 'Experience created successfully!');
        } catch (error) {
            console.error('Failed to save experience:', error);
            showToast('Failed to save experience', 'error');
        } finally {
            setSaving(false);
        }
    };

    const confirmDelete = async () => {
        if (!deleteId) return;
        try {
            await experiencesApi.delete(deleteId);
            await fetchExperiences();
            showToast('Experience deleted successfully!');
        } catch (error: any) {
            console.error('Failed to delete experience:', error);
            showToast(error.message || 'Failed to delete experience', 'error');
        }
        setDeleteId(null);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 text-retro-blue animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-display text-white uppercase tracking-wider">Experience Logs</h2>
                    <p className="text-gray-500 font-mono text-xs mt-1">Timeline entries: {experiences.length}</p>
                </div>
                <button
                    onClick={() => { setIsAdding(true); setIsEditing(null); reset(); }}
                    className="flex items-center gap-2 px-4 py-2 bg-retro-orange text-white font-display text-xs uppercase rounded-lg hover:brightness-110 active:scale-95 transition-all"
                >
                    <Plus className="w-4 h-4" /> Add Role
                </button>
            </div>

            {/* Editor */}
            {(isAdding || isEditing) && (
                <div className="bg-[#1f1f1f] border border-[#333] rounded-xl p-6 mb-8">
                    <div className="flex justify-between items-center mb-6 border-b border-[#333] pb-4">
                        <h3 className="text-retro-yellow font-display uppercase tracking-wide">
                            {isEditing ? 'Update Log Entry' : 'New Career Log'}
                        </h3>
                        <button onClick={() => { setIsAdding(false); setIsEditing(null); }} className="text-gray-500 hover:text-white">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-mono uppercase text-gray-500">Company Name</label>
                                <input {...register('company', { required: true })} className="w-full bg-[#0a0a0a] border border-[#333] rounded-md p-3 text-white focus:border-retro-blue focus:outline-none font-display uppercase text-sm" placeholder="CORP NAME" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-mono uppercase text-gray-500">Role Title</label>
                                <input {...register('role', { required: true })} className="w-full bg-[#0a0a0a] border border-[#333] rounded-md p-3 text-white focus:border-retro-blue focus:outline-none font-display text-sm" placeholder="SENIOR ENGINEER" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-mono uppercase text-gray-500">Period / Location</label>
                                <input {...register('period')} className="w-full bg-[#0a0a0a] border border-[#333] rounded-md p-3 text-white focus:border-retro-blue focus:outline-none font-mono text-xs" placeholder="202X — Present • Remote" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-mono uppercase text-gray-500">Tech Stack (Comma separated)</label>
                                <input {...register('stack')} className="w-full bg-[#0a0a0a] border border-[#333] rounded-md p-3 text-white focus:border-retro-blue focus:outline-none font-mono text-xs" placeholder="React, TypeScript..." />
                            </div>
                            <div className="col-span-1 md:col-span-2 space-y-2">
                                <label className="text-[10px] font-mono uppercase text-gray-500">Description</label>
                                <textarea {...register('description')} rows={2} className="w-full bg-[#0a0a0a] border border-[#333] rounded-md p-3 text-white focus:border-retro-blue focus:outline-none font-mono text-xs leading-relaxed" placeholder="Brief summary..." />
                            </div>
                            <div className="col-span-1 md:col-span-2 space-y-2">
                                <label className="text-[10px] font-mono uppercase text-gray-500">Achievements (One per line)</label>
                                <textarea {...register('achievements')} rows={3} className="w-full bg-[#0a0a0a] border border-[#333] rounded-md p-3 text-white focus:border-retro-blue focus:outline-none font-mono text-xs leading-relaxed" placeholder="Achievement 1&#10;Achievement 2" />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <button type="button" onClick={() => { setIsAdding(false); setIsEditing(null); }} className="px-5 py-2 text-gray-400 font-mono text-xs uppercase hover:text-white">Cancel</button>
                            <button type="submit" disabled={saving} className="px-6 py-2 bg-retro-blue text-white font-display text-xs uppercase rounded-md shadow-[0_4px_0_0_#1e3a8a] active:translate-y-[2px] active:shadow-none transition-all flex items-center gap-2 disabled:opacity-50">
                                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Log
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* List */}
            <div className="grid grid-cols-1 gap-4">
                {experiences.map((exp) => (
                    <div key={exp.id} className="group bg-[#0a0a0a] border border-[#222] rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-retro-dark transition-colors border-l-4 border-l-retro-orange">
                        <div>
                            <div className="flex flex-wrap items-center gap-3 mb-1">
                                <h3 className="font-display text-lg text-white uppercase tracking-wide group-hover:text-retro-orange transition-colors">
                                    {exp.company}
                                </h3>
                                <span className="bg-[#1a1a1a] border border-[#333] text-gray-400 text-[10px] px-2 py-0.5 rounded font-mono uppercase">{exp.role}</span>
                            </div>
                            <p className="text-gray-500 font-mono text-xs">{exp.period}</p>
                            <p className="text-gray-400 text-sm mt-2 line-clamp-1">{exp.description}</p>
                        </div>

                        <div className="flex gap-2 self-start md:self-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => startEdit(exp)} className="p-2 text-gray-400 hover:text-retro-yellow hover:bg-[#222] rounded-lg transition-colors">
                                <Edit2 className="w-4 h-4" />
                            </button>
                            <button onClick={() => setDeleteId(exp.id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-[#222] rounded-lg transition-colors">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <ConfirmModal
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={confirmDelete}
                title="Delete Experience"
                message="Are you sure you want to delete this experience log? This action cannot be undone."
            />
        </div>
    );
};

export default AdminExperience;
