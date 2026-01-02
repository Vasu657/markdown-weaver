import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';
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
  Code,
  LayoutTemplate,
  Shield,
  Rocket,
  Users,
  GitBranch,
  Database,
  Cloud,
  Lock,
  Globe,
  Star,
  Award,
  Zap,
  Lightbulb,
  BookOpen,
  MessageSquare,
  Heart,
  User,
  ExternalLink,
  Github,
  Palette,
  Copy,
  Settings,
  Smartphone,
  Layers,
  CheckCircle2,
  TrendingUp,
  Feather,
  Sparkles,
  Terminal,
  Eye,
  Download,
  Clock,
  AlertCircle,
  Figma,
  ArrowRight,
  Flame,
  Smile,
  Quote,
  ChevronLeft,
  ChevronRight,
  Bell,
  Sun,
  Moon,
  MoreHorizontal,
  HelpCircle,
  ArrowLeft
} from 'lucide-react';

const About: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Auto-slide testimonials
  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [autoPlay]);

  const handleDotClick = (index: number) => {
    setCurrentReviewIndex(index);
    setAutoPlay(false);
  };

  const testimonials = [
    {
      quote: "This has become my go-to tool for all my documentation needs. The real-time preview and export options are game-changers!",
      author: "Alice Johnson",
      role: "Senior Frontend Developer",
      rating: 5,
      color: "blue"
    },
    {
      quote: "Finally, a Markdown editor that gets out of my way. Lightning fast and beautifully designed—perfect for daily use.",
      author: "Bob Smith",
      role: "Technical Writer",
      rating: 5,
      color: "purple"
    },
    {
      quote: "The Git integration and syntax highlighting make it indispensable for my workflow. Highly recommend!",
      author: "Carol Davis",
      role: "Full-Stack Engineer",
      rating: 4,
      color: "emerald"
    },
    {
      quote: "I've tried many markdown editors, but this one stands out. The UI is clean, intuitive, and the performance is exceptional.",
      author: "David Chen",
      role: "DevOps Engineer",
      rating: 5,
      color: "orange"
    },
    {
      quote: "Perfect for technical writing. The export options and customization settings give me exactly what I need.",
      author: "Emma Wilson",
      role: "Technical Content Manager",
      rating: 5,
      color: "pink"
    },
    {
      quote: "As a student, this tool has made note-taking and assignment writing so much easier. Highly recommended!",
      author: "Frank Rodriguez",
      role: "Computer Science Student",
      rating: 4,
      color: "cyan"
    }
  ];

  const smallIconSize = 16;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-toolbar-bg border-b border-toolbar-border flex items-center gap-1 px-2 sm:px-3 py-2">
        <div className="flex items-center gap-1.5 mr-1 sm:mr-3 flex-shrink-0">
          <FileCode2 size={20} className="text-primary" />
          <span className="font-bold text-sm text-foreground hidden md:inline">MarkdownPro</span>
        </div>
        
        <div className="flex-1" />
        
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="toolbar-btn" aria-label="Notifications" onClick={() => navigate('/notifications')}>
              <Bell size={smallIconSize} />
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Notifications</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={toggleTheme}
              className="toolbar-btn"
              aria-label={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            >
              {theme === 'dark' ? <Sun size={smallIconSize} /> : <Moon size={smallIconSize} />}
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </TooltipContent>
        </Tooltip>
        
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <button className="toolbar-btn" aria-label="More actions">
                  <MoreHorizontal size={smallIconSize} />
                </button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent side="bottom">More</TooltipContent>
          </Tooltip>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => navigate('/')}>
              <FileCode2 size={14} className="mr-2" />
              Back to Editor
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/help')}>
              <HelpCircle size={14} className="mr-2" />
              Help & Syntax Guide
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/privacy')}>
              <Shield size={14} className="mr-2" />
              Privacy Policy
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Hero Section with Developer Info */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 mb-6">
              <div className="p-4 bg-primary/10 rounded-2xl">
                <FileCode2 size={48} className="text-primary" />
              </div>
              <div>
                <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  MarkdownPro
                </h2>
                <p className="text-sm text-muted-foreground mt-2">Built for Developers. By Developers.</p>
              </div>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              The modern Markdown editor that combines powerful features with an intuitive interface. Write faster, preview smarter, and create beautifully formatted documents with ease.
            </p>
          </div>

          {/* Developer Info Card */}
          <div className="bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 border border-border rounded-2xl p-8 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="text-center sm:text-left">
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-3">Built By</p>
                <div className="flex items-center justify-center sm:justify-start gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
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

        {/* Quick Stats */}
        <section className="mb-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard icon={<Zap size={32} />} value="50+" label="Core Features" />
            <StatCard icon={<TrendingUp size={32} />} value="100+" label="Total Capabilities" />
            <StatCard icon={<Award size={32} />} value="99.9%" label="Uptime" />
            <StatCard icon={<Lock size={32} />} value="∞" label="Privacy Score" />
          </div>
        </section>

        {/* Core Features Section */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Core Features
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Everything a modern Markdown editor should have and more
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            <FeatureCard
              icon={<Eye size={24} className="text-blue-500" />}
              title="Real-time Preview"
              description="Live preview as you type with instant rendering"
            />
            <FeatureCard
              icon={<Code size={24} className="text-purple-500" />}
              title="GitHub-Flavored Markdown"
              description="Tables, task lists, strikethrough & more"
            />
            <FeatureCard
              icon={<Copy size={24} className="text-green-500" />}
              title="Easy Export"
              description="Download as Markdown, HTML, or PDF"
            />
            <FeatureCard
              icon={<Database size={24} className="text-orange-500" />}
              title="Local Storage"
              description="Auto-save with browser local storage"
            />
            <FeatureCard
              icon={<Terminal size={24} className="text-cyan-500" />}
              title="Syntax Highlighting"
              description="Beautiful code highlighting with multiple themes"
            />
            <FeatureCard
              icon={<Palette size={24} className="text-pink-500" />}
              title="Dark & Light Mode"
              description="Seamless theme switching for any preference"
            />
            <FeatureCard
              icon={<Settings size={24} className="text-indigo-500" />}
              title="Customizable Settings"
              description="Fine-tune font size, line height, and more"
            />
            <FeatureCard
              icon={<Smartphone size={24} className="text-teal-500" />}
              title="Fully Responsive"
              description="Works perfectly on desktop, tablet, and mobile"
            />
            <FeatureCard
              icon={<Zap size={24} className="text-yellow-500" />}
              title="Lightning Fast"
              description="Optimized for performance and speed"
            />
          </div>
        </section>

        {/* Advanced Features */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Advanced Capabilities
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Take your writing to the next level with professional tools
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AdvancedFeature
              icon={<Globe size={24} className="text-indigo-500" />}
              title="HTML Support"
              description="Embed HTML directly in your markdown"
              details={[
                "Custom styled HTML elements",
                "Responsive image handling",
                "Iframe embedding support"
              ]}
            />
            <AdvancedFeature
              icon={<GitBranch size={24} className="text-purple-500" />}
              title="Git Integration"
              description="Perfect for version control workflows"
              details={[
                "GitHub markdown compatibility",
                "GFM spec compliance",
                "Frontmatter support"
              ]}
            />
            <AdvancedFeature
              icon={<Layers size={24} className="text-emerald-500" />}
              title="Document Structure"
              description="Intelligent outline and navigation"
              details={[
                "Auto-generated table of contents",
                "Header navigation panel",
                "Hierarchical document structure"
              ]}
            />
            <AdvancedFeature
              icon={<BookOpen size={24} className="text-cyan-500" />}
              title="Comprehensive Help"
              description="Built-in documentation and guides"
              details={[
                "Interactive syntax examples",
                "Keyboard shortcuts reference",
                "Best practices documentation"
              ]}
            />
            <AdvancedFeature
              icon={<CheckCircle2 size={24} className="text-green-500" />}
              title="Task Management"
              description="Create and manage task lists"
              details={[
                "Checkbox support in lists",
                "Progress tracking",
                "Nested task hierarchies"
              ]}
            />
            <AdvancedFeature
              icon={<Copy size={24} className="text-amber-500" />}
              title="Content Import"
              description="Import and convert various formats"
              details={[
                "Paste from clipboard",
                "Multiple format conversion"
              ]}
            />
          </div>
        </section>

        {/* Technology Stack */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Built with Modern Technology
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Cutting-edge stack for performance, reliability, and developer experience
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <TechCard name="React 18" description="Modern UI library" icon="⚛️" />
            <TechCard name="TypeScript" description="Type-safe code" icon="🔷" />
            <TechCard name="Tailwind CSS" description="Utility-first styling" icon="🎨" />
            <TechCard name="Vite" description="Lightning-fast builds" icon="⚡" />
            <TechCard name="React Markdown" description="Markdown rendering" icon="📝" />
            <TechCard name="Lucide Icons" description="Beautiful icons" icon="🎯" />
            <TechCard name="Shiki" description="Syntax highlighting" icon="✨" />
            <TechCard name="Zod" description="Schema validation" icon="🛡️" />
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Perfect For
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Whatever you're writing, MarkdownPro has you covered
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <UseCaseCard
              icon={<Code size={24} className="text-blue-500" />}
              title="Developers"
              items={["Documentation", "README files", "Code comments"]}
            />
            <UseCaseCard
              icon={<BookOpen size={24} className="text-purple-500" />}
              title="Technical Writers"
              items={["Guides & tutorials", "API docs", "Wiki pages"]}
            />
            <UseCaseCard
              icon={<Feather size={24} className="text-amber-500" />}
              title="Content Creators"
              items={["Blog posts", "Articles", "Stories"]}
            />
            <UseCaseCard
              icon={<Layers size={24} className="text-green-500" />}
              title="Project Managers"
              items={["Project notes", "Status reports", "Planning docs"]}
            />
            <UseCaseCard
              icon={<Users size={24} className="text-pink-500" />}
              title="Students"
              items={["Study notes", "Research papers", "Assignments"]}
            />
            <UseCaseCard
              icon={<Sparkles size={24} className="text-cyan-500" />}
              title="Everyone Else"
              items={["Quick notes", "Journaling", "Ideas"]}
            />
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Our Core Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              The principles that guide everything we build
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PhilosophyItem
              icon={<Lock size={24} className="text-red-500" />}
              title="Privacy First"
              description="Your data belongs to you. No tracking, analytics, or data collection. Everything stays in your browser."
            />
            <PhilosophyItem
              icon={<Zap size={24} className="text-yellow-500" />}
              title="Performance Obsession"
              description="Lightning-fast load times and instant responsiveness. Every millisecond matters to us."
            />
            <PhilosophyItem
              icon={<Heart size={24} className="text-pink-500" />}
              title="Developer Love"
              description="Built by developers, for developers. We understand your needs and respect your time."
            />
            <PhilosophyItem
              icon={<Award size={24} className="text-amber-500" />}
              title="Quality Obsession"
              description="We focus on doing fewer things exceptionally well rather than many things poorly."
            />
            <PhilosophyItem
              icon={<Feather size={24} className="text-blue-500" />}
              title="Simplicity"
              description="Clean, intuitive interface. No unnecessary complexity or bloat. Just what you need."
            />
            <PhilosophyItem
              icon={<Globe size={24} className="text-cyan-500" />}
              title="Open Source"
              description="Transparent development. Community-driven features. Your contributions matter."
            />
          </div>
        </section>

        {/* ===== IMPROVED COMBINED CTA SECTION - SIDE BY SIDE ===== */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Primary CTA Card - Launch Editor */}
            <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-1">
              <div className="relative bg-background rounded-3xl p-8 sm:p-12">
                <div className="flex flex-col items-center justify-center text-center h-full">
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
                      <Rocket size={32} className="text-primary" />
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-primary/10 rounded-full">
                    <Rocket size={14} className="text-primary" />
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">Get Started</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
                    Ready to Write Better?
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground mb-6">
                    No installation needed. No sign-up required. Just open and start creating.
                  </p>
                  <div className="flex flex-col gap-3 w-full">
                    <Button
                      onClick={() => navigate('/')}
                      className="gap-2 bg-primary hover:bg-primary/90 px-6 py-5 text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl w-full"
                    >
                      <Rocket size={18} />
                      Launch Editor Now
                    </Button>
                    <Button
                      onClick={() => navigate('/help')}
                      variant="outline"
                      className="gap-2 px-6 py-5 text-sm font-semibold border-2 border-primary/30 hover:bg-primary/5 hover:border-primary/50 rounded-xl transition-all duration-300 w-full"
                    >
                      <BookOpen size={18} />
                      Learn Markdown
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary CTA Card - Star on GitHub */}
            <div className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-50/50 dark:from-amber-950/20 via-transparent to-transparent p-1">
              <div className="relative bg-background rounded-3xl p-8 sm:p-12">
                <div className="flex flex-col items-center justify-center text-center h-full">
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/10 rounded-2xl mb-4">
                      <Star size={32} className="text-amber-500 fill-current" />
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-amber-500/10 rounded-full">
                    <Star size={14} className="text-amber-500" />
                    <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Love It?</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
                    Show Your Support
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground mb-6">
                    Star us on GitHub! Your support helps us keep improving.
                  </p>
                  <a
                    href="https://github.com/Vasu657/markdown-weaver"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl text-sm w-full"
                  >
                    <Star size={18} className="fill-current" />
                    Star on GitHub
                    <ArrowRight size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== IMPROVED USER REVIEWS SECTION - AUTO-SLIDING SLIM CARDS ===== */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-primary/10 rounded-full">
              <Smile size={16} className="text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">Testimonials</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Loved by Developers Worldwide
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Join thousands of developers who trust MarkdownPro for their daily writing needs.
            </p>
          </div>

          {/* Auto-Sliding Carousel */}
          <div className="relative max-w-2xl mx-auto">
            {/* Main Carousel Container */}
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${currentReviewIndex * 100}%)`
                }}>
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-2 sm:px-4">
                    <SlimReviewCard
                      quote={testimonial.quote}
                      author={testimonial.author}
                      role={testimonial.role}
                      rating={testimonial.rating}
                      color={testimonial.color as any}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Dot Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentReviewIndex
                      ? 'bg-primary w-8 h-2'
                      : 'bg-border w-2 h-2 hover:bg-primary/50'
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6">
            <Button onClick={() => navigate('/')} variant="outline" className="gap-2 w-full sm:w-auto">
              <ArrowLeft size={16} />
              Back to Editor
            </Button>
            <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
              <Button onClick={() => navigate('/help')} variant="outline" className="gap-2 w-full sm:w-auto">
                <HelpCircle size={16} />
                Help
              </Button>
              <Button variant="outline" onClick={() => navigate('/privacy')} className="gap-2 w-full sm:w-auto">
                <Shield size={16} />
                Privacy
              </Button>
            </div>
          </div>
          <div className="text-center py-4 text-sm text-muted-foreground border-t border-border">
            <p>© {new Date().getFullYear()} MarkdownPro. All rights reserved.</p>
            <p className="mt-1">Built with ❤️ by <a href="http://vasughanta.netlify.app/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors underline">Vasu Ghanta</a></p>
          </div>
        </div>
      </main>
    </div>
  );
};

// Component for statistic cards
interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, label }) => (
  <div className="bg-background p-4 sm:p-6 rounded-lg sm:rounded-xl border border-border text-center hover:shadow-lg transition-shadow">
    <div className="flex justify-center mb-2 sm:mb-3">
      <div className="p-2 sm:p-3 bg-primary/10 rounded-lg text-primary">
        {icon}
      </div>
    </div>
    <div className="text-xl sm:text-2xl font-bold text-foreground mb-1">{value}</div>
    <div className="text-xs sm:text-sm text-muted-foreground">{label}</div>
  </div>
);

// Component for feature cards
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-background p-4 sm:p-6 rounded-lg sm:rounded-xl border border-border hover:shadow-lg transition-shadow">
    <div className="flex items-start gap-3 sm:gap-4">
      <div className="p-2 sm:p-3 bg-primary/5 rounded-lg text-primary flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-foreground mb-1 sm:mb-2 text-sm sm:text-base">{title}</h3>
        <p className="text-xs sm:text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  </div>
);

// Component for advanced features
interface AdvancedFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string[];
}

const AdvancedFeature: React.FC<AdvancedFeatureProps> = ({ icon, title, description, details }) => (
  <div className="bg-background p-4 sm:p-6 rounded-lg sm:rounded-xl border border-border">
    <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
      <div className="p-2 sm:p-3 bg-primary/5 rounded-lg text-primary flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-foreground mb-1 sm:mb-2 text-sm sm:text-base">{title}</h3>
        <p className="text-xs sm:text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
    <ul className="space-y-2 pl-6 sm:pl-8">
      {details.map((detail, index) => (
        <li key={index} className="text-xs sm:text-sm text-muted-foreground flex items-start">
          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 mr-2 sm:mr-3 flex-shrink-0" />
          {detail}
        </li>
      ))}
    </ul>
  </div>
);

// Component for technology cards
interface TechCardProps {
  name: string;
  description: string;
  icon: string;
}

const TechCard: React.FC<TechCardProps> = ({ name, description, icon }) => (
  <div className="bg-background p-3 sm:p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
    <div className="text-2xl mb-2">{icon}</div>
    <h3 className="font-semibold text-foreground text-xs sm:text-sm mb-1">{name}</h3>
    <p className="text-[10px] sm:text-xs text-muted-foreground">{description}</p>
  </div>
);

// Component for use case cards
interface UseCaseCardProps {
  icon: React.ReactNode;
  title: string;
  items: string[];
}

const UseCaseCard: React.FC<UseCaseCardProps> = ({ icon, title, items }) => (
  <div className="bg-background p-4 sm:p-6 rounded-lg sm:rounded-xl border border-border">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-primary/5 rounded-lg text-primary">
        {icon}
      </div>
      <h3 className="font-semibold text-foreground">{title}</h3>
    </div>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="text-xs sm:text-sm text-muted-foreground flex items-center gap-2">
          <CheckCircle2 size={14} className="text-primary/60" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

// Component for philosophy items
interface PhilosophyItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const PhilosophyItem: React.FC<PhilosophyItemProps> = ({ icon, title, description }) => (
  <div className="flex gap-4 p-4 rounded-xl hover:bg-primary/5 transition-colors">
    <div className="p-3 bg-background border border-border rounded-xl h-fit">
      {icon}
    </div>
    <div>
      <h3 className="font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  </div>
);

// Component for slim review cards
interface SlimReviewCardProps {
  quote: string;
  author: string;
  role: string;
  rating: number;
  color?: 'blue' | 'purple' | 'emerald' | 'orange' | 'pink' | 'cyan';
}

const SlimReviewCard: React.FC<SlimReviewCardProps> = ({ quote, author, role, rating, color = 'blue' }) => {
  const colorClasses = {
    blue: 'from-blue-500/20 to-blue-500/5 border-blue-500/30',
    purple: 'from-purple-500/20 to-purple-500/5 border-purple-500/30',
    emerald: 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/30',
    orange: 'from-orange-500/20 to-orange-500/5 border-orange-500/30',
    pink: 'from-pink-500/20 to-pink-500/5 border-pink-500/30',
    cyan: 'from-cyan-500/20 to-cyan-500/5 border-cyan-500/30',
  };

  const colorDots = {
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    emerald: 'bg-emerald-500',
    orange: 'bg-orange-500',
    pink: 'bg-pink-500',
    cyan: 'bg-cyan-500',
  };

  return (
    <div className={`group relative overflow-hidden rounded-2xl border ${colorClasses[color]} bg-gradient-to-br p-5 sm:p-6 hover:shadow-xl transition-all duration-300 flex flex-col`}>
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Top accent dot */}
      <div className={`absolute top-4 right-4 w-2 h-2 ${colorDots[color]} rounded-full opacity-60`} />

      <div className="relative z-10 flex-1 flex flex-col">
        {/* Rating Stars */}
        <div className="flex gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={`transition-colors ${i < rating ? 'text-amber-500 fill-current' : 'text-muted-foreground/30'}`}
            />
          ))}
        </div>

        {/* Quote Icon */}
        <Quote size={16} className="text-muted-foreground/30 mb-2" />

        {/* Quote Text */}
        <blockquote className="text-foreground text-sm leading-relaxed mb-4 font-medium italic flex-1">
          "{quote}"
        </blockquote>
      </div>

      {/* Author Info - Fixed at bottom */}
      <div className="relative z-10 flex items-center gap-3 pt-3 border-t border-border/50">
        <div className={`w-8 h-8 bg-gradient-to-br ${colorDots[color]} rounded-full flex items-center justify-center flex-shrink-0 shadow-md`}>
          <User size={14} className="text-white" />
        </div>
        <div className="text-left">
          <p className="font-semibold text-foreground text-xs">{author}</p>
          <p className="text-[10px] text-muted-foreground">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default About;