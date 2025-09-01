
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
    console.log('Playlists récupérées:', data.items?.map(p => p.snippet.title));
    return data.items || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des playlists:', error);
    throw error;
  }
};

// Récupérer les vidéos d'une playlist spécifique
export const fetchPlaylistVideos = async (playlistId: string, maxResults = 50): Promise<FormattedYouTubeVideo[]> => {
  try {
    console.log('Récupération des vidéos pour le playlist:', playlistId);
    
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
    
    // Formater les vidéos
    return videosData.items?.map((video: any): FormattedYouTubeVideo => ({
      id: video.id,
      title: video.snippet.title,
      description: video.snippet.description?.substring(0, 200) + '...' || 'Aucune description disponible.',
      image: video.snippet.thumbnails.high?.url || video.snippet.thumbnails.default?.url,
      duration: formatDuration(video.contentDetails.duration),
      views: formatViewCount(video.statistics.viewCount || '0'),
      publishedAt: video.snippet.publishedAt,
      channelTitle: video.snippet.channelTitle,
      videoUrl: `https://www.youtube.com/watch?v=${video.id}`
    })) || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des vidéos de la playlist:', error);
    return [];
  }
};

// Récupérer les vidéos récentes de la chaîne comme fallback
export const fetchChannelVideos = async (): Promise<FormattedYouTubeVideo[]> => {
  try {
    console.log('Récupération des vidéos récentes de la chaîne...');
    
    // Récupérer les vidéos récentes de la chaîne
    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=20&order=date&type=video&key=${YOUTUBE_API_KEY}`
    );
    
    if (!searchResponse.ok) {
      throw new Error(`HTTP error! status: ${searchResponse.status}`);
    }
    
    const searchData = await searchResponse.json();
    const videoIds = searchData.items?.map((item: any) => item.id.videoId).join(',');
    
    if (!videoIds) return [];
    
    // Récupérer les détails des vidéos
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`
    );
    
    if (!videosResponse.ok) {
      throw new Error(`HTTP error! status: ${videosResponse.status}`);
    }
    
    const videosData = await videosResponse.json();
    
    // Formater les vidéos
    return videosData.items?.map((video: any): FormattedYouTubeVideo => ({
      id: video.id,
      title: video.snippet.title,
      description: video.snippet.description?.substring(0, 200) + '...' || 'Aucune description disponible.',
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

// Fonction principale pour récupérer les vidéos documentaires
export const fetchDocumentaryVideos = async (): Promise<FormattedYouTubeVideo[]> => {
  try {
    console.log('Récupération des playlists de la chaîne...');
    const playlists = await fetchChannelPlaylists();
    
    // Chercher spécifiquement le playlist "Documentaires et Découvertes" avec différentes variantes
    const documentaryPlaylist = playlists.find(playlist => {
      const title = playlist.snippet.title.toLowerCase();
      return (
        (title.includes('documentaires') && title.includes('découvertes')) ||
        (title.includes('documentaires') && title.includes('decouvertes')) ||
        title.includes('documentaire') ||
        title.includes('discovery') ||
        title.includes('découverte')
      );
    });
    
    if (documentaryPlaylist) {
      console.log('Playlist trouvé:', documentaryPlaylist.snippet.title);
      const videos = await fetchPlaylistVideos(documentaryPlaylist.id, 50);
      console.log(`${videos.length} vidéos récupérées du playlist`);
      
      if (videos.length > 0) {
        return videos;
      }
    }
    
    // Si aucun playlist spécifique ou aucune vidéo, récupérer les vidéos récentes de la chaîne
    console.log('Aucun playlist documentaire trouvé ou vide, récupération des vidéos récentes...');
    const channelVideos = await fetchChannelVideos();
    console.log(`${channelVideos.length} vidéos récupérées de la chaîne`);
    
    if (channelVideos.length > 0) {
      return channelVideos;
    }
    
    // Dernier fallback: données de démonstration
    console.log('Aucune vidéo trouvée, utilisation de données de démonstration');
    return [
      {
        id: 'demo1',
        title: 'Les Chutes de Zongo - Merveille Naturelle de la RDC',
        description: 'Découvrez les magnifiques chutes de Zongo, situées près de Kinshasa. Un joyau naturel qui témoigne de la beauté exceptionnelle de la République Démocratique du Congo.',
        image: 'https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=800',
        duration: '12 min',
        views: '2.5k',
        publishedAt: new Date().toISOString(),
        channelTitle: 'DRC Découverte',
        videoUrl: 'https://www.youtube.com/watch?v=demo1'
      },
      {
        id: 'demo2',
        title: 'Kinshasa - Capitale Vibrante de la RDC',
        description: 'Explorez Kinshasa, la capitale dynamique de la RDC. De ses marchés colorés à sa vie nocturne animée, découvrez une ville pleine de contrastes et de richesses culturelles.',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
        duration: '18 min',
        views: '3.2k',
        publishedAt: new Date(Date.now() - 86400000).toISOString(),
        channelTitle: 'DRC Découverte',
        videoUrl: 'https://www.youtube.com/watch?v=demo2'
      },
      {
        id: 'demo3',
        title: 'Parc National de Virunga - Biodiversité Exceptionnelle',
        description: 'Plongez dans la biodiversité unique du Parc National de Virunga, l\'un des plus anciens parcs nationaux d\'Afrique et patrimoine mondial de l\'UNESCO.',
        image: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800',
        duration: '25 min',
        views: '4.1k',
        publishedAt: new Date(Date.now() - 172800000).toISOString(),
        channelTitle: 'DRC Découverte',
        videoUrl: 'https://www.youtube.com/watch?v=demo3'
      }
    ];
  } catch (error) {
    console.error('Erreur lors de la récupération des vidéos documentaires:', error);
    
    // En cas d'erreur, retourner des données de démonstration
    return [
      {
        id: 'fallback1',
        title: 'Documentation de la RDC - Contenu Temporairement Indisponible',
        description: 'Nous rencontrons actuellement des difficultés techniques pour charger le contenu depuis YouTube. Veuillez réessayer plus tard.',
        image: 'https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=800',
        duration: '0 min',
        views: '0',
        publishedAt: new Date().toISOString(),
        channelTitle: 'DRC Découverte',
        videoUrl: '#'
      }
    ];
  }
};
