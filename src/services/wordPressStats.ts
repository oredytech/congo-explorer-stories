
const WORDPRESS_API_BASE = "https://visitcongo.net/wp-json";

export interface WordPressViewStats {
  post_id: number;
  views: number;
  source: 'manual' | 'tracked' | 'default';
}

export class WordPressStatsService {
  
  // Récupérer l'ID WordPress depuis le slug
  async fetchPostIdFromSlug(slug: string): Promise<number | null> {
    try {
      const response = await fetch(
        `${WORDPRESS_API_BASE}/wp/v2/posts?slug=${encodeURIComponent(slug)}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return Array.isArray(data) && data.length > 0 ? data[0].id : null;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'ID du post:', error);
      return null;
    }
  }

  // Afficher les vues (personnalisées ou par défaut)
  async getDisplayViews(postId: number): Promise<WordPressViewStats | null> {
    try {
      const response = await fetch(
        `${WORDPRESS_API_BASE}/otstats/v1/display-views/${postId}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération des vues:', error);
      return null;
    }
  }

  // Tracker une vue réelle (non personnalisée)
  async trackView(postId: number): Promise<boolean> {
    try {
      const response = await fetch(`${WORDPRESS_API_BASE}/otstats/v1/track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_id: postId })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return result.success || false;
    } catch (error) {
      console.error('Erreur lors du tracking de la vue:', error);
      return false;
    }
  }

  // Fonction complète pour tracker et afficher les vues
  async trackAndDisplayViews(slug: string): Promise<WordPressViewStats | null> {
    const postId = await this.fetchPostIdFromSlug(slug);
    
    if (!postId) {
      console.warn('Article non trouvé pour le slug:', slug);
      return null;
    }

    // Tracker la vue en arrière-plan (sans attendre)
    this.trackView(postId).catch(() => {
      // Ignore silencieusement les erreurs de tracking
    });

    // Retourner les vues à afficher
    return await this.getDisplayViews(postId);
  }
}

export const wordPressStatsService = new WordPressStatsService();
