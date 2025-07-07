
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

// Trouver la playlist "Documentaires et découvertes" et récupérer ses vidéos
export const fetchDocumentaryVideos = async (): Promise<FormattedYouTubeVideo[]> => {
  try {
    // Récupérer toutes les playlists
    const playlists = await fetchChannelPlaylists();
    
    // Chercher la playlist "Documentaires et découvertes" (recherche flexible)
    const documentaryPlaylist = playlists.find(playlist => 
      playlist.snippet.title.toLowerCase().includes('documentaires') ||
      playlist.snippet.title.toLowerCase().includes('découvertes') ||
      playlist.snippet.title.toLowerCase().includes('decouvertes')
    );
    
    if (!documentaryPlaylist) {
      console.warn('Playlist "Documentaires et découvertes" non trouvée');
      return [];
    }
    
    // Récupérer les vidéos de cette playlist
    const videos = await fetchPlaylistVideos(documentaryPlaylist.id, 5);
    
    // Formater les vidéos
    return videos.map((video: any): FormattedYouTubeVideo => ({
      id: video.id,
      title: video.snippet.title,
      description: video.snippet.description.substring(0, 150) + '...',
      image: video.snippet.thumbnails.high?.url || video.snippet.thumbnails.default?.url,
      duration: formatDuration(video.contentDetails.duration),
      views: formatViewCount(video.statistics.viewCount),
      publishedAt: video.snippet.publishedAt,
      channelTitle: video.snippet.channelTitle,
      videoUrl: `https://www.youtube.com/watch?v=${video.id}`
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des vidéos documentaires:', error);
    return [];
  }
};
