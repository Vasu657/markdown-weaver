import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotifications, NotificationType } from '@/hooks/useNotifications';
import { useTheme } from '@/hooks/useTheme';
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
  Bell,
  Sun,
  Moon,
  MoreHorizontal,
  FileCode2,
  HelpCircle,
  Zap,
  Star,
  ShieldCheck,
  Info,
  ArrowRight,
  Sparkles,
  Rocket
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const { notifications } = useNotifications();
  const { theme, toggleTheme } = useTheme();

  // Highlight the most recent 'announcement' as the "Hero" update
  const heroNotification = notifications.find(n => n.type === 'announcement') || notifications[0];
  const otherNotifications = notifications.filter(n => n.id !== heroNotification?.id);

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'announcement':
        return <Rocket className="w-5 h-5 text-indigo-500" />;
      case 'update':
        return <Zap className="w-5 h-5 text-amber-500" />;
      case 'alert':
        return <ShieldCheck className="w-5 h-5 text-emerald-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const smallIconSize = 16;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      {/* Header - Kept exactly as requested */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50 flex items-center gap-1 px-4 py-3 shadow-sm">
        <div className="flex items-center gap-2 mr-4 flex-shrink-0 cursor-pointer" onClick={() => navigate('/')}>
          <div className="bg-primary/10 p-1.5 rounded-lg">
            <FileCode2 size={20} className="text-primary" />
          </div>
          <span className="font-bold text-base tracking-tight hidden md:inline">Markdown Weaver</span>
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted" aria-label="Notifications">
                <Bell size={smallIconSize} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Notifications</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full hover:bg-muted"
                aria-label={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              >
                {theme === 'dark' ? <Sun size={smallIconSize} /> : <Moon size={smallIconSize} />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </TooltipContent>
          </Tooltip>

          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted" aria-label="More actions">
                    <MoreHorizontal size={smallIconSize} />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent side="bottom">More</TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="end" className="w-56 p-2">
              <DropdownMenuItem onClick={() => navigate('/dashboard')} className="cursor-pointer rounded-md">
                <FileCode2 size={16} className="mr-2 opacity-70" />
                Back to Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/about')} className="cursor-pointer rounded-md">
                <FileCode2 size={16} className="mr-2 opacity-70" />
                About
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/help')} className="cursor-pointer rounded-md">
                <HelpCircle size={16} className="mr-2 opacity-70" />
                Help & Syntax Guide
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

      </header>

      <main className="container max-w-5xl mx-auto px-4 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center space-y-2"
        >
          <Badge variant="outline" className="mb-2 py-1 px-3 border-primary/20 text-primary bg-primary/5 rounded-full">
            <Sparkles size={12} className="mr-1 inline-block" /> What's New
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">
            Latest Updates
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Stay updated with the latest features, improvements, and announcements from Markdown Weaver.
          </p>
        </motion.div>

        {/* Hero Notification */}
        {heroNotification && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="mb-16 relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card shadow-2xl">
              <div className="grid md:grid-cols-5 gap-0">
                <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-center space-y-6">
                  <div className="flex items-center space-x-3">
                    <Badge className="bg-indigo-500/10 text-indigo-600 hover:bg-indigo-500/20 border-indigo-200 dark:border-indigo-800 dark:text-indigo-300 px-3 py-1">
                      New Release
                    </Badge>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                    {heroNotification.title}
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {heroNotification.message}
                  </p>
                  <div className="pt-4">
                    <Button
                      size="lg"
                      className="rounded-full shadow-lg hover:shadow-xl transition-all group-hover:translate-x-1"
                      onClick={() => navigate('/announcements/v1.3.0')}
                    >
                      Read Full details <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>
                <div className="md:col-span-2 bg-muted/30 relative min-h-[200px] md:min-h-full flex items-center justify-center overflow-hidden">
                  {/* Decorative Background Elements */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
                  <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl"></div>

                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                    className="relative z-10 p-6"
                  >
                    <Rocket size={80} className="text-foreground/80 drop-shadow-2xl" strokeWidth={1} />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <Separator className="my-12 opacity-50" />

        {/* Timeline / Feed */}
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <div className="h-6 w-1 bg-primary rounded-full"></div>
              Recent Activity
            </h3>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            {otherNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                variants={item}
                className="group relative flex gap-6 p-1 rounded-xl transition-all"
              >
                {/* Timeline Line */}
                {index !== otherNotifications.length - 1 && (
                  <div className="absolute left-[26px] top-12 bottom-[-24px] w-[2px] bg-border/40 group-hover:bg-primary/20 transition-colors"></div>
                )}

                <div className="flex-shrink-0 relative z-10 px-2 pt-1">
                  <div className="w-12 h-12 rounded-2xl bg-muted/50 border border-border group-hover:border-primary/30 group-hover:bg-primary/5 flex items-center justify-center transition-all duration-300 shadow-sm">
                    {getIcon(notification.type)}
                  </div>
                </div>

                <div className="flex-1 pb-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                    <h4 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {notification.title}
                    </h4>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    {notification.message}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-[10px] uppercase tracking-wider font-semibold opacity-70">
                      {notification.type}
                    </Badge>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {otherNotifications.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>No recent activity to show.</p>
            </div>
          )}
        </div>
      </main>

      <Footer showBackToEditor={true} showAbout={true} showHelp={true} showPrivacy={true} />
    </div>
  );
};

export default Notifications;