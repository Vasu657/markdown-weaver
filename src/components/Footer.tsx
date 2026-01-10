import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileCode2, HelpCircle, Shield, Heart } from 'lucide-react';

interface FooterProps {
  showBackToEditor?: boolean;
  showAbout?: boolean;
  showHelp?: boolean;
  showPrivacy?: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  showBackToEditor = true,
  showAbout = true,
  showHelp = true,
  showPrivacy = true,
}) => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const handleBackToEditor = () => navigate('/');
  const handleAbout = () => navigate('/about');
  const handleHelp = () => navigate('/help');
  const handlePrivacy = () => navigate('/privacy');

  return (
    <footer className="mt-12 pt-6 border-t border-border/50 bg-background/50 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-4">
        {/* Navigation Section - Horizontal layout with left/right alignment, responsive */}
        <nav className="flex flex-row items-center justify-between gap-4 pb-6 flex-wrap">
          {/* Back Button - Always left-aligned, icon-only on mobile */}
          {showBackToEditor && (
            <Button
              onClick={handleBackToEditor}
              variant="outline"
              className="gap-2 px-3 py-2 text-xs sm:text-sm font-medium transition-all duration-200 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] border-border/60 flex-shrink-0"
              aria-label="Back to Editor"
            >
              <ArrowLeft size={14} className="shrink-0" />
              <span className="hidden sm:inline">Back to Editor</span>
            </Button>
          )}

          {/* Secondary Links - Right-aligned, horizontal on all screens with responsive text/icon sizing */}
          <div className="flex flex-row justify-end gap-1 sm:gap-2 flex-wrap w-auto">
            {showAbout && (
              <Button
                onClick={handleAbout}
                variant="ghost"
                size="sm"
                className="gap-1 px-2 py-1.5 text-xs sm:text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:shadow-sm flex-shrink-0"
                aria-label="About Markdown Weaver"
              >
                <FileCode2 size={12} className="shrink-0 sm:w-4 sm:h-4" />
                <span>About</span>
              </Button>
            )}
            {showHelp && (
              <Button
                onClick={handleHelp}
                variant="ghost"
                size="sm"
                className="gap-1 px-2 py-1.5 text-xs sm:text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:shadow-sm flex-shrink-0"
                aria-label="Help & Support"
              >
                <HelpCircle size={12} className="shrink-0 sm:w-4 sm:h-4" />
                <span>Help</span>
              </Button>
            )}
            {showPrivacy && (
              <Button
                onClick={handlePrivacy}
                variant="ghost"
                size="sm"
                className="gap-1 px-2 py-1.5 text-xs sm:text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:shadow-sm flex-shrink-0"
                aria-label="Privacy Policy"
              >
                <Shield size={12} className="shrink-0 sm:w-4 sm:h-4" />
                <span>Privacy</span>
              </Button>
            )}
          </div>
        </nav>

        {/* Copyright Section - Subtle divider and elegant layout, responsive */}
        <div className="pt-4 border-t border-border/30">
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 text-xs text-muted-foreground">
            <span className="order-2 sm:order-1">
              © {currentYear} Markdown Weaver. All rights reserved.
            </span>
            <span className="hidden sm:inline order-2">•</span>
            <div className="flex items-center gap-1 order-1 sm:order-2 text-xs">
              <span className="hidden sm:inline">Built with</span>
              <Heart size={10} className="text-destructive fill-current sm:w-3 sm:h-3" />
              <span className="hidden sm:inline">by</span>
              <a
                href="http://vasughanta.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary underline decoration-dotted transition-colors duration-200 font-medium"
                aria-label="Vasu Ghanta's Portfolio"
              >
                Vasu Ghanta
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};