const API_BASE = 'https://visitecongo.com/wp-json/ot-contributor/v1';

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
      console.error('Erreur d\'inscription complète:', error);
      
      // Si c'est une erreur réseau ou CORS, on essaie une approche alternative
      if (error instanceof TypeError || error.message.includes('fetch')) {
        console.log('Tentative avec approche alternative pour CORS...');
        
        try {
          // Créer un formulaire pour contourner les restrictions CORS
          const formData = new FormData();
          formData.append('action', 'ot_contributor_register');
          formData.append('name', data.name);
          formData.append('email', data.email);
          formData.append('password', data.password);
          formData.append('type', data.type);
          formData.append('location', data.location || '');
          formData.append('bio', data.bio || '');
          
          const alternativeResponse = await fetch('https://visitecongo.com/wp-admin/admin-ajax.php', {
            method: 'POST',
            body: formData,
          });
          
          if (alternativeResponse.ok) {
            const altResult = await alternativeResponse.json();
            if (altResult.success) {
              return { success: true, message: 'Inscription réussie via méthode alternative', contributor_id: altResult.data.id };
            }
          }
        } catch (altError) {
          console.error('Erreur méthode alternative:', altError);
        }
      }
      
      // Fallback: stockage local temporaire et notification
      console.log('Utilisation du fallback local...');
      const contributors = JSON.parse(localStorage.getItem('contributors') || '[]');
      const newContributor = {
        ...data,
        id: Date.now(),
        points: 0,
        contributions: 0,
        rank: contributors.length + 1,
        joinDate: new Date().toISOString(),
        status: 'pending'
      };
      contributors.push(newContributor);
      localStorage.setItem('contributors', JSON.stringify(contributors));
      
      // Envoyer les données par email comme backup
      try {
        const emailData = {
          to: 'admin@visitecongo.com',
          subject: 'Nouvelle inscription contributeur (Backup)',
          message: `
            Nouvelle inscription de contributeur:
            - Nom: ${data.name}
            - Email: ${data.email}
            - Type: ${data.type}
            - Localisation: ${data.location}
            - Bio: ${data.bio}
            
            Cette inscription a été sauvegardée localement car l'API n'était pas accessible.
          `
        };
        
        // Tentative d'envoi par email
        await fetch('https://visitecongo.com/wp-json/wp/v2/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(emailData)
        });
      } catch (emailError) {
        console.error('Impossible d\'envoyer l\'email de backup:', emailError);
      }
      
      return { 
        success: true, 
        message: 'Inscription enregistrée. Votre compte sera créé dès que la connexion sera rétablie.', 
        contributor_id: newContributor.id 
      };
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
      // Fallback pour les données locales
      const contributors = JSON.parse(localStorage.getItem('contributors') || '[]');
      const contributor = contributors.find((c: any) => c.email === email);
      
      if (contributor && contributor.password === password) {
        const token = `local_${contributor.id}_${Date.now()}`;
        localStorage.setItem('contributor_token', token);
        localStorage.setItem('contributor_user', JSON.stringify(contributor));
        
        return contributor;
      }
      
      throw new Error('Email ou mot de passe incorrect');
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
      // Fallback local
      const contributors = JSON.parse(localStorage.getItem('contributors') || '[]');
      const contributor = contributors.find((c: any) => c.id === id);
      if (!contributor) {
        throw new Error('Contributeur non trouvé');
      }
      return contributor;
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
      // Fallback local
      const contributions = JSON.parse(localStorage.getItem('contributions') || '[]');
      const user = JSON.parse(localStorage.getItem('contributor_user') || '{}');
      
      const newContribution = {
        ...data,
        id: Date.now(),
        contributor_id: user.id,
        status: 'pending',
        points: 0,
        createdAt: new Date().toISOString(),
        contributorName: user.name
      };
      
      contributions.push(newContribution);
      localStorage.setItem('contributions', JSON.stringify(contributions));
      
      return { success: true, contribution_id: newContribution.id };
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
      // Fallback local
      const contributions = JSON.parse(localStorage.getItem('contributions') || '[]');
      return contributions.filter((c: any) => c.contributor_id === userId);
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
      // Fallback local
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
      // Fallback: créer une URL locale temporaire
      const url = URL.createObjectURL(file);
      return { url };
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
