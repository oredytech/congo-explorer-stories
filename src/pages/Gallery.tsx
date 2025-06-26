
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import { MapPin, Camera, Heart, Share2, X, Upload, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const Gallery = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [selectedProvince, setSelectedProvince] = useState('all');
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    location: '',
    province: '',
    description: '',
    file: null as File | null
  });

  const provinces = [
    { id: 'all', name: 'Toutes les provinces' },
    { id: 'kinshasa', name: 'Kinshasa' },
    { id: 'kongo-central', name: 'Kongo Central' },
    { id: 'bandundu', name: 'Bandundu' },
    { id: 'equateur', name: 'Équateur' },
    { id: 'orientale', name: 'Province Orientale' },
    { id: 'kasai', name: 'Kasaï' },
    { id: 'katanga', name: 'Katanga' },
    { id: 'kivu', name: 'Kivu' }
  ];

  const [photos, setPhotos] = useState([
    {
      id: 1,
      title: "Cathédrale Notre-Dame du Congo",
      location: "Kinshasa",
      province: "kinshasa",
      photographer: "Jean Mukendi",
      date: "2024-05-20",
      likes: 234,
      loves: 89,
      dislikes: 3,
      image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800&h=600&fit=crop",
      description: "Architecture coloniale majestueuse au cœur de la capitale.",
      userReaction: null
    },
    {
      id: 2,
      title: "Coucher de soleil sur le fleuve Congo",
      location: "Matadi",
      province: "kongo-central",
      photographer: "Marie Tshilombo",
      date: "2024-05-18",
      likes: 412,
      loves: 156,
      dislikes: 2,
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&h=600&fit=crop",
      description: "Le majestueux fleuve Congo offre des couchers de soleil inoubliables.",
      userReaction: null
    },
    {
      id: 3,
      title: "Forêt tropicale de l'Équateur",
      location: "Mbandaka",
      province: "equateur",
      photographer: "Pierre Kasongo",
      date: "2024-05-15",
      likes: 186,
      loves: 67,
      dislikes: 1,
      image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800&h=600&fit=crop",
      description: "Canopée dense de la forêt équatoriale congolaise.",
      userReaction: null
    },
    {
      id: 4,
      title: "Marché traditionnel de Lubumbashi",
      location: "Lubumbashi",
      province: "katanga",
      photographer: "Grace Mwila",
      date: "2024-05-12",
      likes: 298,
      loves: 123,
      dislikes: 5,
      image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=800&h=600&fit=crop",
      description: "Animation colorée du marché central de Lubumbashi.",
      userReaction: null
    },
    {
      id: 5,
      title: "Lac Kivu au petit matin",
      location: "Goma",
      province: "kivu",
      photographer: "Samuel Bahati",
      date: "2024-05-10",
      likes: 356,
      loves: 189,
      dislikes: 4,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop",
      description: "Brume matinale sur les eaux cristallines du lac Kivu.",
      userReaction: null
    },
    {
      id: 6,
      title: "Artisan sculpteur de masques",
      location: "Kananga",
      province: "kasai",
      photographer: "Daniel Mbuyi",
      date: "2024-05-08",
      likes: 167,
      loves: 78,
      dislikes: 2,
      image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=800&h=600&fit=crop",
      description: "Maître sculpteur perpétuant l'art traditionnel Luba.",
      userReaction: null
    },
    {
      id: 7,
      title: "Pêcheurs sur la rivière Kasaï",
      location: "Ilebo",
      province: "bandundu",
      photographer: "Céline Ngoma",
      date: "2024-05-05",
      likes: 203,
      loves: 95,
      dislikes: 1,
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&h=600&fit=crop",
      description: "Pêche traditionnelle sur les eaux paisibles de la Kasaï.",
      userReaction: null
    },
    {
      id: 8,
      title: "Chutes de la Lufira",
      location: "Kolwezi",
      province: "katanga",
      photographer: "Robert Kalala",
      date: "2024-05-02",
      likes: 445,
      loves: 234,
      dislikes: 3,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop",
      description: "Cascades spectaculaires dans la région minière du Katanga.",
      userReaction: null
    }
  ]);

  const filteredPhotos = selectedProvince === 'all' 
    ? photos 
    : photos.filter(photo => photo.province === selectedProvince);

  const openLightbox = (photo: any) => {
    setSelectedImage(photo);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const handleReaction = (photoId: number, reactionType: 'like' | 'love' | 'dislike') => {
    setPhotos(prevPhotos => 
      prevPhotos.map(photo => {
        if (photo.id === photoId) {
          const newPhoto = { ...photo };
          
          // Remove previous reaction
          if (photo.userReaction) {
            newPhoto[photo.userReaction as keyof typeof photo] = (newPhoto[photo.userReaction as keyof typeof photo] as number) - 1;
          }
          
          // Add new reaction if different
          if (photo.userReaction !== reactionType) {
            newPhoto[reactionType === 'like' ? 'likes' : reactionType === 'love' ? 'loves' : 'dislikes'] += 1;
            newPhoto.userReaction = reactionType;
          } else {
            newPhoto.userReaction = null;
          }
          
          return newPhoto;
        }
        return photo;
      })
    );
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadForm.title || !uploadForm.file) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Photo ajoutée !",
      description: "Votre photo a été soumise pour modération.",
    });

    setUploadForm({ title: '', location: '', province: '', description: '', file: null });
    setShowUploadForm(false);
  };

  return (
    <Layout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-congo-brown mb-4">
              Galerie Photo
            </h1>
            <p className="text-lg text-congo-brown/70 max-w-3xl mx-auto mb-6">
              Explorez la beauté de la RDC à travers les yeux de nos explorateurs. 
              Chaque image raconte une histoire unique de notre patrimoine.
            </p>
            
            <Button 
              onClick={() => setShowUploadForm(true)}
              className="bg-congo-green hover:bg-congo-green/80 text-congo-beige"
            >
              <Upload className="h-4 w-4 mr-2" />
              Ajouter une photo
            </Button>
          </div>

          {/* Upload Form */}
          {showUploadForm && (
            <Card className="max-w-2xl mx-auto mb-12 bg-congo-beige border-congo-brown/20">
              <CardHeader>
                <CardTitle className="text-congo-brown">Ajouter une photo</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpload} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Titre de la photo *"
                      value={uploadForm.title}
                      onChange={(e) => setUploadForm({...uploadForm, title: e.target.value})}
                      className="border-congo-brown/30 focus:border-congo-green text-congo-brown"
                      required
                    />
                    <Input
                      placeholder="Lieu"
                      value={uploadForm.location}
                      onChange={(e) => setUploadForm({...uploadForm, location: e.target.value})}
                      className="border-congo-brown/30 focus:border-congo-green text-congo-brown"
                    />
                  </div>
                  
                  <select
                    value={uploadForm.province}
                    onChange={(e) => setUploadForm({...uploadForm, province: e.target.value})}
                    className="w-full p-2 border border-congo-brown/30 rounded-md bg-congo-beige text-congo-brown focus:border-congo-green"
                  >
                    <option value="">Sélectionner une province</option>
                    {provinces.slice(1).map(province => (
                      <option key={province.id} value={province.id}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                  
                  <Textarea
                    placeholder="Description (optionnelle)"
                    value={uploadForm.description}
                    onChange={(e) => setUploadForm({...uploadForm, description: e.target.value})}
                    className="border-congo-brown/30 focus:border-congo-green text-congo-brown min-h-20"
                  />
                  
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setUploadForm({...uploadForm, file: e.target.files?.[0] || null})}
                    className="border-congo-brown/30 focus:border-congo-green text-congo-brown"
                    required
                  />
                  
                  <div className="flex space-x-2">
                    <Button type="submit" className="bg-congo-green hover:bg-congo-green/80 text-congo-beige">
                      Publier
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowUploadForm(false)}
                      className="border-congo-brown/30 text-congo-brown hover:bg-congo-brown/10"
                    >
                      Annuler
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Province Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {provinces.map((province) => (
              <Button
                key={province.id}
                variant={selectedProvince === province.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedProvince(province.id)}
                className={selectedProvince === province.id ? "bg-congo-green hover:bg-congo-green/80 text-congo-beige" : "border-congo-brown/30 text-congo-brown hover:bg-congo-brown/10"}
              >
                {province.name}
              </Button>
            ))}
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPhotos.map((photo) => (
              <div 
                key={photo.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-congo-brown/10"
              >
                <div className="relative cursor-pointer" onClick={() => openLightbox(photo)}>
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="bg-black bg-opacity-70 text-white">
                      <Camera className="h-3 w-3 mr-1" />
                      {photo.photographer}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-congo-brown mb-1">
                    {photo.title}
                  </h3>
                  
                  <div className="flex items-center text-sm text-congo-brown/60 mb-3">
                    <MapPin className="h-3 w-3 mr-1" />
                    {photo.location}
                  </div>
                  
                  {/* Reaction Buttons */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleReaction(photo.id, 'like')}
                        className={`flex items-center space-x-1 text-sm transition-colors ${
                          photo.userReaction === 'like' ? 'text-congo-green' : 'text-congo-brown/60 hover:text-congo-green'
                        }`}
                      >
                        <ThumbsUp className="h-4 w-4" />
                        <span>{photo.likes}</span>
                      </button>
                      
                      <button
                        onClick={() => handleReaction(photo.id, 'love')}
                        className={`flex items-center space-x-1 text-sm transition-colors ${
                          photo.userReaction === 'love' ? 'text-red-500' : 'text-congo-brown/60 hover:text-red-500'
                        }`}
                      >
                        <Heart className="h-4 w-4" />
                        <span>{photo.loves}</span>
                      </button>
                      
                      <button
                        onClick={() => handleReaction(photo.id, 'dislike')}
                        className={`flex items-center space-x-1 text-sm transition-colors ${
                          photo.userReaction === 'dislike' ? 'text-red-600' : 'text-congo-brown/60 hover:text-red-600'
                        }`}
                      >
                        <ThumbsDown className="h-4 w-4" />
                        <span>{photo.dislikes}</span>
                      </button>
                    </div>
                    
                    <span className="text-xs text-congo-brown/40">
                      {new Date(photo.date).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Lightbox */}
          {selectedImage && (
            <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
              <div className="max-w-4xl max-h-full bg-white rounded-lg overflow-hidden">
                <div className="relative">
                  <img
                    src={selectedImage.image}
                    alt={selectedImage.title}
                    className="w-full h-auto max-h-[70vh] object-contain"
                  />
                  <button
                    onClick={closeLightbox}
                    className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-congo-brown mb-2">
                    {selectedImage.title}
                  </h2>
                  
                  <div className="flex items-center text-congo-brown/60 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    {selectedImage.location}
                    <span className="mx-2">•</span>
                    <Camera className="h-4 w-4 mr-1" />
                    {selectedImage.photographer}
                  </div>
                  
                  <p className="text-congo-brown/80 mb-4">
                    {selectedImage.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleReaction(selectedImage.id, 'like')}
                        className={`flex items-center space-x-1 transition-colors ${
                          selectedImage.userReaction === 'like' ? 'text-congo-green' : 'text-congo-brown/60 hover:text-congo-green'
                        }`}
                      >
                        <ThumbsUp className="h-5 w-5" />
                        <span>{selectedImage.likes}</span>
                      </button>
                      
                      <button
                        onClick={() => handleReaction(selectedImage.id, 'love')}
                        className={`flex items-center space-x-1 transition-colors ${
                          selectedImage.userReaction === 'love' ? 'text-red-500' : 'text-congo-brown/60 hover:text-red-500'
                        }`}
                      >
                        <Heart className="h-5 w-5" />
                        <span>{selectedImage.loves}</span>
                      </button>
                      
                      <button
                        onClick={() => handleReaction(selectedImage.id, 'dislike')}
                        className={`flex items-center space-x-1 transition-colors ${
                          selectedImage.userReaction === 'dislike' ? 'text-red-600' : 'text-congo-brown/60 hover:text-red-600'
                        }`}
                      >
                        <ThumbsDown className="h-5 w-5" />
                        <span>{selectedImage.dislikes}</span>
                      </button>
                      
                      <button className="flex items-center text-congo-brown/60 hover:text-congo-brown">
                        <Share2 className="h-5 w-5 mr-1" />
                        Partager
                      </button>
                    </div>
                    <span className="text-sm text-congo-brown/40">
                      {new Date(selectedImage.date).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Gallery;
