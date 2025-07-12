
export interface WordPressArticle {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  date: string;
  author: number;
  featured_media: number;
  categories: number[];
  tags: number[];
  slug: string;
  link: string;
  _embedded?: {
    author: Array<{
      name: string;
      avatar_urls: {
        [key: string]: string;
      };
    }>;
    'wp:featuredmedia': Array<{
      source_url: string;
      alt_text: string;
    }>;
    'wp:term': Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
  };
}

export interface FormattedArticle {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
  tags: string[];
  featured: boolean;
  likes: number;
  rating: number;
  totalRatings: number;
  userReaction: 'like' | null;
  userRating: number;
  slug: string;
  link: string;
}

const WORDPRESS_API_URL = 'https://visitcongo.net/wp-json/wp/v2';

export const fetchWordPressArticles = async (limit = 10): Promise<WordPressArticle[]> => {
  try {
    const response = await fetch(
      `${WORDPRESS_API_URL}/posts?per_page=${limit}&_embed=1&status=publish`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const articles = await response.json();
    return articles;
  } catch (error) {
    console.error('Erreur lors de la récupération des articles WordPress:', error);
    throw error;
  }
};

export const fetchWordPressCategories = async () => {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/categories`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories WordPress:', error);
    return [];
  }
};

// Fonction pour calculer le temps de lecture estimé
const calculateReadTime = (content: string): string => {
  const wordsPerMinute = 200;
  const textContent = content.replace(/<[^>]*>/g, ''); // Retirer les balises HTML
  const wordCount = textContent.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readTime} min`;
};

// Fonction pour nettoyer le HTML et extraire le texte
const stripHtml = (html: string): string => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

// Convertir les articles WordPress au format utilisé par l'application
export const formatWordPressArticles = (articles: WordPressArticle[]): FormattedArticle[] => {
  return articles.map((article, index) => ({
    id: article.id,
    title: stripHtml(article.title.rendered),
    excerpt: stripHtml(article.excerpt.rendered),
    content: article.content.rendered,
    author: article._embedded?.author?.[0]?.name || 'Équipe VISITE CONGO',
    date: article.date,
    category: article._embedded?.['wp:term']?.[0]?.[0]?.name || 'Article',
    readTime: calculateReadTime(article.content.rendered),
    image: article._embedded?.['wp:featuredmedia']?.[0]?.source_url || 
           `https://images.unsplash.com/photo-${1466442929976 + index}?w=800&h=400&fit=crop`,
    tags: article._embedded?.['wp:term']?.[1]?.map(tag => tag.name) || [],
    featured: index < 3, // Les 3 premiers articles sont mis en avant
    likes: Math.floor(Math.random() * 200) + 50,
    rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)),
    totalRatings: Math.floor(Math.random() * 50) + 10,
    userReaction: null,
    userRating: 0,
    slug: article.slug,
    link: article.link
  }));
};
