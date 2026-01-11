import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Save, Plus, Trash2, Edit2, X, Hammer, Loader2 } from 'lucide-react';
import { skillsApi, type Skill } from '../../services/api';
import { useToast } from '../ui/Toast';
import ConfirmModal from '../ui/ConfirmModal';

const AdminSkills = () => {
    const { showToast } = useToast();
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [isAdding, setIsAdding] = useState(false);

    const [deleteId, setDeleteId] = useState<string | null>(null);
    const { register, handleSubmit, reset, setValue } = useForm();

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const response = await skillsApi.getAll();
            setSkills(response.data || []);
        } catch (error) {
            console.error('Failed to fetch skills:', error);
        } finally {
            setLoading(false);
        }
    };

    const startEdit = (skill: Skill) => {
        setIsEditing(skill.id);
        setIsAdding(false);
        setValue('title', skill.title);
        setValue('level', skill.level);
        setValue('color', skill.color);
        setValue('progress', skill.progress);
        setValue('totalSkills', skill.totalSkills);
        setValue('equipment', skill.equipment?.join(', ') || '');
        setValue('achievements', skill.achievements?.join('\n') || '');
    };

    const onSubmit = async (data: any) => {
        setSaving(true);
        try {
            const skillData = {
                title: data.title,
                level: data.level,
                color: data.color || '#FFFFFF',
                progress: data.progress ? parseInt(data.progress) : 0,
                totalSkills: data.totalSkills ? parseInt(data.totalSkills) : 0,
                equipment: typeof data.equipment === 'string'
                    ? data.equipment.split(',').map((s: string) => s.trim()).filter(Boolean)
                    : [],
                achievements: typeof data.achievements === 'string'
                    ? data.achievements.split('\n').map((s: string) => s.trim()).filter(Boolean)
                    : []
            };

            if (isEditing) {
                await skillsApi.update(isEditing, skillData);
            } else {
                await skillsApi.create(skillData);
            }

            await fetchSkills();
            setIsEditing(null);
            setIsAdding(false);
            reset();
            showToast(isEditing ? 'Skill updated successfully!' : 'Skill created successfully!');
        } catch (error) {
            console.error('Failed to save skill:', error);
            showToast('Failed to save skill', 'error');
        } finally {
            setSaving(false);
        }
    };

    const confirmDelete = async () => {
        if (!deleteId) return;
        try {
            await skillsApi.delete(deleteId);
            await fetchSkills();
            showToast('Skill deleted successfully!');
        } catch (error: any) {
            console.error('Failed to delete skill:', error);
            showToast(error.message || 'Failed to delete skill', 'error');
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
                    <h2 className="text-2xl font-display text-white uppercase tracking-wider">Skill Loadout</h2>
                    <p className="text-gray-500 font-mono text-xs mt-1">Found {skills.length} abilities</p>
                </div>
                <button
                    onClick={() => { setIsAdding(true); setIsEditing(null); reset(); }}
                    className="flex items-center gap-2 px-4 py-2 bg-retro-orange text-white font-display text-xs uppercase rounded-lg hover:brightness-110 active:scale-95 transition-all"
                >
                    <Plus className="w-4 h-4" /> Add Skill
                </button>
            </div>

            {/* Editor */}
            {(isAdding || isEditing) && (
                <div className="bg-[#1f1f1f] border border-[#333] rounded-xl p-6 mb-8">
                    <div className="flex justify-between items-center mb-6 border-b border-[#333] pb-4">
                        <h3 className="text-retro-yellow font-display uppercase tracking-wide">
                            {isEditing ? 'Upgrade Skill' : 'New Ability'}
                        </h3>
                        <button onClick={() => { setIsAdding(false); setIsEditing(null); }} className="text-gray-500 hover:text-white">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-mono uppercase text-gray-500">Skill Title</label>
                                <input {...register('title', { required: true })} className="w-full bg-[#0a0a0a] border border-[#333] rounded-md p-3 text-white focus:border-retro-blue focus:outline-none font-display uppercase text-sm" placeholder="REACT" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-mono uppercase text-gray-500">Level Label</label>
                                <input {...register('level')} className="w-full bg-[#0a0a0a] border border-[#333] rounded-md p-3 text-white focus:border-retro-blue focus:outline-none font-display text-sm" placeholder="LEGENDARY" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-mono uppercase text-gray-500">Color (Hex)</label>
                                <div className="flex gap-2">
                                    <input type="color" {...register('color')} className="h-[46px] w-[50px] bg-[#0a0a0a] border border-[#333] rounded-md p-1" />
                                    <input {...register('color')} className="flex-1 bg-[#0a0a0a] border border-[#333] rounded-md p-3 text-white focus:border-retro-blue focus:outline-none font-mono text-xs uppercase" placeholder="#FFFFFF" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-mono uppercase text-gray-500">Progress %</label>
                                    <input type="number" {...register('progress')} className="w-full bg-[#0a0a0a] border border-[#333] rounded-md p-3 text-white focus:border-retro-blue focus:outline-none font-mono text-xs" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-mono uppercase text-gray-500">Total Skills</label>
                                    <input type="number" {...register('totalSkills')} className="w-full bg-[#0a0a0a] border border-[#333] rounded-md p-3 text-white focus:border-retro-blue focus:outline-none font-mono text-xs" />
                                </div>
                            </div>
                            <div className="col-span-1 md:col-span-2 space-y-2">
                                <label className="text-[10px] font-mono uppercase text-gray-500">Equipment (Comma separated)</label>
                                <input {...register('equipment')} className="w-full bg-[#0a0a0a] border border-[#333] rounded-md p-3 text-white focus:border-retro-blue focus:outline-none font-mono text-xs" placeholder="VS Code, Git..." />
                            </div>
                            <div className="col-span-1 md:col-span-2 space-y-2">
                                <label className="text-[10px] font-mono uppercase text-gray-500">Achievements (One per line)</label>
                                <textarea {...register('achievements')} rows={3} className="w-full bg-[#0a0a0a] border border-[#333] rounded-md p-3 text-white focus:border-retro-blue focus:outline-none font-mono text-xs" placeholder="Achievement 1&#10;Achievement 2" />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <button type="button" onClick={() => { setIsAdding(false); setIsEditing(null); }} className="px-5 py-2 text-gray-400 font-mono text-xs uppercase hover:text-white">Cancel</button>
                            <button type="submit" disabled={saving} className="px-6 py-2 bg-retro-blue text-white font-display text-xs uppercase rounded-md shadow-[0_4px_0_0_#1e3a8a] active:translate-y-[2px] active:shadow-none transition-all flex items-center gap-2 disabled:opacity-50">
                                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Skill
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.map((skill) => (
                    <div key={skill.id} className="group bg-[#0a0a0a] border border-[#222] rounded-xl p-5 hover:border-retro-dark transition-colors relative">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 rounded-lg bg-[#1a1a1a] border border-[#333]">
                                <Hammer className="w-6 h-6" style={{ color: skill.color }} />
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => startEdit(skill)} className="p-1.5 text-gray-400 hover:text-retro-yellow hover:bg-[#222] rounded-lg transition-colors">
                                    <Edit2 className="w-3 h-3" />
                                </button>
                                <button onClick={() => setDeleteId(skill.id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-[#222] rounded-lg transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <h3 className="font-display text-lg text-white uppercase tracking-wide mb-1">
                            {skill.title}
                        </h3>
                        <p className="text-xs font-mono text-gray-500 mb-4">{skill.level}</p>

                        <div className="space-y-1">
                            <div className="flex justify-between text-[10px] font-mono text-gray-400">
                                <span>PROGRESS</span>
                                <span>{skill.progress}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-[#1a1a1a] rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-500"
                                    style={{ width: `${skill.progress}%`, backgroundColor: skill.color }}
                                ></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <ConfirmModal
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={confirmDelete}
                title="Delete Skill"
                message="Are you sure you want to delete this skill? This action cannot be undone."
            />
        </div >
    );
};

export default AdminSkills;
