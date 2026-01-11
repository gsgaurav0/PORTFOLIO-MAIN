import { AlertTriangle, X } from 'lucide-react';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    type?: 'danger' | 'warning' | 'info';
}

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, type = 'danger' }: ConfirmModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative bg-[#1a1a1a] border-2 border-[#333] rounded-xl w-full max-w-md p-6 shadow-2xl animate-scale-in">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="flex items-start gap-4 mb-6">
                    <div className={`p-3 rounded-lg border ${type === 'danger' ? 'bg-red-500/10 border-red-500/20 text-red-500' :
                            type === 'warning' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500' :
                                'bg-blue-500/10 border-blue-500/20 text-blue-500'
                        }`}>
                        <AlertTriangle className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-display text-white uppercase tracking-wide mb-2">{title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{message}</p>
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-[#222] text-gray-300 hover:bg-[#333] hover:text-white rounded-lg font-mono text-xs uppercase transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className={`px-4 py-2 text-white font-display text-xs uppercase rounded-lg shadow-lg active:scale-95 transition-all ${type === 'danger' ? 'bg-red-600 hover:bg-red-700 shadow-red-900/20' :
                                type === 'warning' ? 'bg-yellow-600 hover:bg-yellow-700 shadow-yellow-900/20' :
                                    'bg-blue-600 hover:bg-blue-700 shadow-blue-900/20'
                            }`}
                    >
                        Confirm Action
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
