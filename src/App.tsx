
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import './App.css';
import Home from './pages/Home';
import Join from './pages/Join';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import ArticleDetail from './pages/ArticleDetail';
import Add from './pages/Add';

function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rejoindre" element={<Join />} />
            <Route path="/galerie" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/article/:id" element={<ArticleDetail />} />
            <Route path="/ajouter" element={<Add />} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
