
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import { Play, Clock, Eye, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Documentaries = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Tous' },
    { id: 'nature', name: 'Nature' },
    { id: 'culture', name: 'Culture' },
    { id: 'histoire', name: 'Histoire' },
    { id: 'communaute', name: 'Communauté' }
  ];

  const documentaries = [
    {
      id: 1,
      title: "Les Chutes de Boyoma : Merveille de la Tshopo",
      description: "Découvrez les majestueuses chutes de Boyoma, autrefois appelées chutes Stanley, sur le fleuve Congo près de Kisangani.",
      thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=450&fit=crop",
      duration: "12:34",
      views: "15.2K",
      category: "nature",
      date: "2024-05-15",
      videoId: "dQw4w9WgXcQ" // YouTube video ID
    },
    {
      id: 2,
      title: "Traditions Ancestrales de la Province du Kasaï",
      description: "Un voyage au cœur des traditions millénaires des peuples Luba et leurs rituels sacrés.",
      thumbnail: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=800&h=450&fit=crop",
      duration: "28:45",
      views: "8.7K",
      category: "culture",
      date: "2024-04-22",
      videoId: "dQw4w9WgXcQ"
    },
    {
      id: 3,
      title: "Kinshasa, Cité des Contrastes",
      description: "Portrait moderne de la capitale congolaise entre tradition et modernité.",
      thumbnail: "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800&h=450&fit=crop",
      duration: "45:12",
      views: "23.5K",
      category: "communaute",
      date: "2024-03-10",
      videoId: "dQw4w9WgXcQ"
    },
    {
      id: 4,
      title: "L'Histoire Oubliée du Royaume Kongo",
      description: "Plongée dans l'histoire précoloniale du puissant royaume Kongo et son héritage.",
      thumbnail: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800&h=450&fit=crop",
      duration: "35:20",
      views: "12.1K",
      category: "histoire",
      date: "2024-02-18",
      videoId: "dQw4w9WgXcQ"
    },
    {
      id: 5,
      title: "Parc National de Virunga : Sanctuaire en Danger",
      description: "Documentaire sur la biodiversité exceptionnelle du plus ancien parc national d'Afrique.",
      thumbnail: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&h=450&fit=crop",
      duration: "52:18",
      views: "31.8K",
      category: "nature",
      date: "2024-01-25",
      videoId: "dQw4w9WgXcQ"
    },
    {
      id: 6,
      title: "Artisans de Lubumbashi : Savoir-faire Traditionnel",
      description: "Rencontre avec les artisans qui perpétuent les traditions créatives du Katanga.",
      thumbnail: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=800&h=450&fit=crop",
      duration: "18:30",
      views: "6.4K",
      category: "culture",
      date: "2024-01-12",
      videoId: "dQw4w9WgXcQ"
    }
  ];

  const filteredDocumentaries = selectedCategory === 'all' 
    ? documentaries 
    : documentaries.filter(doc => doc.category === selectedCategory);

  const handlePlayVideo = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

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
            {filteredDocumentaries.map((doc) => (
              <div key={doc.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-congo-brown/10">
                <div className="relative">
                  <img
                    src={doc.thumbnail}
                    alt={doc.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                       onClick={() => handlePlayVideo(doc.videoId)}>
                    <Play className="h-16 w-16 text-white" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {doc.duration}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs bg-congo-beige text-congo-brown">
                      {categories.find(cat => cat.id === doc.category)?.name}
                    </Badge>
                    <div className="flex items-center text-sm text-congo-brown/70">
                      <Eye className="h-3 w-3 mr-1" />
                      {doc.views}
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-congo-brown mb-2 line-clamp-2">
                    {doc.title}
                  </h3>
                  
                  <p className="text-congo-brown/70 text-sm mb-4 line-clamp-3">
                    {doc.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-congo-brown/60">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(doc.date).toLocaleDateString('fr-FR')}
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => handlePlayVideo(doc.videoId)}
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
