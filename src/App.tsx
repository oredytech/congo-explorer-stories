
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './i18n/config';

// Pages
import Home from "./pages/Home";
import Explorer from "./pages/Explorer";
import ProvinceDetail from "./pages/ProvinceDetail";
import Documentaries from "./pages/Documentaries";
import Gallery from "./pages/Gallery";
import Articles from "./pages/Articles";
import Join from "./pages/Join";
import Support from "./pages/Support";
import Contact from "./pages/Contact";
import LegalNotices from "./pages/LegalNotices";
import Privacy from "./pages/Privacy";
import Partners from "./pages/Partners";
import Assistance from "./pages/Assistance";
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
          
          {/* Routes individuelles pour toutes les provinces */}
          <Route path="/province/kinshasa" element={<ProvinceDetail />} />
          <Route path="/province/kongo-central" element={<ProvinceDetail />} />
          <Route path="/province/kwilu" element={<ProvinceDetail />} />
          <Route path="/province/kwango" element={<ProvinceDetail />} />
          <Route path="/province/mai-ndombe" element={<ProvinceDetail />} />
          <Route path="/province/kasai" element={<ProvinceDetail />} />
          <Route path="/province/kasai-oriental" element={<ProvinceDetail />} />
          <Route path="/province/kasai-central" element={<ProvinceDetail />} />
          <Route path="/province/lomami" element={<ProvinceDetail />} />
          <Route path="/province/sankuru" element={<ProvinceDetail />} />
          <Route path="/province/maniema" element={<ProvinceDetail />} />
          <Route path="/province/sud-kivu" element={<ProvinceDetail />} />
          <Route path="/province/nord-kivu" element={<ProvinceDetail />} />
          <Route path="/province/ituri" element={<ProvinceDetail />} />
          <Route path="/province/haut-uele" element={<ProvinceDetail />} />
          <Route path="/province/bas-uele" element={<ProvinceDetail />} />
          <Route path="/province/tshopo" element={<ProvinceDetail />} />
          <Route path="/province/mongala" element={<ProvinceDetail />} />
          <Route path="/province/nord-ubangi" element={<ProvinceDetail />} />
          <Route path="/province/sud-ubangi" element={<ProvinceDetail />} />
          <Route path="/province/equateur" element={<ProvinceDetail />} />
          <Route path="/province/tshuapa" element={<ProvinceDetail />} />
          <Route path="/province/haut-katanga" element={<ProvinceDetail />} />
          <Route path="/province/lualaba" element={<ProvinceDetail />} />
          <Route path="/province/haut-lomami" element={<ProvinceDetail />} />
          <Route path="/province/tanganyika" element={<ProvinceDetail />} />
          
          {/* Route générale pour les provinces (fallback) */}
          <Route path="/province/:id" element={<ProvinceDetail />} />
          
          <Route path="/documentaires" element={<Documentaries />} />
          <Route path="/galerie" element={<Gallery />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/rejoindre" element={<Join />} />
          <Route path="/soutenir" element={<Support />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mentions-legales" element={<LegalNotices />} />
          <Route path="/confidentialite" element={<Privacy />} />
          <Route path="/partenaires" element={<Partners />} />
          <Route path="/assistance" element={<Assistance />} />
          <Route path="/ajouter" element={<div className="min-h-screen flex items-center justify-center bg-congo-beige"><div className="text-center"><h1 className="text-2xl font-bold mb-4 text-congo-brown">Ajouter du contenu</h1><p className="text-congo-brown/70">Page en construction...</p></div></div>} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
