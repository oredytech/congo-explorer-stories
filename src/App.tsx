
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './i18n/config';

// Pages
import Home from "./pages/Home";
import Explorer from "./pages/Explorer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explorer" element={<Explorer />} />
          {/* Placeholder routes for future pages */}
          <Route path="/documentaires" element={<div className="min-h-screen flex items-center justify-center bg-stone-50"><div className="text-center"><h1 className="text-2xl font-bold mb-4">Documentaires</h1><p className="text-stone-600">Page en construction...</p></div></div>} />
          <Route path="/galerie" element={<div className="min-h-screen flex items-center justify-center bg-stone-50"><div className="text-center"><h1 className="text-2xl font-bold mb-4">Galerie</h1><p className="text-stone-600">Page en construction...</p></div></div>} />
          <Route path="/articles" element={<div className="min-h-screen flex items-center justify-center bg-stone-50"><div className="text-center"><h1 className="text-2xl font-bold mb-4">Articles</h1><p className="text-stone-600">Page en construction...</p></div></div>} />
          <Route path="/rejoindre" element={<div className="min-h-screen flex items-center justify-center bg-stone-50"><div className="text-center"><h1 className="text-2xl font-bold mb-4">Rejoindre les explorateurs</h1><p className="text-stone-600">Page en construction...</p></div></div>} />
          <Route path="/ajouter" element={<div className="min-h-screen flex items-center justify-center bg-stone-50"><div className="text-center"><h1 className="text-2xl font-bold mb-4">Ajouter du contenu</h1><p className="text-stone-600">Page en construction...</p></div></div>} />
          <Route path="/soutenir" element={<div className="min-h-screen flex items-center justify-center bg-stone-50"><div className="text-center"><h1 className="text-2xl font-bold mb-4">Soutenir le projet</h1><p className="text-stone-600">Page en construction...</p></div></div>} />
          <Route path="/contact" element={<div className="min-h-screen flex items-center justify-center bg-stone-50"><div className="text-center"><h1 className="text-2xl font-bold mb-4">Contact</h1><p className="text-stone-600">Page en construction...</p></div></div>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
