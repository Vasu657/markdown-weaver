import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Check, Loader2, PartyPopper } from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

import { CONFIG } from '@/lib/config';

const SCRIPT_URL = CONFIG.FORMSPREE_URL;

export const SubscribePopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [alreadySubscribed, setAlreadySubscribed] = useState(false);

    useEffect(() => {
        // Check local storage state
        const status = localStorage.getItem('markdown_weaver_subscribe_popup');

        if (status === 'subscribed') {
            setAlreadySubscribed(true);
            return;
        }

        if (status === 'dismissed') {
            return;
        }

        // Show popup after 2 seconds
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleDismiss = () => {
        setIsOpen(false);
        localStorage.setItem('markdown_weaver_subscribe_popup', 'dismissed');
    };

    const fireConfetti = () => {
        const count = 200;
        const defaults = {
            origin: { y: 0.7 }
        };

        function fire(particleRatio: number, opts: confetti.Options) {
            confetti({
                ...defaults,
                ...opts,
                particleCount: Math.floor(count * particleRatio)
            });
        }

        fire(0.25, { spread: 26, startVelocity: 55 });
        fire(0.2, { spread: 60 });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
        fire(0.1, { spread: 120, startVelocity: 45 });
    };

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);

        try {
            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                body: JSON.stringify({ email }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setSubmitted(true);
            localStorage.setItem('markdown_weaver_subscribe_popup', 'subscribed');
            fireConfetti();
            toast.success("Welcome to the community!");

            setTimeout(() => {
                setIsOpen(false);
            }, 4500);

        } catch (error) {
            console.error('Error subscribing:', error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (alreadySubscribed && !isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, x: -50, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -50, y: 20, scale: 0.9 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    className="fixed bottom-4 left-4 right-4 z-50 mx-auto w-auto max-w-[90vw] sm:bottom-6 sm:left-6 sm:right-auto sm:mx-0 sm:w-full sm:max-w-md"
                >
                    {/* Glass Container */}
                    <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/90 p-6 shadow-2xl backdrop-blur-xl dark:bg-black/90 dark:border-white/10">

                        {/* Decorative Elements */}
                        <div className="absolute -top-32 -left-32 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

                        {/* Top Bar for Close Button */}
                        <div className="absolute right-3 top-3 z-20">
                            <button
                                onClick={handleDismiss}
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-foreground/60 transition-colors hover:bg-black/10 hover:text-foreground dark:bg-white/10 dark:hover:bg-white/20"
                                aria-label="Close"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="relative z-10 flex flex-col items-center text-center sm:block sm:text-left">
                            {/* Icon & Header Container */}
                            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg text-white">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <div className="mt-1 sm:mt-0 sm:pr-8">
                                    <h3 className="text-xl font-bold leading-tight text-foreground">
                                        Join the Newsletter
                                    </h3>
                                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                                        Get weekly updates, tips, and free markdown resources.
                                    </p>
                                </div>
                            </div>

                            {/* Form or Success State */}
                            <div className="mt-6 w-full">
                                {!submitted ? (
                                    <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email address"
                                            required
                                            className="w-full rounded-xl border border-border/50 bg-background/50 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
                                        />
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 font-semibold text-white shadow-lg transition-all hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 text-sm"
                                        >
                                            <span className="flex items-center justify-center gap-2">
                                                {loading ? (
                                                    <>
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                        Subscribing...
                                                    </>
                                                ) : (
                                                    "Subscribe Free"
                                                )}
                                            </span>
                                        </button>
                                        <p className="text-center text-[10px] text-muted-foreground/80">
                                            No spam, cancel anytime.
                                        </p>
                                    </form>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex flex-col items-center justify-center rounded-xl bg-green-500/10 p-5 border border-green-500/20"
                                    >
                                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white shadow-sm">
                                            <PartyPopper className="h-5 w-5" />
                                        </div>
                                        <h4 className="font-semibold text-green-700 dark:text-green-300">
                                            You're on the list!
                                        </h4>
                                        <p className="text-xs text-green-600/80 dark:text-green-400/80 mt-1">
                                            Watch your inbox for updates.
                                        </p>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};