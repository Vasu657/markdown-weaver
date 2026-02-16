import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    Sparkles, ArrowLeft, Layout, MonitorPlay, Network, Wand2,
    FileText, Smartphone, RefreshCw, AlertTriangle, CheckCircle,
    Zap, Move, Trash2, Search, ArrowRight, Star, Plus, FolderOpen,
    ChevronRight, TrendingUp, Shield, Clock, Box, Package, Lightbulb
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from "@/components/ui/card";
import { GitHubStarCTA } from '@/components/GitHubStarCTA';

const ReleaseAnnouncement = () => {
    const navigate = useNavigate();
    const { scrollYProgress } = useScroll();

    const yHero = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-purple-500/30 overflow-x-hidden">
            {/* Dynamic Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-900/10 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-indigo-900/10 rounded-full blur-[100px] animate-pulse delay-1000" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4 flex justify-between items-center max-w-7xl mx-auto w-full backdrop-blur-md bg-black/40 border-b border-white/5">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/20">
                        <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold tracking-tight hidden sm:block">Markdown Weaver</span>
                </div>
                <div className="flex items-center gap-4">
                    <Badge variant="outline" className="border-green-500/30 text-green-400 bg-green-500/10 hidden sm:flex">v1.3.0</Badge>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-white hover:bg-white/10"
                        onClick={() => navigate('/dashboard')}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Dashboard
                    </Button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4 pt-24 pb-12">
                <motion.div style={{ y: yHero, opacity: opacityHero }} className="space-y-6 max-w-5xl mx-auto z-10 relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Badge className="px-5 py-2 text-sm bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500/30 text-purple-200 mb-6 backdrop-blur-md">
                            Version 1.3.0 Release Notes
                        </Badge>
                    </motion.div>

                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-tight">
                        <span className="block text-white mb-2 drop-shadow-2xl">What's New in</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 animate-gradient-x">
                            Markdown Weaver
                        </span>
                    </h1>

                    <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        A comprehensive overview of all new features, updates, improvements, and fixes introduced in version 1.3.0 compared to v1.2.x
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                        <Button
                            onClick={() => document.getElementById('new-features')?.scrollIntoView({ behavior: 'smooth' })}
                            className="h-12 px-8 rounded-full bg-white text-black hover:bg-gray-200 text-base font-bold shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all"
                        >
                            View Release Notes
                        </Button>
                        <Button
                            onClick={() => navigate('/dashboard')}
                            variant="outline"
                            className="h-12 px-8 rounded-full border-white/10 hover:bg-white/5 text-base"
                        >
                            Try It Now
                        </Button>
                    </div>
                </motion.div>
            </section>

            {/* Version Comparison */}
            <section className="py-16 px-4 relative z-10 max-w-7xl mx-auto">
                <motion.div {...fadeInUp} className="bg-gradient-to-r from-blue-900/10 to-purple-900/10 border border-white/10 rounded-2xl p-8 text-center">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                        <div className="text-gray-400">
                            <span className="text-sm block mb-1">Previous Version</span>
                            <span className="text-2xl font-bold text-white">v1.2.x</span>
                        </div>
                        <ChevronRight className="w-6 h-6 text-purple-400 rotate-90 md:rotate-0" />
                        <div className="text-green-400">
                            <span className="text-sm block mb-1">Current Version</span>
                            <span className="text-3xl font-bold">v1.3.0</span>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* NEW FEATURES Section */}
            <section id="new-features" className="py-20 px-4 relative z-10 max-w-7xl mx-auto">
                <motion.div {...fadeInUp} className="mb-16 text-center">
                    <Badge className="px-4 py-2 bg-purple-500/20 text-purple-300 border-purple-500/30 mb-4">
                        <Plus className="w-4 h-4 mr-2 inline" /> New Features
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Brand New Capabilities</h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Five major features introduced in this release to transform your markdown workflow
                    </p>
                </motion.div>

                <div className="space-y-20">
                    {/* Feature 1: Project Dashboard */}
                    <motion.div {...fadeInUp} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/30">
                                <Layout className="w-4 h-4 text-blue-400" />
                                <span className="text-sm font-medium text-blue-300">NEW</span>
                            </div>
                            <h3 className="text-3xl font-bold">Project Dashboard</h3>
                            <p className="text-lg text-gray-400 leading-relaxed">
                                A completely new centralized hub for managing all your markdown documents. The dashboard provides a bird's-eye view of all your projects with powerful organization tools.
                            </p>
                            <div className="space-y-3">
                                {[
                                    { icon: Search, text: "Real-time search across all projects by title or content" },
                                    { icon: Star, text: "Pin important projects to keep them at the top" },
                                    { icon: FolderOpen, text: "Organize projects with folders and categories" },
                                    { icon: Trash2, text: "Built-in trash system with restore functionality" },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3 text-gray-300">
                                        <div className="p-2 rounded-lg bg-blue-500/10 mt-0.5">
                                            <item.icon className="w-4 h-4 text-blue-400" />
                                        </div>
                                        <span className="leading-relaxed">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Card className="bg-[#0f0f11] border-white/10 h-[450px] flex items-center justify-center overflow-hidden relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                            <div className="absolute inset-0 bg-blue-500/5 grid grid-cols-3 gap-4 p-8 opacity-60">
                                <div className="col-span-1 bg-white/5 rounded-lg h-full animate-pulse" />
                                <div className="col-span-2 space-y-4">
                                    <div className="h-8 bg-white/5 rounded w-3/4" />
                                    <div className="grid grid-cols-2 gap-4">
                                        {[1, 2, 3, 4].map(n => (
                                            <div key={n} className="h-32 bg-white/5 rounded animate-pulse" style={{ animationDelay: `${n * 100}ms` }} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="z-10 bg-black/80 backdrop-blur px-6 py-3 rounded-full border border-white/10">
                                <Layout className="w-5 h-5 text-blue-400 inline mr-2" />
                                <span className="font-mono text-sm">Dashboard View</span>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Feature 2: AI-Powered Presentation Mode */}
                    <motion.div {...fadeInUp} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <Card className="bg-[#0f0f11] border-white/10 h-[450px] flex items-center justify-center overflow-hidden relative group order-2 lg:order-1">
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                            <MonitorPlay className="w-28 h-28 text-purple-500/50" />
                        </Card>
                        <div className="space-y-6 order-1 lg:order-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30">
                                <MonitorPlay className="w-4 h-4 text-purple-400" />
                                <span className="text-sm font-medium text-purple-300">NEW</span>
                            </div>
                            <h3 className="text-3xl font-bold">AI-Powered Presentation Mode</h3>
                            <p className="text-lg text-gray-400 leading-relaxed">
                                Transform your markdown documents into stunning slide presentations with two powerful options: manual control or intelligent AI generation.
                            </p>
                            <div className="grid gap-4">
                                <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Wand2 className="w-5 h-5 text-purple-400" />
                                        <h4 className="font-bold text-purple-300">AI Smart Generate</h4>
                                    </div>
                                    <p className="text-sm text-gray-400">
                                        Automatically analyze and structure your content into logical slides with AI-powered summarization and layout optimization
                                    </p>
                                </div>
                                <div className="p-4 rounded-xl bg-pink-500/5 border border-pink-500/20">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Box className="w-5 h-5 text-pink-400" />
                                        <h4 className="font-bold text-pink-300">Manual Mode</h4>
                                    </div>
                                    <p className="text-sm text-gray-400">
                                        Use <code className="px-1.5 py-0.5 rounded bg-black/40">---</code> separators for precise control over slide breaks and content flow
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Feature 3 & 4: Mind Maps and Templates (Grid) */}
                    <motion.div {...fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Mind Maps */}
                        <Card className="bg-gradient-to-br from-green-900/10 to-transparent border border-white/10 p-8 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Network className="w-40 h-40 text-green-500" />
                            </div>
                            <div className="relative z-10 space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/20 border border-green-500/30">
                                    <Network className="w-4 h-4 text-green-400" />
                                    <span className="text-sm font-medium text-green-300">NEW</span>
                                </div>
                                <h3 className="text-2xl font-bold">Interactive Mind Maps</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    Visualize your document structure with automatically generated mind maps. Perfect for brainstorming, exploring complex hierarchies, and understanding relationships between ideas.
                                </p>
                                <ul className="space-y-2 text-sm text-gray-400">
                                    <li className="flex items-center gap-2">
                                        <ChevronRight className="w-4 h-4 text-green-400" />
                                        Zoom and pan controls
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <ChevronRight className="w-4 h-4 text-green-400" />
                                        SVG export capability
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <ChevronRight className="w-4 h-4 text-green-400" />
                                        Auto-generated from headers
                                    </li>
                                </ul>
                            </div>
                        </Card>

                        {/* Templates */}
                        <Card className="bg-gradient-to-br from-amber-900/10 to-transparent border border-white/10 p-8 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <FileText className="w-40 h-40 text-amber-500" />
                            </div>
                            <div className="relative z-10 space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30">
                                    <FileText className="w-4 h-4 text-amber-400" />
                                    <span className="text-sm font-medium text-amber-300">NEW</span>
                                </div>
                                <h3 className="text-2xl font-bold">Document Templates</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    Kickstart your writing with professionally crafted templates. Choose from various pre-built templates to start your projects faster.
                                </p>
                                <ul className="space-y-2 text-sm text-gray-400">
                                    <li className="flex items-center gap-2">
                                        <ChevronRight className="w-4 h-4 text-amber-400" />
                                        Blog post templates
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <ChevronRight className="w-4 h-4 text-amber-400" />
                                        README documentation
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <ChevronRight className="w-4 h-4 text-amber-400" />
                                        Meeting notes format
                                    </li>
                                </ul>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Feature 5: Floating Magic Menu */}
                    <motion.div {...fadeInUp} className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
                        <div className="relative z-10 max-w-3xl mx-auto">
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 mb-4">
                                    <Wand2 className="w-4 h-4 text-purple-400" />
                                    <span className="text-sm font-medium text-purple-300">NEW</span>
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold mb-3">Floating Magic Menu</h3>
                                <p className="text-lg text-gray-400">
                                    Context-aware AI tools appear instantly when you select text in the editor
                                </p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {[
                                    { label: "Continue Writing", color: "blue" },
                                    { label: "Fix Grammar", color: "green" },
                                    { label: "Improve Clarity", color: "purple" },
                                    { label: "Make Professional", color: "indigo" },
                                    { label: "Make Casual", color: "pink" },
                                    { label: "Ask AI", color: "orange" }
                                ].map((item, i) => (
                                    <div key={i} className={`p-4 rounded-xl bg-${item.color}-500/5 border border-${item.color}-500/20 text-center hover:bg-${item.color}-500/10 transition-colors`}>
                                        <span className="text-sm font-medium text-white">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* UPDATED FEATURES & OPTIONS Section */}
            <section className="py-20 px-4 bg-white/[0.02] border-y border-white/5 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <motion.div {...fadeInUp} className="mb-16 text-center">
                        <Badge className="px-4 py-2 bg-blue-500/20 text-blue-300 border-blue-500/30 mb-4">
                            <TrendingUp className="w-4 h-4 mr-2 inline" /> Updated Features
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Enhanced Capabilities</h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Significant improvements to existing features
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                        {[
                            {
                                icon: Move,
                                title: "Drag & Drop File Import",
                                before: "No file import capability",
                                after: "Drag .md, .txt, or .markdown files directly into the editor for instant loading"
                            },
                            {
                                icon: RefreshCw,
                                title: "Cross-Tab Synchronization",
                                before: "Changes isolated per tab",
                                after: "Real-time synchronization across all open tabs - edits in one tab instantly reflect in others"
                            },
                            {
                                icon: Smartphone,
                                title: "Mobile User Experience",
                                before: "Basic mobile support",
                                after: "Fully optimized touch controls, responsive sidebar navigation, and improved gesture support"
                            },
                            {
                                icon: Package,
                                title: "Data Storage System",
                                before: "Simple localStorage",
                                after: "Enhanced project-based storage with automatic migration from legacy formats"
                            }
                        ].map((item, i) => (
                            <motion.div key={i} {...fadeInUp} className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-colors">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-xl bg-blue-500/10">
                                        <item.icon className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-lg mb-3">{item.title}</h4>
                                        <div className="space-y-2">
                                            <div className="text-sm">
                                                <span className="text-red-400 font-medium">Before: </span>
                                                <span className="text-gray-400">{item.before}</span>
                                            </div>
                                            <div className="text-sm">
                                                <span className="text-green-400 font-medium">After: </span>
                                                <span className="text-gray-300">{item.after}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* UI/UX CHANGES Section */}
            <section className="py-20 px-4 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <motion.div {...fadeInUp} className="mb-16 text-center">
                        <Badge className="px-4 py-2 bg-pink-500/20 text-pink-300 border-pink-500/30 mb-4">
                            <Lightbulb className="w-4 h-4 mr-2 inline" /> UI/UX Improvements
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Design Refinements</h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Visual and interaction improvements for a better experience
                        </p>
                    </motion.div>

                    <div className="max-w-4xl mx-auto space-y-4">
                        {[
                            "Redesigned navigation with improved accessibility and clarity",
                            "Enhanced card-based layout for the project dashboard with hover effects",
                            "Improved modal and dialog animations for smoother transitions",
                            "Better visual hierarchy with refined typography and spacing",
                            "Optimized loading states and skeleton screens for better perceived performance",
                            "Enhanced mobile sidebar with smooth slide-in animations",
                            "Refined color palette for better contrast and readability",
                            "Improved touch targets for mobile and tablet devices"
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                {...fadeInUp}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-pink-500/5 to-transparent border border-pink-500/10 hover:border-pink-500/20 transition-colors"
                            >
                                <CheckCircle className="w-5 h-5 text-pink-400 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-300">{item}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* BUG FIXES & PERFORMANCE Section */}
            <section className="py-20 px-4 bg-white/[0.02] border-y border-white/5 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <motion.div {...fadeInUp} className="mb-16 text-center">
                        <Badge className="px-4 py-2 bg-green-500/20 text-green-300 border-green-500/30 mb-4">
                            <Zap className="w-4 h-4 mr-2 inline" /> Fixes & Performance
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Quality & Reliability</h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Bug fixes and performance optimizations for a smoother experience
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {/* Bug Fixes */}
                        <motion.div {...fadeInUp}>
                            <div className="flex items-center gap-2 mb-6">
                                <Shield className="w-6 h-6 text-green-400" />
                                <h3 className="text-2xl font-bold">Bug Fixes</h3>
                            </div>
                            <div className="space-y-3">
                                {[
                                    "Fixed rendering crashes with robust error boundaries",
                                    "Resolved data loss issues during rapid typing",
                                    "Fixed synchronization conflicts in multi-tab scenarios",
                                    "Corrected export formatting issues for HTML and PDF",
                                    "Fixed mind map zoom controls on touch devices",
                                    "Resolved memory leaks in presentation mode",
                                    "Fixed inconsistent autosave behavior"
                                ].map((fix, i) => (
                                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-green-500/5 border border-green-500/10">
                                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm text-gray-300">{fix}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Performance Improvements */}
                        <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
                            <div className="flex items-center gap-2 mb-6">
                                <TrendingUp className="w-6 h-6 text-blue-400" />
                                <h3 className="text-2xl font-bold">Performance Improvements</h3>
                            </div>
                            <div className="space-y-3">
                                {[
                                    "Optimized rendering engine for faster preview updates",
                                    "Reduced initial load time by 40%",
                                    "Improved localStorage read/write performance",
                                    "Enhanced memory management for large documents",
                                    "Faster search indexing across all projects",
                                    "Optimized AI API calls with better caching",
                                    "Reduced bundle size with code splitting"
                                ].map((improvement, i) => (
                                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/5 border border-blue-500/10">
                                        <Zap className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm text-gray-300">{improvement}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* DEPRECATED/REMOVED Section */}
            <section className="py-20 px-4 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <motion.div {...fadeInUp} className="mb-12 text-center">
                        <Badge className="px-4 py-2 bg-orange-500/20 text-orange-300 border-orange-500/30 mb-4">
                            <AlertTriangle className="w-4 h-4 mr-2 inline" /> Removed & Deprecated
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">What's Changed</h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Functionality that has been removed or deprecated
                        </p>
                    </motion.div>

                    <div className="space-y-4">
                        {[
                            {
                                title: "Legacy localStorage Format",
                                description: "Old single-document storage has been replaced with the new project-based system. Data is automatically migrated on first load."
                            },
                            {
                                title: "Simple File List View",
                                description: "The basic file list has been replaced by the comprehensive Project Dashboard with enhanced organization features."
                            },
                            {
                                title: "Basic Presentation Mode",
                                description: "The simple slide generator has been replaced with AI-powered presentation mode with smart content analysis."
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                {...fadeInUp}
                                transition={{ delay: i * 0.05 }}
                                className="p-5 rounded-xl bg-orange-500/5 border border-orange-500/20"
                            >
                                <div className="flex items-start gap-3">
                                    <AlertTriangle className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-orange-300 mb-1">{item.title}</h4>
                                        <p className="text-sm text-gray-400">{item.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Migration Guide */}
            <section className="py-20 px-4 bg-white/[0.02] border-y border-white/5 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <motion.div {...fadeInUp} className="text-center">
                        <Clock className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                        <h3 className="text-3xl font-bold mb-4">Automatic Migration</h3>
                        <p className="text-lg text-gray-400 mb-6">
                            All your existing data will be automatically migrated to the new format when you open the app. No manual action required.
                        </p>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30">
                            <CheckCircle className="w-5 h-5 text-green-400" />
                            <span className="text-green-300 font-medium">Zero Data Loss Guaranteed</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="py-32 px-4 text-center relative z-10">
                <div className="max-w-3xl mx-auto space-y-8">
                    <motion.div {...fadeInUp}>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Experience v1.3.0?</h2>
                        <p className="text-xl text-gray-400 mb-8">
                            Start exploring all the new features and improvements today
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                onClick={() => navigate('/dashboard')}
                                className="h-14 px-8 rounded-full bg-white text-black hover:bg-gray-200 text-lg font-bold shadow-2xl hover:scale-105 transition-all"
                            >
                                Start Writing Now <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                            <Button
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                variant="outline"
                                className="h-14 px-8 rounded-full border-white/10 hover:bg-white/5 text-lg"
                            >
                                Back to Top
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            <GitHubStarCTA />
        </div>
    );
};

export default ReleaseAnnouncement;
