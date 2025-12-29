import React from 'react';
import {
  ArrowLeft,
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
  Shield
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Help: React.FC = () => {
  const navigate = useNavigate();

  // Remove ArrowLeft import as it's no longer needed

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b border-border px-4 py-6">
        <div className="max-w-4xl mx-auto flex justify-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Help & Documentation</h1>
        </div>
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
                Your content is saved locally in your browser. If you clear your browser cookies, cache, or local storage, 
                <strong className="text-foreground"> all saved content will be permanently deleted</strong>. 
                Shared preview links encode content in the URL and will expire if the link is lost or too long for browsers to handle.
                <strong className="text-foreground"> Always export important documents</strong> using the download feature.
              </p>
            </div>
          </div>
        </div>

        {/* Keyboard Shortcuts */}
        <Section icon={<Keyboard size={20} />} title="Keyboard Shortcuts">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <ShortcutItem keys={['Ctrl', 'Z']} description="Undo last change" />
            <ShortcutItem keys={['Ctrl', 'Y']} description="Redo last change" />
            <ShortcutItem keys={['Tab']} description="Insert indentation" />
            <ShortcutItem keys={['Ctrl', 'Shift', 'Z']} description="Redo (alternative)" />
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

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Button onClick={() => navigate('/')} variant="outline" className="gap-2 w-full sm:w-auto">
              <ArrowLeft size={16} />
              Back to Editor
            </Button>
            <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
              <Button onClick={() => navigate('/about')} variant="outline" className="gap-2 w-full sm:w-auto">
                <FileCode2 size={16} />
                About
              </Button>
              <Button variant="outline" onClick={() => navigate('/privacy')} className="gap-2 w-full sm:w-auto">
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