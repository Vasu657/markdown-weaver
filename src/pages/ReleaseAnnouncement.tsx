import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Sparkles, Clock, Hammer, Bot, Cpu, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ReleaseAnnouncement = () => {
    const navigate = useNavigate();
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-900/50 overflow-x-hidden">

            {/* Background Gradients - Subtle */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[10%] right-[20%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay"></div>
            </div>

            {/* Nav */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 md:py-8 flex justify-between items-center max-w-7xl mx-auto w-full backdrop-blur-sm bg-black/50 border-b border-white/5">
                <div className="flex items-center gap-2">
                    <img src="/favicon.svg" alt="Logo" className="w-8 h-8" />
                    <span className="font-bold text-lg tracking-wide text-gray-200">Markdown Weaver <span className="text-purple-500">Labs</span></span>
                </div>
                <Button
                    variant="ghost"
                    className="text-gray-400 hover:text-white hover:bg-white/10"
                    onClick={() => navigate('/')}
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Editor
                </Button>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-40 pb-32 px-6 flex flex-col items-center text-center z-10 max-w-4xl mx-auto">
                <motion.div style={{ opacity }} className="flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/20 border border-purple-500/30 mb-8"
                    >
                        <Clock className="w-3.5 h-3.5 text-purple-400" />
                        <span className="text-sm font-medium text-purple-300 uppercase tracking-widest">Coming Soon</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 text-white"
                    >
                        We are building <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
                            The Next Era.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light"
                    >
                        Artificial Intelligence is coming to Markdown Weaver. <br />
                        Enhance, summarize, and create without limits.
                    </motion.p>
                </motion.div>
            </section>

            {/* The Roadmap / Features */}
            <section className="py-24 px-6 relative z-10 bg-zinc-950/50 border-y border-white/5">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl font-bold mb-4">Under Construction</h2>
                        <p className="text-gray-500">Here is a sneak peek at what our team is working on right now.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">

                        {/* Feature Preview 1 */}
                        <RoadmapItem
                            icon={<Sparkles className="w-8 h-8 text-yellow-400" />}
                            title="Smart Autocomplete"
                            description="Imagine an editor that finishes your sentences. We are training a lightweight model to suggest context-aware continuations as you type."
                            status="Development"
                            delay={0.2}
                        />

                        {/* Feature Preview 2 */}
                        <RoadmapItem
                            icon={<Cpu className="w-8 h-8 text-blue-400" />}
                            title="Intelligent Refactoring"
                            description="One-click to rewrite clarity, change tone, or fix grammar. It's like having a pro editor sitting next to you."
                            status="Research"
                            delay={0.4}
                        />

                        {/* Feature Preview 3 */}
                        <RoadmapItem
                            icon={<Bot className="w-8 h-8 text-green-400" />}
                            title="Chat Assistant"
                            description="A sidebar companion that can answer questions about your document, generate ideas, or even write code snippets."
                            status="Design"
                            delay={0.6}
                        />

                        {/* Feature Preview 4 */}
                        <RoadmapItem
                            icon={<Lock className="w-8 h-8 text-red-400" />}
                            title="Privacy First AI"
                            description="We are ensuring that all AI features run locally or via encrypted channels. Your data will never train public models."
                            status="Testing"
                            delay={0.8}
                        />

                    </div>
                </div>
            </section>

            {/* Newsletter / CTA */}
            <section className="py-40 px-6 text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="max-w-xl mx-auto"
                >
                    <h3 className="text-3xl font-bold mb-6">Stay Tuned</h3>
                    <p className="text-gray-400 mb-8">
                        We will be rolling out these features in the coming weeks. Keep your version updated!
                    </p>
                    <div className="flex justify-center">
                        <Button
                            className="rounded-full px-8 py-6 text-lg bg-white text-black hover:bg-zinc-200 transition-colors border-none font-semibold"
                            onClick={() => navigate('/')}
                        >
                            Return to Editor
                        </Button>
                    </div>
                </motion.div>
            </section>

        </div>
    );
};

const RoadmapItem = ({ icon, title, description, status, delay }: any) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.6 }}
            className="flex gap-6 items-start"
        >
            <div className="flex-shrink-0 p-4 rounded-2xl bg-white/5 border border-white/10">
                {icon}
            </div>
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-200">{title}</h3>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/10 text-gray-400">{status}</span>
                </div>
                <p className="text-gray-500 leading-relaxed text-lg">
                    {description}
                </p>
            </div>
        </motion.div>
    );
}

export default ReleaseAnnouncement;
