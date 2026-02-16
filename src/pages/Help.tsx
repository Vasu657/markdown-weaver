import React from 'react';
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
  Heading,
  Bold,
  Link,
  List,
  Code,
  Table,
  Quote,
  Image,
  Minus,
  Calculator,
  GitBranch,
  AlertTriangle,
  Keyboard,
  Shield,
  Bell,
  Sun,
  Moon,
  MoreHorizontal,
  ArrowLeft,
  MonitorPlay,
  Network,
  Database,
  Command,
  Sparkles,
  Zap,
  User,
  MessageSquare
} from 'lucide-react';
import { Helmet } from "react-helmet-async";
import { GitHubStarCTA } from '@/components/GitHubStarCTA';

const Help: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const smallIconSize = 16;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Help & Markdown Guide – Markdown Weaver</title>
        <meta
          name="description"
          content="Learn markdown syntax, shortcuts, examples, and best practices using Markdown Weaver’s built-in help and documentation."
        />
      </Helmet>

      {/* Header */}
      <header className="sticky top-0 z-10 bg-toolbar-bg border-b border-toolbar-border flex items-center gap-1 px-2 sm:px-3 py-2">
        <div className="flex items-center gap-1.5 mr-1 sm:mr-3 flex-shrink-0">
          <FileCode2 size={20} className="text-primary" />
          <span className="font-bold text-sm text-foreground hidden md:inline">Markdown Weaver</span>
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
            <DropdownMenuItem onClick={() => navigate('/dashboard')}>
              <FileCode2 size={14} className="mr-2" />
              Back to Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/about')}>
              <FileCode2 size={14} className="mr-2" />
              About
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/privacy')}>
              <Shield size={14} className="mr-2" />
              Privacy Policy
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Master Markdown in Minutes
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Your quick reference to writing beautiful, formatted documents with simple syntax.
          </p>
        </div>

        {/* Important Notice */}
        <div className="mb-10 p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-destructive flex-shrink-0 mt-0.5" size={20} />
            <div>
              <h3 className="font-semibold text-foreground mb-1">Important Notice</h3>
              <p className="text-sm text-muted-foreground">
                Your content is stored in your browser's <strong>IndexedDB</strong> for high performance and reliability. However, if you clear your browser data/site data,
                <strong className="text-foreground"> all saved content will be permanently deleted</strong>.
                Shared preview links encode content in the URL and will expire if the link is lost or too long for browsers to handle.
                <strong className="text-foreground"> Please regularly use the "Export Backup" feature in Settings</strong> to save your work to your device.
              </p>
            </div>
          </div>
        </div>

        {/* Command Center */}
        <Section icon={<Command size={20} />} title="Command Center">
          <p className="text-muted-foreground mb-4">
            Access powerful tools and navigation instantly with the Command Center.
            Press <kbd className="px-1.5 py-0.5 bg-muted border border-border rounded text-xs font-mono">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 bg-muted border border-border rounded text-xs font-mono">K</kbd> to open.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-muted rounded-lg p-4 border border-border">
              <h4 className="font-semibold text-foreground mb-2">Features</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Switch View Modes (Editor, Split, Preview, Mind Map)</li>
                <li>Toggle Theme (Dark/Light)</li>
                <li>Export Documents (Markdown, HTML)</li>
                <li>Navigate Pages (Dashboard, Settings)</li>
                <li>Toggle Presentation Mode</li>
              </ul>
            </div>
            <div className="bg-muted rounded-lg p-4 border border-border">
              <h4 className="font-semibold text-foreground mb-2">Quick Actions</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li><code className="text-xs bg-background px-1 py-0.5 rounded border border-border">Type "View"</code> to filter view modes</li>
                <li><code className="text-xs bg-background px-1 py-0.5 rounded border border-border">Type "Export"</code> to see export options</li>
                <li><code className="text-xs bg-background px-1 py-0.5 rounded border border-border">Type "Theme"</code> to toggle dark mode</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Data Backup & Restore */}
        <Section icon={<Database size={20} />} title="Data Backup & Restore">
          <p className="text-muted-foreground mb-4">
            Markdown Weaver stores your data locally. To prevent data loss or to move your work to another device, use the Import/Export feature.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-muted rounded-lg p-4 border border-border">
              <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <span className="bg-primary/20 text-primary rounded px-2 py-0.5 text-xs">EXPORT</span>
                Backing Up
              </h4>
              <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                <li>Go to <strong>Settings</strong> (gear icon).</li>
                <li>Switch to the <strong>General</strong> tab.</li>
                <li>Click <strong>Export Backup</strong>.</li>
                <li>Save the <code>.json</code> file to your device.</li>
              </ol>
            </div>
            <div className="bg-muted rounded-lg p-4 border border-border">
              <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <span className="bg-green-500/20 text-green-600 rounded px-2 py-0.5 text-xs">IMPORT</span>
                Restoring
              </h4>
              <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                <li>Go to <strong>Settings</strong> &gt; <strong>General</strong>.</li>
                <li>Click <strong>Import Backup</strong>.</li>
                <li>Select your backup file.</li>
                <li>Confirm to overwrite and restore data.</li>
              </ol>
            </div>
          </div>
        </Section>

        {/* Keyboard Shortcuts */}
        <Section icon={<Keyboard size={20} />} title="Keyboard Shortcuts">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <ShortcutItem keys={['Ctrl', 'Z']} description="Undo change" />
            <ShortcutItem keys={['Ctrl', 'Y']} description="Redo change" />
            <ShortcutItem keys={['Ctrl', 'K']} description="Open Command Center" />
            <ShortcutItem keys={['Tab']} description="Insert indentation" />
          </div>
        </Section>

        {/* Headings */}
        <Section icon={<Heading size={20} />} title="Headings">
          <p className="text-muted-foreground mb-4">
            Create headings using <code className="code-inline">#</code> symbols. More symbols = smaller heading.
          </p>
          <ExampleGrid
            examples={[
              { code: '# Heading 1', result: 'Largest heading' },
              { code: '## Heading 2', result: 'Section heading' },
              { code: '### Heading 3', result: 'Subsection' },
            ]}
          />
        </Section>

        {/* Text Formatting */}
        <Section icon={<Bold size={20} />} title="Text Formatting">
          <p className="text-muted-foreground mb-4">
            Add emphasis to your text with these simple patterns:
          </p>
          <ExampleGrid
            examples={[
              { code: '**bold text**', result: <strong>bold text</strong> },
              { code: '*italic text*', result: <em>italic text</em> },
              { code: '~~strikethrough~~', result: <s>strikethrough</s> },
              { code: '`inline code`', result: <code className="code-inline">inline code</code> },
            ]}
          />
        </Section>

        {/* Links */}
        <Section icon={<Link size={20} />} title="Links">
          <p className="text-muted-foreground mb-4">
            Create clickable links with descriptive text:
          </p>
          <CodeBlock
            code={`[Click here](https://example.com)
[With tooltip](https://example.com "Hover text")
https://auto-linked.com`}
          />
        </Section>

        {/* Lists */}
        <Section icon={<List size={20} />} title="Lists">
          <p className="text-muted-foreground mb-4">
            Organize information with bullet points, numbers, or checkboxes:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium text-foreground mb-2 text-sm">Bullets</h4>
              <CodeBlock code={`- Item one\n- Item two\n  - Nested`} />
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2 text-sm">Numbered</h4>
              <CodeBlock code={`1. First\n2. Second\n3. Third`} />
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2 text-sm">Checkboxes</h4>
              <CodeBlock code={`- [x] Done\n- [ ] To do`} />
            </div>
          </div>
        </Section>

        {/* Code Blocks */}
        <Section icon={<Code size={20} />} title="Code Blocks">
          <p className="text-muted-foreground mb-4">
            Share code with syntax highlighting by specifying the language:
          </p>
          <CodeBlock
            code={`\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

\`\`\`python
def greet(name):
    return f"Hello, {name}!"
\`\`\``}
          />
          <p className="text-xs text-muted-foreground mt-2">
            Tip: Each code block in preview has a copy button in the top-right corner!
          </p>
        </Section>

        {/* Tables */}
        <Section icon={<Table size={20} />} title="Tables">
          <p className="text-muted-foreground mb-4">
            Create structured data tables with alignment options:
          </p>
          <CodeBlock
            code={`| Name    | Role      | Status |
|---------|-----------|--------|
| Alice   | Developer | Active |
| Bob     | Designer  | Away   |

Alignment:
| Left    | Center  | Right |
|:--------|:-------:|------:|
| L       |    C    |     R |`}
          />
        </Section>

        {/* Blockquotes */}
        <Section icon={<Quote size={20} />} title="Blockquotes">
          <p className="text-muted-foreground mb-4">
            Highlight important quotes or callouts:
          </p>
          <CodeBlock
            code={`> This is a quote.
> It can span multiple lines.

> Nested quotes:
>> Are also supported!`}
          />
        </Section>

        {/* Images */}
        <Section icon={<Image size={20} />} title="Images">
          <p className="text-muted-foreground mb-4">
            Embed images with alt text for accessibility:
          </p>
          <CodeBlock
            code={`![Description](https://example.com/image.png)
![Photo](./photo.jpg "Optional caption")`}
          />
        </Section>

        {/* Horizontal Rule */}
        <Section icon={<Minus size={20} />} title="Horizontal Rule">
          <p className="text-muted-foreground mb-4">
            Add visual separators between sections:
          </p>
          <ExampleGrid
            examples={[
              { code: '---', result: 'Three dashes' },
              { code: '***', result: 'Three asterisks' },
              { code: '___', result: 'Three underscores' },
            ]}
          />
        </Section>

        {/* Math Equations */}
        <Section icon={<Calculator size={20} />} title="Math Equations (LaTeX)">
          <p className="text-muted-foreground mb-4">
            Write beautiful mathematical formulas:
          </p>
          <CodeBlock
            code={`Inline: $E = mc^2$

Block equation:
$$
\\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}
$$`}
          />
        </Section>

        {/* Diagrams */}
        <Section icon={<GitBranch size={20} />} title="Diagrams (Mermaid)">
          <p className="text-muted-foreground mb-4">
            Create flowcharts, sequence diagrams, and more:
          </p>
          <CodeBlock
            code={`\`\`\`mermaid
graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action]
    B -->|No| D[End]
\`\`\`

\`\`\`mermaid
pie title Usage
    "Feature A" : 40
    "Feature B" : 35
    "Feature C" : 25
\`\`\``}
          />
        </Section>

        {/* Advanced Features */}
        <Section icon={<MonitorPlay size={20} />} title="Presentation & Mind Map">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="flex items-center gap-2 font-bold mb-2">
                <MonitorPlay className="w-4 h-4 text-primary" /> AI Presentation Mode
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Turn your document into a slide deck instantly. Ask the AI Assistant to "Create a presentation about..." or use <code className="code-inline">---</code> to separate slides manually.
              </p>
              <CodeBlock code={`# Slide 1
Content...

---

# Slide 2
More content...`} />
            </div>

            <div>
              <h3 className="flex items-center gap-2 font-bold mb-2">
                <Network className="w-4 h-4 text-primary" /> Mind Map View
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Visualize your document structure.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                <li>Headings become main nodes</li>
                <li>Lists become branches</li>
                <li>Click <strong>Network Icon</strong> in toolbar to toggle</li>
              </ul>
            </div>
          </div>

        </Section>

        {/* Magic Tools */}
        <Section icon={<Sparkles size={20} />} title="Magic Tools">
          <p className="text-muted-foreground mb-4">
            Select any text to reveal the Magic Tools menu – your AI writing assistant.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-muted rounded-lg p-4 border border-border">
              <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <Sparkles size={16} className="text-purple-500" /> Continue Writing
              </h4>
              <p className="text-sm text-muted-foreground">AI analyzes your text and writes the next few sentences for you.</p>
            </div>
            <div className="bg-muted rounded-lg p-4 border border-border">
              <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <Shield size={16} className="text-blue-500" /> Fix Grammar
              </h4>
              <p className="text-sm text-muted-foreground">Instantly corrects spelling and grammatical errors.</p>
            </div>
            <div className="bg-muted rounded-lg p-4 border border-border">
              <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <Zap size={16} className="text-yellow-500" /> Improve Clarity
              </h4>
              <p className="text-sm text-muted-foreground">Rewrites complex sentences to be more readable and concise.</p>
            </div>
            <div className="bg-muted rounded-lg p-4 border border-border">
              <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <User size={16} className="text-green-500" /> Change Tone
              </h4>
              <p className="text-sm text-muted-foreground">Switch between <strong>Professional</strong> and <strong>Casual</strong> tones.</p>
            </div>
            <div className="bg-muted rounded-lg p-4 border border-border md:col-span-2">
              <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <MessageSquare size={16} className="text-primary" /> Ask AI
              </h4>
              <p className="text-sm text-muted-foreground">Type your own instructions (e.g., "Translate to Spanish", "Make it funnier").</p>
            </div>
          </div>
        </Section>

        {/* Real-Time Sync */}
        <Section icon={<Network size={20} />} title="Real-Time Synchronization">
          <p className="text-muted-foreground mb-4">
            Markdown Weaver automatically keeps your work in sync across multiple tabs:
          </p>
          <ul className="text-sm text-muted-foreground space-y-2 list-disc ml-4">
            <li><strong>Multi-Tab Editing:</strong> Open the same document in multiple tabs or windows. Changes in one are instantly reflected in others.</li>
            <li><strong>Dashboard Updates:</strong> Creating, renaming, or deleting files in one tab updates your Dashboard everywhere immediately.</li>
            <li><strong>Safety Limits:</strong> If you delete a file in the Dashboard, any open editors for that file will alert you to prevent accidental data loss.</li>
          </ul>
        </Section>

        {/* Footer */}
        <Footer showBackToEditor={true} showAbout={true} showHelp={false} showPrivacy={true} />
      </main >
      <GitHubStarCTA />
    </div >
  );
};

