
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  ThumbsUp, 
  ThumbsDown, 
  Share2, 
  Download, 
  Flag,
  Clock,
  Eye,
  Calendar,
  Play,
  ArrowLeft,
  Facebook,
  Twitter,
  Linkedin,
  MessageSquare,
  Copy
} from 'lucide-react';
import { useYouTubeVideos } from '@/hooks/useYouTubeVideos';
import { toast } from '@/hooks/use-toast';

const WatchVideo = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const { videos, isLoading } = useYouTubeVideos();
  const [currentVideo, setCurrentVideo] = useState<any>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    if (videos.length > 0 && videoId) {
      const video = videos.find(v => v.id === videoId);
      setCurrentVideo(video);
    }
  }, [videos, videoId]);

  const handleVideoSelect = (video: any) => {
    navigate(`/watch/${video.id}`);
  };

  const handleShare = (platform: string) => {
    const shareUrl = `https://visitecongo.net/watch/${videoId}`;
    const shareTitle = currentVideo?.title || '';
    let url = '';
    
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(shareUrl);
        toast({
          title: "Lien copié",
          description: "Le lien de la vidéo a été copié dans le presse-papiers",
        });
        return;
    }
    
    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
    }
  };

  if (isLoading || !currentVideo) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-congo-beige">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-congo-green"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-congo-beige min-h-screen">
        <div className="container mx-auto px-4 py-4">
          {/* Navigation */}
          <div className="mb-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/documentaires')}
              className="text-congo-brown hover:bg-congo-brown/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux documentaires
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Video Section */}
            <div className="lg:col-span-3">
              {/* Video Player */}
              <div className="relative bg-black rounded-lg overflow-hidden mb-4 shadow-lg">
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${currentVideo.id}?rel=0&modestbranding=1&showinfo=0&controls=1&autoplay=1`}
                    title={currentVideo.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* Video Info */}
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h1 className="text-2xl font-bold text-congo-brown mb-4">
                  {currentVideo.title}
                </h1>

                <div className="flex flex-wrap items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 mb-2 lg:mb-0">
                    <div className="flex items-center text-congo-brown/70">
                      <Eye className="h-4 w-4 mr-1" />
                      <span>{currentVideo.views} vues</span>
                    </div>
                    <div className="flex items-center text-congo-brown/70">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{new Date(currentVideo.publishedAt).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="border-congo-brown/20 text-congo-brown hover:bg-congo-brown hover:text-white">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      J'aime
                    </Button>
                    <Button variant="outline" size="sm" className="border-congo-brown/20 text-congo-brown hover:bg-congo-brown hover:text-white">
                      <ThumbsDown className="h-4 w-4 mr-1" />
                      Je n'aime pas
                    </Button>
                  </div>
                </div>

                {/* Boutons de partage */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-sm text-congo-brown/60 mr-2">Partager :</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleShare('facebook')}
                    className="p-2 border-congo-brown/20 hover:bg-congo-brown/10"
                  >
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleShare('twitter')}
                    className="p-2 border-congo-brown/20 hover:bg-congo-brown/10"
                  >
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleShare('linkedin')}
                    className="p-2 border-congo-brown/20 hover:bg-congo-brown/10"
                  >
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleShare('whatsapp')}
                    className="p-2 border-congo-brown/20 hover:bg-congo-brown/10"
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleShare('copy')}
                    className="p-2 border-congo-brown/20 hover:bg-congo-brown/10"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                {/* Channel Info */}
                <div className="border-t border-congo-brown/20 pt-4">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-congo-green rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">VC</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-congo-brown">{currentVideo.channelTitle}</h3>
                      <p className="text-congo-brown/70 text-sm">Chaîne officielle Visite Congo</p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="bg-congo-beige/50 rounded-lg p-4 border border-congo-brown/10">
                    <p className="text-congo-brown/90 leading-relaxed">
                      {showFullDescription 
                        ? currentVideo.description 
                        : `${currentVideo.description.substring(0, 200)}...`
                      }
                    </p>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setShowFullDescription(!showFullDescription)}
                      className="text-congo-green hover:bg-congo-green/10 mt-2 p-0"
                    >
                      {showFullDescription ? 'Afficher moins' : 'Afficher plus'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - Related Videos */}
            <div className="lg:col-span-1">
              <div className="sticky top-4">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="p-4 bg-congo-green/5 border-b border-congo-brown/10">
                    <h2 className="font-bold text-congo-brown">Vidéos suggérées</h2>
                  </div>
                  <ScrollArea className="h-[calc(100vh-200px)]">
                    <div className="p-4 space-y-4">
                      {videos
                        .filter(video => video.id !== currentVideo.id)
                        .slice(0, 10)
                        .map((video) => (
                          <Card 
                            key={video.id} 
                            className="cursor-pointer hover:shadow-md transition-all duration-200 border-congo-brown/10 hover:bg-congo-beige/30"
                            onClick={() => handleVideoSelect(video)}
                          >
                            <CardContent className="p-3">
                              <div className="relative mb-2">
                                <img
                                  src={video.image}
                                  alt={video.title}
                                  className="w-full h-20 object-cover rounded shadow-sm"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                  <Play className="h-6 w-6 text-white" />
                                </div>
                                <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white px-1 py-0.5 rounded text-xs flex items-center">
                                  <Clock className="h-2 w-2 mr-1" />
                                  {video.duration}
                                </div>
                              </div>
                              <h4 className="font-medium text-congo-brown text-sm line-clamp-2 mb-1">
                                {video.title}
                              </h4>
                              <div className="flex items-center text-xs text-congo-brown/60">
                                <Eye className="h-3 w-3 mr-1" />
                                {video.views}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WatchVideo;
