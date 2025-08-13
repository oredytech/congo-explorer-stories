
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contributorApi, type ContributorProfile, type Contribution, type ContributionSubmission, type MonthlyRanking } from '../services/contributorApi';

export const useContributor = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<ContributorProfile | null>(null);
  const queryClient = useQueryClient();

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const isAuth = contributorApi.isAuthenticated();
    const user = contributorApi.getCurrentUser();
    
    if (isAuth && user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
    }
  }, []);

  // Fonction d'authentification avec redirection vers le tableau de bord
  const login = async (email: string, password: string) => {
    const user = await contributorApi.login(email, password);
    setCurrentUser(user);
    setIsAuthenticated(true);
    
    // Rediriger vers le tableau de bord après connexion
    window.location.href = '/dashboard-contributeur';
    
    return user;
  };

  // Fonction de déconnexion
  const logout = () => {
    contributorApi.logout();
    setCurrentUser(null);
    setIsAuthenticated(false);
    queryClient.clear();
    
    // Rediriger vers la page d'accueil après déconnexion
    window.location.href = '/';
  };

  // Hook pour récupérer le profil utilisateur
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['contributor-profile', currentUser?.id],
    queryFn: async () => {
      if (!currentUser?.id) return null;
      return contributorApi.getProfile(currentUser.id);
    },
    enabled: !!currentUser?.id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Hook pour récupérer les contributions de l'utilisateur
  const { data: contributions = [], isLoading: contributionsLoading } = useQuery({
    queryKey: ['user-contributions', currentUser?.id],
    queryFn: async () => {
      if (!currentUser?.id) return [];
      return contributorApi.getUserContributions(currentUser.id);
    },
    enabled: !!currentUser?.id,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Mutation pour soumettre une contribution
  const submitContribution = useMutation({
    mutationFn: (data: ContributionSubmission) => contributorApi.submitContribution(data),
    onSuccess: () => {
      // Actualiser les contributions après soumission
      queryClient.invalidateQueries({ queryKey: ['user-contributions'] });
      queryClient.invalidateQueries({ queryKey: ['contributor-profile'] });
    },
  });

  // Hook pour récupérer les classements
  const { data: rankings = [] } = useQuery({
    queryKey: ['monthly-rankings'],
    queryFn: () => contributorApi.getMonthlyRankings(),
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
      queryClient.invalidateQueries({ queryKey: ['monthly-rankings'] });
    },
  };
};
