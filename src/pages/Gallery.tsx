
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Heart, ThumbsUp, ThumbsDown, Upload, X } from 'lucide-react';
import { toast } from 'sonner';

interface GalleryItem {
  id: number;
  type: 'photo' | 'video';
  src: string;
  caption: string;
  reactions: {
    like: number;
    love: number;
    dislike: number;
  };
}

const Gallery = () => {
  const { t } = useTranslation();
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [newCaption, setNewCaption] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([
    {
      id: 1,
      type: 'photo',
      src: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop',
      caption: 'Magnifique paysage du Kivu',
      reactions: { like: 15, love: 8, dislike: 1 }
    },
    {
      id: 2,
      type: 'photo', 
      src: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&h=600&fit=crop',
      caption: 'Forêt tropicale congolaise',
      reactions: { like: 23, love: 12, dislike: 0 }
    },
    {
      id: 3,
      type: 'photo',
      src: 'https://images.unsplash.com/photo-1571771019784-3ff35f4f4277?w=800&h=600&fit=crop',
      caption: 'Fleuve Congo au coucher du soleil',
      reactions: { like: 31, love: 18, dislike: 2 }
    }
  ]);

  const handleReaction = (itemId: number, reactionType: 'like' | 'love' | 'dislike') => {
    setGalleryItems(prev => prev.map(item => 
      item.id === itemId 
        ? {
            ...item,
            reactions: {
              ...item.reactions,
              [reactionType]: item.reactions[reactionType] + 1
            }
          }
        : item
    ));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmitUpload = () => {
    if (selectedFile && newCaption) {
      const newItem: GalleryItem = {
        id: Date.now(),
        type: selectedFile.type.startsWith('video/') ? 'video' : 'photo',
        src: URL.createObjectURL(selectedFile),
        caption: newCaption,
        reactions: { like: 0, love: 0, dislike: 0 }
      };
      
      setGalleryItems(prev => [newItem, ...prev]);
      setSelectedFile(null);
      setNewCaption('');
      toast.success('Contenu ajouté avec succès!');
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-congo-brown mb-4">
            {t('nav.gallery')}
          </h1>
          <p className="text-xl text-congo-brown/80 max-w-2xl mx-auto">
            Découvrez la beauté de la République Démocratique du Congo à travers notre collection de photos et vidéos
          </p>
        </div>

        {/* Upload Section */}
        <Card className="mb-8 border-congo-brown/20">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-congo-brown mb-4">Ajouter une photo/vidéo</h3>
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
                Publier
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Gallery Grid */}
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
                    alt={item.caption}
                    className="w-full h-64 object-cover"
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
                <p className="text-congo-brown font-medium mb-3">{item.caption}</p>
                
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
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

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
                    alt={selectedItem.caption}
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
