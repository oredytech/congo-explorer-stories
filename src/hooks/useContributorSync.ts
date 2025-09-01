
import { useEffect } from 'react';

export const useContributorSync = () => {
  useEffect(() => {
    const syncPendingRegistrations = async () => {
      const contributors = JSON.parse(localStorage.getItem('contributors') || '[]');
      const pendingContributors = contributors.filter((c: any) => c.status === 'pending' && !c.synced);
      
      for (const contributor of pendingContributors) {
        try {
          const response = await fetch('https://visitecongo.com/wp-json/ot-contributor/v1/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: contributor.name,
              email: contributor.email,
              password: contributor.password,
              type: contributor.type,
              location: contributor.location,
              bio: contributor.bio
            }),
          });

          if (response.ok) {
            const result = await response.json();
            console.log('Synchronisation réussie pour:', contributor.email);
            
            // Marquer comme synchronisé
            contributor.synced = true;
            contributor.server_id = result.contributor_id;
            
            // Mettre à jour le localStorage
            const updatedContributors = contributors.map((c: any) => 
              c.id === contributor.id ? contributor : c
            );
            localStorage.setItem('contributors', JSON.stringify(updatedContributors));
          }
        } catch (error) {
          console.error('Erreur de synchronisation pour:', contributor.email, error);
        }
      }
    };

    // Synchroniser immédiatement
    syncPendingRegistrations();
    
    // Puis synchroniser toutes les 30 secondes
    const interval = setInterval(syncPendingRegistrations, 30000);
    
    return () => clearInterval(interval);
  }, []);
};
