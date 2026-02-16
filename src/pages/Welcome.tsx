import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProjectCount } from '@/lib/file_storage';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate, type MotionValue } from 'framer-motion';
import {
    Sparkles,
    LayoutGrid,
    Sun,
    Moon,
    ArrowRight,
    Zap,
    Play,
    Star,
    ChevronRight,
    Bot,
    Share2,
    ShieldCheck,
    Palette
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';
import { GitHubStarCTA } from '@/components/GitHubStarCTA';

export default function Welcome() {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = ({ clientX, clientY }: React.MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        mouseX.set(clientX / innerWidth);
        mouseY.set(clientY / innerHeight);
    };

    useEffect(() => {
        const checkExistingUser = async () => {
            const count = await getProjectCount();
            if (count > 0) {
                navigate('/dashboard', { replace: true });
            }
        };
        checkExistingUser();
    }, [navigate]);

    return (
        <div
            className="min-h-screen bg-background relative selection:bg-primary/30 font-sans overflow-x-hidden"
            onMouseMove={handleMouseMove}
        >
            <InteractiveBackground mouseX={mouseX} mouseY={mouseY} />
            <Navbar theme={theme} toggleTheme={toggleTheme} navigate={navigate} />

            <main className="relative z-10 pt-32 pb-20 px-6 container mx-auto max-w-7xl">
                <HeroSection navigate={navigate} />
                <BentoGridSection />

                {/* Minimal Bottom Links */}
                {/* Minimal Bottom Links */}
                <div className="mt-24 mb-16 flex flex-col items-center gap-8">
                    <span className="text-8xl md:text-9xl font-black tracking-tighter text-foreground drop-shadow-[0_4px_25px_rgba(255,255,255,0.2)] dark:drop-shadow-[0_4px_25px_rgba(255,255,255,0.1)] select-none opacity-90 scale-y-110">
                        SKIVYX
                    </span>
                    <div className="flex gap-8 text-sm font-medium text-muted-foreground/60">
                        <a onClick={() => navigate('/privacy')} className="hover:text-primary transition-colors cursor-pointer hover:underline underline-offset-4">Privacy</a>
                        <a onClick={() => navigate('/help')} className="hover:text-primary transition-colors cursor-pointer hover:underline underline-offset-4">Help</a>
                    </div>
                </div>
            </main>

            {/* Huge Vertical Brand Watermark */}
            {/* Background elements are handled by InteractiveBackground */}
            <GitHubStarCTA />
        </div>
    );
}

// --- Components ---

const Navbar = ({ theme, toggleTheme, navigate }: any) => (
    <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 inset-x-0 z-50 h-20 flex items-center justify-between px-6 md:px-12 backdrop-blur-md bg-background/60 border-b border-white/5 supports-[backdrop-filter]:bg-background/20"
    >
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
            <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full group-hover:bg-primary/40 transition-all" />
                <Sparkles className="w-6 h-6 text-primary relative z-10" />
            </div>
            <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 group-hover:to-primary transition-all duration-500">
                Markdown Weaver
            </span>
        </div>

        <div className="flex items-center gap-2 md:gap-6">
            <Button variant="ghost" className="hidden md:flex text-muted-foreground hover:text-foreground" onClick={() => navigate('/announcements/v1.3.0')}>
                What's New
            </Button>
            <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full hover:bg-white/10"
            >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
                onClick={() => navigate('/dashboard')}
                className="hidden md:flex rounded-full px-6 bg-foreground text-background hover:bg-foreground/90 font-semibold"
            >
                Launch App
            </Button>
        </div>
    </motion.nav>
);

const HeroSection = ({ navigate }: any) => {
    return (
        <section className="min-h-[70vh] flex flex-col items-center justify-center text-center mb-32 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative z-10"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8 hover:bg-white/10 transition-colors cursor-pointer" onClick={() => navigate('/announcements/v1.3.0')}>
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-sm font-medium text-muted-foreground">New features 1.3 is here</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground ml-1" />
                </div>

                <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 leading-[0.9]">
                    <span className="block text-foreground">Think It.</span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-pink-500 animate-gradient-x">
                        Weave It.
                    </span>
                </h1>

                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
                    The next-generation document editor that transforms your markdown into beautiful, interactive reality across any device.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button
                        size="lg"
                        onClick={() => navigate('/dashboard')}
                        className="h-16 px-12 rounded-full text-xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/20 hover:scale-105 transition-all duration-300"
                    >
                        Try Now <ChevronRight className="ml-2 w-6 h-6" />
                    </Button>
                </div>
            </motion.div>
        </section>
    );
};

const BentoGridSection = () => {
    return (
        <section className="max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="mb-16"
            >
                <h2 className="text-4xl md:text-6xl font-bold mb-6">Designed for <span className="text-primary italic">Flow</span></h2>
                <p className="text-xl text-muted-foreground max-w-xl">Every tool you need, exactly where you expect it to be.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[300px]">
                {/* Large Featured Card - AI */}
                <BentoCard
                    className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-primary/10 to-purple-500/10 border-primary/20"
                    title="AI Copilot"
                    description="Write faster with context-aware suggestions and instant refactoring."
                    icon={<Bot className="w-10 h-10 text-primary" />}
                >
                    <div className="absolute inset-0 z-0 overflow-hidden">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
                    </div>
                </BentoCard>

                {/* Medium Card - Mindmap */}
                <BentoCard
                    className="md:col-span-2 bg-blue-500/5 border-blue-500/10"
                    title="Live Mindmap"
                    description="Your thoughts, visualized instantly as you type."
                    icon={<LayoutGrid className="w-8 h-8 text-blue-400" />}
                />

                {/* Small Card - Presentation */}
                <BentoCard
                    className="bg-green-500/5 border-green-500/10"
                    title="Present"
                    description="One-click decks."
                    icon={<Play className="w-8 h-8 text-green-400" />}
                />

                {/* Small Card - Themes */}
                <BentoCard
                    className="bg-orange-500/5 border-orange-500/10"
                    title="Themes"
                    description="Beautiful presets."
                    icon={<Palette className="w-8 h-8 text-orange-400" />}
                />

                {/* Medium Card - Privacy */}
                <BentoCard
                    className="md:col-span-2 bg-red-500/5 border-red-500/10"
                    title="Local First"
                    description="Your data never leaves your device unless you want it to."
                    icon={<ShieldCheck className="w-8 h-8 text-red-400" />}
                />
            </div>
        </section>
    );
};

const BentoCard = ({ children, className, title, description, icon }: any) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className={cn(
                "relative flex flex-col justify-between p-8 rounded-3xl border bg-card/50 backdrop-blur-sm overflow-hidden group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500",
                className
            )}
        >
            <div className="relative z-10">
                <div className="mb-4 p-3 bg-background/50 w-fit rounded-2xl border border-white/5 shadow-sm group-hover:scale-110 transition-transform duration-500">
                    {icon}
                </div>
                <h3 className="text-2xl font-bold mb-2 text-card-foreground">{title}</h3>
                <p className="text-muted-foreground leading-relaxed">{description}</p>
            </div>
            {children}
            <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </motion.div>
    );
};

const InteractiveBackground = ({ mouseX, mouseY }: { mouseX: MotionValue<number>, mouseY: MotionValue<number> }) => {
    // Smooth out the mouse values
    const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    const x = useTransform(smoothX, [0, 1], ['0%', '100%']);
    const y = useTransform(smoothY, [0, 1], ['0%', '100%']);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Main Gradient Orb following mouse */}
            <motion.div
                style={{ left: x, top: y }}
                className="absolute w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 bg-primary/20 blur-[150px] rounded-full mix-blend-screen opacity-50"
            />

            {/* Secondary Orbs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[100px] rounded-full mix-blend-screen animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full mix-blend-screen" />

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        </div>
    );
};
