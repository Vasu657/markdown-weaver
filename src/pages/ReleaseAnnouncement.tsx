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

            {/* Background Gradients - Subtle & Responsive */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[5%] left-[10%] w-[70vw] h-[70vw] md:w-[500px] md:h-[500px] bg-purple-900/10 rounded-full blur-[80px] md:blur-[100px]" />
                <div className="absolute bottom-[5%] right-[10%] w-[80vw] h-[80vw] md:w-[600px] md:h-[600px] bg-blue-900/10 rounded-full blur-[80px] md:blur-[120px]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay"></div>
            </div>

            {/* Nav */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4 md:py-8 flex justify-between items-center max-w-7xl mx-auto w-full backdrop-blur-sm bg-black/50 border-b border-white/5">
                <div className="flex items-center gap-2">
                    <img src="/favicon.svg" alt="Logo" className="w-6 h-6 md:w-8 md:h-8" />
                    <span className="font-bold text-base md:text-lg tracking-wide text-gray-200">Markdown Weaver <span className="text-purple-500">Labs</span></span>
                </div>
                <Button
                    variant="ghost"
                    className="text-gray-400 hover:text-white hover:bg-white/10 px-2 md:px-4"
                    onClick={() => navigate('/')}
                >
                    <ArrowLeft className="w-4 h-4 md:mr-2" />
                    <span className="hidden md:inline">Back to Editor</span>
                </Button>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 md:pt-40 pb-20 md:pb-32 px-4 md:px-6 flex flex-col items-center text-center z-10 max-w-4xl mx-auto">
                <motion.div style={{ opacity }} className="flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/20 border border-purple-500/30 mb-6 md:mb-8"
                    >
                        <Clock className="w-3.5 h-3.5 text-purple-400" />
                        <span className="text-xs md:text-sm font-medium text-purple-300 uppercase tracking-widest">Coming Soon</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 md:mb-8 text-white"
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
                        className="text-lg md:text-xl lg:text-2xl text-gray-400 max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed font-light px-2"
                    >
                        Artificial Intelligence is coming to Markdown Weaver. <br className="hidden md:block" />
                        Enhance, summarize, and create without limits.
                    </motion.p>
                </motion.div>
            </section>

            {/* The Roadmap / Features */}
            <section className="py-16 md:py-24 px-4 md:px-6 relative z-10 bg-zinc-950/50 border-y border-white/5">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12 md:mb-20">
                        <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Under Construction</h2>
                        <p className="text-gray-500 text-sm md:text-base">Here is a sneak peek at what our team is working on right now.</p>
                    </div>

                    <div className="flex flex-col md:grid md:grid-cols-2 gap-0 md:gap-24">

                        {/* Feature Preview 1 */}
                        <RoadmapItem
                            icon={<Sparkles className="w-12 h-12 md:w-8 md:h-8 text-yellow-400" />}
                            title="Smart Autocomplete"
                            description="Imagine an editor that finishes your sentences. We are training a lightweight model to suggest context-aware continuations as you type."
                            status="Development"
                            index={0}
                        />

                        {/* Feature Preview 2 */}
                        <RoadmapItem
                            icon={<Cpu className="w-12 h-12 md:w-8 md:h-8 text-blue-400" />}
                            title="Intelligent Refactoring"
                            description="One-click to rewrite clarity, change tone, or fix grammar. It's like having a pro editor sitting next to you."
                            status="Research"
                            index={1}
                        />

                        {/* Feature Preview 3 */}
                        <RoadmapItem
                            icon={<Bot className="w-12 h-12 md:w-8 md:h-8 text-green-400" />}
                            title="Chat Assistant"
                            description="A sidebar companion that can answer questions about your document, generate ideas, or even write code snippets."
                            status="Design"
                            index={2}
                        />

                        {/* Feature Preview 4 */}
                        <RoadmapItem
                            icon={<Lock className="w-12 h-12 md:w-8 md:h-8 text-red-400" />}
                            title="Privacy First AI"
                            description="We are ensuring that all AI features run locally or via encrypted channels. Your data will never train public models."
                            status="Testing"
                            index={3}
                        />

                    </div>
                </div>
            </section>

            {/* Newsletter / CTA */}
            <section className="py-24 md:py-40 px-4 md:px-6 text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="max-w-xl mx-auto"
                >
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Stay Tuned</h3>
                    <p className="text-gray-400 mb-8 text-sm md:text-base">
                        We will be rolling out these features in the coming weeks. Keep your version updated!
                    </p>
                    <div className="flex justify-center">
                        <Button
                            className="rounded-full px-6 py-4 md:px-8 md:py-6 text-base md:text-lg bg-white text-black hover:bg-zinc-200 transition-colors border-none font-semibold h-auto"
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

const RoadmapItem = ({ icon, title, description, status, index }: any) => {
    const ref = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Parallax effects for mobile
    const yIcon = useTransform(scrollYProgress, [0.2, 0.8], [50, -50]);
    const yText = useTransform(scrollYProgress, [0.3, 0.7], [20, -20]);
    const opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);

    // Check if mobile (using css media query approach via simple class switching, but for framer values we use the same hooks. 
    // Ideally we'd conditionally apply the transform styles, but applying them on desktop might be okay or we can disable via media query styles if needed.
    // For simplicity, we'll apply the motion styles mainly designed for the full-screen view.

    return (
        <motion.div
            ref={ref}
            style={{ opacity }}
            className="group min-h-[80vh] md:min-h-0 flex flex-col md:block justify-center items-center md:items-start text-center md:text-left snap-center sticky top-0 md:static p-6 md:p-0"
        >
            <motion.div
                style={{ y: yIcon }}
                className="flex-shrink-0 p-6 md:p-4 rounded-3xl md:rounded-2xl bg-white/5 border border-white/10 mb-8 md:mb-0 md:mr-6 inline-block md:float-left relative z-10"
            >
                {icon}
            </motion.div>

            <motion.div style={{ y: yText }} className="relative z-10">
                <div className="flex flex-col md:flex-row items-center md:items-center gap-3 md:gap-3 mb-4 md:mb-2">
                    <h3 className="text-3xl md:text-xl font-bold text-gray-200">{title}</h3>
                    <span className="text-xs md:text-[10px] uppercase font-bold tracking-wider px-3 py-1 md:px-2 md:py-0.5 rounded-full md:rounded bg-white/10 text-gray-400 border border-white/5 md:border-none">{status}</span>
                </div>
                <p className="text-gray-400 md:text-gray-500 leading-relaxed text-xl md:text-lg max-w-sm md:max-w-none mx-auto md:mx-0">
                    {description}
                </p>
            </motion.div>

            {/* Mobile-only background accent for "one window" feel */}
            <div className={`absolute inset-0 -z-0 opacity-20 md:hidden bg-gradient-to-b ${index % 2 === 0 ? 'from-purple-900/0 via-purple-900/30 to-purple-900/0' : 'from-blue-900/0 via-blue-900/30 to-blue-900/0'
                }`} />
        </motion.div>
    );
}

export default ReleaseAnnouncement;
