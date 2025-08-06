
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  fetchWordPressGalleryMedia, 
  fetchArticleImages, 
  formatMediaForGallery, 
  updateGalleryReaction,
  type FormattedGalleryItem 
} from '@/services/wordpressMedia';

export const useWordPressGallery = () => {
  const [localGalleryItems, setLocalGalleryItems] = useState<FormattedGalleryItem[]>([]);

  // Récupérer les médias explicitement ajoutés à la galerie
  const { data: galleryMedia, isLoading: isLoadingGallery, error: galleryError } = useQuery({
    queryKey: ['wordpress_gallery_media'],
    queryFn: fetchWordPressGalleryMedia,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 10 * 60 * 1000, // Actualiser toutes les 10 minutes
  });

  // Récupérer les images des articles
  const { data: articleImages, isLoading: isLoadingArticles, error: articleError } = useQuery({
    queryKey: ['wordpress_article_images'],
    queryFn: fetchArticleImages,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 15 * 60 * 1000, // Actualiser toutes les 15 minutes
  });

  useEffect(() => {
    const allMedia = [...(galleryMedia || []), ...(articleImages || [])];
    
    // Supprimer les doublons basés sur l'ID
    const uniqueMedia = allMedia.filter((item, index, self) => 
      index === self.findIndex(t => t.id === item.id)
    );
    
    const formattedItems = formatMediaForGallery(uniqueMedia);
    setLocalGalleryItems(formattedItems);
  }, [galleryMedia, articleImages]);

  const handleReaction = async (itemId: number, reactionType: 'like' | 'love' | 'dislike') => {
    // Mise à jour optimiste locale
    setLocalGalleryItems(prev => prev.map(item => 
      item.id === itemId 
        ? {
            ...item,
            reactions: {
              ...item.reactions,
              [reactionType]: item.reactions[reactionType] + 1
            }
          }
        : item
    ));

    // Tenter de mettre à jour sur WordPress (silencieusement)
    try {
      await updateGalleryReaction(itemId, reactionType);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la réaction:', error);
      // Note: On ne revient pas en arrière sur l'erreur pour éviter la confusion UX
    }
  };

  const addLocalItem = (item: FormattedGalleryItem) => {
    setLocalGalleryItems(prev => [item, ...prev]);
  };

  return {
    galleryItems: localGalleryItems,
    isLoading: isLoadingGallery || isLoadingArticles,
    error: galleryError || articleError,
    handleReaction,
    addLocalItem
  };
};
