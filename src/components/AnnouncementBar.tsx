import React from 'react';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface AnnouncementBarProps {
    isVisible: boolean;
    onClose: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ isVisible, onClose }) => {
    const navigate = useNavigate();

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white overflow-hidden z-40 cursor-pointer"
                    onClick={() => navigate('/announcements/v1.2.0')}
                >
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>

                    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 relative flex items-center justify-between gap-3">
                        <div className="flex-1 flex items-center justify-center overflow-hidden min-w-0">
                            <motion.div
                                className="flex items-center gap-1.5 sm:gap-2 font-medium whitespace-nowrap"
                                animate={{ x: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            >
                                <Sparkles size={14} className="text-yellow-300 animate-pulse flex-shrink-0 sm:w-4 sm:h-4" />
                                <span className="text-xs sm:text-sm md:text-base truncate">
                                    <span className="inline sm:hidden">Coming Soon: AI Features!</span>
                                    <span className="hidden sm:inline">Sneak Peek: The AI Revolution is coming to Markdown Weaver!</span>
                                </span>
                                <span className="hidden lg:inline text-white/80 text-xs sm:text-sm ml-1 sm:ml-2">See what's next</span>
                                <ArrowRight size={14} className="ml-0.5 sm:ml-1 opacity-80 flex-shrink-0 sm:w-4 sm:h-4" />
                            </motion.div>
                        </div>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onClose();
                            }}
                            className="flex-shrink-0 p-1 hover:bg-white/20 rounded-full transition-colors z-10 -mr-1"
                            aria-label="Close announcement"
                        >
                            <X size={14} className="sm:w-4 sm:h-4" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