interface SectionProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ icon, title, children }) => (
  <section className="mb-10">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-primary/10 rounded-lg text-primary">
        {icon}
      </div>
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
    </div>
    {children}
  </section>
);

interface ExampleGridProps {
  examples: Array<{ code: string; result: React.ReactNode }>;
}

const ExampleGrid: React.FC<ExampleGridProps> = ({ examples }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
    {examples.map((ex, i) => (
      <div key={i} className="bg-muted rounded-lg p-3 border border-border">
        <code className="text-sm font-mono text-primary block mb-2">{ex.code}</code>
        <div className="text-sm text-foreground">{ex.result}</div>
      </div>
    ))}
  </div>
);

interface CodeBlockProps {
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => (
  <pre className="bg-muted rounded-lg p-4 overflow-x-auto text-sm font-mono text-foreground border border-border">
    <code>{code}</code>
  </pre>
);

interface ShortcutItemProps {
  keys: string[];
  description: string;
}

const ShortcutItem: React.FC<ShortcutItemProps> = ({ keys, description }) => (
  <div className="flex items-center justify-between bg-muted rounded-lg px-3 py-2 border border-border">
    <span className="text-sm text-muted-foreground">{description}</span>
    <div className="flex items-center gap-1">
      {keys.map((key, i) => (
        <React.Fragment key={i}>
          <kbd className="px-2 py-1 bg-background rounded text-xs font-mono border border-border">
            {key}
          </kbd>
          {i < keys.length - 1 && <span className="text-muted-foreground text-xs">+</span>}
        </React.Fragment>
      ))}
    </div>
  </div>
);

export default Help;