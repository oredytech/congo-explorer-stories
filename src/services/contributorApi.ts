
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

export interface ContributorRegistration {
  name: string;
  email: string;
  password: string;
  type: 'photographer' | 'videographer' | 'blogger';
  location?: string;
  bio?: string;
}

// Fonction d'inscription
export const registerContributor = async (data: ContributorRegistration) => {
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

    return await response.json();
  } catch (error) {
    console.error('Erreur d\'inscription:', error);
    // Fallback pour les données locales
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
    return { success: true, contributor_id: newContributor.id };
  }
};

// Fonction d'authentification
export const authenticateContributor = async (email: string, password: string): Promise<ContributorAuth> => {
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
    
    // Stocker le token
    if (result.success && result.token) {
      localStorage.setItem('contributor_token', result.token);
      localStorage.setItem('contributor_user', JSON.stringify(result.user));
    }

    return result;
  } catch (error) {
    console.error('Erreur d\'authentification:', error);
    // Fallback pour les données locales
    const contributors = JSON.parse(localStorage.getItem('contributors') || '[]');
    const contributor = contributors.find((c: any) => c.email === email);
    
    if (contributor && contributor.password === password) {
      const token = `local_${contributor.id}_${Date.now()}`;
      localStorage.setItem('contributor_token', token);
      localStorage.setItem('contributor_user', JSON.stringify(contributor));
      
      return {
        success: true,
        user: contributor,
        token
      };
    }
    
    throw new Error('Email ou mot de passe incorrect');
  }
};

// Récupérer le profil d'un contributeur
export const getContributorProfile = async (id: number): Promise<ContributorProfile> => {
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
};

// Soumettre une contribution
export const submitContribution = async (data: {
  title: string;
  type: 'photo' | 'video' | 'article';
  url: string;
  description: string;
  province: string;
  tags?: string;
}) => {
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
};

// Upload d'un fichier
export const uploadFile = async (file: File): Promise<{ url: string }> => {
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
};

// Récupérer les contributions d'un utilisateur
export const getContributorContributions = async (userId: number): Promise<Contribution[]> => {
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
};

// Récupérer les classements
export const getRankings = async (month?: number, year?: number) => {
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
};

// Vérifier si l'utilisateur est connecté
export const isContributorLoggedIn = (): boolean => {
  return !!localStorage.getItem('contributor_token');
};

// Récupérer l'utilisateur connecté
export const getCurrentContributor = (): ContributorProfile | null => {
  const user = localStorage.getItem('contributor_user');
  return user ? JSON.parse(user) : null;
};

// Déconnexion
export const logoutContributor = (): void => {
  localStorage.removeItem('contributor_token');
  localStorage.removeItem('contributor_user');
};
