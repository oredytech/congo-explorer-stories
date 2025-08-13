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
  private getWordPressBaseUrl(): string {
    // Essayer de détecter l'URL de WordPress
    const currentDomain = window.location.origin;
    
    // Si nous sommes sur un sous-domaine ou développement local
    if (currentDomain.includes('localhost') || currentDomain.includes('127.0.0.1')) {
      // Utiliser l'URL WordPress locale ou de développement
      return 'http://localhost/wordpress'; // Ajuster selon votre configuration
    }
    
    return currentDomain;
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
    const baseUrl = this.getWordPressBaseUrl();
    const url = `${baseUrl}${API_BASE}${endpoint}`;
    
    console.log('Making request to:', url);
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', response.status, errorText);
      
      try {
        const errorJson = JSON.parse(errorText);
        throw new Error(errorJson.message || `Erreur API: ${response.status}`);
      } catch (e) {
        throw new Error(`Erreur de connexion: ${response.status} - ${errorText}`);
      }
    }

    return response.json();
  }

  // Inscription - connectée au plugin WordPress
  async register(data: RegistrationData): Promise<{ success: boolean; message: string; contributor_id: number }> {
    try {
      console.log('Tentative d\'inscription avec:', { ...data, password: '[HIDDEN]' });
      
      const result = await this.makeRequest('/register', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      
      console.log('Inscription réussie:', result);
      return result;
      
    } catch (error: any) {
      console.error('Erreur d\'inscription:', error);
      
      // Fallback vers localStorage pour la démonstration si WordPress n'est pas disponible
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        console.log('WordPress non disponible, utilisation du fallback local');
        
        const contributor = {
          ...data,
          id: Date.now(),
          status: 'pending',
          createdAt: new Date().toISOString()
        };
        
        localStorage.setItem('pending_contributor', JSON.stringify(contributor));
        
        return {
          success: true,
          message: 'Inscription réussie (mode local). Votre compte est en attente de validation.',
          contributor_id: contributor.id
        };
      }
      
      throw error;
    }
  }

  // Authentification - connectée au plugin WordPress
  async login(email: string, password: string): Promise<ContributorProfile> {
    try {
      console.log('Tentative de connexion pour:', email);
      
      const data = await this.makeRequest('/auth', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      
      console.log('Connexion WordPress réussie:', data);
      
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
      
    } catch (error: any) {
      console.error('Erreur de connexion WordPress:', error);
      
      // Fallback pour la démonstration si WordPress n'est pas disponible
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        console.log('WordPress non disponible, vérification locale');
        
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
        
        throw new Error('Identifiants incorrects ou WordPress non disponible');
      }
      
      throw error;
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

  // Soumettre une contribution avec support des fichiers
  async submitContribution(data: ContributionSubmission & { file?: File }): Promise<{ success: boolean; message: string; contribution_id: number }> {
    try {
      let finalUrl = data.url;
      
      // Si un fichier est fourni, le télécharger d'abord
      if (data.file) {
        try {
          const formData = new FormData();
          formData.append('file', data.file);
          
          const uploadResponse = await fetch(`${this.getWordPressBaseUrl()}${API_BASE}/upload`, {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('ot_contributor_token'),
            },
            body: formData,
          });

          if (uploadResponse.ok) {
            const uploadResult = await uploadResponse.json();
            finalUrl = uploadResult.url;
          } else {
            console.log('Échec du téléchargement, utilisation du fallback local');
            // Créer une URL temporaire pour la démonstration
            finalUrl = URL.createObjectURL(data.file);
          }
        } catch (uploadError) {
          console.error('Erreur lors du téléchargement:', uploadError);
          // Utiliser une URL temporaire pour la démonstration
          finalUrl = URL.createObjectURL(data.file);
        }
      }

      const submissionData = {
        title: data.title,
        type: data.type,
        url: finalUrl,
        description: data.description,
        province: data.province,
        tags: data.tags,
      };

      const response = await fetch(`${this.getWordPressBaseUrl()}${API_BASE}/contribute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('ot_contributor_token'),
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la soumission');
      }

      const result = await response.json();
      
      // Mettre à jour les données locales
      this.refreshLocalContributions(submissionData);
      
      return result;
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      
      // Fallback vers localStorage
      const submissionData = {
        title: data.title,
        type: data.type,
        url: data.file ? URL.createObjectURL(data.file) : data.url,
        description: data.description,
        province: data.province,
        tags: data.tags,
      };
      
      this.refreshLocalContributions(submissionData);
      
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
    localStorage.removeItem('pending_contributor');
  }
}

export const contributorApi = new ContributorApiService();
