
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Heart, ThumbsUp, ThumbsDown, Upload, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { useWordPressGallery } from '@/hooks/useWordPressGallery';
import type { FormattedGalleryItem } from '@/services/wordpressMedia';

const Gallery = () => {
  const { t } = useTranslation();
  const [selectedItem, setSelectedItem] = useState<FormattedGalleryItem | null>(null);
  const [newCaption, setNewCaption] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const { galleryItems, isLoading, error, handleReaction, addLocalItem } = useWordPressGallery();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmitUpload = () => {
    if (selectedFile && newCaption) {
      const newItem: FormattedGalleryItem = {
        id: Date.now(),
        type: selectedFile.type.startsWith('video/') ? 'video' : 'photo',
        src: URL.createObjectURL(selectedFile),
        caption: newCaption,
        reactions: { like: 0, love: 0, dislike: 0 },
        date: new Date().toISOString(),
        alt: newCaption
      };
      
      addLocalItem(newItem);
      setSelectedFile(null);
      setNewCaption('');
      toast.success('Votre contenu a été ajouté avec succès à la galerie!');
    }
  };

  if (error) {
    console.error('Erreur de chargement de la galerie:', error);
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-congo-brown mb-4 animate-fade-in">
            {t('nav.gallery')}
          </h1>
          <p className="text-xl text-congo-brown/80 max-w-2xl mx-auto animate-fade-in">
            Explorez la beauté captivante de la République Démocratique du Congo à travers notre collection de photos et vidéos
          </p>
        </div>

        {/* Status Section */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {isLoading && (
              <div className="flex items-center space-x-2 text-congo-brown/70 bg-congo-beige/70 px-4 py-2 rounded-lg border border-congo-brown/20">
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span className="text-sm">Chargement de la galerie...</span>
              </div>
            )}
            {galleryItems.length > 0 && (
              <div className="bg-congo-green/10 text-congo-brown px-4 py-2 rounded-lg border border-congo-green/20">
                <p className="text-sm font-medium">
                  {galleryItems.length} {galleryItems.length === 1 ? 'élément' : 'éléments'} dans la galerie
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Upload Section */}
        <Card className="mb-12 border-congo-brown/20 shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-congo-brown mb-4">Partagez vos moments du Congo</h3>
            <div className="bg-congo-green/10 border border-congo-green/20 p-4 rounded-lg mb-6">
              <p className="text-sm text-congo-brown/80">
                💡 <strong>Astuce :</strong> Partagez vos plus belles photos et vidéos du Congo avec notre communauté. 
                Vos contributions enrichissent notre galerie collective !
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <Input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                  className="border-congo-brown/30 focus:border-congo-green"
                />
              </div>
              <Textarea
                placeholder="Décrivez votre photo/vidéo : où a-t-elle été prise ? Quelle est l'histoire derrière ?"
                value={newCaption}
                onChange={(e) => setNewCaption(e.target.value)}
                className="border-congo-brown/30 focus:border-congo-green min-h-[80px]"
              />
              <Button 
                onClick={handleSubmitUpload}
                disabled={!selectedFile || !newCaption}
                className="bg-congo-green hover:bg-congo-green/90 text-white font-medium px-6 py-2"
              >
                <Upload className="h-4 w-4 mr-2" />
                Partager dans la galerie
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Loading State */}
        {isLoading && galleryItems.length === 0 && (
          <div className="text-center py-16 bg-congo-beige/30 rounded-lg border border-congo-brown/10">
            <RefreshCw className="h-16 w-16 animate-spin mx-auto text-congo-green mb-6" />
            <p className="text-congo-brown/70 text-lg">Chargement de la galerie...</p>
            <p className="text-congo-brown/60 text-sm mt-2">Découvrez bientôt les merveilles du Congo</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && galleryItems.length === 0 && (
          <div className="text-center py-16 bg-congo-beige/30 rounded-lg border border-congo-brown/10">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">📸</div>
              <h3 className="text-xl font-semibold text-congo-brown mb-2">La galerie se prépare</h3>
              <p className="text-congo-brown/70 mb-4">
                Bientôt, cette galerie sera remplie de magnifiques images du Congo.
              </p>
              <p className="text-congo-brown/60 text-sm">
                Soyez le premier à partager vos souvenirs !
              </p>
            </div>
          </div>
        )}

        {/* Featured Carousel - First 5 items */}
        {galleryItems.length > 0 && (
          <>
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-congo-brown mb-6 text-center">À la une</h2>
              <Carousel className="w-full max-w-5xl mx-auto">
                <CarouselContent>
                  {galleryItems.slice(0, 5).map((item) => (
                    <CarouselItem key={item.id}>
                      <div className="p-1">
                        <Card className="border-congo-brown/20 overflow-hidden">
                          <div 
                            className="relative cursor-pointer h-96 group"
                            onClick={() => setSelectedItem(item)}
                          >
                            {item.type === 'photo' ? (
                              <img
                                src={item.src}
                                alt={item.alt}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                onError={(e) => {
                                  e.currentTarget.src = "https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=800&h=400&fit=crop";
                                }}
                              />
                            ) : (
                              <video
                                src={item.src}
                                className="w-full h-full object-cover"
                                controls={false}
                              />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-congo-brown/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="absolute bottom-4 left-4 right-4">
                                <p className="text-white font-medium text-lg line-clamp-2">{item.caption}</p>
                              </div>
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <p className="text-congo-brown font-medium mb-3 line-clamp-2">{item.caption}</p>
                            
                            {/* Reaction Buttons */}
                            <div className="flex items-center justify-between">
                              <div className="flex space-x-4">
                                <button
                                  onClick={() => handleReaction(item.id, 'like')}
                                  className="flex items-center space-x-1 text-congo-brown/70 hover:text-congo-green transition-colors group"
                                >
                                  <ThumbsUp className="h-4 w-4 group-hover:scale-110 transition-transform" />
                                  <span className="text-sm font-medium">{item.reactions.like}</span>
                                </button>
                                
                                <button
                                  onClick={() => handleReaction(item.id, 'love')}
                                  className="flex items-center space-x-1 text-congo-brown/70 hover:text-red-500 transition-colors group"
                                >
                                  <Heart className="h-4 w-4 group-hover:scale-110 transition-transform" />
                                  <span className="text-sm font-medium">{item.reactions.love}</span>
                                </button>
                                
                                <button
                                  onClick={() => handleReaction(item.id, 'dislike')}
                                  className="flex items-center space-x-1 text-congo-brown/70 hover:text-congo-brown transition-colors group"
                                >
                                  <ThumbsDown className="h-4 w-4 group-hover:scale-110 transition-transform" />
                                  <span className="text-sm font-medium">{item.reactions.dislike}</span>
                                </button>
                              </div>
                              
                              <span className="text-xs text-congo-brown/50 bg-congo-beige/50 px-2 py-1 rounded">
                                {new Date(item.date).toLocaleDateString('fr-FR')}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="border-congo-brown/20 hover:bg-congo-beige" />
                <CarouselNext className="border-congo-brown/20 hover:bg-congo-beige" />
              </Carousel>
            </div>

            {/* Gallery Grid - All items */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-congo-brown mb-6 text-center">Toute la galerie</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {galleryItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden border-congo-brown/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                    <div 
                      className="relative cursor-pointer"
                      onClick={() => setSelectedItem(item)}
                    >
                      {item.type === 'photo' ? (
                        <img
                          src={item.src}
                          alt={item.alt}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.src = "https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=800&h=400&fit=crop";
                          }}
                        />
                      ) : (
                        <div className="relative">
                          <video
                            src={item.src}
                            className="w-full h-48 object-cover"
                            controls={false}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-congo-brown/20">
                            <div className="bg-white/90 rounded-full p-3">
                              <svg className="w-6 h-6 text-congo-brown" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <p className="text-congo-brown font-medium mb-3 line-clamp-2 text-sm">{item.caption}</p>
                      
                      {/* Reaction Buttons */}
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleReaction(item.id, 'like')}
                            className="flex items-center space-x-1 text-congo-brown/70 hover:text-congo-green transition-colors"
                          >
                            <ThumbsUp className="h-3 w-3" />
                            <span className="text-xs">{item.reactions.like}</span>
                          </button>
                          
                          <button
                            onClick={() => handleReaction(item.id, 'love')}
                            className="flex items-center space-x-1 text-congo-brown/70 hover:text-red-500 transition-colors"
                          >
                            <Heart className="h-3 w-3" />
                            <span className="text-xs">{item.reactions.love}</span>
                          </button>
                          
                          <button
                            onClick={() => handleReaction(item.id, 'dislike')}
                            className="flex items-center space-x-1 text-congo-brown/70 hover:text-congo-brown transition-colors"
                          >
                            <ThumbsDown className="h-3 w-3" />
                            <span className="text-xs">{item.reactions.dislike}</span>
                          </button>
                        </div>
                        
                        <span className="text-xs text-congo-brown/50">
                          {new Date(item.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Lightbox Modal */}
        {selectedItem && (
          <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
              <DialogHeader>
                <DialogTitle className="text-congo-brown text-lg">{selectedItem.caption}</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="flex justify-center">
                  {selectedItem.type === 'photo' ? (
                    <img
                      src={selectedItem.src}
                      alt={selectedItem.alt}
                      className="max-w-full max-h-[60vh] object-contain rounded-lg"
                    />
                  ) : (
                    <video
                      src={selectedItem.src}
                      className="max-w-full max-h-[60vh] object-contain rounded-lg"
                      controls
                    />
                  )}
                </div>
                
                {/* Reaction Buttons in Modal */}
                <div className="flex items-center justify-center space-x-8 pt-4 border-t border-congo-brown/10">
                  <button
                    onClick={() => handleReaction(selectedItem.id, 'like')}
                    className="flex items-center space-x-2 text-congo-brown/70 hover:text-congo-green transition-colors group"
                  >
                    <ThumbsUp className="h-6 w-6 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">{selectedItem.reactions.like}</span>
                  </button>
                  
                  <button
                    onClick={() => handleReaction(selectedItem.id, 'love')}
                    className="flex items-center space-x-2 text-congo-brown/70 hover:text-red-500 transition-colors group"
                  >
                    <Heart className="h-6 w-6 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">{selectedItem.reactions.love}</span>
                  </button>
                  
                  <button
                    onClick={() => handleReaction(selectedItem.id, 'dislike')}
                    className="flex items-center space-x-2 text-congo-brown/70 hover:text-congo-brown transition-colors group"
                  >
                    <ThumbsDown className="h-6 w-6 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">{selectedItem.reactions.dislike}</span>
                  </button>
                </div>
                
                <div className="text-center">
                  <span className="text-sm text-congo-brown/60 bg-congo-beige/50 px-3 py-1 rounded-full">
                    Ajouté le {new Date(selectedItem.date).toLocaleDateString('fr-FR', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </Layout>
  );
};

export default Gallery;
