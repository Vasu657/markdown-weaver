import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
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
  Figma
} from 'lucide-react';

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b border-border px-4 py-6">
        <div className="max-w-5xl mx-auto flex justify-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">About MarkdownPro</h1>
        </div>
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
                      href="https://github.com/Vasu657"
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
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-3">Repository</p>
                <a
                  href="https://github.com/Vasu657/markdown-weaver"
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
              Professional-grade tools for power users
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
                "Drag & drop file support",
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

        {/* Quick Start */}
        <section className="mb-16 py-12 bg-gradient-to-br from-primary/10 via-transparent to-blue-500/10 rounded-2xl border border-border">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              No installation, no sign-up. Just open the editor and start writing immediately.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => navigate('/')}
              className="gap-2 bg-primary hover:bg-primary/90 px-8 py-6 text-lg"
            >
              <Rocket size={20} />
              Launch Editor
            </Button>
            <Button
              onClick={() => navigate('/help')}
              variant="outline"
              className="gap-2 px-8 py-6 text-lg"
            >
              <BookOpen size={20} />
              Learn Syntax
            </Button>
          </div>
        </section>

        {/* Support Section */}
        <section className="mb-16 py-10 bg-gradient-to-r from-primary/5 to-blue-500/5 rounded-2xl border border-border">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Star size={28} className="text-amber-500" />
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Love MarkdownPro?
              </h2>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-6">
              Show your support by starring us on GitHub!
            </p>
            <a
              href="https://github.com/Vasu657/markdown-weaver"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors font-semibold"
            >
              <Star size={20} />
              Star on GitHub
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border">
          <div className="mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
                <div className="space-y-2 text-sm">
                  <Button
                    onClick={() => navigate('/')}
                    variant="link"
                    className="p-0 h-auto text-muted-foreground hover:text-primary justify-start block"
                  >
                    ← Back to Editor
                  </Button>
                  <a
                    href="https://github.com/Vasu657/markdown-weaver"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-muted-foreground hover:text-primary transition-colors"
                  >
                    GitHub Repository →
                  </a>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-4">Resources</h3>
                <div className="space-y-2 text-sm">
                  <Button
                    onClick={() => navigate('/help')}
                    variant="link"
                    className="p-0 h-auto text-muted-foreground hover:text-primary justify-start block"
                  >
                    Help & Documentation
                  </Button>
                  <Button
                    onClick={() => navigate('/privacy')}
                    variant="link"
                    className="p-0 h-auto text-muted-foreground hover:text-primary justify-start block"
                  >
                    Privacy Policy
                  </Button>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-4">Developer</h3>
                <div className="space-y-2 text-sm">
                  <a
                    href="https://github.com/Vasu657"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Github size={16} />
                    Vasu Ghanta
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              © {new Date().getFullYear()} MarkdownPro. Open source and free forever.
            </p>
            <p className="text-xs text-muted-foreground">
              Made with passion for developers and creators worldwide
            </p>
          </div>
        </footer>
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
  <div className="bg-background p-3 sm:p-4 rounded-lg sm:rounded-xl border border-border text-center hover:shadow-lg transition-shadow">
    <div className="text-2xl sm:text-3xl mb-2">{icon}</div>
    <div className="font-medium text-foreground mb-1 text-sm sm:text-base">{name}</div>
    <div className="text-xs text-muted-foreground">{description}</div>
  </div>
);

// Component for philosophy items
interface PhilosophyItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const PhilosophyItem: React.FC<PhilosophyItemProps> = ({ icon, title, description }) => (
  <div className="bg-muted p-4 sm:p-6 rounded-lg sm:rounded-xl border border-border flex items-start gap-3 sm:gap-4 hover:bg-muted/80 transition-colors">
    <div className="p-2 sm:p-3 bg-primary/10 rounded-lg text-primary flex-shrink-0">
      {icon}
    </div>
    <div>
      <h3 className="font-semibold text-foreground mb-1 sm:mb-2 text-sm sm:text-base">{title}</h3>
      <p className="text-muted-foreground text-xs sm:text-sm">{description}</p>
    </div>
  </div>
);

// Use Case Card Component
interface UseCaseCardProps {
  icon: React.ReactNode;
  title: string;
  items: string[];
}

const UseCaseCard: React.FC<UseCaseCardProps> = ({ icon, title, items }) => (
  <div className="bg-background p-4 sm:p-6 rounded-lg sm:rounded-xl border border-border hover:shadow-lg transition-shadow">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 sm:p-3 bg-primary/5 rounded-lg flex-shrink-0">
        {icon}
      </div>
      <h3 className="font-semibold text-foreground text-sm sm:text-base">{title}</h3>
    </div>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="text-xs sm:text-sm text-muted-foreground flex items-center gap-2">
          <span className="w-1 h-1 bg-primary rounded-full" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default About;