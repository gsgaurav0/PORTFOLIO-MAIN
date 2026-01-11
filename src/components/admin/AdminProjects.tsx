import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, X, Save, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { projectsApi, type Project } from '../../services/api';
import { useToast } from '../ui/Toast';
import ConfirmModal from '../ui/ConfirmModal';

const AdminProjects = () => {
    const { showToast } = useToast();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [isAdding, setIsAdding] = useState(false);

    const [deleteId, setDeleteId] = useState<string | null>(null);
    const { register, handleSubmit, reset, setValue } = useForm<any>();

    // Fetch projects from API
    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await projectsApi.getAll();
            setProjects(response.data || []);
        } catch (error) {
            console.error('Failed to fetch projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const startEdit = (project: Project) => {
        setIsEditing(project.id);
        setIsAdding(false);
        setValue('title', project.title);
        setValue('subtitle', project.subtitle);
        setValue('image', project.image);
        setValue('link', project.link || '');
        setValue('stack', project.stack.join(', '));
        setValue('features', project.features.join('\n'));
    };

    const onSubmit = async (data: any) => {
        setSaving(true);
        try {
            const stackArray = data.stack ? data.stack.split(',').map((s: string) => s.trim()).filter(Boolean) : [];
            const featuresArray = data.features ? data.features.split('\n').map((s: string) => s.trim()).filter(Boolean) : [];

            const projectData = {
                title: data.title,
                subtitle: data.subtitle,
                image: data.image,
                link: data.link,
                stack: stackArray,
                features: featuresArray
            };

            if (isEditing) {
                await projectsApi.update(isEditing, projectData);
            } else {
                await projectsApi.create(projectData);
            }

            await fetchProjects();
            setIsEditing(null);
            setIsAdding(false);
            reset();
            showToast(isEditing ? 'Project updated successfully!' : 'Project created successfully!');
        } catch (error) {
            console.error('Failed to save project:', error);
            showToast('Failed to save project', 'error');
        } finally {
            setSaving(false);
        }
    };

    const confirmDelete = async () => {
        if (!deleteId) return;
        try {
            await projectsApi.delete(deleteId);
            await fetchProjects();
            showToast('Project deleted successfully!');
        } catch (error: any) {
            console.error('Failed to delete project:', error);
            showToast(error.message || 'Failed to delete project', 'error');
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
                    <h2 className="text-2xl font-display text-white uppercase tracking-wider">Project Database</h2>
                    <p className="text-gray-500 font-mono text-xs mt-1">Found {projects.length} records</p>
                </div>
                <button
                    onClick={() => { setIsAdding(true); setIsEditing(null); reset(); }}
                    className="flex items-center gap-2 px-4 py-2 bg-retro-orange text-white font-display text-xs uppercase rounded-lg hover:brightness-110 active:scale-95 transition-all"
                >
                    <Plus className="w-4 h-4" /> Add Project
                </button>
            </div>

            {/* Editor Panel */}
            {(isAdding || isEditing) && (
                <div className="bg-[#1f1f1f] border border-[#333] rounded-xl p-6 mb-8">
                    <div className="flex justify-between items-center mb-6 border-b border-[#333] pb-4">
                        <h3 className="text-retro-yellow font-display uppercase tracking-wide">
                            {isEditing ? 'Edit Protocol' : 'Initialize New Project'}
                        </h3>
                        <button onClick={() => { setIsAdding(false); setIsEditing(null); }} className="text-gray-500 hover:text-white">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-mono uppercase text-gray-500">Project Title</label>
                                <input {...register('title', { required: true })} className="w-full bg-[#0a0a0a] border border-[#333] rounded-md p-3 text-white focus:border-retro-blue focus:outline-none font-display uppercase text-sm" placeholder="PROJECT NAME" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-mono uppercase text-gray-500">Subtitle</label>
                                <input {...register('subtitle')} className="w-full bg-[#0a0a0a] border border-[#333] rounded-md p-3 text-white focus:border-retro-blue focus:outline-none font-display text-sm" placeholder="Brief description" />
                            </div>
                            <div className="col-span-2 space-y-2">
                                <label className="text-[10px] font-mono uppercase text-gray-500">Image Class</label>
                                <div className="flex gap-2">
                                    <div className="p-3 bg-[#0a0a0a] border border-[#333] rounded-md">
                                        <ImageIcon className="w-5 h-5 text-gray-500" />
                                    </div>
                                    <input {...register('image')} className="flex-1 bg-[#0a0a0a] border border-[#333] rounded-md p-3 text-white focus:border-retro-blue focus:outline-none font-mono text-xs" placeholder="URL or Tailwind Class" />
                                </div>
                            </div>
                            <div className="col-span-2 space-y-2">
                                <label className="text-[10px] font-mono uppercase text-gray-500">Project URL</label>
                                <input {...register('link')} className="w-full bg-[#0a0a0a] border border-[#333] rounded-md p-3 text-white focus:border-retro-blue focus:outline-none font-mono text-xs" placeholder="https://..." />
                            </div>
                            <div className="col-span-2 md:col-span-1 space-y-2">
                                <label className="text-[10px] font-mono uppercase text-gray-500">Tech Stack (Comma separated)</label>
                                <input {...register('stack')} className="w-full bg-[#0a0a0a] border border-[#333] rounded-md p-3 text-white focus:border-retro-blue focus:outline-none font-mono text-xs" placeholder="React, TypeScript..." />
                            </div>
                            <div className="col-span-2 md:col-span-1 space-y-2">
                                <label className="text-[10px] font-mono uppercase text-gray-500">Features (One per line)</label>
                                <textarea {...register('features')} rows={3} className="w-full bg-[#0a0a0a] border border-[#333] rounded-md p-3 text-white focus:border-retro-blue focus:outline-none font-mono text-xs" placeholder="Feature 1&#10;Feature 2" />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <button type="button" onClick={() => { setIsAdding(false); setIsEditing(null); }} className="px-5 py-2 text-gray-400 font-mono text-xs uppercase hover:text-white">Cancel</button>
                            <button type="submit" disabled={saving} className="px-6 py-2 bg-retro-blue text-white font-display text-xs uppercase rounded-md shadow-[0_4px_0_0_#1e3a8a] active:translate-y-[2px] active:shadow-none transition-all flex items-center gap-2 disabled:opacity-50">
                                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Record
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Projects Grid */}
            <div className="grid grid-cols-1 gap-4">
                {projects.map((project) => (
                    <div key={project.id} className="group bg-[#0a0a0a] border border-[#222] rounded-xl p-4 flex items-center gap-6 hover:border-retro-dark/50 transition-colors">
                        <div className={`w-24 h-16 rounded-lg border border-[#333] relative overflow-hidden shrink-0 ${!project.image?.match(/^(http|\/)/) ? project.image : ''}`}>
                            {project.image?.match(/^(http|\/)/) ? (
                                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                            ) : null}
                        </div>

                        <div className="flex-1">
                            <h3 className="font-display text-lg text-white uppercase tracking-wide group-hover:text-retro-blue transition-colors">
                                {project.title}
                            </h3>
                            <p className="text-gray-500 text-sm truncate">{project.subtitle}</p>
                            <div className="flex gap-2 mt-2">
                                {project.stack?.slice(0, 3).map(tech => (
                                    <span key={tech} className="text-[9px] font-mono bg-[#1a1a1a] px-2 py-0.5 rounded text-gray-400 border border-[#333]">{tech}</span>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => startEdit(project)} className="p-2 text-gray-400 hover:text-retro-yellow hover:bg-[#222] rounded-lg transition-colors">
                                <Edit2 className="w-4 h-4" />
                            </button>
                            <button onClick={() => setDeleteId(project.id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-[#222] rounded-lg transition-colors">
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
                title="Delete Project"
                message="Are you sure you want to delete this project? This action cannot be undone."
            />
        </div>
    );
};

export default AdminProjects;
