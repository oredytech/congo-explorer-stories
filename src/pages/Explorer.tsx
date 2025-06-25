
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Eye, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const Explorer = () => {
  const { t } = useTranslation();

  const provinces = [
    {
      id: 'kinshasa',
      name: "Kinshasa",
      description: "La capitale vibrante de la RDC, centre politique et économique du pays",
      population: "17 millions",
      superficie: "9 965 km²",
      image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f",
      attractions: 3
    },
    {
      id: 'kongo-central',
      name: "Kongo Central",
      description: "Province côtière avec le port de Matadi et les chutes d'Inga",
      population: "5.5 millions",
      superficie: "53 920 km²",
      image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a",
      attractions: 5
    },
    {
      id: 'kwilu',
      name: "Kwilu",
      description: "Terre agricole fertile, grenier de Kinshasa",
      population: "5.1 millions",
      superficie: "78 219 km²",
      image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
      attractions: 2
    },
    {
      id: 'kwango',
      name: "Kwango",
      description: "Province frontalière avec l'Angola, riche en diamants",
      population: "1.9 millions",
      superficie: "89 974 km²",
      image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac",
      attractions: 3
    },
    {
      id: 'mai-ndombe',
      name: "Mai-Ndombe",
      description: "La plus grande province du Congo, terre de forêts et de lacs",
      population: "1.8 millions",
      superficie: "127 218 km²",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
      attractions: 4
    },
    {
      id: 'kasai',
      name: "Kasaï",
      description: "Berceau de l'art traditionnel Kuba et centre diamantifère",
      population: "3.2 millions",
      superficie: "95 631 km²",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96",
      attractions: 6
    },
    {
      id: 'kasai-oriental',
      name: "Kasaï Oriental",
      description: "Centre minier important avec la ville de Mbuji-Mayi",
      population: "2.9 millions",
      superficie: "9 545 km²",
      image: "https://images.unsplash.com/photo-1534430480872-3498386e7856",
      attractions: 4
    },
    {
      id: 'kasai-central',
      name: "Kasaï Central",
      description: "Province historique du royaume Kuba avec Kananga",
      population: "3.9 millions",
      superficie: "59 111 km²",
      image: "https://images.unsplash.com/photo-1515037893149-de7f840978e2",
      attractions: 5
    },
    {
      id: 'lomami',
      name: "Lomami",
      description: "Province forestière avec une biodiversité exceptionnelle",
      population: "2.3 millions",
      superficie: "56 426 km²",
      image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b",
      attractions: 3
    },
    {
      id: 'sankuru',
      name: "Sankuru",
      description: "Terre des peuples Tetela et Songye, riche en traditions",
      population: "1.9 millions",
      superficie: "104 331 km²",
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0",
      attractions: 2
    },
    {
      id: 'maniema',
      name: "Maniema",
      description: "Province de l'est avec Kindu, terre de forêts tropicales",
      population: "2.3 millions",
      superficie: "132 250 km²",
      image: "https://images.unsplash.com/photo-1562690868-60bbe7293e94",
      attractions: 4
    },
    {
      id: 'sud-kivu',
      name: "Sud-Kivu",
      description: "Province des Grands Lacs avec Bukavu et le lac Kivu",
      population: "7.0 millions",
      superficie: "65 070 km²",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
      attractions: 8
    },
    {
      id: 'nord-kivu',
      name: "Nord-Kivu",
      description: "Province montagneuse avec Goma et le parc des Virunga",
      population: "8.5 millions",
      superficie: "59 483 km²",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      attractions: 10
    },
    {
      id: 'ituri',
      name: "Ituri",
      description: "Province aurifère avec Bunia, terre des Pygmées",
      population: "5.7 millions",
      superficie: "65 658 km²",
      image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7",
      attractions: 5
    },
    {
      id: 'haut-uele',
      name: "Haut-Uélé",
      description: "Province frontalière avec le Soudan du Sud et la RCA",
      population: "1.9 millions",
      superficie: "89 683 km²",
      image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9",
      attractions: 3
    },
    {
      id: 'bas-uele',
      name: "Bas-Uélé",
      description: "Terre de savanes et forêts avec Buta comme chef-lieu",
      population: "1.2 millions",
      superficie: "148 331 km²",
      image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5",
      attractions: 2
    },
    {
      id: 'tshopo',
      name: "Tshopo",
      description: "Province de Kisangani, perle de l'Orient congolais",
      population: "2.6 millions",
      superficie: "199 567 km²",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
      attractions: 6
    },
    {
      id: 'mongala',
      name: "Mongala",
      description: "Province forestière avec Lisala, terre natale de Mobutu",
      population: "1.8 millions",
      superficie: "58 141 km²",
      image: "https://images.unsplash.com/photo-1574482620192-8bc4c0a447e3",
      attractions: 2
    },
    {
      id: 'nord-ubangi',
      name: "Nord-Ubangi",
      description: "Province frontalière avec la RCA, terre de pêche",
      population: "1.5 millions",
      superficie: "56 644 km²",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96",
      attractions: 3
    },
    {
      id: 'sud-ubangi',
      name: "Sud-Ubangi",
      description: "Province de Gemena, carrefour commercial important",
      population: "2.7 millions",
      superficie: "51 648 km²",
      image: "https://images.unsplash.com/photo-1515037893149-de7f840978e2",
      attractions: 4
    },
    {
      id: 'equateur',
      name: "Équateur",
      description: "Province de Mbandaka, cœur de la forêt équatoriale",
      population: "1.6 millions",
      superficie: "103 902 km²",
      image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b",
      attractions: 5
    },
    {
      id: 'tshuapa',
      name: "Tshuapa",
      description: "Province forestière avec Boende, terre de biodiversité",
      population: "1.4 millions",
      superficie: "132 957 km²",
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0",
      attractions: 3
    },
    {
      id: 'haut-katanga',
      name: "Haut-Katanga",
      description: "Province minière avec Lubumbashi, capitale du cuivre",
      population: "5.7 millions",
      superficie: "132 425 km²",
      image: "https://images.unsplash.com/photo-1562690868-60bbe7293e94",
      attractions: 7
    },
    {
      id: 'lualaba',
      name: "Lualaba",
      description: "Province de Kolwezi, cœur minier du cobalt mondial",
      population: "2.6 millions",
      superficie: "121 308 km²",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
      attractions: 4
    },
    {
      id: 'haut-lomami',
      name: "Haut-Lomami",
      description: "Province de Kamina, carrefour ferroviaire du sud",
      population: "2.5 millions",
      superficie: "108 204 km²",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      attractions: 3
    },
    {
      id: 'tanganyika',
      name: "Tanganyika",
      description: "Province de Kalemie, sur les rives du lac Tanganyika",
      population: "2.8 millions",
      superficie: "134 940 km²",
      image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7",
      attractions: 6
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Layout>
      <div className="py-16 bg-congo-beige min-h-screen">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-congo-brown mb-4">
              Explorer la République Démocratique du Congo
            </h1>
            <p className="text-lg text-congo-brown/70 max-w-3xl mx-auto">
              Découvrez les 26 provinces de la RDC, chacune avec ses richesses naturelles, 
              sa culture unique et ses merveilles à explorer. Un voyage à travers la diversité 
              extraordinaire du cœur de l'Afrique.
            </p>
          </motion.div>

          {/* Provinces Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {provinces.map((province) => (
              <motion.div key={province.id} variants={itemVariants}>
                <Card className="h-full overflow-hidden border-congo-brown/20 bg-white hover:shadow-lg transition-all duration-300 group">
                  <div className="relative h-48">
                    <img
                      src={province.image}
                      alt={province.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">{province.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Users className="h-4 w-4" />
                        <span className="text-sm">{province.population}</span>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 bg-congo-green text-congo-beige px-2 py-1 rounded-full text-xs">
                      {province.attractions} attractions
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <p className="text-congo-brown/70 mb-4 line-clamp-3">
                      {province.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-congo-brown/60 mb-4">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{province.superficie}</span>
                      </div>
                    </div>

                    <Button asChild className="w-full bg-congo-green hover:bg-congo-green/80 text-congo-beige">
                      <Link to={`/province/${province.id}`} className="flex items-center justify-center space-x-2">
                        <Eye className="h-4 w-4" />
                        <span>Explorer</span>
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-16 p-8 bg-white rounded-lg shadow-sm border-congo-brown/20"
          >
            <h3 className="text-2xl font-semibold text-congo-brown mb-4">
              Planifiez votre voyage dès maintenant
            </h3>
            <p className="text-congo-brown/70 mb-6">
              Contactez nos experts pour organiser un voyage inoubliable à travers les merveilles du Congo
            </p>
            <Button asChild size="lg" className="bg-congo-green hover:bg-congo-green/80 text-congo-beige">
              <Link to="/contact">
                Planifier mon voyage
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Explorer;
