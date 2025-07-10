
import { useTranslation } from 'react-i18next';
import { Play, Clock, Eye, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useYouTubeVideos } from '@/hooks/useYouTubeVideos';

const DiscoverySection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { featuredVideo, isLoading, error } = useYouTubeVideos();

  // Données par défaut si aucune vidéo n'est disponible
  const defaultDiscovery = {
    title: "La Vallée de la Nsele",
    subtitle: "Kinshasa - Province de Kinshasa",
    description: "Découvrez ce joyau naturel aux portes de Kinshasa, où la nature reprend ses droits dans un écosystème préservé. La Vallée de la Nsele offre des paysages à couper le souffle et une biodiversité exceptionnelle.",
    image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f",
    duration: "15 min",
    views: "2.3k",
    type: "Documentaire"
  };

  const discovery = featuredVideo ? {
    title: featuredVideo.title,
    subtitle: featuredVideo.channelTitle,
    description: featuredVideo.description,
    image: featuredVideo.image,
    duration: featuredVideo.duration,
    views: featuredVideo.views,
    type: "Documentaire YouTube",
    videoUrl: featuredVideo.videoUrl,
    videoId: featuredVideo.id
  } : defaultDiscovery;

  const handleWatchVideo = () => {
    if (featuredVideo?.id) {
      // Rediriger vers la page de lecture vidéo interne
      navigate(`/watch/${featuredVideo.id}`);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-congo-beige/50 to-congo-green/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-congo-brown mb-4">
            {t('home.discoverMonth')}
          </h2>
          <p className="text-lg text-congo-brown/70">
            Chaque mois, nous mettons en lumière un lieu exceptionnel de la RDC
          </p>
        </motion.div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-congo-green mx-auto"></div>
            <p className="text-congo-brown/60 mt-4">Chargement de la vidéo...</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="overflow-hidden shadow-2xl border-congo-brown/20 bg-white">
              <div className="grid lg:grid-cols-2">
                {/* Image */}
                <div className="relative">
                  <img
                    src={discovery.image}
                    alt={discovery.title}
                    className="w-full h-64 lg:h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1485833077593-4278bba3f11f";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/20"></div>
                  
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button 
                      size="lg" 
                      className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30"
                      onClick={handleWatchVideo}
                    >
                      <Play className="h-6 w-6 mr-2" />
                      Regarder
                    </Button>
                  </div>

                  {/* Video stats */}
                  <div className="absolute bottom-4 left-4 flex items-center space-x-4 text-white text-sm">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{discovery.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{discovery.views}</span>
                    </div>
                  </div>

                  {/* Type badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-congo-green text-white px-3 py-1 rounded-full text-sm font-medium">
                      {discovery.type}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <CardContent className="p-8 flex flex-col justify-center">
                  <div className="space-y-6">
                    <div>
                      <p className="text-congo-green font-medium text-sm mb-2">
                        {discovery.subtitle}
                      </p>
                      <h3 className="text-2xl font-bold text-congo-brown mb-4 line-clamp-2">
                        {discovery.title}
                      </h3>
                      <p className="text-congo-brown/70 leading-relaxed line-clamp-4">
                        {discovery.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button 
                        className="bg-congo-green hover:bg-congo-green/80 text-white"
                        onClick={handleWatchVideo}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Voir le documentaire
                      </Button>
                      {featuredVideo && (
                        <Button 
                          variant="outline" 
                          className="border-congo-brown text-congo-brown hover:bg-congo-brown hover:text-congo-beige"
                          onClick={() => window.open(featuredVideo.videoUrl, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Ouvrir sur YouTube
                        </Button>
                      )}
                    </div>

                    {error && (
                      <p className="text-red-600 text-sm">
                        Erreur lors du chargement de la vidéo. Contenu par défaut affiché.
                      </p>
                    )}
                  </div>
                </CardContent>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default DiscoverySection;
