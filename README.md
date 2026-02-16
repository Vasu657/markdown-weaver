# Markdown Weaver

A powerful, real-time Markdown editor with live preview and advanced features. Write faster, preview smarter, and create beautifully formatted documents with ease.

**🌐 [Live Demo](https://markdown-weaver.netlify.app/)**

---

## 🚀 Latest Updates (v1.3.0)

### Major Features
- **Project Dashboard**: A new central hub to manage all your markdown projects, with folders, search, and favorites.
- **Presentation Mode**: Turn your markdown documents into beautiful slide decks instantly. Supports both manual (`---` separator) and **AI Smart Slide Generation**.
- **Mind Map View**: Visualize your ideas with automatic mind map generation from your markdown structure.
- **Templates**: Jumpstart your writing with built-in templates for blogs, meeting notes, planning, and more.
- **Floating Magic Menu**: Select any text to instantly access AI tools like "Continue Writing", "Fix Grammar", "Improve Clarity", and "Change Tone".

### Minor Enhancements & Fixes
- **Drag & Drop Import**: Drag `.md`, `.markdown`, or `.txt` files directly into the editor to import them.
- **Cross-Tab Synchronization**: Real-time updates across multiple tabs; changes in one tab reflect instantly in others.
- **Graceful Error Handling**: Robust error boundaries prevent the app from crashing during rendering errors.
- **Smart Mobile View**: Improved sidebar and touch-friendly controls for mobile devices.
- **Legacy Data Migration**: Automatically detects and migrates older data formats to the new storage system.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Key Features Explained](#key-features-explained)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Browser Support](#browser-support)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## ✨ Features

### Core Editor
- **Real-time Preview** - Live preview as you type with instant rendering
- **GitHub-Flavored Markdown (GFM)** - Support for standard GFM syntax (tables, checklists, etc.)
- **Syntax Highlighting** - Beautiful code highlighting for almost any language
- **Line Numbers** - Toggleable line numbers for code-like editing
- **Undo/Redo** - Robust history management with `Ctrl+Z` / `Ctrl+Y` support
- **Font Size Control** - Adjust editor font size for comfort
- **Sync Scroll** - Synchronized scrolling between editor and preview panes

### Data & Management
- **Local Storage Auto-save** - Never lose work; content saves automatically to browser storage.
- **Project Dashboard** - Create, rename, delete, and organizing multiple documents.
- **Search & Filter** - Quickly find projects by title or content.
- **Favorites** - Pin important documents to the top.
- **Trash & Restore** - Safely recover deleted files from the trash bin.
- **Backup & Restore** - Export your entire workspace to JSON and restore it on another device.
- **Drag & Drop Import** - Easy file import.

### 🤖 AI Powered Tools (OpenRouter)
- **Bring Your Own Key** - Securely use your own OpenRouter API key (stored locally).
- **Free Model Support** - Access to free models like Gemini, Claude, and Llama.
- **Smart Refactoring** - Grammar checks, tone adjustments, and clarity improvements.
- **Context-Aware Autocomplete** - Let AI finish your sentences based on previous context.
- **Chat Assistant** - specialized sidebar for discussing your document with AI.

### Visualization & Export
- **Presentation Mode** - Convert documents to slides. **New: AI Smart Generation** based on content.
- **Mind Map View** - Interactive node-based visualization of document headers.
- **Export Formats**:
    - **Markdown (.md)**
    - **Styled HTML (.html)** - Includes CSS for immediate publishing.
    - **PDF** - Print-ready documents.
    - **SVG** - Vector export of Mind Maps.

### UI & Customization
- **Dark/Light Mode** - System-aware theme toggling.
- **Responsive Design** - Optimized layouts for Desktop, Tablet, and Mobile.
- **Table of Contents** - Auto-generated floating TOC for long documents.
- **Toast Notifications** - Non-intrusive alerts for actions (save, export, error).
- **Confetti Effects** - Fun celebrations for milestones (like subscribing).

---

## 🛠 Tech Stack

**Frontend Framework:**
- React 18.3
- TypeScript 5.8
- Vite 5.4

**UI & Styling:**
- Tailwind CSS 3.4
- Shadcn/ui (Radix UI primitives)
    - Accordion, Dialog, Sheet, Sidebar, Popover, Select, Tabs, Switch, and more.
- Lucide React (Icons)
- Framer Motion (Animations)
- Canvas Confetti (Visual effects)
- Sonner (Toast notifications)

**Markdown & Parsing:**
- **react-markdown** - Core renderer
- **remark-gfm** - GitHub Flavored Markdown support
- **rehype-highlight** - Code syntax highlighting
- **rehype-katex** - LaTeX math rendering
- **rehype-raw** - HTML parsing support
- **Mermaid** - Diagram and chart rendering
- **markmap** - Mindmap visualization

**State & Logic:**
- **React Router DOM** - Client-side routing
- **TanStack React Query** - Async state management
- **Zod** - Schema validation
- **React Hook Form** - Form management
- **File Saver** - Client-side file downloads

---

## 📦 Installation
... (Same as before)

---

## 🎯 Usage

### Keyboard Shortcuts

| Action | Shortcut | Description |
|--------|----------|-------------|
| **Save** | `Ctrl/Cmd + S` | Manually trigger save (Auto-save is always on) |
| **Bold** | `Ctrl/Cmd + B` | Make selected text bold |
| **Italic** | `Ctrl/Cmd + I` | Make selected text italic |
| **Code** | `Ctrl/Cmd + K` | Format as inline code |
| **Link** | `Ctrl/Cmd + L` | Insert a link |
| **Presentation** | `Alt + P` | Toggle Presentation Mode |
| **Menu** | `Ctrl/Cmd + /` | Open Help/Shortcuts menu |

### Advanced Tips
- **AI Chat**: Open the sidebar to chat with your document context.
- **Mind Map Zoom**: Use scroll wheel to zoom in/out of mind maps.
- **Smart Slides**: In the presentation menu, choose "Smart Generate" to let AI organize your slides instead of manually adding `---`.

---

## 📁 Project Structure

```
markdown-weaver/
├── src/
│   ├── components/
│   │   ├── ui/              # 40+ Shadcn UI components
│   │   ├── Editor.tsx       # Core TextArea with line numbers
│   │   ├── Preview.tsx      # Markdown renderer (React-Markdown)
│   │   ├── MindMapView.tsx  # Markmap integration
│   │   ├── Toolbar.tsx      # Main action bar
│   │   ├── SettingsDialog.tsx # AI & App configuration
│   │   ├── ChatSidebar.tsx   # AI Assistant interface
│   │   └── ...
│   ├── pages/
│   │   ├── Dashboard.tsx    # File management & grid view
│   │   ├── Presentation.tsx # Slide rendering logic
│   │   └── ...
│   ├── lib/
│   │   ├── file_storage.ts  # LocalStorage CRUD wrapper
│   │   ├── ai-service.ts    # OpenRouter API client
│   │   ├── export_import.ts # JSON backup logic
│   │   └── ...
│   └── hooks/               # Custom hooks (useAutoSave, useHistory, etc.)
```

---

## 🤝 Contributing & Support
... (Same as before)
