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
        <div className="max-w-4xl mx-auto flex justify-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">About MarkdownPro</h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 mb-6">
            <div className="p-4 bg-primary/10 rounded-2xl">
              <FileCode2 size={48} className="text-primary" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              MarkdownPro
            </h2>
          </div>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            The ultimate Markdown editor for developers, writers, and creators who demand power, flexibility, and simplicity.
          </p>
        </section>

        {/* Quick Stats */}
        <section className="mb-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard icon={<Rocket size={32} />} value="100+" label="Features" />
            <StatCard icon={<Users size={32} />} value="50K+" label="Happy Users" />
            <StatCard icon={<Star size={32} />} value="4.9/5" label="Rating" />
            <StatCard icon={<Zap size={32} />} value="Instant" label="Real-time Preview" />
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Powerful Features
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create stunning documents with Markdown
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
        </section>

        {/* Advanced Features */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Advanced Capabilities
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional features for power users
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
        </section>

        {/* Technology Stack */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Built with Modern Technology
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Cutting-edge stack for performance and reliability
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <TechCard name="React" description="Component-based UI" icon="🔵" />
            <TechCard name="TypeScript" description="Type-safe code" icon="🔵" />
            <TechCard name="Tailwind CSS" description="Utility-first styling" icon="🔵" />
            <TechCard name="Vite" description="Blazing fast builds" icon="🔵" />
            <TechCard name="React Markdown" description="Markdown rendering" icon="🔵" />
            <TechCard name="Lucide Icons" description="Beautiful icons" icon="🔵" />
            <TechCard name="shiki" description="Syntax highlighting" icon="🔵" />
            <TechCard name="Zod" description="Runtime validation" icon="🔵" />
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Our Philosophy
            </h2>
            <p className="text-muted-foreground">
              The principles that guide our development
            </p>
          </div>

          <div className="space-y-4">
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
        </section>

        {/* Call to Action */}
        <section className="mb-12 py-8 bg-gradient-to-r from-primary/5 to-blue-50/5 rounded-lg text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Ready to Experience the Future of Markdown?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Start writing beautiful, structured documents with ease. Your ideas deserve the best tools.
          </p>
          <Button
            onClick={() => navigate('/')}
            className="gap-2 bg-primary hover:bg-primary/90 transition-colors"
          >
            <Rocket size={20} />
            Start Writing Now
          </Button>
        </section>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Button onClick={() => navigate('/')} variant="outline" className="gap-2 w-full sm:w-auto">
              <FileCode2 size={16} />
              Back to Editor
            </Button>
            <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
              <Button onClick={() => navigate('/help')} variant="outline" className="gap-2 w-full sm:w-auto">
                <BookOpen size={16} />
                Help Guide
              </Button>
              <Button onClick={() => navigate('/privacy')} variant="outline" className="gap-2 w-full sm:w-auto">
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

export default About;