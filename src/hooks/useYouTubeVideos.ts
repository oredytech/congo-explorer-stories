
import { useQuery } from '@tanstack/react-query';
import { fetchDocumentaryVideos, FormattedYouTubeVideo } from '@/services/youtubeApi';

export const useYouTubeVideos = () => {
  const { data: videos, isLoading, error } = useQuery({
    queryKey: ['youtube_documentary_videos'],
    queryFn: fetchDocumentaryVideos,
    staleTime: 30 * 60 * 1000, // 30 minutes
    refetchInterval: 60 * 60 * 1000, // Actualiser toutes les heures
  });

  const featuredVideo = videos?.[0] || null;

  return {
    videos: videos || [],
    featuredVideo,
    isLoading,
    error
  };
};
