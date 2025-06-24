
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, ChevronDown, ChevronUp, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Explorer = () => {
  const { t } = useTranslation();
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [expandedDescription, setExpandedDescription] = useState<string | null>(null);

  const provinces = [
    {
      name: "Kinshasa",
      description: "La capitale vibrante de la RDC, où modernité et tradition se rencontrent. Une métropole de plus de 12 millions d'habitants...",
      fullDescription: "Kinshasa, la capitale et plus grande ville de la République Démocratique du Congo, est une métropole fascinante qui abrite plus de 12 millions d'habitants. Située sur les rives du fleuve Congo, face à Brazzaville, elle offre un contraste saisissant entre quartiers modernes et zones traditionnelles. La ville regorge de marchés colorés, de musique vibrante et d'une énergie incomparable.",
      places: [
        {
          name: "Vallée de la Nsele",
          description: "Un écosystème préservé aux portes de Kinshasa",
          image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f"
        },
        {
          name: "Marché Central",
          description: "Le cœur commercial de la capitale",
          image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac"
        }
      ],
      color: "green"
    },
    {
      name: "Province Orientale",
      description: "Terre de forêts tropicales et de chutes spectaculaires...",
      fullDescription: "La Province Orientale est un joyau de biodiversité, abritant une partie importante de la forêt équatoriale du bassin du Congo. Ses paysages variés incluent des forêts denses, des rivières majestueuses et les célèbres chutes de Boyoma.",
      places: [
        {
          name: "Chutes de Boyoma",
          description: "Sept chutes spectaculaires sur le fleuve Congo",
          image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a"
        }
      ],
      color: "blue"
    },
    {
      name: "Kasaï",
      description: "Berceau de l'art traditionnel Kuba et des diamants...",
      fullDescription: "Le Kasaï est réputé pour son riche patrimoine culturel, notamment l'art traditionnel du royaume Kuba, et ses ressources minérales. Cette région offre un aperçu unique de l'artisanat congolais traditionnel.",
      places: [
        {
          name: "Royaume Kuba",
          description: "Centre artistique et culturel historique",
          image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d"
        }
      ],
      color: "yellow"
    }
  ];

  const colorClasses = {
    green: "border-green-200 hover:border-green-300 bg-green-50",
    blue: "border-blue-200 hover:border-blue-300 bg-blue-50",
    yellow: "border-yellow-200 hover:border-yellow-300 bg-yellow-50"
  };

  return (
    <Layout>
      <div className="py-16 bg-gradient-to-br from-stone-50 to-green-50 min-h-screen">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-stone-900 mb-4">
              {t('explore.title')}
            </h1>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              {t('explore.subtitle')}
            </p>
          </motion.div>

          {/* Provinces Grid */}
          <div className="space-y-6">
            {provinces.map((province, index) => (
              <motion.div
                key={province.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedProvince === province.name 
                      ? colorClasses[province.color as keyof typeof colorClasses]
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                  onClick={() => setSelectedProvince(
                    selectedProvince === province.name ? null : province.name
                  )}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-green-700" />
                        <span className="text-xl">{province.name}</span>
                      </div>
                      {selectedProvince === province.name ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-stone-600 mb-4">
                      {province.description}
                    </p>

                    <AnimatePresence>
                      {selectedProvince === province.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-6"
                        >
                          {/* Full Description */}
                          <div className="bg-white p-6 rounded-lg">
                            <p className="text-stone-700 leading-relaxed mb-4">
                              {expandedDescription === province.name 
                                ? province.fullDescription 
                                : province.fullDescription.substring(0, 200) + '...'
                              }
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedDescription(
                                  expandedDescription === province.name ? null : province.name
                                );
                              }}
                            >
                              {expandedDescription === province.name ? 'Voir moins' : 'Continuer à lire'}
                            </Button>
                          </div>

                          {/* Places */}
                          <div>
                            <h4 className="font-semibold text-stone-900 mb-4 flex items-center space-x-2">
                              <Camera className="h-4 w-4" />
                              <span>Lieux d'intérêt</span>
                            </h4>
                            <div className="grid md:grid-cols-2 gap-4">
                              {province.places.map((place, placeIndex) => (
                                <Card key={placeIndex} className="overflow-hidden">
                                  <div className="relative h-32">
                                    <img
                                      src={place.image}
                                      alt={place.name}
                                      className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                    <div className="absolute bottom-2 left-2 text-white">
                                      <h5 className="font-medium text-sm">{place.name}</h5>
                                    </div>
                                  </div>
                                  <CardContent className="p-4">
                                    <p className="text-sm text-stone-600">
                                      {place.description}
                                    </p>
                                    <Button variant="ghost" size="sm" className="mt-2 p-0">
                                      Voir plus
                                    </Button>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12 p-8 bg-white rounded-lg shadow-sm"
          >
            <h3 className="text-2xl font-semibold text-stone-900 mb-4">
              Vous connaissez d'autres lieux extraordinaires ?
            </h3>
            <p className="text-stone-600 mb-6">
              Partagez vos découvertes avec notre communauté d'explorateurs
            </p>
            <Button size="lg" className="bg-green-700 hover:bg-green-800">
              Ajouter une découverte
            </Button>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Explorer;
