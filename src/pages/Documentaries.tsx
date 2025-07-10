
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Play, Clock, Eye, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useYouTubeVideos } from '@/hooks/useYouTubeVideos';

const Documentaries = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { videos, isLoading, error } = useYouTubeVideos();

  const categories = [
    { id: 'all', name: 'Tous' },
    { id: 'nature', name: 'Nature' },
    { id: 'culture', name: 'Culture' },
    { id: 'histoire', name: 'Histoire' },
    { id: 'communaute', name: 'Communauté' }
  ];

  // Categorize videos based on their titles/descriptions
  const categorizeVideo = (video: any) => {
    const title = video.title.toLowerCase();
    const description = video.description.toLowerCase();
    
    if (title.includes('nature') || title.includes('parc') || title.includes('animal') || description.includes('nature')) {
      return 'nature';
    }
    if (title.includes('culture') || title.includes('tradition') || title.includes('art') || description.includes('culture')) {
      return 'culture';
    }
    if (title.includes('histoire') || title.includes('historical') || description.includes('histoire')) {
      return 'histoire';
    }
    if (title.includes('communauté') || title.includes('ville') || title.includes('kinshasa') || description.includes('communauté')) {
      return 'communaute';
    }
    return 'culture'; // Default category
  };

  const filteredVideos = selectedCategory === 'all' 
    ? videos 
    : videos.filter(video => categorizeVideo(video) === selectedCategory);

  const handlePlayVideo = (videoId: string) => {
    navigate(`/watch/${videoId}`);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-congo-green mx-auto mb-4"></div>
              <p className="text-congo-brown">Chargement des documentaires...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <p className="text-red-600">Erreur lors du chargement des vidéos. Veuillez réessayer plus tard.</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-congo-brown mb-4">
              Nos Documentaires
            </h1>
            <p className="text-lg text-congo-brown/70 max-w-3xl mx-auto">
              Découvrez la RDC à travers nos documentaires authentiques. Des récits visuels 
              qui révèlent la beauté, la culture et l'histoire de notre pays.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id ? "bg-congo-green hover:bg-congo-green/80 text-white" : "border-congo-brown text-congo-brown hover:bg-congo-brown hover:text-congo-beige"}
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* Documentary Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((video) => (
              <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-congo-brown/10">
                <div className="relative">
                  <img
                    src={video.image}
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                       onClick={() => handlePlayVideo(video.id)}>
                    <Play className="h-16 w-16 text-white" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {video.duration}
                  </div>
                  {/* Logo du site en haut à gauche */}
                  <div className="absolute top-2 left-2 bg-congo-green bg-opacity-90 text-white px-2 py-1 rounded text-xs font-semibold">
                    DRC Découverte
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs bg-congo-beige text-congo-brown">
                      {categories.find(cat => cat.id === categorizeVideo(video))?.name}
                    </Badge>
                    <div className="flex items-center text-sm text-congo-brown/70">
                      <Eye className="h-3 w-3 mr-1" />
                      {video.views}
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-congo-brown mb-2 line-clamp-2">
                    {video.title}
                  </h3>
                  
                  <p className="text-congo-brown/70 text-sm mb-4 line-clamp-3">
                    {video.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-congo-brown/60">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(video.publishedAt).toLocaleDateString('fr-FR')}
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => handlePlayVideo(video.id)}
                      className="bg-congo-green hover:bg-congo-green/80 text-white"
                    >
                      Regarder
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16 p-8 bg-congo-beige/50 rounded-lg border border-congo-brown/10">
            <h2 className="text-2xl font-bold text-congo-brown mb-4">
              Vous avez une histoire à raconter ?
            </h2>
            <p className="text-congo-brown/70 mb-6">
              Partagez vos découvertes et aidez-nous à documenter les merveilles de la RDC.
            </p>
            <Button className="bg-congo-green hover:bg-congo-green/80 text-white">
              Proposer un documentaire
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Documentaries;
