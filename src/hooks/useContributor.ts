
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface ContributorProfile {
  id: string;
  name: string;
  email: string;
  type: 'photographer' | 'videographer' | 'blogger';
  points: number;
  contributions: number;
  rank: number;
  location: string;
  bio?: string;
  avatar?: string;
  joinDate: string;
}

interface Contribution {
  id: string;
  title: string;
  type: 'photo' | 'video' | 'article';
  url: string;
  description: string;
  province: string;
  tags?: string;
  status: 'pending' | 'approved' | 'rejected';
  points: number;
  createdAt: string;
}

interface ContributionSubmission {
  title: string;
  type: 'photo' | 'video' | 'article';
  url: string;
  description: string;
  province: string;
  tags: string;
}

const API_BASE = '/wp-json/ot-contributor/v1';

export const useContributor = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<ContributorProfile | null>(null);
  const queryClient = useQueryClient();

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const storedUser = localStorage.getItem('ot_contributor_user');
    const token = localStorage.getItem('ot_contributor_token');
    
    if (storedUser && token) {
      setCurrentUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Fonction d'authentification
  const login = async (email: string, password: string) => {
    const response = await fetch(`${API_BASE}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Échec de l\'authentification');
    }

    const data = await response.json();
    
    localStorage.setItem('ot_contributor_user', JSON.stringify(data.user));
    localStorage.setItem('ot_contributor_token', data.token);
    
    setCurrentUser(data.user);
    setIsAuthenticated(true);
    
    return data.user;
  };

  // Fonction de déconnexion
  const logout = () => {
    localStorage.removeItem('ot_contributor_user');
    localStorage.removeItem('ot_contributor_token');
    setCurrentUser(null);
    setIsAuthenticated(false);
    queryClient.clear();
  };

  // Hook pour récupérer le profil utilisateur
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['contributor-profile', currentUser?.id],
    queryFn: async () => {
      if (!currentUser?.id) return null;
      
      const response = await fetch(`${API_BASE}/profile/${currentUser.id}`);
      if (!response.ok) throw new Error('Erreur lors du chargement du profil');
      
      return response.json();
    },
    enabled: !!currentUser?.id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Hook pour récupérer les contributions de l'utilisateur
  const { data: contributions = [], isLoading: contributionsLoading } = useQuery({
    queryKey: ['user-contributions', currentUser?.id],
    queryFn: async () => {
      if (!currentUser?.id) return [];
      
      const response = await fetch(`${API_BASE}/contributions/${currentUser.id}`);
      if (!response.ok) throw new Error('Erreur lors du chargement des contributions');
      
      return response.json();
    },
    enabled: !!currentUser?.id,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Mutation pour soumettre une contribution
  const submitContribution = useMutation({
    mutationFn: async (data: ContributionSubmission) => {
      const token = localStorage.getItem('ot_contributor_token');
      
      const response = await fetch(`${API_BASE}/contribute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...data,
          contributor_id: currentUser?.id,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erreur lors de la soumission');
      }

      return response.json();
    },
    onSuccess: () => {
      // Actualiser les contributions après soumission
      queryClient.invalidateQueries({ queryKey: ['user-contributions'] });
      queryClient.invalidateQueries({ queryKey: ['contributor-profile'] });
    },
  });

  // Hook pour récupérer les classements
  const { data: rankings = [] } = useQuery({
    queryKey: ['monthly-rankings'],
    queryFn: async () => {
      const response = await fetch(`${API_BASE}/rankings`);
      if (!response.ok) throw new Error('Erreur lors du chargement des classements');
      
      return response.json();
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  return {
    // État d'authentification
    isAuthenticated,
    currentUser,
    
    // Fonctions d'authentification
    login,
    logout,
    
    // Données utilisateur
    profile: profile || currentUser,
    profileLoading,
    
    // Contributions
    contributions,
    contributionsLoading,
    
    // Soumission de contenu
    submitContribution: submitContribution.mutate,
    isSubmitting: submitContribution.isPending,
    submitError: submitContribution.error,
    
    // Classements
    rankings,
    
    // Utilitaires
    refreshData: () => {
      queryClient.invalidateQueries({ queryKey: ['contributor-profile'] });
      queryClient.invalidateQueries({ queryKey: ['user-contributions'] });
    },
  };
};
