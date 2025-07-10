
export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnails: {
    high: {
      url: string;
    };
  };
  publishedAt: string;
  duration: string;
  viewCount: string;
  channelTitle: string;
}

export interface FormattedYouTubeVideo {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  views: string;
  publishedAt: string;
  channelTitle: string;
  videoUrl: string;
}

const YOUTUBE_API_KEY = 'AIzaSyCxviHY5kTYZZlIq_A3w0jtZtdKQO5DkVs';
const CHANNEL_ID = 'UCgeUF002rmXRRBusPsOI8Zg';

// Fonction pour convertir la durée ISO 8601 en format lisible
const formatDuration = (duration: string): string => {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return '0 min';
  
  const hours = parseInt(match[1]?.replace('H', '') || '0');
  const minutes = parseInt(match[2]?.replace('M', '') || '0');
  const seconds = parseInt(match[3]?.replace('S', '') || '0');
  
  if (hours > 0) {
    return `${hours}h ${minutes}min`;
  }
  return `${minutes} min`;
};

// Fonction pour formater le nombre de vues
const formatViewCount = (viewCount: string): string => {
  const count = parseInt(viewCount);
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

// Récupérer toutes les vidéos de la chaîne
export const fetchAllChannelVideos = async (maxResults = 50): Promise<FormattedYouTubeVideo[]> => {
  try {
    // Récupérer les vidéos de la chaîne
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=${maxResults}&order=date&type=video&key=${YOUTUBE_API_KEY}`
    );
    
    if (!videosResponse.ok) {
      throw new Error(`HTTP error! status: ${videosResponse.status}`);
    }
    
    const videosData = await videosResponse.json();
    const videoIds = videosData.items?.map((item: any) => item.id.videoId).join(',');
    
    if (!videoIds) return [];
    
    // Récupérer les détails des vidéos
    const detailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`
    );
    
    if (!detailsResponse.ok) {
      throw new Error(`HTTP error! status: ${detailsResponse.status}`);
    }
    
    const detailsData = await detailsResponse.json();
    
    // Formater les vidéos
    return detailsData.items?.map((video: any): FormattedYouTubeVideo => ({
      id: video.id,
      title: video.snippet.title,
      description: video.snippet.description || 'Aucune description disponible.',
      image: video.snippet.thumbnails.high?.url || video.snippet.thumbnails.default?.url,
      duration: formatDuration(video.contentDetails.duration),
      views: formatViewCount(video.statistics.viewCount || '0'),
      publishedAt: video.snippet.publishedAt,
      channelTitle: video.snippet.channelTitle,
      videoUrl: `https://www.youtube.com/watch?v=${video.id}`
    })) || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des vidéos de la chaîne:', error);
    return [];
  }
};

// Récupérer les playlists de la chaîne
export const fetchChannelPlaylists = async (): Promise<any[]> => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${CHANNEL_ID}&maxResults=50&key=${YOUTUBE_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des playlists:', error);
    throw error;
  }
};

// Récupérer les vidéos d'une playlist spécifique
export const fetchPlaylistVideos = async (playlistId: string, maxResults = 10): Promise<YouTubeVideo[]> => {
  try {
    // Récupérer les IDs des vidéos de la playlist
    const playlistResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}`
    );
    
    if (!playlistResponse.ok) {
      throw new Error(`HTTP error! status: ${playlistResponse.status}`);
    }
    
    const playlistData = await playlistResponse.json();
    const videoIds = playlistData.items?.map((item: any) => item.snippet.resourceId.videoId).join(',');
    
    if (!videoIds) return [];
    
    // Récupérer les détails des vidéos
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`
    );
    
    if (!videosResponse.ok) {
      throw new Error(`HTTP error! status: ${videosResponse.status}`);
    }
    
    const videosData = await videosResponse.json();
    return videosData.items || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des vidéos de la playlist:', error);
    throw error;
  }
};

// Fonction principale pour récupérer les vidéos documentaires
export const fetchDocumentaryVideos = async (): Promise<FormattedYouTubeVideo[]> => {
  try {
    // D'abord essayer de récupérer depuis une playlist documentaire
    const playlists = await fetchChannelPlaylists();
    const documentaryPlaylist = playlists.find(playlist => 
      playlist.snippet.title.toLowerCase().includes('documentaires') ||
      playlist.snippet.title.toLowerCase().includes('découvertes') ||
      playlist.snippet.title.toLowerCase().includes('decouvertes')
    );
    
    if (documentaryPlaylist) {
      const videos = await fetchPlaylistVideos(documentaryPlaylist.id, 20);
      const formattedVideos = videos.map((video: any): FormattedYouTubeVideo => ({
        id: video.id,
        title: video.snippet.title,
        description: video.snippet.description?.substring(0, 150) + '...' || 'Aucune description disponible.',
        image: video.snippet.thumbnails.high?.url || video.snippet.thumbnails.default?.url,
        duration: formatDuration(video.contentDetails.duration),
        views: formatViewCount(video.statistics.viewCount || '0'),
        publishedAt: video.snippet.publishedAt,
        channelTitle: video.snippet.channelTitle,
        videoUrl: `https://www.youtube.com/watch?v=${video.id}`
      }));
      
      if (formattedVideos.length > 0) {
        return formattedVideos;
      }
    }
    
    // Si pas de playlist documentaire, récupérer toutes les vidéos de la chaîne
    return await fetchAllChannelVideos(30);
  } catch (error) {
    console.error('Erreur lors de la récupération des vidéos documentaires:', error);
    // Fallback: récupérer toutes les vidéos de la chaîne
    return await fetchAllChannelVideos(20);
  }
};
