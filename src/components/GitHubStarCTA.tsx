import React from 'react';
import { motion } from 'framer-motion';
import { Github, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GitHubStarCTAProps {
    className?: string;
}

export const GitHubStarCTA: React.FC<GitHubStarCTAProps> = ({ className }) => {
    return (
        <motion.a
            href="https://github.com/Vasu657/markdown-weaver.git"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: 1
            }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
                // Base & Mobile (Small & Thin)
                "fixed bottom-4 right-4 z-[100] flex items-center gap-2 px-3 py-1.5 rounded-full",
                "bg-background/80 backdrop-blur-md border border-white/10 shadow-xl",
                "h-8 text-[11px] font-medium tracking-wide",

                // Desktop (Larger & More Prominent)
                "md:bottom-6 md:right-6 md:px-5 md:py-3 md:h-11 md:text-sm md:gap-3",

                // Advanced Styling (Gradients & Glows)
                "bg-gradient-to-r from-background/80 via-background/50 to-background/80",
                "shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:shadow-[0_0_25px_rgba(var(--primary-rgb),0.2)]",
                "hover:border-primary/30 hover:bg-background/90",
                "transition-all duration-300 group cursor-pointer overflow-hidden",
                className
            )}
        >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0 pointer-events-none" />

            {/* Icon Container with subtle glow */}
            <div className="relative z-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-primary/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <Github className="w-3.5 h-3.5 md:w-5 md:h-5 text-foreground group-hover:text-primary transition-colors relative z-10" />

                {/* Animated Star */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.5, type: "spring" }}
                    className="absolute -top-1 -right-1 md:-top-1.5 md:-right-1.5"
                >
                    <Star className="w-2 h-2 md:w-2.5 md:h-2.5 fill-yellow-400 text-yellow-400 animate-pulse drop-shadow-[0_0_2px_rgba(250,204,21,0.5)]" />
                </motion.div>
            </div>

            <span className="relative z-10 text-foreground/80 group-hover:text-foreground group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all">
                Star us on GitHub
            </span>
        </motion.a>
    );
};
