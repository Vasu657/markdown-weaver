import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotifications, NotificationType } from '@/hooks/useNotifications';
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Bell,
  AlertCircle,
  Lightbulb,
  MessageSquare,
  Sun,
  Moon,
  MoreHorizontal,
  FileCode2,
  HelpCircle,
  ArrowLeft,
  Shield,
} from 'lucide-react';

const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const { notifications } = useNotifications();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<'all' | 'updates' | 'messages'>('all');

  const getNotificationStyles = (type: NotificationType) => {
    switch (type) {
      case 'announcement':
        return {
          bg: 'bg-indigo-50 dark:bg-indigo-950/30',
          border: 'border-indigo-200 dark:border-indigo-800',
          icon: <MessageSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
          badge: 'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200',
        };
      case 'update':
        return {
          bg: 'bg-green-50 dark:bg-green-950/30',
          border: 'border-green-200 dark:border-green-800',
          icon: <Lightbulb className="w-5 h-5 text-green-600 dark:text-green-400" />,
          badge: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
        };
      case 'alert':
        return {
          bg: 'bg-amber-50 dark:bg-amber-950/30',
          border: 'border-amber-200 dark:border-amber-800',
          icon: <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
          badge: 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200',
        };
      default:
        return {
          bg: 'bg-gray-50 dark:bg-gray-950/30',
          border: 'border-gray-200 dark:border-gray-800',
          icon: <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />,
          badge: 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200',
        };
    }
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'updates') return notification.type === 'update';
    if (activeTab === 'messages') return notification.type === 'announcement';
    return true;
  });

  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const smallIconSize = 16;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-toolbar-bg border-b border-toolbar-border flex items-center gap-1 px-2 sm:px-3 py-2">
        <div className="flex items-center gap-1.5 mr-1 sm:mr-3 flex-shrink-0">
          <FileCode2 size={20} className="text-primary" />
          <span className="font-bold text-sm text-foreground hidden md:inline">Markdown Weaver</span>
        </div>

        <div className="flex-1" />

        <Tooltip>
          <TooltipTrigger asChild>
            <button className="toolbar-btn" aria-label="Notifications">
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
      </header>

      <main className="w-full">
        <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 border-b border-border">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">Notifications</h1>
          <p className="text-sm text-muted-foreground">
            {filteredNotifications.length > 0 ? `You have ${filteredNotifications.length} notification${filteredNotifications.length !== 1 ? 's' : ''}` : 'No notifications'}
          </p>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'all' | 'updates' | 'messages')} className="mt-6">
            <TabsList className="mx-auto w-fit">
              <TabsTrigger value="all" className="px-3 py-2 text-sm">All</TabsTrigger>
              <TabsTrigger value="updates" className="px-3 py-2 text-sm">Updates</TabsTrigger>
              <TabsTrigger value="messages" className="px-3 py-2 text-sm">Messages</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab} className="mt-6">
              {filteredNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Bell className="w-12 h-12 text-muted-foreground/50 mb-4" />
                  <h2 className="text-xl font-semibold text-foreground mb-2">All caught up!</h2>
                  <p className="text-muted-foreground max-w-sm">
                    You have no new notifications at the moment. Check back later for updates.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredNotifications.map((notification) => {
                    const styles = getNotificationStyles(notification.type);
                    return (
                      <div
                        key={notification.id}
                        className={`rounded-xl border ${styles.border} ${styles.bg} p-4 transition-colors shadow-sm`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-0.5">{styles.icon}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1.5">
                              <h3 className="text-base font-semibold text-foreground flex-1">
                                {notification.title}
                              </h3>
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles.badge} capitalize whitespace-nowrap`}
                              >
                                {notification.type}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground font-medium">
                              {formatTimeAgo(notification.timestamp)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <Footer showBackToEditor={true} showAbout={true} showHelp={true} showPrivacy={true} />
      </main>
    </div>
  );
};

export default Notifications;