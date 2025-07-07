
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchWordPressArticles, formatWordPressArticles, FormattedArticle } from '@/services/wordpressApi';

export const useWordPressArticles = (limit = 10) => {
  const { data: wordpressArticles, isLoading, error } = useQuery({
    queryKey: ['wordpress_articles', limit],
    queryFn: () => fetchWordPressArticles(limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 10 * 60 * 1000, // Actualiser toutes les 10 minutes
  });

  const [articles, setArticles] = useState<FormattedArticle[]>([]);

  useEffect(() => {
    if (wordpressArticles) {
      const formatted = formatWordPressArticles(wordpressArticles);
      setArticles(formatted);
    }
  }, [wordpressArticles]);

  const handleReaction = (articleId: number, reactionType: 'like') => {
    setArticles(prevArticles =>
      prevArticles.map(article => {
        if (article.id === articleId) {
          const newArticle = { ...article };
          
          if (article.userReaction === reactionType) {
            newArticle.likes -= 1;
            newArticle.userReaction = null;
          } else {
            if (article.userReaction === 'like') {
              newArticle.likes -= 1;
            }
            newArticle.likes += 1;
            newArticle.userReaction = reactionType;
          }
          
          return newArticle;
        }
        return article;
      })
    );
  };

  const handleRating = (articleId: number, rating: number) => {
    setArticles(prevArticles =>
      prevArticles.map(article => {
        if (article.id === articleId) {
          const newArticle = { ...article };
          
          if (article.userRating === 0) {
            const newTotal = (article.rating * article.totalRatings + rating) / (article.totalRatings + 1);
            newArticle.rating = Math.round(newTotal * 10) / 10;
            newArticle.totalRatings += 1;
          } else {
            const oldTotal = article.rating * article.totalRatings - article.userRating + rating;
            newArticle.rating = Math.round((oldTotal / article.totalRatings) * 10) / 10;
          }
          
          newArticle.userRating = rating;
          return newArticle;
        }
        return article;
      })
    );
  };

  return {
    articles,
    isLoading,
    error,
    handleReaction,
    handleRating
  };
};
