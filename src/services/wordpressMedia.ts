
export interface WordPressMedia {
  id: number;
  title: {
    rendered: string;
  };
  caption: {
    rendered: string;
  };
  alt_text: string;
  media_type: 'image' | 'video';
  mime_type: string;
  source_url: string;
  media_details: {
    width: number;
    height: number;
    sizes: {
      [key: string]: {
        source_url: string;
        width: number;
        height: number;
      };
    };
  };
  date: string;
  slug: string;
  meta: {
    gallery_enabled?: boolean | number | string;
    gallery_caption?: string;
    gallery_reactions?: {
      like: number;
      love: number;
      dislike: number;
    };
  };
}

export interface FormattedGalleryItem {
  id: number;
  type: 'photo' | 'video';
  src: string;
  caption: string;
  reactions: {
    like: number;
    love: number;
    dislike: number;
  };
  date: string;
  alt: string;
}

const WORDPRESS_API_URL = 'https://visitcongo.net/wp-json/wp/v2';

export const fetchWordPressGalleryMedia = async (): Promise<WordPressMedia[]> => {
  try {
    // Récupérer les médias depuis WordPress
    const response = await fetch(
      `${WORDPRESS_API_URL}/media?per_page=50&status=inherit&_fields=id,title,caption,alt_text,media_type,mime_type,source_url,media_details,date,slug,meta&orderby=date&order=desc`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const allMedia = await response.json();
    console.log('Médias récupérés depuis WordPress:', allMedia.length);
    
    // Filtrer côté client pour ne garder que ceux avec gallery_enabled = true
    const galleryMedia = allMedia.filter((item: WordPressMedia) => {
      const galleryEnabled = item.meta?.gallery_enabled;
      const isEnabled = galleryEnabled === true || 
                       galleryEnabled === 1 || 
                       galleryEnabled === '1' || 
                       galleryEnabled === 'true';
      
      if (isEnabled) {
        console.log('Média activé pour la galerie:', item.id, item.title?.rendered);
      }
      return isEnabled;
    });
    
    console.log('Médias filtrés pour la galerie:', galleryMedia.length);
    return galleryMedia;
  } catch (error) {
    console.error('Erreur lors de la récupération des médias WordPress:', error);
    return [];
  }
};

export const fetchArticleImages = async (): Promise<WordPressMedia[]> => {
  try {
    const response = await fetch(
      `${WORDPRESS_API_URL}/posts?per_page=20&_embed=1&_fields=id,featured_media,content`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const posts = await response.json();
    const imageIds = new Set<number>();
    
    // Extraire les IDs des images featured
    posts.forEach((post: any) => {
      if (post.featured_media) {
        imageIds.add(post.featured_media);
      }
      
      // Extraire les images du contenu
      if (post.content?.rendered) {
        const imgMatches = post.content.rendered.match(/wp-image-(\d+)/g);
        if (imgMatches) {
          imgMatches.forEach((match: string) => {
            const id = parseInt(match.replace('wp-image-', ''));
            imageIds.add(id);
          });
        }
      }
    });
    
    if (imageIds.size === 0) return [];
    
    const idsParam = Array.from(imageIds).join(',');
    const mediaResponse = await fetch(
      `${WORDPRESS_API_URL}/media?include=${idsParam}&_fields=id,title,caption,alt_text,media_type,mime_type,source_url,media_details,date,slug,meta`
    );
    
    if (!mediaResponse.ok) {
      console.warn('Erreur lors de la récupération des images d\'articles, fallback vers liste vide');
      return [];
    }
    
    return await mediaResponse.json();
  } catch (error) {
    console.error('Erreur lors de la récupération des images d\'articles:', error);
    return [];
  }
};

export const formatMediaForGallery = (mediaItems: WordPressMedia[]): FormattedGalleryItem[] => {
  console.log('Formatage des médias pour la galerie:', mediaItems.length);
  
  return mediaItems.map((item) => {
    const formattedItem = {
      id: item.id,
      type: item.media_type === 'video' ? 'video' as const : 'photo' as const,
      src: item.source_url,
      caption: item.meta?.gallery_caption || 
               (item.caption?.rendered ? stripHtml(item.caption.rendered) : '') ||
               (item.title?.rendered ? stripHtml(item.title.rendered) : '') ||
               item.alt_text ||
               'Image de la galerie',
      reactions: item.meta?.gallery_reactions || {
        like: Math.floor(Math.random() * 20) + 5,
        love: Math.floor(Math.random() * 10) + 2,
        dislike: Math.floor(Math.random() * 3)
      },
      date: item.date,
      alt: item.alt_text || item.title?.rendered || 'Image'
    };
    
    console.log('Média formaté:', formattedItem.id, formattedItem.caption.substring(0, 50));
    return formattedItem;
  });
};

const stripHtml = (html: string): string => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

export const updateGalleryReaction = async (mediaId: number, reactionType: 'like' | 'love' | 'dislike'): Promise<boolean> => {
  try {
    const response = await fetch(
      `${WORDPRESS_API_URL}/ot-gallery/v1/reaction/${mediaId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reaction_type: reactionType
        })
      }
    );
    
    return response.ok;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la réaction:', error);
    return false;
  }
};
