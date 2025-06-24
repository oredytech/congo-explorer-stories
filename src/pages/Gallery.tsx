
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import { MapPin, Camera, Heart, Share2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Gallery = () => {
  const { t } = useTranslation();
  const [selectedProvince, setSelectedProvince] = useState('all');
  const [selectedImage, setSelectedImage] = useState<any>(null);

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

  const photos = [
    {
      id: 1,
      title: "Cathédrale Notre-Dame du Congo",
      location: "Kinshasa",
      province: "kinshasa",
      photographer: "Jean Mukendi",
      date: "2024-05-20",
      likes: 234,
      image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800&h=600&fit=crop",
      description: "Architecture coloniale majestueuse au cœur de la capitale."
    },
    {
      id: 2,
      title: "Coucher de soleil sur le fleuve Congo",
      location: "Matadi",
      province: "kongo-central",
      photographer: "Marie Tshilombo",
      date: "2024-05-18",
      likes: 412,
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&h=600&fit=crop",
      description: "Le majestueux fleuve Congo offre des couchers de soleil inoubliables."
    },
    {
      id: 3,
      title: "Forêt tropicale de l'Équateur",
      location: "Mbandaka",
      province: "equateur",
      photographer: "Pierre Kasongo",
      date: "2024-05-15",
      likes: 186,
      image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800&h=600&fit=crop",
      description: "Canopée dense de la forêt équatoriale congolaise."
    },
    {
      id: 4,
      title: "Marché traditionnel de Lubumbashi",
      location: "Lubumbashi",
      province: "katanga",
      photographer: "Grace Mwila",
      date: "2024-05-12",
      likes: 298,
      image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=800&h=600&fit=crop",
      description: "Animation colorée du marché central de Lubumbashi."
    },
    {
      id: 5,
      title: "Lac Kivu au petit matin",
      location: "Goma",
      province: "kivu",
      photographer: "Samuel Bahati",
      date: "2024-05-10",
      likes: 356,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop",
      description: "Brume matinale sur les eaux cristallines du lac Kivu."
    },
    {
      id: 6,
      title: "Artisan sculpteur de masques",
      location: "Kananga",
      province: "kasai",
      photographer: "Daniel Mbuyi",
      date: "2024-05-08",
      likes: 167,
      image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=800&h=600&fit=crop",
      description: "Maître sculpteur perpétuant l'art traditionnel Luba."
    },
    {
      id: 7,
      title: "Pêcheurs sur la rivière Kasaï",
      location: "Ilebo",
      province: "bandundu",
      photographer: "Céline Ngoma",
      date: "2024-05-05",
      likes: 203,
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&h=600&fit=crop",
      description: "Pêche traditionnelle sur les eaux paisibles de la Kasaï."
    },
    {
      id: 8,
      title: "Chutes de la Lufira",
      location: "Kolwezi",
      province: "katanga",
      photographer: "Robert Kalala",
      date: "2024-05-02",
      likes: 445,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop",
      description: "Cascades spectaculaires dans la région minière du Katanga."
    }
  ];

  const filteredPhotos = selectedProvince === 'all' 
    ? photos 
    : photos.filter(photo => photo.province === selectedProvince);

  const openLightbox = (photo: any) => {
    setSelectedImage(photo);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <Layout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-stone-900 mb-4">
              Galerie Photo
            </h1>
            <p className="text-lg text-stone-600 max-w-3xl mx-auto">
              Explorez la beauté de la RDC à travers les yeux de nos explorateurs. 
              Chaque image raconte une histoire unique de notre patrimoine.
            </p>
          </div>

          {/* Province Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {provinces.map((province) => (
              <Button
                key={province.id}
                variant={selectedProvince === province.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedProvince(province.id)}
                className={selectedProvince === province.id ? "bg-green-700 hover:bg-green-800" : ""}
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
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => openLightbox(photo)}
              >
                <div className="relative">
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
                  <h3 className="font-semibold text-stone-900 mb-1">
                    {photo.title}
                  </h3>
                  
                  <div className="flex items-center text-sm text-stone-500 mb-2">
                    <MapPin className="h-3 w-3 mr-1" />
                    {photo.location}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-stone-400">
                      {new Date(photo.date).toLocaleDateString('fr-FR')}
                    </span>
                    <div className="flex items-center text-sm text-red-500">
                      <Heart className="h-3 w-3 mr-1" />
                      {photo.likes}
                    </div>
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
                  <h2 className="text-2xl font-bold text-stone-900 mb-2">
                    {selectedImage.title}
                  </h2>
                  
                  <div className="flex items-center text-stone-600 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    {selectedImage.location}
                    <span className="mx-2">•</span>
                    <Camera className="h-4 w-4 mr-1" />
                    {selectedImage.photographer}
                  </div>
                  
                  <p className="text-stone-700 mb-4">
                    {selectedImage.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center text-red-500 hover:text-red-600">
                        <Heart className="h-5 w-5 mr-1" />
                        {selectedImage.likes}
                      </button>
                      <button className="flex items-center text-stone-500 hover:text-stone-600">
                        <Share2 className="h-5 w-5 mr-1" />
                        Partager
                      </button>
                    </div>
                    <span className="text-sm text-stone-400">
                      {new Date(selectedImage.date).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center mt-16 p-8 bg-green-50 rounded-lg">
            <h2 className="text-2xl font-bold text-stone-900 mb-4">
              Partagez vos découvertes
            </h2>
            <p className="text-stone-600 mb-6">
              Vous avez capturé la beauté de la RDC ? Partagez vos photos avec notre communauté.
            </p>
            <Button className="bg-green-700 hover:bg-green-800">
              Ajouter une photo
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Gallery;
