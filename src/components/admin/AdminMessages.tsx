import { useState, useEffect } from 'react';
import { Mail, Trash2, Check, Loader2, Clock, User } from 'lucide-react';
import { messagesApi, type Message } from '../../services/api';
import { useToast } from '../ui/Toast';
import ConfirmModal from '../ui/ConfirmModal';

const AdminMessages = () => {
    const { showToast } = useToast();
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [unreadCount, setUnreadCount] = useState(0);
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await messagesApi.getAll();
            setMessages(response.data || []);
            setUnreadCount(response.unreadCount || 0);
        } catch (error) {
            console.error('Failed to fetch messages:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleMarkRead = async (id: string) => {
        try {
            await messagesApi.markRead(id);
            setMessages(prev =>
                prev.map(m => m.id === id ? { ...m, is_read: true } : m)
            );
            setUnreadCount(prev => Math.max(0, prev - 1));
        } catch (error) {
            console.error('Failed to mark as read:', error);
        }
    };

    const confirmDelete = async () => {
        if (!deleteId) return;
        try {
            await messagesApi.delete(deleteId);
            setMessages(prev => prev.filter(m => m.id !== deleteId));
            if (selectedMessage?.id === deleteId) setSelectedMessage(null);
            showToast('Message deleted successfully!');
        } catch (error: any) {
            console.error('Failed to delete message:', error);
            showToast(error.message || 'Failed to delete message', 'error');
        }
        setDeleteId(null);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
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
                    <h2 className="text-2xl font-display text-white uppercase tracking-wider flex items-center gap-3">
                        Incoming Transmissions
                        {unreadCount > 0 && (
                            <span className="bg-retro-orange text-white text-xs px-2 py-1 rounded-full animate-pulse">
                                {unreadCount} NEW
                            </span>
                        )}
                    </h2>
                    <p className="text-gray-500 font-mono text-xs mt-1">
                        {messages.length} total messages
                    </p>
                </div>
            </div>

            {messages.length === 0 ? (
                <div className="bg-[#1f1f1f] border border-[#333] rounded-xl p-12 text-center">
                    <Mail className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-white font-display uppercase">No Messages Yet</h3>
                    <p className="text-gray-500 text-sm mt-2">Contact form submissions will appear here</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Message List */}
                    <div className="lg:col-span-1 space-y-3 max-h-[600px] overflow-y-auto pr-2">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                onClick={() => {
                                    setSelectedMessage(msg);
                                    if (!msg.is_read) handleMarkRead(msg.id);
                                }}
                                className={`
                                    p-4 rounded-xl cursor-pointer transition-all border
                                    ${selectedMessage?.id === msg.id
                                        ? 'bg-retro-blue/20 border-retro-blue'
                                        : 'bg-[#0a0a0a] border-[#222] hover:border-[#444]'
                                    }
                                    ${!msg.is_read ? 'border-l-4 border-l-retro-orange' : ''}
                                `}
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            {!msg.is_read && (
                                                <span className="w-2 h-2 bg-retro-orange rounded-full shrink-0" />
                                            )}
                                            <h4 className="font-display text-white text-sm uppercase truncate">
                                                {msg.name}
                                            </h4>
                                        </div>
                                        <p className="text-gray-500 text-xs truncate mt-1">{msg.email}</p>
                                        <p className="text-gray-400 text-xs line-clamp-2 mt-2">{msg.message}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 text-gray-600 text-[10px] mt-3">
                                    <Clock className="w-3 h-3" />
                                    {formatDate(msg.created_at)}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Message Detail */}
                    <div className="lg:col-span-2">
                        {selectedMessage ? (
                            <div className="bg-[#1f1f1f] border border-[#333] rounded-xl p-6 h-full">
                                <div className="flex justify-between items-start mb-6 pb-4 border-b border-[#333]">
                                    <div>
                                        <h3 className="font-display text-xl text-white uppercase">
                                            {selectedMessage.name}
                                        </h3>
                                        <a
                                            href={`mailto:${selectedMessage.email}`}
                                            className="text-retro-blue text-sm hover:underline"
                                        >
                                            {selectedMessage.email}
                                        </a>
                                        <div className="flex items-center gap-2 mt-2 text-gray-500 text-xs">
                                            <Clock className="w-3 h-3" />
                                            {formatDate(selectedMessage.created_at)}
                                            {selectedMessage.is_read && (
                                                <span className="flex items-center gap-1 text-green-500">
                                                    <Check className="w-3 h-3" /> Read
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <a
                                            href={`mailto:${selectedMessage.email}`}
                                            className="p-2 bg-retro-blue text-white rounded-lg hover:brightness-110 transition-all"
                                            title="Reply"
                                        >
                                            <Mail className="w-4 h-4" />
                                        </a>
                                        <button
                                            onClick={() => handleDelete(selectedMessage.id)}
                                            className="p-2 bg-red-600 text-white rounded-lg hover:brightness-110 transition-all"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="prose prose-invert max-w-none">
                                    <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                                        {selectedMessage.message}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-[#1f1f1f] border border-[#333] rounded-xl p-12 h-full flex flex-col items-center justify-center text-center">
                                <User className="w-12 h-12 text-gray-600 mb-4" />
                                <h3 className="text-white font-display uppercase">Select a Message</h3>
                                <p className="text-gray-500 text-sm mt-2">Click on a message to view details</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminMessages;
