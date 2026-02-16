import { createContext, useContext, useState, ReactNode } from 'react';

export type NotificationType = 'announcement' | 'update' | 'alert';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: Date;
}

interface NotificationsContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(
  undefined
);

export const NotificationsProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'v1.3.0 - Visualizations & Mind Maps',
      message: 'New features unlocked! Visualize your documents with the new Mind Map view and present like a pro with AI Presentation Mode.',
      type: 'announcement',
      timestamp: new Date(),
    },
    {
      id: 'magic-tools-launch',
      title: '✨ Meet the Magic Tools',
      message: 'Write faster and better with our new AI-powered Magic Tools. Fix grammar, change tone, or ask AI to write for you! Select any text to get started.',
      type: 'announcement',
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    },
    {
      id: '4',
      title: 'Fresh New Look Updated',
      message: 'We\'ve updated the interface with a fresh new look. Check it out and let us know what you think!',
      type: 'announcement',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    },
    {
      id: '2',
      title: 'v1.2.1 - Privacy & Bug Fixes',
      message: 'This patch release focuses on privacy improvements, settings updates, and bug fixes to improve stability and compliance.',
      type: 'update',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    },
    {
      id: '5',
      title: 'AI Assistant Launched',
      message: 'AI superpowers are here. View the dashboard to see what\'s possible with our new AI integration.',
      type: 'announcement',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    },
    {
      id: '3',
      title: 'v1.2.0 - Major UI, Editor & AI Integration Update',
      message: 'This release introduces significant improvements to the UI, markdown editor, and AI-powered features, enhancing usability, performance, and overall experience.',
      type: 'update',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    },
  ]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  return (
    <NotificationsContext.Provider value={{ notifications, addNotification }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationsProvider');
  }
  return context;
};
