import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/Footer';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  FileCode2,
  Shield,
  Rocket,
  Star,
  Zap,
  BookOpen,
  MessageSquare,
  User,
  ExternalLink,
  Github,
  Sparkles,
  Bell,
  Sun,
  Moon,
  MoreHorizontal,
  HelpCircle,
  Mail,
  MessageCircle,
  Wand2,
  BrainCircuit,
  Languages,
  CheckCheck,
  Type,
  Coffee,
  ArrowRight,
  Quote,
  CheckCircle2,
  MonitorPlay,
  Network,
  Loader2,
  PartyPopper
} from 'lucide-react';
import { toast } from 'sonner';
import { Helmet } from "react-helmet-async";
import { GitHubStarCTA } from '@/components/GitHubStarCTA';

const About: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Newsletter Logic
  const [emailSub, setEmailSub] = useState('');
  const [loadingSub, setLoadingSub] = useState(false);
  const [submittedSub, setSubmittedSub] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailSub) return;
    setLoadingSub(true);
    try {
      const response = await fetch("https://formspree.io/f/xjggkakp", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailSub })
      });
      if (response.ok) {
        setSubmittedSub(true);
        toast.success("Welcome to the community!");
        setEmailSub('');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoadingSub(false);
    }
  };

  // Auto-slide testimonials
  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoPlay]);

  const handleDotClick = (index: number) => {
    setCurrentReviewIndex(index);
    setAutoPlay(false);
  };

  const testimonials = [
    {
      quote: "The new Mind Map view in v1.3.0 is a game-changer. I can visualize my ideas instantly!",
      author: "Sarah Jenkins",
      role: "Content Strategist",
      rating: 5,
      color: "blue"
    },
    {
      quote: "Finally, a Markdown editor that actually helps me write. The 'Continue Writing' tool is like having a co-author.",
      author: "Marcus Thorne",
      role: "Technical Writer",
      rating: 5,
      color: "purple"
    },
    {
      quote: "The AI Chat Assistant understands context perfectly. It's the smartest documentation tool I've ever used.",
      author: "Elena Rodriguez",
      role: "Software Architect",
      rating: 5,
      color: "emerald"
    }
  ];

  const magicTools = [
    { icon: <MonitorPlay size={20} />, name: "AI Presentation Mode", desc: "Turn markdown into a slide deck instantly with AI-assisted layout and smart splitting." },
    { icon: <Network size={20} />, name: "Mind Map View", desc: "Visualize your document structure as a dynamic map." },
    { icon: <Sparkles size={20} />, name: "Continue Writing", desc: "AI predicts and completes your next sentences seamlessly." },
    { icon: <CheckCheck size={20} />, name: "Fix Grammar", desc: "Instant professional-grade proofreading for your markdown." },
    { icon: <BrainCircuit size={20} />, name: "Improve Clarity", desc: "Simplifies complex sentences for better readability." },
    { icon: <Shield size={20} />, name: "Make Professional", desc: "Polishes your tone for business and formal documents." },
    { icon: <User size={20} />, name: "Make Casual", desc: "Adjusts tone to be more friendly and relaxed." },
    { icon: <Sparkles size={20} />, name: "Ask AI", desc: "Give custom instructions to transform your text however you want." },
  ];

  const email = "vasughanta660@gmail.com";
  const whatsappNumber = "9113808288";
  const prefilledMessage = encodeURIComponent("I would like to discuss a project with you.");
  const smallIconSize = 16;

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      <Helmet>
        <title>About Markdown Weaver v1.3.0 – AI-Powered Markdown Editor</title>
        <meta
          name="description"
          content="Experience the future of writing with Markdown Weaver v1.3.0. AI-powered tools, live preview, mind maps, and presentation mode."
        />
      </Helmet>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50 flex items-center gap-1 px-4 py-3">
        <div className="flex items-center gap-2 mr-3 flex-shrink-0 cursor-pointer" onClick={() => navigate('/')}>
          <div className="bg-primary p-1.5 rounded-lg">
            <FileCode2 size={18} className="text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base leading-none text-foreground">Markdown Weaver</span>
            <span className="text-[10px] font-medium text-primary leading-none mt-1">v1.3.0</span>
          </div>
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="p-2 hover:bg-accent rounded-full transition-colors" onClick={() => navigate('/notifications')}>
                <Bell size={smallIconSize} />
              </button>
            </TooltipTrigger>
            <TooltipContent>Notifications</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={toggleTheme} className="p-2 hover:bg-accent rounded-full transition-colors">
                {theme === 'dark' ? <Sun size={smallIconSize} /> : <Moon size={smallIconSize} />}
              </button>
            </TooltipTrigger>
            <TooltipContent>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</TooltipContent>
          </Tooltip>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 hover:bg-accent rounded-full transition-colors">
                <MoreHorizontal size={smallIconSize} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52 p-2">
              <DropdownMenuItem onClick={() => navigate('/dashboard')} className="rounded-md cursor-pointer">
                <FileCode2 size={14} className="mr-2" /> Back to Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/help')} className="rounded-md cursor-pointer">
                <HelpCircle size={14} className="mr-2" /> Help & Guide
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/privacy')} className="rounded-md cursor-pointer">
                <Shield size={14} className="mr-2" /> Privacy Policy
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-24 relative">
        {/* SKIVYX Brand Top */}
        <div className="text-center absolute top-20 left-1/2 -translate-x-1/2 z-0 w-full select-none pointer-events-none">
          <h1 className="text-[60px] md:text-[120px] font-black tracking-widest leading-none text-foreground/5 opacity-50 bg-gradient-to-b from-foreground to-transparent bg-clip-text text-transparent">SKIVYX</h1>
        </div>

        {/* Hero Section */}
        <section className="text-center space-y-6 pt-8 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest animate-fade-in relative z-10">
            <Sparkles size={12} />
            <span>Introducing Version 1.3.0</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-foreground leading-[1.1] relative z-10">
            Write Smarter with <br />
            <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Magic AI Intelligence
            </span>
          </h1>

          <div className="flex items-center justify-center gap-3 py-2 animate-fade-in delay-100 relative z-10">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-border" />
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">Built by developers, for developers</span>
            <div className="h-px w-12 bg-gradient-to-r from-border to-transparent" />
          </div>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed relative z-10">
            Markdown Weaver has evolved. We've combined the simplicity of markdown with the power of generative AI to help you create flawless documentation in record time.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 pt-4 relative z-10 px-4">
            <Button onClick={() => navigate('/dashboard')} size="lg" className="w-full sm:w-auto rounded-full px-8 h-14 text-base font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
              Start Writing Free <ArrowRight className="ml-2" size={18} />
            </Button>
          </div>
        </section>

        {/* AI Features Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4 text-center lg:text-left">
              <h2 className="text-3xl font-bold flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <Wand2 className="text-primary hidden sm:block" />
                <span><Wand2 className="text-primary inline sm:hidden mr-2" />Magic AI Tools</span>
              </h2>
              <p className="text-muted-foreground">Transform your writing with one-click AI enhancements.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {magicTools.map((tool, i) => (
                <div key={i} className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    {tool.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-1">{tool.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tool.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Chat Assistant Card */}
          <div className="relative group overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-b from-primary/5 to-transparent p-8 flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-12 bg-primary/10 blur-[100px] rounded-full -mr-16 -mt-16" />
            <div className="relative z-10 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
                <MessageSquare size={28} />
              </div>
              <h3 className="text-2xl font-bold">AI Chat Assistant</h3>
              <p className="text-muted-foreground leading-relaxed">
                Your personal documentation expert. Ask questions about your content, request summaries, or brainstorm ideas directly within the editor.
              </p>
              <ul className="space-y-3 pt-4">
                {['Context-aware responses', 'Instant summaries', 'Idea brainstorming'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm font-medium">
                    <CheckCircle2 size={16} className="text-primary" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative z-10 mt-8 p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 italic text-xs text-muted-foreground">
              "Hey AI, can you summarize the key points of this technical spec?"
            </div>
          </div>
        </section>

        {/* Developer Info Card (PRESERVED) */}
        <section className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">The Minds Behind the Code</h2>
            <p className="text-lg text-muted-foreground">Crafted with passion by independent developers.</p>
          </div>

          {/* Developer Info Card */}
          <div className="bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 border border-border rounded-2xl p-8 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="text-center sm:text-left">
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-3">Built By</p>
                <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3 mb-2">
                  <div className="w-16 h-16 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mb-2 sm:mb-0">
                    <User size={20} className="text-white" />
                  </div>
                  <div>
                    <a
                      href="http://vasughanta.netlify.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-foreground hover:text-primary transition-colors flex items-center gap-2 text-lg"
                    >
                      Vasu Ghanta
                      <ExternalLink size={16} />
                    </a>
                    <p className="text-xs text-muted-foreground">Full-stack Developer</p>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-3">Designed For</p>
                <div className="flex justify-center gap-2">
                  <Sparkles size={20} className="text-primary" />
                  <div>
                    <p className="font-bold text-foreground">Developers</p>
                    <p className="text-xs text-muted-foreground">& Creators</p>
                  </div>
                </div>
              </div>
              <div className="text-center sm:text-right">
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-3">GitHub</p>
                <a
                  href="https://github.com/Vasu657"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
                >
                  <Github size={18} className="text-primary" />
                  <span className="font-medium text-sm">Open Source</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* COMBINED SECTION: Testimonials + CTA + Contact */}
        <section className="relative overflow-hidden rounded-[2.5rem] border border-border bg-card">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.05),transparent)] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border">
            {/* Left Side: Testimonials */}
            <div className="p-8 md:p-12 space-y-8">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                  <Star size={12} className="fill-current" />
                  <span>User Feedback</span>
                </div>
                <h3 className="text-3xl font-bold">What Authors Say</h3>
              </div>

              <div className="relative min-h-[200px] flex flex-col justify-center">
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <Quote size={40} className="text-primary/20 absolute -top-4 -left-4" />
                  <p className="text-xl font-medium italic leading-relaxed relative z-10">
                    "{testimonials[currentReviewIndex].quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary`}>
                      {testimonials[currentReviewIndex].author[0]}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{testimonials[currentReviewIndex].author}</p>
                      <p className="text-xs text-muted-foreground">{testimonials[currentReviewIndex].role}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-8">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handleDotClick(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${i === currentReviewIndex ? 'w-8 bg-primary' : 'w-2 bg-border hover:bg-primary/50'}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side: CTA & Contact */}
            <div className="p-8 md:p-12 bg-primary/[0.02] flex flex-col justify-center space-y-10">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold">Ready to start?</h3>
                <p className="text-muted-foreground">Join the community of developers building the future of documentation.</p>
                <div className="flex flex-col gap-4">
                  <Button onClick={() => navigate('/dashboard')} size="lg" className="w-full rounded-2xl h-14 font-bold shadow-lg">
                    Launch Editor <Rocket className="ml-2" size={18} />
                  </Button>
                  <a
                    href="https://github.com/Vasu657/markdown-weaver"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-border hover:bg-accent rounded-2xl transition-all font-bold"
                  >
                    <Star size={18} /> Star on GitHub
                  </a>
                </div>
              </div>

              <div className="pt-8 border-t border-border space-y-4">
                <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Get In Touch</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a
                    href={`mailto:${email}?subject=Project%20Discussion&body=${prefilledMessage}`}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-background border border-border hover:border-primary transition-all group"
                  >
                    <div className="p-2 bg-primary/10 rounded-xl text-primary group-hover:scale-110 transition-transform">
                      <Mail size={20} />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] text-muted-foreground font-bold uppercase">Email</p>
                      <p className="font-bold text-sm">Send Message</p>
                    </div>
                  </a>
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${prefilledMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-2xl bg-background border border-border hover:border-green-500 transition-all group"
                  >
                    <div className="p-2 bg-green-500/10 rounded-xl text-green-500 group-hover:scale-110 transition-transform">
                      <MessageCircle size={20} />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] text-muted-foreground font-bold uppercase">WhatsApp</p>
                      <p className="font-bold text-sm">Chat Now</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section - Creative "Floating Glass" Design */}
        <section className="relative py-20 px-6">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent blur-3xl -z-10" />

          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/80 to-foreground/50 animate-in fade-in slide-in-from-bottom-4 duration-500">
                Stay in the Loop
              </h2>
              <p className="text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
                Join the community building the future of documentation.
              </p>
            </div>

            <div className="relative w-full max-w-md mx-auto">
              {!submittedSub ? (
                <div className="group relative rounded-[2rem] p-2 bg-background/50 border border-border/50 shadow-2xl backdrop-blur-xl transition-all hover:border-primary/50 hover:shadow-primary/20 hover:scale-[1.02] duration-300">
                  <form onSubmit={handleSubscribe} className="flex items-center gap-1 p-1">
                    <div className="pl-3 text-muted-foreground/50 shrink-0">
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      value={emailSub}
                      onChange={(e) => setEmailSub(e.target.value)}
                      placeholder="Enter email..."
                      required
                      className="flex-1 bg-transparent border-none text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0 py-3 px-2 text-sm md:text-base min-w-0"
                    />
                    <Button
                      type="submit"
                      disabled={loadingSub}
                      size="icon"
                      className="shrink-0 rounded-full w-10 h-10 md:w-auto md:h-auto md:px-6 md:py-6 font-bold shadow-lg transition-all bg-foreground text-background hover:bg-primary hover:text-primary-foreground"
                    >
                      {loadingSub ? (
                        <Loader2 className="animate-spin w-5 h-5" />
                      ) : (
                        <>
                          <span className="hidden md:inline mr-2">Subscribe</span>
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              ) : (
                <div className="max-w-md mx-auto p-4 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 flex items-center justify-center gap-3 animate-in fade-in zoom-in duration-300 backdrop-blur-md">
                  <PartyPopper size={24} className="animate-bounce" />
                  <span className="font-bold text-lg">Welcome aboard! Refreshing...</span>
                </div>
              )}

              {/* Decorative background glow for the input */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
            </div>
          </div>
        </section>

        <Footer showBackToEditor={true} showAbout={false} showHelp={true} showPrivacy={true} />

        {/* SKIVYX Brand Bottom */}
        <div className="flex justify-center pb-8 opacity-20 hover:opacity-100 transition-opacity">
          <span className="text-[24px] md:text-[40px] font-black tracking-[0.3em] md:tracking-[0.5em] text-foreground uppercase select-none">SKIVYX</span>
        </div>
      </main>
      <GitHubStarCTA />
    </div>
  );
};

export default About;
