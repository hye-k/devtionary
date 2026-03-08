import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import { GARouteTracker } from "@/components/GARouteTracker";
import { MetaTags } from "@/components/MetaTags";
import { LocaleProvider } from "@/hooks/use-locale";
import Index from "./pages/Index";
import TermDetail from "./pages/TermDetail";
import Categories from "./pages/Categories";
import CategoryDetail from "./pages/CategoryDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LocaleProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <MetaTags />
          <Header />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/term/:slug" element={<TermDetail />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:slug" element={<CategoryDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LocaleProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
