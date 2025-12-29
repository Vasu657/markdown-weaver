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
  Heart
} from 'lucide-react';

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b border-border px-4 py-6">
        <div className="max-w-6xl mx-auto flex justify-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">About MarkdownPro</h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="p-4 bg-primary/10 rounded-2xl">
              <FileCode2 size={48} className="text-primary" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              MarkdownPro
            </h2>
          </div>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            The ultimate Markdown editor for developers, writers, and creators who demand power, flexibility, and simplicity.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <StatCard icon={<Rocket size={32} />} value="100+" label="Features" />
          <StatCard icon={<Users size={32} />} value="50K+" label="Happy Users" />
          <StatCard icon={<Star size={32} />} value="4.9/5" label="Rating" />
          <StatCard icon={<Zap size={32} />} value="Instant" label="Real-time Preview" />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/30 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Everything you need to create stunning documents with Markdown
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Code size={24} className="text-blue-500" />}
              title="GitHub-Flavored Markdown"
              description="Full support for GFM including tables, task lists, and more"
            />
            <FeatureCard
              icon={<LayoutTemplate size={24} className="text-green-500" />}
              title="Real-time Preview"
              description="Instant live preview that updates as you type"
            />
            <FeatureCard
              icon={<GitBranch size={24} className="text-purple-500" />}
              title="Version Control Ready"
              description="Seamless integration with Git workflows"
            />
            <FeatureCard
              icon={<Database size={24} className="text-orange-500" />}
              title="Local Storage"
              description="All your work is saved locally in your browser"
            />
            <FeatureCard
              icon={<Cloud size={24} className="text-sky-500" />}
              title="Export Options"
              description="Download as Markdown or HTML with one click"
            />
            <FeatureCard
              icon={<Lock size={24} className="text-red-500" />}
              title="Privacy First"
              description="No tracking, no analytics, no data collection"
            />
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Advanced Capabilities
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Professional features for power users
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <AdvancedFeature
                icon={<Globe size={24} className="text-indigo-500" />}
                title="HTML Inside Markdown"
                description="Full support for embedded HTML with proper rendering"
                details={[
                  "GitHub-style aligned content support",
                  "Custom badge styling",
                  "Responsive image handling"
                ]}
              />
              <AdvancedFeature
                icon={<BookOpen size={24} className="text-teal-500" />}
                title="Comprehensive Documentation"
                description="Built-in help and syntax guide"
                details={[
                  "Interactive examples",
                  "Keyboard shortcuts reference",
                  "Best practices guide"
                ]}
              />
            </div>
            <div className="space-y-8">
              <AdvancedFeature
                icon={<Lightbulb size={24} className="text-yellow-500" />}
                title="Smart Features"
                description="Intelligent tools to enhance your workflow"
                details={[
                  "Auto-save with status indicator",
                  "Undo/Redo functionality",
                  "Drag and drop file import"
                ]}
              />
              <AdvancedFeature
                icon={<MessageSquare size={24} className="text-pink-500" />}
                title="Community Driven"
                description="Built with feedback from real users"
                details={[
                  "Open to feature requests",
                  "Regular updates",
                  "Responsive support"
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="bg-muted/30 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Built with Modern Technology
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Cutting-edge stack for performance and reliability
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <TechCard name="React" description="Component-based UI" icon="🔵" />
            <TechCard name="TypeScript" description="Type-safe code" icon="🔵" />
            <TechCard name="Tailwind CSS" description="Utility-first styling" icon="🔵" />
            <TechCard name="Vite" description="Blazing fast builds" icon="🔵" />
            <TechCard name="React Markdown" description="Markdown rendering" icon="🔵" />
            <TechCard name="Lucide Icons" description="Beautiful icons" icon="🔵" />
            <TechCard name="shiki" description="Syntax highlighting" icon="🔵" />
            <TechCard name="Zod" description="Runtime validation" icon="🔵" />
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Our Philosophy
            </h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide our development
            </p>
          </div>

          <div className="space-y-8">
            <PhilosophyItem
              icon={<Shield size={24} className="text-primary" />}
              title="Privacy First"
              description="Your data belongs to you. We don't track, collect, or store any of your information."
            />
            <PhilosophyItem
              icon={<Zap size={24} className="text-primary" />}
              title="Performance Matters"
              description="Every millisecond counts. We optimize for speed and efficiency."
            />
            <PhilosophyItem
              icon={<Heart size={24} className="text-primary" />}
              title="User-Centric Design"
              description="Built by developers, for developers with love and attention to detail."
            />
            <PhilosophyItem
              icon={<Award size={24} className="text-primary" />}
              title="Quality Over Quantity"
              description="We focus on doing a few things exceptionally well."
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-blue-50/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Ready to Experience the Future of Markdown?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start writing beautiful, structured documents with ease. Your ideas deserve the best tools.
          </p>
          <Button
            onClick={() => navigate('/')}
            className="text-lg px-8 py-6 gap-2 bg-primary hover:bg-primary/90 transition-colors"
          >
            <Rocket size={20} />
            Start Writing Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 pt-8 border-t border-border bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-6">
            <div className="flex items-center gap-4">
              <Button onClick={() => navigate('/')} variant="outline" className="gap-2">
                <FileCode2 size={16} />
                Back to Editor
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={() => navigate('/help')} variant="outline" className="gap-2">
                <BookOpen size={16} />
                Help Guide
              </Button>
              <Button onClick={() => navigate('/privacy')} variant="outline" className="gap-2">
                <Shield size={16} />
                Privacy Policy
              </Button>
            </div>
          </div>
          <div className="text-center py-4 text-sm text-muted-foreground border-t border-border mt-4">
            <p>© {new Date().getFullYear()} MarkdownPro. All rights reserved.</p>
            <p className="mt-1">Built with ❤️ for developers worldwide</p>
          </div>
        </div>
      </footer>
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
  <div className="bg-background p-6 rounded-xl border border-border text-center hover:shadow-lg transition-shadow">
    <div className="flex justify-center mb-3">
      <div className="p-3 bg-primary/10 rounded-lg text-primary">
        {icon}
      </div>
    </div>
    <div className="text-2xl font-bold text-foreground mb-1">{value}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </div>
);

// Component for feature cards
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-background p-6 rounded-xl border border-border hover:shadow-lg transition-shadow">
    <div className="flex items-start gap-4">
      <div className="p-3 bg-primary/5 rounded-lg text-primary flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
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
  <div className="bg-background p-6 rounded-xl border border-border">
    <div className="flex items-start gap-4 mb-4">
      <div className="p-3 bg-primary/5 rounded-lg text-primary flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
      </div>
    </div>
    <ul className="space-y-2 pl-8">
      {details.map((detail, index) => (
        <li key={index} className="text-sm text-muted-foreground flex items-start">
          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
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
  <div className="bg-background p-4 rounded-xl border border-border text-center hover:shadow-lg transition-shadow">
    <div className="text-3xl mb-2">{icon}</div>
    <div className="font-medium text-foreground mb-1">{name}</div>
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
  <div className="bg-muted p-6 rounded-xl border border-border flex items-start gap-4 hover:bg-muted/80 transition-colors">
    <div className="p-3 bg-primary/10 rounded-lg text-primary flex-shrink-0">
      {icon}
    </div>
    <div>
      <h3 className="font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  </div>
);

export default About;