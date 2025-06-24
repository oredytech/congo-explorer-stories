
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './i18n/config';

// Pages
import Home from "./pages/Home";
import Explorer from "./pages/Explorer";
import Documentaries from "./pages/Documentaries";
import Gallery from "./pages/Gallery";
import Articles from "./pages/Articles";
import Join from "./pages/Join";
import Support from "./pages/Support";
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
          <Route path="/documentaires" element={<Documentaries />} />
          <Route path="/galerie" element={<Gallery />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/rejoindre" element={<Join />} />
          <Route path="/soutenir" element={<Support />} />
          <Route path="/contact" element={<div className="min-h-screen flex items-center justify-center bg-congo-beige"><div className="text-center"><h1 className="text-2xl font-bold mb-4 text-congo-brown">Contact</h1><p className="text-congo-brown/70">Page en construction...</p></div></div>} />
          <Route path="/ajouter" element={<div className="min-h-screen flex items-center justify-center bg-congo-beige"><div className="text-center"><h1 className="text-2xl font-bold mb-4 text-congo-brown">Ajouter du contenu</h1><p className="text-congo-brown/70">Page en construction...</p></div></div>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
