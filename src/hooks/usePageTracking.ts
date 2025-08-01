
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/services/analytics';

export const usePageTracking = () => {
  const location = useLocation();
  const previousPath = useRef<string>('');

  useEffect(() => {
    const currentPath = location.pathname;
    
    // Éviter le tracking sur le premier chargement si c'est la même page
    if (previousPath.current !== '' && previousPath.current !== currentPath) {
      // Petit délai pour s'assurer que le titre de la page est mis à jour
      setTimeout(() => {
        trackPageView();
      }, 100);
    }
    
    previousPath.current = currentPath;
  }, [location.pathname]);
};
