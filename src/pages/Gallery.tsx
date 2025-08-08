
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
      <div className="min-h-screen bg-gradient-to-br from-congo-beige via-congo-beige/90 to-congo-beige-dark">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-congo-brown mb-6 animate-fade-in drop-shadow-sm">
              {t('nav.gallery')}
            </h1>
            <p className="text-xl text-congo-brown/85 max-w-3xl mx-auto animate-fade-in leading-relaxed">
              Explorez la beauté captivante de la République Démocratique du Congo à travers notre collection de photos et vidéos
            </p>
          </div>

          {/* Status Section */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {isLoading && (
                <div className="flex items-center space-x-3 text-congo-brown bg-white/80 backdrop-blur-sm px-6 py-3 rounded-xl border border-congo-brown/10 shadow-sm">
                  <RefreshCw className="h-5 w-5 animate-spin text-congo-green" />
                  <span className="text-sm font-medium">Chargement de la galerie...</span>
                </div>
              )}
              {galleryItems.length > 0 && (
                <div className="bg-congo-green/15 text-congo-brown px-6 py-3 rounded-xl border border-congo-green/25 shadow-sm backdrop-blur-sm">
                  <p className="text-sm font-semibold">
                    {galleryItems.length} {galleryItems.length === 1 ? 'élément' : 'éléments'} dans la galerie
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Upload Section */}
          <Card className="mb-12 border-congo-brown/15 shadow-xl bg-white/95 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-congo-brown mb-6">Partagez vos moments du Congo</h3>
              <div className="bg-gradient-to-r from-congo-green/10 to-congo-green/5 border border-congo-green/20 p-6 rounded-xl mb-8">
                <p className="text-congo-brown/90 leading-relaxed">
                  <span className="text-2xl mr-2">📸</span>
                  <strong>Astuce :</strong> Partagez vos plus belles photos et vidéos du Congo avec notre communauté. 
                  Vos contributions enrichissent notre galerie collective !
                </p>
              </div>
              <div className="space-y-6">
                <div>
                  <Input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileUpload}
                    className="border-congo-brown/25 focus:border-congo-green focus:ring-congo-green/20 bg-white/80 text-congo-brown"
                  />
                </div>
                <Textarea
                  placeholder="Décrivez votre photo/vidéo : où a-t-elle été prise ? Quelle est l'histoire derrière ?"
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  className="border-congo-brown/25 focus:border-congo-green focus:ring-congo-green/20 min-h-[100px] bg-white/80 text-congo-brown placeholder:text-congo-brown/60"
                />
                <Button 
                  onClick={handleSubmitUpload}
                  disabled={!selectedFile || !newCaption}
                  className="bg-gradient-to-r from-congo-green to-congo-green-light hover:from-congo-green-light hover:to-congo-green text-white font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Upload className="h-5 w-5 mr-3" />
                  Partager dans la galerie
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Loading State */}
          {isLoading && galleryItems.length === 0 && (
            <div className="text-center py-20 bg-white/70 backdrop-blur-sm rounded-2xl border border-congo-brown/10 shadow-lg">
              <RefreshCw className="h-20 w-20 animate-spin mx-auto text-congo-green mb-8" />
              <p className="text-congo-brown text-2xl font-semibold mb-4">Chargement de la galerie...</p>
              <p className="text-congo-brown/70 text-lg">Découvrez bientôt les merveilles du Congo</p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && galleryItems.length === 0 && (
            <div className="text-center py-20 bg-gradient-to-br from-white/80 to-congo-beige-dark/20 backdrop-blur-sm rounded-2xl border border-congo-brown/10 shadow-lg">
              <div className="max-w-md mx-auto">
                <div className="text-8xl mb-6">📸</div>
                <h3 className="text-2xl font-bold text-congo-brown mb-4">La galerie se prépare</h3>
                <p className="text-congo-brown/80 mb-6 text-lg leading-relaxed">
                  Bientôt, cette galerie sera remplie de magnifiques images du Congo.
                </p>
                <p className="text-congo-brown/60">
                  Soyez le premier à partager vos souvenirs !
                </p>
              </div>
            </div>
          )}

          {/* Featured Carousel - First 5 items */}
          {galleryItems.length > 0 && (
            <>
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-congo-brown mb-8 text-center">À la une</h2>
                <Carousel className="w-full max-w-6xl mx-auto">
                  <CarouselContent>
                    {galleryItems.slice(0, 5).map((item) => (
                      <CarouselItem key={item.id}>
                        <div className="p-2">
                          <Card className="border-congo-brown/15 overflow-hidden shadow-xl bg-white/95 backdrop-blur-sm">
                            <div 
                              className="relative cursor-pointer h-[400px] group"
                              onClick={() => setSelectedItem(item)}
                            >
                              {item.type === 'photo' ? (
                                <img
                                  src={item.src}
                                  alt={item.alt}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
                              <div className="absolute inset-0 bg-gradient-to-t from-congo-brown/80 via-congo-brown/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                                <div className="absolute bottom-6 left-6 right-6">
                                  <p className="text-white font-semibold text-xl line-clamp-2 drop-shadow-lg">{item.caption}</p>
                                </div>
                              </div>
                            </div>
                            <CardContent className="p-6 bg-gradient-to-r from-white to-congo-beige/30">
                              <p className="text-congo-brown font-semibold mb-4 line-clamp-2 text-lg">{item.caption}</p>
                              
                              {/* Reaction Buttons */}
                              <div className="flex items-center justify-between">
                                <div className="flex space-x-6">
                                  <button
                                    onClick={() => handleReaction(item.id, 'like')}
                                    className="flex items-center space-x-2 text-congo-brown/80 hover:text-congo-green transition-all duration-300 group hover:scale-110"
                                  >
                                    <ThumbsUp className="h-5 w-5 group-hover:scale-125 transition-transform" />
                                    <span className="text-sm font-semibold">{item.reactions.like}</span>
                                  </button>
                                  
                                  <button
                                    onClick={() => handleReaction(item.id, 'love')}
                                    className="flex items-center space-x-2 text-congo-brown/80 hover:text-red-500 transition-all duration-300 group hover:scale-110"
                                  >
                                    <Heart className="h-5 w-5 group-hover:scale-125 transition-transform" />
                                    <span className="text-sm font-semibold">{item.reactions.love}</span>
                                  </button>
                                  
                                  <button
                                    onClick={() => handleReaction(item.id, 'dislike')}
                                    className="flex items-center space-x-2 text-congo-brown/80 hover:text-congo-brown transition-all duration-300 group hover:scale-110"
                                  >
                                    <ThumbsDown className="h-5 w-5 group-hover:scale-125 transition-transform" />
                                    <span className="text-sm font-semibold">{item.reactions.dislike}</span>
                                  </button>
                                </div>
                                
                                <span className="text-xs text-congo-brown/60 bg-congo-beige/80 px-3 py-2 rounded-full font-medium">
                                  {new Date(item.date).toLocaleDateString('fr-FR')}
                                </span>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="border-congo-brown/20 hover:bg-white/90 hover:border-congo-green text-congo-brown hover:text-congo-green shadow-lg" />
                  <CarouselNext className="border-congo-brown/20 hover:bg-white/90 hover:border-congo-green text-congo-brown hover:text-congo-green shadow-lg" />
                </Carousel>
              </div>

              {/* Gallery Grid - All items */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-congo-brown mb-8 text-center">Toute la galerie</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {galleryItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden border-congo-brown/15 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group bg-white/95 backdrop-blur-sm">
                      <div 
                        className="relative cursor-pointer"
                        onClick={() => setSelectedItem(item)}
                      >
                        {item.type === 'photo' ? (
                          <img
                            src={item.src}
                            alt={item.alt}
                            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                            onError={(e) => {
                              e.currentTarget.src = "https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=800&h=400&fit=crop";
                            }}
                          />
                        ) : (
                          <div className="relative">
                            <video
                              src={item.src}
                              className="w-full h-56 object-cover"
                              controls={false}
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-congo-brown/30 group-hover:bg-congo-brown/20 transition-all duration-300">
                              <div className="bg-white/95 rounded-full p-4 shadow-lg group-hover:scale-110 transition-transform">
                                <svg className="w-8 h-8 text-congo-brown" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z"/>
                                </svg>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-5 bg-gradient-to-br from-white to-congo-beige/20">
                        <p className="text-congo-brown font-semibold mb-4 line-clamp-2 text-sm leading-relaxed">{item.caption}</p>
                        
                        {/* Reaction Buttons */}
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-4">
                            <button
                              onClick={() => handleReaction(item.id, 'like')}
                              className="flex items-center space-x-1 text-congo-brown/80 hover:text-congo-green transition-all duration-300 hover:scale-110"
                            >
                              <ThumbsUp className="h-4 w-4" />
                              <span className="text-xs font-medium">{item.reactions.like}</span>
                            </button>
                            
                            <button
                              onClick={() => handleReaction(item.id, 'love')}
                              className="flex items-center space-x-1 text-congo-brown/80 hover:text-red-500 transition-all duration-300 hover:scale-110"
                            >
                              <Heart className="h-4 w-4" />
                              <span className="text-xs font-medium">{item.reactions.love}</span>
                            </button>
                            
                            <button
                              onClick={() => handleReaction(item.id, 'dislike')}
                              className="flex items-center space-x-1 text-congo-brown/80 hover:text-congo-brown transition-all duration-300 hover:scale-110"
                            >
                              <ThumbsDown className="h-4 w-4" />
                              <span className="text-xs font-medium">{item.reactions.dislike}</span>
                            </button>
                          </div>
                          
                          <span className="text-xs text-congo-brown/60 bg-congo-beige/60 px-2 py-1 rounded-full">
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
              <DialogContent className="max-w-5xl max-h-[95vh] overflow-auto bg-white/98 backdrop-blur-sm border-congo-brown/20">
                <DialogHeader>
                  <DialogTitle className="text-congo-brown text-2xl font-bold">{selectedItem.caption}</DialogTitle>
                </DialogHeader>
                <div className="space-y-8">
                  <div className="flex justify-center bg-gradient-to-br from-congo-beige/20 to-transparent rounded-xl p-4">
                    {selectedItem.type === 'photo' ? (
                      <img
                        src={selectedItem.src}
                        alt={selectedItem.alt}
                        className="max-w-full max-h-[65vh] object-contain rounded-lg shadow-2xl"
                      />
                    ) : (
                      <video
                        src={selectedItem.src}
                        className="max-w-full max-h-[65vh] object-contain rounded-lg shadow-2xl"
                        controls
                      />
                    )}
                  </div>
                  
                  {/* Reaction Buttons in Modal */}
                  <div className="flex items-center justify-center space-x-12 pt-6 border-t border-congo-brown/10">
                    <button
                      onClick={() => handleReaction(selectedItem.id, 'like')}
                      className="flex items-center space-x-3 text-congo-brown/80 hover:text-congo-green transition-all duration-300 group hover:scale-110"
                    >
                      <ThumbsUp className="h-8 w-8 group-hover:scale-125 transition-transform" />
                      <span className="font-bold text-lg">{selectedItem.reactions.like}</span>
                    </button>
                    
                    <button
                      onClick={() => handleReaction(selectedItem.id, 'love')}
                      className="flex items-center space-x-3 text-congo-brown/80 hover:text-red-500 transition-all duration-300 group hover:scale-110"
                    >
                      <Heart className="h-8 w-8 group-hover:scale-125 transition-transform" />
                      <span className="font-bold text-lg">{selectedItem.reactions.love}</span>
                    </button>
                    
                    <button
                      onClick={() => handleReaction(selectedItem.id, 'dislike')}
                      className="flex items-center space-x-3 text-congo-brown/80 hover:text-congo-brown transition-all duration-300 group hover:scale-110"
                    >
                      <ThumbsDown className="h-8 w-8 group-hover:scale-125 transition-transform" />
                      <span className="font-bold text-lg">{selectedItem.reactions.dislike}</span>
                    </button>
                  </div>
                  
                  <div className="text-center">
                    <span className="text-congo-brown/70 bg-congo-beige/60 px-4 py-2 rounded-full font-medium">
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
      </div>
    </Layout>
  );
};

export default Gallery;
