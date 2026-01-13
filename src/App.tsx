import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DevicePage from "./pages/DevicePage";
import DeviceDetailPage from "./pages/DeviceDetailPage";
import OrderPage from "./pages/OrderPage";
import HistoryPage from "./pages/HistoryPage";
import SettingsPage from "./pages/SettingsPage";
import ProfileEditPage from "./pages/ProfileEditPage";
import AddDevicePage from "./pages/AddDevicePage";
import BottomNav from "./components/BottomNav";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" />
      <BrowserRouter>
        <div className="max-w-lg mx-auto min-h-screen relative">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/device" element={<DevicePage />} />
            <Route path="/device/add" element={<AddDevicePage />} />
            <Route path="/device/:id" element={<DeviceDetailPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/settings/profile" element={<ProfileEditPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BottomNav />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
