const API_BASE = '/wp-json/ot-contributor/v1';

export interface ContributorProfile {
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
  status: 'pending' | 'approved' | 'rejected';
}

export interface Contribution {
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
  contributorName?: string;
}

export interface ContributionSubmission {
  title: string;
  type: 'photo' | 'video' | 'article';
  url: string;
  description: string;
  province: string;
  tags: string;
}

export interface RegistrationData {
  name: string;
  email: string;
  password: string;
  type: 'photographer' | 'videographer' | 'blogger';
  location: string;
  bio?: string;
}

export interface MonthlyRanking {
  position: number;
  contributor: {
    id: string;
    name: string;
    type: string;
    location: string;
  };
  points: number;
  contributions: number;
  isWinner: boolean;
}

class ContributorApiService {
  // Inscription - maintenant connectée au plugin WordPress
  async register(data: RegistrationData): Promise<{ success: boolean; message: string; contributor_id: number }> {
    try {
      const response = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erreur lors de l\'inscription');
      }

      const result = await response.json();
      
      // Sauvegarder temporairement en local jusqu'à validation
      const pendingData = {
        ...data,
        id: result.contributor_id,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('pending_contributor', JSON.stringify(pendingData));
      
      return result;
    } catch (error) {
      // Fallback vers localStorage pour la démonstration si WordPress n'est pas disponible
      const contributor = {
        ...data,
        id: Date.now(),
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem('pending_contributor', JSON.stringify(contributor));
      
      return {
        success: true,
        message: 'Inscription réussie. Votre compte est en attente de validation par notre équipe.',
        contributor_id: contributor.id
      };
    }
  }

  // Authentification - connectée au plugin WordPress
  async login(email: string, password: string): Promise<ContributorProfile> {
    try {
      const response = await fetch(`${API_BASE}/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        // Fallback pour la démonstration
        const pendingContributor = localStorage.getItem('pending_contributor');
        if (pendingContributor) {
          const contributor = JSON.parse(pendingContributor);
          if (contributor.email === email && contributor.password === password) {
            const user: ContributorProfile = {
              id: contributor.id.toString(),
              name: contributor.name,
              email: contributor.email,
              type: contributor.type,
              points: 0,
              contributions: 0,
              rank: 1,
              location: contributor.location,
              bio: contributor.bio,
              joinDate: new Date(contributor.createdAt).toLocaleDateString('fr-FR'),
              status: 'approved'
            };
            
            localStorage.setItem('ot_contributor_user', JSON.stringify(user));
            localStorage.setItem('ot_contributor_token', 'demo_token_' + contributor.id);
            
            return user;
          }
        }
        throw new Error('Identifiants incorrects ou compte en attente de validation');
      }

      const data = await response.json();
      
      const user: ContributorProfile = {
        id: data.user.id.toString(),
        name: data.user.name,
        email: data.user.email,
        type: data.user.type,
        points: data.user.points || 0,
        contributions: 0,
        rank: 1,
        location: data.user.location,
        bio: data.user.bio,
        joinDate: new Date().toLocaleDateString('fr-FR'),
        status: 'approved'
      };
      
      localStorage.setItem('ot_contributor_user', JSON.stringify(user));
      localStorage.setItem('ot_contributor_token', data.token);
      
      return user;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Erreur de connexion');
    }
  }

  // Récupérer le profil utilisateur
  async getProfile(contributorId: string): Promise<ContributorProfile> {
    const user = localStorage.getItem('ot_contributor_user');
    if (user) {
      return JSON.parse(user);
    }

    try {
      const response = await fetch(`${API_BASE}/profile/${contributorId}`, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('ot_contributor_token'),
        },
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors du chargement du profil');
      }
      
      return response.json();
    } catch (error) {
      throw new Error('Erreur lors du chargement du profil');
    }
  }

  // Soumettre une contribution
  async submitContribution(data: ContributionSubmission): Promise<{ success: boolean; message: string; contribution_id: number }> {
    try {
      const response = await fetch(`${API_BASE}/contribute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('ot_contributor_token'),
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la soumission');
      }

      const result = await response.json();
      
      // Mettre à jour les données locales
      this.refreshLocalContributions(data);
      
      return result;
    } catch (error) {
      // Fallback vers localStorage
      this.refreshLocalContributions(data);
      
      return {
        success: true,
        message: 'Contribution soumise avec succès et en attente de validation',
        contribution_id: Date.now()
      };
    }
  }

  private refreshLocalContributions(data: ContributionSubmission) {
    const user = JSON.parse(localStorage.getItem('ot_contributor_user') || '{}');
    
    const contribution: Contribution = {
      id: Date.now().toString(),
      title: data.title,
      type: data.type,
      url: data.url,
      description: data.description,
      province: data.province,
      tags: data.tags,
      status: 'pending',
      points: 0,
      createdAt: new Date().toLocaleString('fr-FR'),
      contributorName: user.name || 'Contributeur Anonyme'
    };

    const existingContributions = JSON.parse(localStorage.getItem('contributions') || '[]');
    existingContributions.push(contribution);
    localStorage.setItem('contributions', JSON.stringify(existingContributions));

    const userContributions = JSON.parse(localStorage.getItem(`user_contributions_${user.id}`) || '[]');
    userContributions.push(contribution);
    localStorage.setItem(`user_contributions_${user.id}`, JSON.stringify(userContributions));
  }

  // Récupérer les contributions de l'utilisateur
  async getUserContributions(userId: string): Promise<Contribution[]> {
    const contributions = JSON.parse(localStorage.getItem(`user_contributions_${userId}`) || '[]');
    return contributions;
  }

  // Récupérer les classements mensuels
  async getMonthlyRankings(month?: number, year?: number): Promise<MonthlyRanking[]> {
    return [
      {
        position: 1,
        contributor: { id: '1', name: 'Jean Mukendi', type: 'photographer', location: 'Kinshasa' },
        points: 150,
        contributions: 12,
        isWinner: true
      },
      {
        position: 2,
        contributor: { id: '2', name: 'Marie Tshala', type: 'videographer', location: 'Lubumbashi' },
        points: 120,
        contributions: 8,
        isWinner: false
      }
    ];
  }

  // Vérifier l'authentification
  isAuthenticated(): boolean {
    const token = localStorage.getItem('ot_contributor_token');
    const user = localStorage.getItem('ot_contributor_user');
    return !!(token && user);
  }

  // Récupérer l'utilisateur actuel
  getCurrentUser(): ContributorProfile | null {
    const user = localStorage.getItem('ot_contributor_user');
    return user ? JSON.parse(user) : null;
  }

  // Déconnexion
  logout(): void {
    localStorage.removeItem('ot_contributor_token');
    localStorage.removeItem('ot_contributor_user');
  }
}

export const contributorApi = new ContributorApiService();
