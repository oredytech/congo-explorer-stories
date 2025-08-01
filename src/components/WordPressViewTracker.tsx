
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { wordPressStatsService, type WordPressViewStats } from "@/services/wordPressStats";
import { trackEvent } from "@/services/analytics";

interface WordPressViewTrackerProps {
  className?: string;
}

const WordPressViewTracker: React.FC<WordPressViewTrackerProps> = ({ 
  className = "text-sm text-congo-brown/60 flex items-center gap-1" 
}) => {
  const location = useLocation();
  const [viewStats, setViewStats] = useState<WordPressViewStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Extraire le slug de l'URL
    const getSlugFromPath = (pathname: string): string | null => {
      const segments = pathname.split('/').filter(Boolean);
      
      // Pour les articles : /article/mon-slug
      if (segments[0] === 'article' && segments[1]) {
        return segments[1];
      }
      
      // Pour d'autres pages avec slug
      if (segments.length === 1 && segments[0]) {
        return segments[0];
      }
      
      return null;
    };

    const slug = getSlugFromPath(location.pathname);
    
    if (!slug) {
      setViewStats(null);
      return;
    }

    const trackViews = async () => {
      setIsLoading(true);
      try {
        const stats = await wordPressStatsService.trackAndDisplayViews(slug);
        setViewStats(stats);
        
        // Tracker dans Google Analytics
        if (stats) {
          trackEvent('wordpress_article_view', {
            post_id: stats.post_id,
            views: stats.views,
            source: stats.source
          });
        }
      } catch (error) {
        console.error('Erreur lors du tracking des vues:', error);
      } finally {
        setIsLoading(false);
      }
    };

    trackViews();
  }, [location.pathname]);

  if (!viewStats || isLoading) {
    return null;
  }

  return (
    <div className={className}>
      <span>👁</span>
      <span>{viewStats.views.toLocaleString()} vues</span>
      {process.env.NODE_ENV === 'development' && (
        <span className="text-xs opacity-50">({viewStats.source})</span>
      )}
    </div>
  );
};

export default WordPressViewTracker;
