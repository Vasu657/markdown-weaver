import React from 'react';
import { ArrowLeft, FileCode2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Help: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-toolbar-bg border-b border-toolbar-border px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            <span className="hidden sm:inline">Back to Editor</span>
          </Button>
          <div className="flex items-center gap-2">
            <FileCode2 size={22} className="text-primary" />
            <span className="font-bold text-foreground">MarkdownPro Help</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-6">Markdown Guide</h1>
        <p className="text-muted-foreground mb-8">
          Learn how to write Markdown with this quick reference guide.
        </p>

        {/* Headings */}
        <Section title="Headings">
          <CodeExample
            code={`# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6`}
          />
        </Section>

        {/* Text Formatting */}
        <Section title="Text Formatting">
          <CodeExample
            code={`**Bold text**
*Italic text*
***Bold and italic***
~~Strikethrough~~
\`inline code\``}
          />
        </Section>

        {/* Links */}
        <Section title="Links">
          <CodeExample
            code={`[Link text](https://example.com)
[Link with title](https://example.com "Title")
https://auto-linked.com`}
          />
        </Section>

        {/* Lists */}
        <Section title="Lists">
          <CodeExample
            code={`Unordered list:
- Item 1
- Item 2
  - Nested item

Ordered list:
1. First item
2. Second item
3. Third item

Task list:
- [x] Completed task
- [ ] Incomplete task`}
          />
        </Section>

        {/* Code Blocks */}
        <Section title="Code Blocks">
          <CodeExample
            code={`Inline: \`const x = 1;\`

Block with syntax highlighting:
\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

\`\`\`python
def hello():
    print("Hello, World!")
\`\`\``}
          />
        </Section>

        {/* Tables */}
        <Section title="Tables">
          <CodeExample
            code={`| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |

Alignment:
| Left | Center | Right |
|:-----|:------:|------:|
| L    |   C    |     R |`}
          />
        </Section>

        {/* Blockquotes */}
        <Section title="Blockquotes">
          <CodeExample
            code={`> This is a blockquote.
> It can span multiple lines.

> Nested blockquotes:
>> Are also supported.`}
          />
        </Section>

        {/* Images */}
        <Section title="Images">
          <CodeExample
            code={`![Alt text](https://example.com/image.png)
![Alt text](image.png "Optional title")`}
          />
        </Section>

        {/* Horizontal Rule */}
        <Section title="Horizontal Rule">
          <CodeExample
            code={`---
or
***
or
___`}
          />
        </Section>

        {/* Math Equations */}
        <Section title="Math Equations (LaTeX)">
          <CodeExample
            code={`Inline math: $E = mc^2$

Block math:
$$
\\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}
$$

$$
\\int_{0}^{\\infty} e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}
$$`}
          />
        </Section>

        {/* Diagrams */}
        <Section title="Diagrams (Mermaid)">
          <CodeExample
            code={`\`\`\`mermaid
graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action 1]
    B -->|No| D[Action 2]
    C --> E[End]
    D --> E
\`\`\`

\`\`\`mermaid
sequenceDiagram
    Alice->>Bob: Hello Bob!
    Bob-->>Alice: Hi Alice!
\`\`\`

\`\`\`mermaid
pie title Pets
    "Dogs" : 386
    "Cats" : 85
    "Birds" : 15
\`\`\``}
          />
        </Section>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-border text-center">
          <Button onClick={() => navigate('/')} className="gap-2">
            <ArrowLeft size={16} />
            Back to Editor
          </Button>
        </div>
      </main>
    </div>
  );
};

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <section className="mb-8">
    <h2 className="text-xl font-semibold text-foreground mb-3 pb-2 border-b border-border">
      {title}
    </h2>
    {children}
  </section>
);

interface CodeExampleProps {
  code: string;
}

const CodeExample: React.FC<CodeExampleProps> = ({ code }) => (
  <pre className="bg-muted rounded-lg p-4 overflow-x-auto text-sm font-mono text-foreground">
    <code>{code}</code>
  </pre>
);

export default Help;
