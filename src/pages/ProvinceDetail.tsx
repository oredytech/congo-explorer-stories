
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin, 
  Users, 
  Mountain, 
  Camera, 
  Bed, 
  Star, 
  Phone, 
  Mail,
  Wifi,
  Car,
  Utensils,
  ArrowLeft,
  Calendar,
  Clock,
  Thermometer
} from 'lucide-react';
import { motion } from 'framer-motion';

const ProvinceDetail = () => {
  const { id } = useParams();

  // Sample data - in a real app, this would come from an API or database
  const provinceData = {
    'kinshasa': {
      name: "Kinshasa",
      description: "Kinshasa, la capitale et plus grande ville de la République Démocratique du Congo, est une métropole fascinante qui abrite plus de 17 millions d'habitants. Située sur les rives du fleuve Congo, face à Brazzaville, elle offre un contraste saisissant entre quartiers modernes et zones traditionnelles.",
      population: "17 millions",
      superficie: "9 965 km²",
      capitale: "Kinshasa",
      langue: "Français, Lingala",
      climat: "Tropical humide",
      temperature: "25-30°C",
      image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f",
      gallery: [
        "https://images.unsplash.com/photo-1485833077593-4278bba3f11f",
        "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac",
        "https://images.unsplash.com/photo-1493962853295-0fd70327578a"
      ],
      attractions: [
        {
          name: "Vallée de la Nsele",
          description: "Un écosystème préservé aux portes de Kinshasa, parfait pour l'observation de la faune",
          image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f",
          prix: "25$",
          duree: "Demi-journée"
        },
        {
          name: "Marché Central",
          description: "Le cœur commercial de la capitale, une explosion de couleurs et de saveurs",
          image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac",
          prix: "Gratuit",
          duree: "2-3 heures"
        },
        {
          name: "Musée National",
          description: "Collections d'art et d'objets traditionnels congolais",
          image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a",
          prix: "10$",
          duree: "3 heures"
        }
      ],
      hotels: [
        {
          name: "Hôtel Pullman Kinshasa Grand Hotel",
          rating: 5,
          prix: "150-250$ / nuit",
          description: "Hôtel de luxe au cœur de Kinshasa avec vue sur le fleuve Congo",
          amenities: ["Wifi", "Piscine", "Restaurant", "Spa", "Centre d'affaires"],
          contact: "+243 81 000 0000",
          email: "reservation@pullman-kinshasa.com"
        },
        {
          name: "Hôtel Memling",
          rating: 4,
          prix: "80-120$ / nuit",
          description: "Hôtel historique avec un charme colonial et service de qualité",
          amenities: ["Wifi", "Restaurant", "Bar", "Parking"],
          contact: "+243 81 111 1111",
          email: "info@memling-hotel.com"
        },
        {
          name: "Lodge Kinshasa",
          rating: 3,
          prix: "45-70$ / nuit",
          description: "Hébergement confortable et abordable pour les voyageurs",
          amenities: ["Wifi", "Restaurant", "Parking"],
          contact: "+243 81 222 2222",
          email: "lodge@kinshasa-lodge.com"
        }
      ],
      culture: [
        "Capitale de la rumba congolaise",
        "Centre artistique avec de nombreuses galeries",
        "Marchés traditionnels colorés",
        "Architecture coloniale préservée"
      ],
      gastronomie: [
        "Poisson grillé du fleuve Congo",
        "Chikwangue (pain de manioc)",
        "Pondu (feuilles de manioc)",
        "Bière Primus et Tembo"
      ]
    },
    'nord-kivu': {
      name: "Nord-Kivu",
      description: "Le Nord-Kivu est une province montagneuse située dans l'est de la RDC, célèbre pour ses paysages volcaniques spectaculaires, le parc national des Virunga et ses gorilles de montagne. Goma, sa capitale, est située sur les rives du lac Kivu.",
      population: "8.5 millions",
      superficie: "59 483 km²",
      capitale: "Goma",
      langue: "Français, Swahili, Kinyarwanda",
      climat: "Tropical de montagne",
      temperature: "18-25°C",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      gallery: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
        "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7"
      ],
      attractions: [
        {
          name: "Parc National des Virunga",
          description: "Le plus ancien parc d'Afrique, habitat des gorilles de montagne",
          image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
          prix: "400$ (permis gorilles)",
          duree: "1-3 jours"
        },
        {
          name: "Volcan Nyiragongo",
          description: "Volcan actif avec un lac de lave spectaculaire",
          image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
          prix: "300$",
          duree: "2 jours"
        },
        {
          name: "Lac Kivu",
          description: "L'un des Grands Lacs africains, parfait pour la détente",
          image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7",
          prix: "50$",
          duree: "Journée complète"
        }
      ],
      hotels: [
        {
          name: "Hôtel Ihusi",
          rating: 4,
          prix: "120-180$ / nuit",
          description: "Hôtel moderne avec vue magnifique sur le lac Kivu",
          amenities: ["Wifi", "Restaurant", "Bar", "Spa", "Vue sur lac"],
          contact: "+243 997 000 000",
          email: "reservation@ihusi-hotel.com"
        },
        {
          name: "Lac Kivu Lodge",
          rating: 4,
          prix: "200-300$ / nuit",
          description: "Lodge de luxe sur les rives du lac Kivu",
          amenities: ["Wifi", "Restaurant", "Spa", "Activités nautiques"],
          contact: "+243 997 111 111",
          email: "info@lakekivu-lodge.com"
        },
        {
          name: "Goma Serena Hotel",
          rating: 3,
          prix: "80-120$ / nuit",
          description: "Hôtel confortable au centre de Goma",
          amenities: ["Wifi", "Restaurant", "Parking", "Service de blanchisserie"],
          contact: "+243 997 222 222",
          email: "goma@serena-hotels.com"
        }
      ],
      culture: [
        "Traditions des peuples des montagnes",
        "Artisanat local en vannerie",
        "Danses traditionnelles Hema et Lendu",
        "Art de la poterie ancestrale"
      ],
      gastronomie: [
        "Tilapia du lac Kivu",
        "Igikoma (légumes verts locaux)",
        "Ubwoba (boisson fermentée)",
        "Miel des montagnes Virunga"
      ]
    }
  };

  const province = provinceData[id as keyof typeof provinceData];

  if (!province) {
    return (
      <Layout>
        <div className="min-h-screen bg-congo-beige flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-congo-brown mb-4">Province non trouvée</h1>
            <Button asChild>
              <Link to="/explorer">Retour à l'explorer</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-congo-beige">
        {/* Hero Section */}
        <div className="relative h-96 overflow-hidden">
          <img
            src={province.image}
            alt={province.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-white max-w-2xl"
              >
                <Button
                  variant="ghost"
                  asChild
                  className="text-white hover:bg-white/20 mb-4"
                >
                  <Link to="/explorer">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Retour à l'explorer
                  </Link>
                </Button>
                <h1 className="text-5xl font-bold mb-4">{province.name}</h1>
                <p className="text-xl text-white/90">{province.description}</p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          {/* Quick Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-4 gap-4 mb-12"
          >
            <Card className="text-center border-congo-brown/20 bg-white">
              <CardContent className="p-4">
                <Users className="h-8 w-8 text-congo-green mx-auto mb-2" />
                <p className="font-semibold text-congo-brown">{province.population}</p>
                <p className="text-sm text-congo-brown/60">Population</p>
              </CardContent>
            </Card>
            <Card className="text-center border-congo-brown/20 bg-white">
              <CardContent className="p-4">
                <MapPin className="h-8 w-8 text-congo-green mx-auto mb-2" />
                <p className="font-semibold text-congo-brown">{province.superficie}</p>
                <p className="text-sm text-congo-brown/60">Superficie</p>
              </CardContent>
            </Card>
            <Card className="text-center border-congo-brown/20 bg-white">
              <CardContent className="p-4">
                <Mountain className="h-8 w-8 text-congo-green mx-auto mb-2" />
                <p className="font-semibold text-congo-brown">{province.capitale}</p>
                <p className="text-sm text-congo-brown/60">Capitale</p>
              </CardContent>
            </Card>
            <Card className="text-center border-congo-brown/20 bg-white">
              <CardContent className="p-4">
                <Thermometer className="h-8 w-8 text-congo-green mx-auto mb-2" />
                <p className="font-semibold text-congo-brown">{province.temperature}</p>
                <p className="text-sm text-congo-brown/60">Température</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="attractions" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 bg-congo-brown/10">
              <TabsTrigger value="attractions" className="text-congo-brown data-[state=active]:bg-congo-green data-[state=active]:text-congo-beige">
                <Camera className="h-4 w-4 mr-2" />
                Attractions
              </TabsTrigger>
              <TabsTrigger value="hotels" className="text-congo-brown data-[state=active]:bg-congo-green data-[state=active]:text-congo-beige">
                <Bed className="h-4 w-4 mr-2" />
                Hôtels
              </TabsTrigger>
              <TabsTrigger value="culture" className="text-congo-brown data-[state=active]:bg-congo-green data-[state=active]:text-congo-beige">
                <Users className="h-4 w-4 mr-2" />
                Culture
              </TabsTrigger>
              <TabsTrigger value="infos" className="text-congo-brown data-[state=active]:bg-congo-green data-[state=active]:text-congo-beige">
                <MapPin className="h-4 w-4 mr-2" />
                Infos
              </TabsTrigger>
            </TabsList>

            {/* Attractions Tab */}
            <TabsContent value="attractions">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {province.attractions.map((attraction, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden border-congo-brown/20 bg-white hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        <img
                          src={attraction.image}
                          alt={attraction.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-congo-green text-congo-beige">
                            {attraction.prix}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="text-lg font-semibold text-congo-brown mb-2">
                          {attraction.name}
                        </h3>
                        <p className="text-congo-brown/70 mb-3 text-sm">
                          {attraction.description}
                        </p>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center text-congo-brown/60">
                            <Clock className="h-4 w-4 mr-1" />
                            {attraction.duree}
                          </div>
                          <Button size="sm" className="bg-congo-green hover:bg-congo-green/80 text-congo-beige">
                            Réserver
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Hotels Tab */}
            <TabsContent value="hotels">
              <div className="space-y-6">
                {province.hotels.map((hotel, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="border-congo-brown/20 bg-white">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-congo-brown mb-2">
                              {hotel.name}
                            </h3>
                            <div className="flex items-center space-x-1 mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < hotel.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-congo-green">{hotel.prix}</p>
                          </div>
                        </div>
                        
                        <p className="text-congo-brown/70 mb-4">{hotel.description}</p>
                        
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h4 className="font-medium text-congo-brown mb-2">Équipements :</h4>
                            <div className="flex flex-wrap gap-2">
                              {hotel.amenities.map((amenity, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {amenity}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-congo-brown mb-2">Contact :</h4>
                            <div className="space-y-1 text-sm text-congo-brown/70">
                              <div className="flex items-center">
                                <Phone className="h-4 w-4 mr-2" />
                                {hotel.contact}
                              </div>
                              <div className="flex items-center">
                                <Mail className="h-4 w-4 mr-2" />
                                {hotel.email}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <Button className="bg-congo-green hover:bg-congo-green/80 text-congo-beige">
                          Réserver maintenant
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Culture Tab */}
            <TabsContent value="culture">
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-congo-brown/20 bg-white">
                  <CardHeader>
                    <CardTitle className="text-congo-brown">Patrimoine Culturel</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {province.culture.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-congo-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-congo-brown/80">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-congo-brown/20 bg-white">
                  <CardHeader>
                    <CardTitle className="text-congo-brown">Gastronomie Locale</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {province.gastronomie.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <Utensils className="h-4 w-4 text-congo-green mt-1 mr-3 flex-shrink-0" />
                          <span className="text-congo-brown/80">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Infos Tab */}
            <TabsContent value="infos">
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-congo-brown/20 bg-white">
                  <CardHeader>
                    <CardTitle className="text-congo-brown">Informations Générales</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-congo-brown">Langue(s) parlée(s)</h4>
                      <p className="text-congo-brown/70">{province.langue}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-congo-brown">Climat</h4>
                      <p className="text-congo-brown/70">{province.climat}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-congo-brown">Meilleure période de visite</h4>
                      <p className="text-congo-brown/70">Juin à Septembre (saison sèche)</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-congo-brown/20 bg-white">
                  <CardHeader>
                    <CardTitle className="text-congo-brown">Conseils Pratiques</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-congo-brown">Monnaie</h4>
                      <p className="text-congo-brown/70">Franc Congolais (CDF) et Dollar US</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-congo-brown">Transport</h4>
                      <p className="text-congo-brown/70">Vols domestiques, routes et bateaux</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-congo-brown">Santé</h4>
                      <p className="text-congo-brown/70">Vaccination fièvre jaune obligatoire</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-16 p-8 bg-congo-brown rounded-lg"
          >
            <h3 className="text-2xl font-semibold text-congo-beige mb-4">
              Prêt à explorer {province.name} ?
            </h3>
            <p className="text-congo-beige/80 mb-6">
              Contactez-nous pour organiser votre voyage personnalisé
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-congo-green hover:bg-congo-green/80 text-congo-beige">
                <Link to="/contact">
                  <Calendar className="h-4 w-4 mr-2" />
                  Planifier mon voyage
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-congo-beige text-congo-beige hover:bg-congo-beige hover:text-congo-brown">
                <Link to="/explorer">
                  Voir d'autres provinces
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default ProvinceDetail;
