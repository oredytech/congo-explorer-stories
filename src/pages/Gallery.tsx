
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
      toast.success('Contenu ajouté avec succès! (Local - utilisez le plugin WordPress pour un ajout permanent)');
    }
  };

  if (error) {
    console.error('Erreur de chargement de la galerie:', error);
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-congo-brown mb-4">
            {t('nav.gallery')}
          </h1>
          <p className="text-xl text-congo-brown/80 max-w-2xl mx-auto">
            Découvrez la beauté de la République Démocratique du Congo à travers notre collection de photos et vidéos synchronisées avec WordPress
          </p>
        </div>

        {/* Status et rechargement */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {isLoading && (
              <div className="flex items-center space-x-2 text-congo-brown/70">
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span className="text-sm">Synchronisation avec WordPress...</span>
              </div>
            )}
            {galleryItems.length > 0 && (
              <p className="text-sm text-congo-brown/70">
                {galleryItems.length} élément(s) dans la galerie
              </p>
            )}
          </div>
        </div>

        {/* Upload Section */}
        <Card className="mb-8 border-congo-brown/20">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-congo-brown mb-4">Ajouter une photo/vidéo (Local)</h3>
            <div className="bg-congo-beige/30 p-4 rounded-lg mb-4">
              <p className="text-sm text-congo-brown/70">
                💡 <strong>Conseil :</strong> Pour ajouter des médias de façon permanente, utilisez le plugin WordPress "OT Gallery Manager" dans votre tableau de bord WordPress.
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <Input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                  className="border-congo-brown/30"
                />
              </div>
              <Textarea
                placeholder="Ajoutez une légende..."
                value={newCaption}
                onChange={(e) => setNewCaption(e.target.value)}
                className="border-congo-brown/30"
              />
              <Button 
                onClick={handleSubmitUpload}
                disabled={!selectedFile || !newCaption}
                className="bg-congo-green hover:bg-congo-green/90"
              >
                <Upload className="h-4 w-4 mr-2" />
                Publier (Local)
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Loading State */}
        {isLoading && galleryItems.length === 0 && (
          <div className="text-center py-12">
            <RefreshCw className="h-12 w-12 animate-spin mx-auto text-congo-green mb-4" />
            <p className="text-congo-brown/70">Chargement des médias depuis WordPress...</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && galleryItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-congo-brown/70 text-lg mb-4">
              Aucun élément dans la galerie pour le moment.
            </p>
            <p className="text-congo-brown/60 text-sm">
              Utilisez le plugin WordPress pour ajouter des médias à la galerie.
            </p>
          </div>
        )}

        {/* Gallery Grid */}
        {galleryItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item) => (
              <Card key={item.id} className="overflow-hidden border-congo-brown/20 hover:shadow-lg transition-shadow">
                <div 
                  className="relative cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  {item.type === 'photo' ? (
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-64 object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=800&h=400&fit=crop";
                      }}
                    />
                  ) : (
                    <video
                      src={item.src}
                      className="w-full h-64 object-cover"
                      controls={false}
                    />
                  )}
                </div>
                <CardContent className="p-4">
                  <p className="text-congo-brown font-medium mb-3 line-clamp-2">{item.caption}</p>
                  
                  {/* Reaction Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-4">
                      <button
                        onClick={() => handleReaction(item.id, 'like')}
                        className="flex items-center space-x-1 text-congo-brown/70 hover:text-congo-green transition-colors"
                      >
                        <ThumbsUp className="h-4 w-4" />
                        <span className="text-sm">{item.reactions.like}</span>
                      </button>
                      
                      <button
                        onClick={() => handleReaction(item.id, 'love')}
                        className="flex items-center space-x-1 text-congo-brown/70 hover:text-red-500 transition-colors"
                      >
                        <Heart className="h-4 w-4" />
                        <span className="text-sm">{item.reactions.love}</span>
                      </button>
                      
                      <button
                        onClick={() => handleReaction(item.id, 'dislike')}
                        className="flex items-center space-x-1 text-congo-brown/70 hover:text-congo-brown transition-colors"
                      >
                        <ThumbsDown className="h-4 w-4" />
                        <span className="text-sm">{item.reactions.dislike}</span>
                      </button>
                    </div>
                    
                    <span className="text-xs text-congo-brown/50">
                      {new Date(item.date).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedItem && (
          <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle className="text-congo-brown">{selectedItem.caption}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {selectedItem.type === 'photo' ? (
                  <img
                    src={selectedItem.src}
                    alt={selectedItem.alt}
                    className="w-full max-h-96 object-contain"
                  />
                ) : (
                  <video
                    src={selectedItem.src}
                    className="w-full max-h-96 object-contain"
                    controls
                  />
                )}
                
                {/* Reaction Buttons in Modal */}
                <div className="flex items-center space-x-6 justify-center pt-4 border-t">
                  <button
                    onClick={() => handleReaction(selectedItem.id, 'like')}
                    className="flex items-center space-x-2 text-congo-brown/70 hover:text-congo-green transition-colors"
                  >
                    <ThumbsUp className="h-5 w-5" />
                    <span>{selectedItem.reactions.like}</span>
                  </button>
                  
                  <button
                    onClick={() => handleReaction(selectedItem.id, 'love')}
                    className="flex items-center space-x-2 text-congo-brown/70 hover:text-red-500 transition-colors"
                  >
                    <Heart className="h-5 w-5" />
                    <span>{selectedItem.reactions.love}</span>
                  </button>
                  
                  <button
                    onClick={() => handleReaction(selectedItem.id, 'dislike')}
                    className="flex items-center space-x-2 text-congo-brown/70 hover:text-congo-brown transition-colors"
                  >
                    <ThumbsDown className="h-5 w-5" />
                    <span>{selectedItem.reactions.dislike}</span>
                  </button>
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
