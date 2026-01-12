import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
// import { Button } from '@/components/ui/button'; // Unused
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
import { Helmet } from "react-helmet-async";
import {
  Lock,
  Scale,
  FileCode2,
  Bell,
  Sun,
  Moon,
  MoreHorizontal,
  HelpCircle,
  ShieldCheck,
  Server,
  Database,
  Cookie,
  AlertTriangle,
  Mail
} from 'lucide-react';

const Privacy: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const smallIconSize = 16;
  const lastUpdated = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Privacy Policy & Terms – Markdown Weaver</title>
        <meta
          name="description"
          content="Privacy Policy and Terms of Service for Markdown Weaver. Comprehensive details on data handling, AI usage, and user rights."
        />
      </Helmet>

      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border flex items-center gap-1 px-4 py-3">
        <div className="flex items-center gap-2 mr-3 flex-shrink-0 cursor-pointer" onClick={() => navigate('/')}>
          <FileCode2 size={24} className="text-primary" />
          <span className="font-bold text-lg hidden sm:inline">Markdown Weaver</span>
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-1 sm:gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="p-2 hover:bg-muted rounded-md transition-colors" aria-label="Notifications" onClick={() => navigate('/notifications')}>
                <Bell size={smallIconSize} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Notifications</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={toggleTheme}
                className="p-2 hover:bg-muted rounded-md transition-colors"
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
                  <button className="p-2 hover:bg-muted rounded-md transition-colors" aria-label="More actions">
                    <MoreHorizontal size={smallIconSize} />
                  </button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent side="bottom">More</TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => navigate('/')}>
                <FileCode2 size={14} className="mr-2" />
                Back to Editor
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/about')}>
                <FileCode2 size={14} className="mr-2" />
                About Markdown Weaver
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/help')}>
                <HelpCircle size={14} className="mr-2" />
                Help & Syntax Guide
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-12">

        {/* Page Title */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Privacy Policy & Terms
          </h1>
          <p className="text-muted-foreground text-lg">
            Last Updated: {lastUpdated}
          </p>
        </div>

        <div className="grid gap-12 sm:gap-16">

          {/* INTRODUCTION */}
          <section className="prose dark:prose-invert max-w-none">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Welcome to Markdown Weaver. We are committed to protecting your privacy and ensuring you have complete control over your data.
              This document serves as our comprehensive Privacy Policy and Terms of Service. By using Markdown Weaver, you agree to these terms.
              Our core philosophy is <strong>Local-First</strong>: we believe your writing belongs to you, on your device.
            </p>
          </section>

          <hr className="border-border" />

          {/* PART 1: PRIVACY POLICY */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck size={28} className="text-primary" />
              <h2 className="text-3xl font-bold">Privacy Policy</h2>
            </div>

            <div className="grid gap-8">
              <Section title="Data Collection & Storage" icon={<Database size={20} />}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <PolicyCard
                    title="Local Storage"
                    description="All documents, settings, and preferences are stored exclusively in your browser's Local Storage. We do not have a backend database for user content."
                  />
                  <PolicyCard
                    title="No Account Required"
                    description="You do not need to create an account or provide any personal information (like email or name) to use Markdown Weaver."
                  />
                  <PolicyCard
                    title="No Analytics"
                    description="We do not use Google Analytics, Mixpanel, or any other tracking software to monitor your behavior."
                  />
                  <PolicyCard
                    title="Data Ownership"
                    description="You retain full ownership of all content created. Since we don't host your data, we cannot access, read, or sell it."
                  />
                </div>
              </Section>

              <Section title="AI Features & Third-Party Processing" icon={<Server size={20} />} highlight>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Markdown Weaver offers optional AI-powered features (e.g., rewriting, summarizing, formatting) which utilize the <strong>OpenRouter API</strong>.
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>Voluntary Transmission:</strong> Data is only sent to AI providers when you explicitly trigger an AI action (e.g., clicking "Improve Writing").
                    </li>
                    <li>
                      <strong>Transient Processing:</strong> The text sent is used solely to generate a response. Neither Markdown Weaver nor OpenRouter stores your content permanently for model training, subject to OpenRouter's own privacy policies.
                    </li>
                    <li>
                      <strong>Providers:</strong> Through OpenRouter, your data may be processed by models from companies like OpenAI, Anthropic, or Google, depending on the selected model.
                    </li>
                  </ul>
                  <p className="text-sm mt-2">
                    Refer to <a href="https://openrouter.ai/privacy" target="_blank" rel="noreferrer" className="text-primary underline hover:text-primary/80">OpenRouter's Privacy Policy</a> for more details.
                  </p>
                </div>
              </Section>

              <Section title="Cookies & Local Data" icon={<Cookie size={20} />}>
                <p className="text-muted-foreground mb-4">
                  We use "Local Storage" technology, which functions similarly to cookies but is more secure and stays on your device.
                </p>
                <div className="bg-muted/50 rounded-lg p-4 border border-border">
                  <table className="w-full text-sm text-left">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="py-2 font-semibold">Data Type</th>
                        <th className="py-2 font-semibold">Purpose</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-b border-border/50">
                        <td className="py-2 pr-4">Document Content</td>
                        <td className="py-2">To save your work automatically between sessions.</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-2 pr-4">Theme Preference</td>
                        <td className="py-2">To remember if you prefer Dark or Light mode.</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4">Editor Settings</td>
                        <td className="py-2">To save your customized editor view options.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Section>
            </div>
          </div>

          <hr className="border-border" />

          {/* PART 2: TERMS OF SERVICE */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Scale size={28} className="text-primary" />
              <h2 className="text-3xl font-bold">Terms of Service</h2>
            </div>

            <div className="space-y-8">
              <LegalBlock title="1. Acceptance of Terms">
                By accessing and using Markdown Weaver, you accept and agree to be bound by the terms and provision of this agreement.
                If you do not agree to abide by these terms, please do not use this service.
              </LegalBlock>

              <LegalBlock title="2. Use License & Intellectual Property">
                <p className="mb-2"><strong>The Application:</strong> The Markdown Weaver interface, design, code, and branding are the proprietary property of the creator and are protected by copyright laws.</p>
                <p><strong>Your Content:</strong> You retain all rights, title, and interest in and to the content you create using Markdown Weaver. We claim no intellectual property rights over the material you provide or create.</p>
              </LegalBlock>

              <LegalBlock title="3. User Conduct">
                You agree not to use the Application for any unlawful purpose or in any way that could damage, disable, overburden, or impair the service.
                Since AI features allow text generation, you agree not to use these features to generate hate speech, illegal content, or malicious code.
              </LegalBlock>

              <LegalBlock title="4. Disclaimer of Warranties">
                <div className="flex gap-3 items-start bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
                  <AlertTriangle className="text-yellow-500 shrink-0 mt-0.5" size={18} />
                  <p className="text-sm">
                    The Application is provided "AS IS" and "AS AVAILABLE" without warranties of any kind, either express or implied, including, but not limited to,
                    implied warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that the application will function uninterrupted or error-free.
                    <strong> You are responsible for backing up your own data.</strong>
                  </p>
                </div>
              </LegalBlock>

              <LegalBlock title="5. Limitation of Liability">
                In no event shall the creators of Markdown Weaver be liable for any direct, indirect, incidental, special, exemplary, or consequential damages
                (including, but not limited to, procurement of substitute goods or services; loss of use, data, or profits; or business interruption)
                however caused and on any theory of liability, whether in contract, strict liability, or tort (including negligence or otherwise)
                arising in any way out of the use of this software, even if advised of the possibility of such damage.
              </LegalBlock>
            </div>
          </div>

          <hr className="border-border" />

          {/* PART 3: CONTACT */}
          <div className="bg-muted/30 rounded-xl p-8 text-center">
            <Mail size={32} className="mx-auto text-primary mb-4" />
            <h3 className="text-2xl font-bold mb-2">Questions?</h3>
            <p className="text-muted-foreground max-w-lg mx-auto mb-6">
              If you have any questions about this Privacy Policy or the Terms of Service, please reach out to us.
            </p>
            <button
              onClick={() => navigate('/about')}
              className="px-6 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              Contact via About Page
            </button>
          </div>

        </div>

        <Footer showBackToEditor={true} showAbout={true} showHelp={true} showPrivacy={false} />
      </main>
    </div>
  );
};

// --- Helper Components ---

const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode; highlight?: boolean }> = ({ title, icon, children, highlight }) => (
  <div className={`rounded-xl border ${highlight ? 'bg-primary/5 border-primary/20' : 'bg-card border-border'} p-6 transition-all`}>
    <div className="flex items-center gap-3 mb-4 border-b border-border/50 pb-3">
      <div className={`p-2 rounded-lg ${highlight ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <div className="text-sm sm:text-base leading-relaxed">
      {children}
    </div>
  </div>
);

const PolicyCard: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <div className="bg-background p-4 rounded-lg border border-border shadow-sm">
    <h4 className="font-semibold text-foreground mb-2">{title}</h4>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

const LegalBlock: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="space-y-2">
    <h3 className="text-lg font-bold text-foreground">{title}</h3>
    <div className="text-muted-foreground leading-relaxed pl-4 border-l-2 border-primary/20">
      {children}
    </div>
  </div>
);

export default Privacy;