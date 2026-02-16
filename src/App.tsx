import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotificationsProvider } from "@/hooks/useNotifications";
import { SubscribePopup } from "@/components/SubscribePopup";
import Dashboard from "./pages/Dashboard";
import Welcome from "./pages/Welcome";
import EditorPage from "./pages/EditorPage";
import Help from "./pages/Help";
import Privacy from "./pages/Privacy";
import About from "./pages/About";
import Notifications from "./pages/Notifications";
import ReleaseAnnouncement from "./pages/ReleaseAnnouncement";
import Presentation from "./pages/Presentation";
import NotFound from "./pages/NotFound";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <NotificationsProvider>
        <Toaster />
        <Sonner />
        <SubscribePopup />
        <ErrorBoundary name="App Root">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/editor/:id" element={<EditorPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/help" element={<Help />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/announcements/v1.3.0" element={<ReleaseAnnouncement />} />
              <Route path="/presentation" element={<Presentation />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ErrorBoundary>
      </NotificationsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
