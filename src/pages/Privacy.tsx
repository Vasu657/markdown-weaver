import React from 'react';
import { ArrowLeft, Shield, Lock, Eye, Scale, ExternalLink, FileCode2, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Privacy: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b border-border px-4 py-6">
        <div className="max-w-4xl mx-auto flex justify-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Privacy & Legal</h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Your Privacy Matters
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We believe in complete transparency about how your data is handled.
          </p>
        </div>

        {/* Privacy Section */}
        <Section
          icon={<Lock size={20} />}
          title="Privacy Policy"
          highlight
        >
          <div className="space-y-4">
            <PolicyItem
              title="No Data Collection"
              description="MarkdownPro does not collect, track, store, or transmit any of your personal data to external servers. Everything stays on your device."
            />
            <PolicyItem
              title="Local-Only Editing"
              description="All editing happens entirely in your browser. Your documents are stored in your browser's local storage and never leave your device unless you explicitly export or share them."
            />
            <PolicyItem
              title="No Analytics"
              description="We don't use any analytics services, tracking pixels, or cookies for monitoring purposes. Your writing habits and content remain completely private."
            />
            <PolicyItem
              title="No User Accounts"
              description="There's no login required. We don't collect emails, names, or any personal identifiers. You're completely anonymous."
            />
            <PolicyItem
              title="Shared Links"
              description="When you create a share link, your content is encoded directly into the URL. No data is uploaded to any server. The recipient decodes the content from the link itself."
            />
          </div>
        </Section>

        {/* How It Works */}
        <Section icon={<Eye size={20} />} title="How Your Data Is Stored">
          <div className="bg-muted rounded-lg p-5 border border-border">
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">1.</span>
                <span><strong className="text-foreground">Local Storage:</strong> Your content is saved using your browser's localStorage API, which keeps data on your device only.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">2.</span>
                <span><strong className="text-foreground">Auto-Save:</strong> Changes are automatically saved locally every few seconds to prevent data loss.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">3.</span>
                <span><strong className="text-foreground">Export Options:</strong> You can download your work as Markdown (.md) or HTML files at any time.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">4.</span>
                <span><strong className="text-foreground">Data Clearing:</strong> If you clear your browser data, cookies, or cache, your saved content will be permanently deleted.</span>
              </li>
            </ul>
          </div>
        </Section>

        {/* Legal Section */}
        <Section icon={<Scale size={20} />} title="Legal & Usage Terms">
          <div className="space-y-4">
            <div className="bg-muted rounded-lg p-5 border border-border">
              <h4 className="font-semibold text-foreground mb-3">Intellectual Property</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                MarkdownPro is protected by copyright and intellectual property laws. The application, including its design, code, and features, 
                is the property of its creator. Copying, redistributing, reverse-engineering, or cloning this application without explicit written 
                permission is prohibited and may result in legal action. We kindly ask that you respect the effort that went into creating this tool.
              </p>
            </div>
            
            <div className="bg-muted rounded-lg p-5 border border-border">
              <h4 className="font-semibold text-foreground mb-3">Your Content</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                You retain full ownership of all content you create using MarkdownPro. We make no claims to your documents, notes, or any other 
                material you write. You are free to use, share, and distribute your own work however you choose.
              </p>
            </div>

            <div className="bg-muted rounded-lg p-5 border border-border">
              <h4 className="font-semibold text-foreground mb-3">Disclaimer</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                MarkdownPro is provided "as is" without warranty of any kind. We are not responsible for any data loss that may occur 
                from browser data clearing, device issues, or other circumstances. Always keep backups of important documents.
              </p>
            </div>
          </div>
        </Section>

        {/* Learn More */}
        <Section icon={<ExternalLink size={20} />} title="Learn More">
          <p className="text-muted-foreground mb-4">
            Want to understand more about data privacy and intellectual property? Here are some helpful resources:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <ResourceLink
              title="What is Local Storage?"
              url="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage"
              description="MDN's guide to browser local storage"
            />
            <ResourceLink
              title="Client-Side vs Server-Side"
              url="https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Client-Server_overview"
              description="Understanding where your data lives"
            />
            <ResourceLink
              title="Understanding Copyright"
              url="https://www.copyright.gov/what-is-copyright/"
              description="U.S. Copyright Office basics"
            />
            <ResourceLink
              title="Digital Privacy Guide"
              url="https://www.eff.org/issues/privacy"
              description="EFF's privacy resources"
            />
          </div>
        </Section>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Button onClick={() => navigate('/')} variant="outline" className="gap-2 w-full sm:w-auto">
              <FileCode2 size={16} />
              Back to Editor
            </Button>
            <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
              <Button onClick={() => navigate('/about')} variant="outline" className="gap-2 w-full sm:w-auto">
                <FileCode2 size={16} />
                About
              </Button>
              <Button variant="outline" onClick={() => navigate('/help')} className="gap-2 w-full sm:w-auto">
                <BookOpen size={16} />
                Help Guide
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

interface SectionProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  highlight?: boolean;
}

const Section: React.FC<SectionProps> = ({ icon, title, children, highlight }) => (
  <section className={`mb-10 ${highlight ? 'p-6 bg-primary/5 rounded-xl border border-primary/20' : ''}`}>
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-primary/10 rounded-lg text-primary">
        {icon}
      </div>
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
    </div>
    {children}
  </section>
);

interface PolicyItemProps {
  title: string;
  description: string;
}

const PolicyItem: React.FC<PolicyItemProps> = ({ title, description }) => (
  <div className="flex items-start gap-3">
    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
    <div>
      <h4 className="font-medium text-foreground">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

interface ResourceLinkProps {
  title: string;
  url: string;
  description: string;
}

const ResourceLink: React.FC<ResourceLinkProps> = ({ title, url, description }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="block p-4 bg-muted rounded-lg border border-border hover:border-primary/50 hover:bg-muted/80 transition-colors group"
  >
    <div className="flex items-center gap-2 mb-1">
      <span className="font-medium text-foreground group-hover:text-primary transition-colors">{title}</span>
      <ExternalLink size={14} className="text-muted-foreground" />
    </div>
    <p className="text-xs text-muted-foreground">{description}</p>
  </a>
);

export default Privacy;