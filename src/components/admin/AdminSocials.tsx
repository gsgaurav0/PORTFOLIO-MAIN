import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Save, Github, Linkedin, Twitter, Mail, MessageSquare, Loader2, CheckCircle } from 'lucide-react';
import { socialsApi, type SocialLink } from '../../services/api';
import { useToast } from '../ui/Toast';

const AdminSocials = () => {
    const { showToast } = useToast();
    const [socials, setSocials] = useState<SocialLink[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        fetchSocials();
    }, []);

    const fetchSocials = async () => {
        try {
            const response = await socialsApi.getAll();
            setSocials(response.data || []);
        } catch (error) {
            console.error('Failed to fetch socials:', error);
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = async (data: any) => {
        setSaving(true);
        setSaved(false);
        try {
            for (const social of socials) {
                if (data[social.platform]) {
                    await socialsApi.update(social.platform, {
                        href: data[social.platform],
                        label: social.label
                    });
                }
            }
            setSaved(true);
            showToast('Social links updated successfully!');
            setTimeout(() => setSaved(false), 2000);
        } catch (error) {
            console.error('Failed to save socials:', error);
            showToast('Failed to save social links', 'error');
        } finally {
            setSaving(false);
        }
    };

    const getIcon = (platform: string) => {
        switch (platform) {
            case 'github': return <Github className="w-5 h-5" />;
            case 'linkedin': return <Linkedin className="w-5 h-5" />;
            case 'twitter': return <Twitter className="w-5 h-5" />;
            case 'email': return <Mail className="w-5 h-5" />;
            case 'discord': return <MessageSquare className="w-5 h-5" />;
            default: return null;
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
                <h2 className="text-2xl font-display text-white uppercase tracking-wider">Social Uplink</h2>
                <p className="text-gray-500 font-mono text-xs mt-1">Manage external communication frequencies</p>
            </div>

            <div className="bg-[#1f1f1f] border border-[#333] rounded-xl p-8 max-w-2xl">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {socials.map((social) => (
                        <div key={social.platform} className="space-y-2">
                            <label className="flex items-center gap-2 text-xs font-mono uppercase text-gray-400">
                                {getIcon(social.platform)}
                                {social.label} URL
                            </label>
                            <input
                                {...register(social.platform)}
                                defaultValue={social.href}
                                className="w-full bg-[#0a0a0a] border border-[#333] rounded-md p-4 text-white focus:border-retro-blue focus:outline-none font-mono text-sm shadow-inner"
                                placeholder={`Enter ${social.label} link...`}
                            />
                        </div>
                    ))}

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
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Configuration
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminSocials;
