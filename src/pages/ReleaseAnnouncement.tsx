import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, Clock, Hammer, Bot, Cpu, Lock, Check, ChevronRight, Zap, Code, Shield, MessageSquare, X, Terminal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ReleaseAnnouncement = () => {
    const navigate = useNavigate();
    const { scrollYProgress } = useScroll();
    const [activeTab, setActiveTab] = useState("all");

    // Hero Parallax
    const yHero = useTransform(scrollYProgress, [0, 0.5], [0, 150]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-purple-500/30 overflow-x-hidden">

            {/* Dynamic Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-900/10 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-indigo-900/10 rounded-full blur-[100px] animate-pulse delay-1000" />
                <div className="absolute top-[40%] left-[20%] w-[20vw] h-[20vw] bg-blue-900/10 rounded-full blur-[80px]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4 flex justify-between items-center max-w-7xl mx-auto w-full backdrop-blur-md bg-black/40 border-b border-white/5">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-white/40 hidden sm:block">v1.2.0 STABLE</span>
                    <Button
                        variant="outline"
                        size="sm"
                        className="bg-white/5 border-white/10 hover:bg-white/10 hover:text-white text-gray-300 rounded-full pl-2 pr-4"
                        onClick={() => navigate('/')}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Editor
                    </Button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 pt-24 md:pt-20">
                <motion.div style={{ y: yHero, opacity: opacityHero }} className="space-y-6 md:space-y-8 max-w-5xl mx-auto z-10 relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-xs font-medium tracking-wider text-gray-300 uppercase">System Upgrade: Complete</span>
                    </motion.div>

                    <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.95] md:leading-[0.9]">
                        <span className="block text-white mb-2">INTELLIGENCE</span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400">
                            UNLEASHED
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                        Markdown Weaver v1.2.0 is not just an update. <br className="hidden md:block" />
                        It's a new way of thinking alongside your editor.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                        <Button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="h-12 px-8 rounded-full bg-white text-black hover:bg-gray-200 text-lg font-bold">
                            Explore Features
                        </Button>
                        <Button onClick={() => navigate('/')} variant="outline" className="h-12 px-8 rounded-full border-white/20 hover:bg-white/10 bg-transparent text-lg text-white">
                            Launch Editor
                        </Button>
                    </div>
                </motion.div>

                {/* Decor elements */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent z-20 pointer-events-none" />
            </section>

            {/* Live Demo Section */}
            <section id="features" className="py-20 md:py-32 px-4 relative z-10">
                <div className="max-w-7xl mx-auto space-y-32">

                    {/* Feature 1: Thinking Autocomplete */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-6"
                        >
                            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                                <Zap className="w-6 h-6 text-purple-400" />
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Thoughts, Completed.</h2>
                            <p className="text-lg text-gray-400 leading-relaxed">
                                Our new lightweight language model runs directly in the browser. It learns your style and suggests context-aware completions instantly, without latency.
                            </p>
                            <ul className="space-y-3 pt-4">
                                {['Zero Server Latency', 'Context Aware', 'GDPR Compliant'].map((item) => (
                                    <li key={item} className="flex items-center gap-3 text-sm font-medium text-gray-300">
                                        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                                            <Check className="w-3 h-3 text-green-400" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-30" />
                            <Card className="bg-[#0f0f11] border-white/10 relative overflow-hidden h-[400px]">
                                <CardContent className="p-0 font-mono text-sm h-full flex flex-col">
                                    <div className="flex items-center px-4 py-2 border-b border-white/5 bg-white/5">
                                        <div className="flex gap-1.5">
                                            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                                            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                                            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                                        </div>
                                        <div className="ml-4 text-xs text-gray-500">draft.md</div>
                                    </div>
                                    <div className="p-6 text-gray-300 h-full relative">
                                        <TypewriterEffect text="The importance of documentation cannot be overstated. It serves as the bridge between " completion="technical complexity and user understanding." />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Feature 2: Magic Refactoring */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center lg:flex-row-reverse">
                        <div className="order-2 lg:order-1 relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl blur opacity-30" />
                            <RefactorDemo />
                        </div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-6 order-1 lg:order-2"
                        >
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                                <Cpu className="w-6 h-6 text-blue-400" />
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Code that Sparkles.</h2>
                            <p className="text-lg text-gray-400 leading-relaxed">
                                Not just for prose. Markdown Weaver understands code blocks. Optimize, comment, or explain complex functions with a single click.
                            </p>
                            <div className="flex flex-wrap gap-2 pt-2">
                                <Badge variant="secondary" className="bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 border-blue-500/20">Refactor</Badge>
                                <Badge variant="secondary" className="bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 border-blue-500/20">Explain</Badge>
                                <Badge variant="secondary" className="bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 border-blue-500/20">Optimize</Badge>
                            </div>
                        </motion.div>
                    </div>

                    {/* Feature 3: AI Chat */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-6"
                        >
                            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center border border-green-500/20">
                                <MessageSquare className="w-6 h-6 text-green-400" />
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Your New Co-Pilot.</h2>
                            <p className="text-lg text-gray-400 leading-relaxed">
                                Stuck on an idea? Need a quick summary? The new Chat Assistant is always one click away, aware of your entire document context.
                            </p>
                        </motion.div>

                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl blur opacity-30" />
                            <Card className="bg-[#0f0f11] border-white/10 relative overflow-hidden h-[450px] flex flex-col">
                                <div className="p-4 border-b border-white/5 flex items-center justify-between">
                                    <span className="text-sm font-bold flex items-center gap-2"><Bot className="w-4 h-4 text-green-400" /> AI Assistant</span>
                                    <X className="w-4 h-4 text-gray-500" />
                                </div>
                                <div className="flex-1 p-4 space-y-4 overflow-hidden">
                                    <div className="bg-white/5 rounded-lg rounded-tl-none p-3 max-w-[85%] text-sm text-gray-300">
                                        Ready to help! I've analyzed your document. It seems to be a technical specification. Would you like me to generate a table of contents?
                                    </div>
                                    <div className="bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-lg rounded-tr-none p-3 max-w-[85%] text-sm text-white ml-auto">
                                        Yes please, and summarize the 'Security' section.
                                    </div>
                                    <div className="bg-white/5 rounded-lg rounded-tl-none p-3 max-w-[85%] text-sm text-gray-300">
                                        <p className="mb-2 font-bold text-xs text-gray-400 uppercase">Generating...</p>
                                        <div className="space-y-2">
                                            <div className="h-2 bg-white/10 rounded w-full animate-pulse" />
                                            <div className="h-2 bg-white/10 rounded w-3/4 animate-pulse delay-75" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 border-t border-white/5">
                                    <div className="bg-black/50 border border-white/10 rounded-full h-10 px-4 flex items-center text-xs text-gray-500">
                                        Ask anything...
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats / Numbers */}
            <section className="py-20 border-y border-white/5 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { label: "Faster Inference", value: "10x", icon: Zap },
                        { label: "New AI Tools", value: "6+", icon: Hammer },
                        { label: "Community Users", value: "5k+", icon: MessageSquare },
                        { label: "Privacy Score", value: "100%", icon: Shield },
                    ].map((stat, i) => (
                        <div key={i} className="space-y-2">
                            <stat.icon className="w-6 h-6 mx-auto text-gray-500 mb-4" />
                            <div className="text-4xl md:text-5xl font-black text-white">{stat.value}</div>
                            <div className="text-sm text-gray-400 uppercase tracking-widest font-bold">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 px-4 text-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full pointer-events-none" />

                <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                    <h2 className="text-4xl md:text-5xl font-bold">Ready to Upgrade?</h2>
                    <p className="text-xl text-gray-400">
                        Join the future of documentation today. It's free, open-source, and privacy-focused.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            onClick={() => navigate('/')}
                            className="h-14 px-8 rounded-full bg-white text-black hover:bg-gray-200 text-lg font-bold shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] transition-shadow"
                        >
                            Open Editor <ChevronRight className="w-5 h-5 ml-2" />
                        </Button>
                    </div>
                    <p className="text-sm text-gray-600 pt-8">
                        Requires no account. Privacy guaranteed.
                    </p>
                </div>
            </section>

        </div>
    );
};

// --- Sub-components for demos ---

const TypewriterEffect = ({ text, completion }: { text: string, completion: string }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [isThinking, setIsThinking] = useState(false);
    const [showCompletion, setShowCompletion] = useState(false);

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                setDisplayedText(text.substring(0, i + 1));
                i++;
            } else {
                clearInterval(interval);
                setIsThinking(true);
                setTimeout(() => {
                    setIsThinking(false);
                    setShowCompletion(true);
                }, 1500);
            }
        }, 50);
        return () => clearInterval(interval);
    }, [text]);

    return (
        <div className="font-mono text-base md:text-lg leading-relaxed">
            {displayedText}
            {isThinking && (
                <span className="inline-block w-2 h-4 bg-purple-500 animate-pulse ml-1 align-middle" />
            )}
            {showCompletion && (
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-gray-500"
                >
                    {completion}
                </motion.span>
            )}
        </div>
    );
};

const RefactorDemo = () => {
    const [view, setView] = useState<'before' | 'after'>('before');

    const codeBefore = `function calc(a,b) {
  // do math
  let r = a + b * 2;
  return r;
}`;

    const codeAfter = `/**
 * Calculates a weighted sum.
 * @param {number} a - First value
 * @param {number} b - Second value (doubled)
 * @returns {number} The result
 */
function calculateWeightedSum(a, b) {
  const result = a + (b * 2);
  return result;
}`;

    return (
        <Card className="bg-[#0f0f11] border-white/10 h-[350px] relative">
            <div className="absolute top-4 right-4 z-20 bg-white/10 rounded p-1 flex gap-1">
                <button
                    onClick={() => setView('before')}
                    className={`px-3 py-1 rounded text-xs font-medium transition-colors ${view === 'before' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
                >
                    Before
                </button>
                <button
                    onClick={() => setView('after')}
                    className={`px-3 py-1 rounded text-xs font-medium transition-colors ${view === 'after' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                    After AI
                </button>
            </div>
            <CardContent className="p-6 font-mono text-sm overflow-auto h-full text-gray-300">
                <AnimatePresence mode="wait">
                    <motion.pre
                        key={view}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <code>
                            {view === 'before' ? codeBefore : codeAfter}
                        </code>
                    </motion.pre>
                </AnimatePresence>
            </CardContent>
        </Card>
    );
}

export default ReleaseAnnouncement;
