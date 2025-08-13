
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
}

export interface ContributionSubmission {
  title: string;
  type: 'photo' | 'video' | 'article';
  url: string;
  description: string;
  province: string;
  tags: string;
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
  // Authentification
  async login(email: string, password: string): Promise<ContributorProfile> {
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
    
    // Stocker les données localement
    localStorage.setItem('ot_contributor_user', JSON.stringify(data.user));
    localStorage.setItem('ot_contributor_token', data.token);
    
    return data.user;
  }

  // Récupérer le profil utilisateur
  async getProfile(contributorId: string): Promise<ContributorProfile> {
    const response = await fetch(`${API_BASE}/profile/${contributorId}`);
    
    if (!response.ok) {
      throw new Error('Erreur lors du chargement du profil');
    }
    
    return response.json();
  }

  // Soumettre une contribution
  async submitContribution(data: ContributionSubmission): Promise<{ success: boolean; message: string; contribution_id: number }> {
    const token = localStorage.getItem('ot_contributor_token');
    const user = JSON.parse(localStorage.getItem('ot_contributor_user') || '{}');
    
    const response = await fetch(`${API_BASE}/contribute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...data,
        contributor_id: user.id,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la soumission');
    }

    return response.json();
  }

  // Récupérer les contributions de l'utilisateur
  async getUserContributions(userId: string): Promise<Contribution[]> {
    const response = await fetch(`${API_BASE}/contributions/${userId}`);
    
    if (!response.ok) {
      throw new Error('Erreur lors du chargement des contributions');
    }
    
    return response.json();
  }

  // Récupérer les classements mensuels
  async getMonthlyRankings(month?: number, year?: number): Promise<MonthlyRanking[]> {
    const params = new URLSearchParams();
    if (month) params.append('month', month.toString());
    if (year) params.append('year', year.toString());
    
    const response = await fetch(`${API_BASE}/rankings?${params}`);
    
    if (!response.ok) {
      throw new Error('Erreur lors du chargement des classements');
    }
    
    return response.json();
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
