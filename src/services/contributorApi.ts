
// ⚠️ IMPORTANT: Remplacez cette URL par l'URL réelle de votre site WordPress
const API_BASE = 'https://votresite-wordpress.com/wp-json/ot-contributor/v1';

export interface ContributorProfile {
  id: number;
  name: string;
  email: string;
  type: 'photographer' | 'videographer' | 'blogger';
  points: number;
  contributions: number;
  rank: number;
  location?: string;
  bio?: string;
  avatar?: string;
  joinDate: string;
  status: string;
}

export interface Contribution {
  id: number;
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

export interface ContributorAuth {
  success: boolean;
  user: ContributorProfile;
  token: string;
}

export interface RegistrationData {
  name: string;
  email: string;
  password: string;
  type: 'photographer' | 'videographer' | 'blogger';
  location?: string;
  bio?: string;
}

export interface ContributionSubmission {
  title: string;
  type: 'photo' | 'video' | 'article';
  url: string;
  description: string;
  province: string;
  tags?: string;
}

export interface MonthlyRanking {
  position: number;
  contributor: {
    id: number;
    name: string;
    type: string;
    location: string;
  };
  points: number;
  contributions: number;
  isWinner: boolean;
}

// Main API object with all methods
export const contributorApi = {
  // Register a new contributor
  async register(data: RegistrationData) {
    console.log('Tentative d\'inscription:', data);
    
    try {
      const response = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('Réponse du serveur:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Erreur serveur:', errorText);
        
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          throw new Error(`Erreur serveur: ${response.status} ${response.statusText}`);
        }
        
        throw new Error(errorData.message || 'Erreur lors de l\'inscription');
      }

      const result = await response.json();
      console.log('Inscription réussie:', result);
      return result;
      
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      throw error; // Ne pas utiliser de fallback, laisser l'erreur remonter
    }
  },

  // Authenticate contributor
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
        const error = await response.json();
        throw new Error(error.message || 'Erreur d\'authentification');
      }

      const result = await response.json();
      
      // Stocker le token et l'utilisateur
      if (result.success && result.token) {
        localStorage.setItem('contributor_token', result.token);
        localStorage.setItem('contributor_user', JSON.stringify(result.user));
      }

      return result.user;
    } catch (error) {
      console.error('Erreur d\'authentification:', error);
      throw error;
    }
  },

  // Get contributor profile
  async getProfile(id: number): Promise<ContributorProfile> {
    try {
      const response = await fetch(`${API_BASE}/profile/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('contributor_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération du profil');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur profil:', error);
      throw error;
    }
  },

  // Submit contribution
  async submitContribution(data: ContributionSubmission) {
    try {
      const token = localStorage.getItem('contributor_token');
      const response = await fetch(`${API_BASE}/contribute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erreur lors de la soumission');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur soumission:', error);
      throw error;
    }
  },

  // Get user contributions
  async getUserContributions(userId: number): Promise<Contribution[]> {
    try {
      const response = await fetch(`${API_BASE}/contributions/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('contributor_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des contributions');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur contributions:', error);
      return []; // Retourner un tableau vide en cas d'erreur
    }
  },

  // Get monthly rankings
  async getMonthlyRankings(month?: number, year?: number): Promise<MonthlyRanking[]> {
    try {
      const params = new URLSearchParams();
      if (month) params.append('month', month.toString());
      if (year) params.append('year', year.toString());

      const response = await fetch(`${API_BASE}/rankings?${params}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('contributor_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des classements');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur classements:', error);
      // Retourner des données de démonstration en cas d'erreur
      return [
        {
          position: 1,
          contributor: { id: 1, name: 'Jean Mukendi', type: 'photographer', location: 'Kinshasa' },
          points: 150,
          contributions: 12,
          isWinner: true
        },
        {
          position: 2,
          contributor: { id: 2, name: 'Marie Tshala', type: 'videographer', location: 'Lubumbashi' },
          points: 120,
          contributions: 8,
          isWinner: false
        }
      ];
    }
  },

  // Upload file
  async uploadFile(file: File): Promise<{ url: string }> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const token = localStorage.getItem('contributor_token');
      const response = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'upload');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur upload:', error);
      throw error;
    }
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('contributor_token');
  },

  // Get current user
  getCurrentUser(): ContributorProfile | null {
    const user = localStorage.getItem('contributor_user');
    return user ? JSON.parse(user) : null;
  },

  // Logout
  logout(): void {
    localStorage.removeItem('contributor_token');
    localStorage.removeItem('contributor_user');
  }
};

// Legacy exports for backward compatibility
export const registerContributor = contributorApi.register;
export const authenticateContributor = contributorApi.login;
export const getContributorProfile = contributorApi.getProfile;
export const submitContribution = contributorApi.submitContribution;
export const uploadFile = contributorApi.uploadFile;
export const getContributorContributions = contributorApi.getUserContributions;
export const getRankings = contributorApi.getMonthlyRankings;
export const isContributorLoggedIn = contributorApi.isAuthenticated;
export const getCurrentContributor = contributorApi.getCurrentUser;
export const logoutContributor = contributorApi.logout;
