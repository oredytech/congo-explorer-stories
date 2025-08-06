
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
    queryFn: async () => {
      console.log('Récupération des médias de galerie WordPress...');
      const media = await fetchWordPressGalleryMedia();
      console.log('Médias de galerie récupérés:', media.length);
      return media;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 10 * 60 * 1000, // Actualiser toutes les 10 minutes
    retry: 2,
  });

  // Récupérer les images des articles (optionnel)
  const { data: articleImages, isLoading: isLoadingArticles, error: articleError } = useQuery({
    queryKey: ['wordpress_article_images'],
    queryFn: async () => {
      console.log('Récupération des images d\'articles...');
      const images = await fetchArticleImages();
      console.log('Images d\'articles récupérées:', images.length);
      return images;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 15 * 60 * 1000, // Actualiser toutes les 15 minutes
    retry: 1,
  });

  useEffect(() => {
    console.log('Mise à jour des éléments de galerie...');
    console.log('Médias de galerie:', galleryMedia?.length || 0);
    console.log('Images d\'articles:', articleImages?.length || 0);
    
    // Prioriser les médias de galerie explicites
    const primaryMedia = galleryMedia || [];
    const secondaryMedia = articleImages || [];
    
    // Combiner mais prioriser les médias de galerie
    const allMedia = [...primaryMedia, ...secondaryMedia];
    
    // Supprimer les doublons basés sur l'ID
    const uniqueMedia = allMedia.filter((item, index, self) => 
      index === self.findIndex(t => t.id === item.id)
    );
    
    console.log('Médias uniques après déduplication:', uniqueMedia.length);
    
    const formattedItems = formatMediaForGallery(uniqueMedia);
    console.log('Éléments formatés pour la galerie:', formattedItems.length);
    
    setLocalGalleryItems(formattedItems);
  }, [galleryMedia, articleImages]);

  const handleReaction = async (itemId: number, reactionType: 'like' | 'love' | 'dislike') => {
    console.log('Réaction ajoutée:', itemId, reactionType);
    
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
      console.log('Réaction mise à jour avec succès sur WordPress');
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la réaction:', error);
      // Note: On ne revient pas en arrière sur l'erreur pour éviter la confusion UX
    }
  };

  const addLocalItem = (item: FormattedGalleryItem) => {
    console.log('Ajout d\'un élément local à la galerie:', item.caption);
    setLocalGalleryItems(prev => [item, ...prev]);
  };

  // Log des erreurs pour debug
  useEffect(() => {
    if (galleryError) {
      console.error('Erreur de chargement des médias de galerie:', galleryError);
    }
    if (articleError) {
      console.error('Erreur de chargement des images d\'articles:', articleError);
    }
  }, [galleryError, articleError]);

  return {
    galleryItems: localGalleryItems,
    isLoading: isLoadingGallery || isLoadingArticles,
    error: galleryError || articleError,
    handleReaction,
    addLocalItem
  };
};
