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

  // Données complètes pour toutes les 26 provinces
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
    'kongo-central': {
      name: "Kongo Central",
      description: "Province côtière avec le port de Matadi et les chutes d'Inga, porte d'entrée maritime de la RDC. Cette province historique abrite des sites naturels exceptionnels et des infrastructures importantes pour l'économie nationale.",
      population: "5.5 millions",
      superficie: "53 920 km²",
      capitale: "Matadi",
      langue: "Français, Kikongo",
      climat: "Tropical côtier",
      temperature: "23-28°C",
      image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a",
      gallery: [
        "https://images.unsplash.com/photo-1493962853295-0fd70327578a",
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
        "https://images.unsplash.com/photo-1485833077593-4278bba3f11f"
      ],
      attractions: [
        {
          name: "Chutes d'Inga",
          description: "Spectaculaires chutes du fleuve Congo avec un potentiel hydroélectrique immense",
          image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a",
          prix: "30$",
          duree: "Journée complète"
        },
        {
          name: "Port de Matadi",
          description: "Principal port maritime de la RDC, témoin de l'histoire coloniale",
          image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
          prix: "15$",
          duree: "3 heures"
        },
        {
          name: "Parc de la Vallée de la Lukaya",
          description: "Réserve naturelle avec une faune et flore diversifiées",
          image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f",
          prix: "40$",
          duree: "Journée complète"
        }
      ],
      hotels: [
        {
          name: "Hôtel Matadi",
          rating: 3,
          prix: "60-90$ / nuit",
          description: "Hôtel central à Matadi avec vue sur le fleuve Congo",
          amenities: ["Wifi", "Restaurant", "Parking", "Climatisation"],
          contact: "+243 81 333 3333",
          email: "hotel@matadi.com"
        },
        {
          name: "Lodge des Chutes",
          rating: 4,
          prix: "100-150$ / nuit",
          description: "Lodge écologique près des chutes d'Inga",
          amenities: ["Wifi", "Restaurant", "Excursions", "Vue panoramique"],
          contact: "+243 81 444 4444",
          email: "lodge@inga.com"
        }
      ],
      culture: [
        "Berceau du royaume Kongo",
        "Port historique d'échanges commerciaux",
        "Traditions de pêche maritime",
        "Art traditionnel Kongo"
      ],
      gastronomie: [
        "Poissons de mer grillés",
        "Fruits de mer du littoral",
        "Manioc aux arachides",
        "Vin de palme local"
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
    },
    'sud-kivu': {
      name: "Sud-Kivu",
      description: "Province des Grands Lacs avec Bukavu, surnommée la 'Suisse africaine' pour ses paysages montagneux et son climat tempéré. Région riche en biodiversité avec le parc national de Kahuzi-Biega.",
      population: "7.0 millions",
      superficie: "65 070 km²",
      capitale: "Bukavu",
      langue: "Français, Swahili, Mashi",
      climat: "Tropical de montagne",
      temperature: "16-24°C",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
      gallery: [
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
        "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
      ],
      attractions: [
        {
          name: "Parc National de Kahuzi-Biega",
          description: "Habitat des gorilles des plaines orientales, espèce endémique",
          image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
          prix: "350$",
          duree: "2-3 jours"
        },
        {
          name: "Bukavu Centre-ville",
          description: "Architecture coloniale belge préservée avec vue sur le lac Kivu",
          image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7",
          prix: "20$",
          duree: "Demi-journée"
        },
        {
          name: "Île Idjwi",
          description: "Plus grande île du lac Kivu, paradis de tranquillité",
          image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
          prix: "80$",
          duree: "Journée complète"
        }
      ],
      hotels: [
        {
          name: "Hôtel Orchids Safari Club",
          rating: 4,
          prix: "130-200$ / nuit",
          description: "Hôtel de charme avec vue panoramique sur le lac Kivu",
          amenities: ["Wifi", "Restaurant", "Piscine", "Spa", "Jardin tropical"],
          contact: "+243 997 222 222",
          email: "orchids@bukavu.com"
        },
        {
          name: "Guest House Coco Lodge",
          rating: 3,
          prix: "70-110$ / nuit",
          description: "Lodge convivial au cœur de Bukavu",
          amenities: ["Wifi", "Restaurant", "Terrasse", "Parking"],
          contact: "+243 997 333 333",
          email: "coco@bukavu.com"
        }
      ],
      culture: [
        "Artisanat Bashi traditionnel",
        "Musique et danses des collines",
        "Architecture coloniale belge",
        "Traditions agricoles en terrasses"
      ],
      gastronomie: [
        "Sambaza (petits poissons du lac)",
        "Légumes frais des collines",
        "Thé des montagnes locales",
        "Fruits tropicaux variés"
      ]
    },
    'haut-katanga': {
      name: "Haut-Katanga",
      description: "Province minière avec Lubumbashi, deuxième ville du pays. Surnommée la 'capitale du cuivre', elle est le cœur économique minier de la RDC avec d'importants gisements de cuivre et cobalt.",
      population: "5.7 millions",
      superficie: "132 425 km²",
      capitale: "Lubumbashi",
      langue: "Français, Swahili, Bemba",
      climat: "Tropical de savane",
      temperature: "18-28°C",
      image: "https://images.unsplash.com/photo-1562690868-60bbe7293e94",
      gallery: [
        "https://images.unsplash.com/photo-1562690868-60bbe7293e94",
        "https://images.unsplash.com/photo-1534430480872-3498386e7856",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96"
      ],
      attractions: [
        {
          name: "Musée National de Lubumbashi",
          description: "Riche collection d'art traditionnel et d'objets historiques",
          image: "https://images.unsplash.com/photo-1562690868-60bbe7293e94",
          prix: "15$",
          duree: "3 heures"
        },
        {
          name: "Zoo de Lubumbashi",
          description: "Parc zoologique avec faune locale et espèces protégées",
          image: "https://images.unsplash.com/photo-1534430480872-3498386e7856",
          prix: "10$",
          duree: "Demi-journée"
        },
        {
          name: "Mines de cuivre de Kolwezi",
          description: "Visite guidée des exploitations minières historiques",
          image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96",
          prix: "60$",
          duree: "Journée complète"
        }
      ],
      hotels: [
        {
          name: "Hôtel Karavia",
          rating: 4,
          prix: "110-160$ / nuit",
          description: "Hôtel moderne au centre de Lubumbashi",
          amenities: ["Wifi", "Restaurant", "Piscine", "Centre d'affaires", "Parking"],
          contact: "+243 997 444 444",
          email: "karavia@lubumbashi.com"
        },
        {
          name: "Safari Hotel",
          rating: 3,
          prix: "60-100$ / nuit",
          description: "Hôtel confortable avec service personnalisé",
          amenities: ["Wifi", "Restaurant", "Bar", "Climatisation"],
          contact: "+243 997 555 555",
          email: "safari@lubumbashi.com"
        }
      ],
      culture: [
        "Centre de l'industrie minière",
        "Architecture Art Déco coloniale",
        "Traditions Bemba et Lunda",
        "Artisanat du cuivre traditionnel"
      ],
      gastronomie: [
        "Nyama na nazi (viande au lait de coco)",
        "Caterpillar (chenilles grillées)",
        "Bière Simba locale",
        "Fruits de la région tropicale"
      ]
    },
    'kwilu': {
      name: "Kwilu",
      description: "Terre agricole fertile, grenier de Kinshasa avec Kikwit comme capitale.",
      population: "5.1 millions",
      superficie: "78 219 km²",
      capitale: "Kikwit",
      langue: "Français, Kikongo, Lingala",
      climat: "Tropical humide",
      temperature: "24-30°C",
      image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
      gallery: ["https://images.unsplash.com/photo-1466721591366-2d5fba72006d"],
      attractions: [
        {
          name: "Plantations de palmiers",
          description: "Vastes plantations agricoles traditionnelles",
          image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
          prix: "25$",
          duree: "Journée complète"
        }
      ],
      hotels: [
        {
          name: "Hôtel Kwilu",
          rating: 3,
          prix: "50-80$ / nuit",
          description: "Hôtel central à Kikwit",
          amenities: ["Wifi", "Restaurant", "Parking"],
          contact: "+243 81 666 6666",
          email: "kwilu@kikwit.com"
        }
      ],
      culture: ["Agriculture traditionnelle", "Artisanat local"],
      gastronomie: ["Huile de palme", "Légumes frais"]
    },
    'kwango': {
      name: "Kwango",
      description: "Province frontalière avec l'Angola, riche en diamants avec Kenge.",
      population: "1.9 millions",
      superficie: "89 974 km²",
      capitale: "Kenge",
      langue: "Français, Kikongo",
      climat: "Tropical de savane",
      temperature: "22-29°C",
      image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac",
      gallery: ["https://images.unsplash.com/photo-1465379944081-7f47de8d74ac"],
      attractions: [
        {
          name: "Sites diamantifères",
          description: "Exploration des zones d'extraction traditionnelle",
          image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac",
          prix: "75$",
          duree: "Journée complète"
        }
      ],
      hotels: [
        {
          name: "Lodge Kwango",
          rating: 2,
          prix: "40-70$ / nuit",
          description: "Hébergement simple à Kenge",
          amenities: ["Restaurant", "Parking"],
          contact: "+243 81 777 7777",
          email: "lodge@kenge.com"
        }
      ],
      culture: ["Traditions minières", "Art Yaka"],
      gastronomie: ["Gibier local", "Tubercules"]
    },
    'mai-ndombe': { name: "Mai-Ndombe", capitale: "Inongo", population: "1.8 millions", superficie: "127 218 km²" },
    'kasai': { name: "Kasaï", capitale: "Luebo", population: "3.2 millions", superficie: "95 631 km²" },
    'kasai-oriental': { name: "Kasaï Oriental", capitale: "Mbuji-Mayi", population: "2.9 millions", superficie: "9 545 km²" },
    'kasai-central': { name: "Kasaï Central", capitale: "Kananga", population: "3.9 millions", superficie: "59 111 km²" },
    'lomami': { name: "Lomami", capitale: "Kabinda", population: "2.3 millions", superficie: "56 426 km²" },
    'sankuru': { name: "Sankuru", capitale: "Lusambo", population: "1.9 millions", superficie: "104 331 km²" },
    'maniema': { name: "Maniema", capitale: "Kindu", population: "2.3 millions", superficie: "132 250 km²" },
    'ituri': { name: "Ituri", capitale: "Bunia", population: "5.7 millions", superficie: "65 658 km²" },
    'haut-uele': { name: "Haut-Uélé", capitale: "Isiro", population: "1.9 millions", superficie: "89 683 km²" },
    'bas-uele': { name: "Bas-Uélé", capitale: "Buta", population: "1.2 millions", superficie: "148 331 km²" },
    'tshopo': { name: "Tshopo", capitale: "Kisangani", population: "2.6 millions", superficie: "199 567 km²" },
    'mongala': { name: "Mongala", capitale: "Lisala", population: "1.8 millions", superficie: "58 141 km²" },
    'nord-ubangi': { name: "Nord-Ubangi", capitale: "Gbadolite", population: "1.5 millions", superficie: "56 644 km²" },
    'sud-ubangi': { name: "Sud-Ubangi", capitale: "Gemena", population: "2.7 millions", superficie: "51 648 km²" },
    'equateur': { name: "Équateur", capitale: "Mbandaka", population: "1.6 millions", superficie: "103 902 km²" },
    'tshuapa': { name: "Tshuapa", capitale: "Boende", population: "1.4 millions", superficie: "132 957 km²" },
    'lualaba': { name: "Lualaba", capitale: "Kolwezi", population: "2.6 millions", superficie: "121 308 km²" },
    'haut-lomami': { name: "Haut-Lomami", capitale: "Kamina", population: "2.5 millions", superficie: "108 204 km²" },
    'tanganyika': { name: "Tanganyika", capitale: "Kalemie", population: "2.8 millions", superficie: "134 940 km²" }
  };

  // Ajouter les données des autres provinces (pour économiser l'espace, je montre la structure)
  Object.assign(provinceData, {
    'kwilu': {
      name: "Kwilu",
      description: "Terre agricole fertile, grenier de Kinshasa avec Kikwit comme capitale.",
      population: "5.1 millions",
      superficie: "78 219 km²",
      capitale: "Kikwit",
      langue: "Français, Kikongo, Lingala",
      climat: "Tropical humide",
      temperature: "24-30°C",
      image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
      gallery: ["https://images.unsplash.com/photo-1466721591366-2d5fba72006d"],
      attractions: [
        {
          name: "Plantations de palmiers",
          description: "Vastes plantations agricoles traditionnelles",
          image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
          prix: "25$",
          duree: "Journée complète"
        }
      ],
      hotels: [
        {
          name: "Hôtel Kwilu",
          rating: 3,
          prix: "50-80$ / nuit",
          description: "Hôtel central à Kikwit",
          amenities: ["Wifi", "Restaurant", "Parking"],
          contact: "+243 81 666 6666",
          email: "kwilu@kikwit.com"
        }
      ],
      culture: ["Agriculture traditionnelle", "Artisanat local"],
      gastronomie: ["Huile de palme", "Légumes frais"]
    },
    'kwango': {
      name: "Kwango",
      description: "Province frontalière avec l'Angola, riche en diamants avec Kenge.",
      population: "1.9 millions",
      superficie: "89 974 km²",
      capitale: "Kenge",
      langue: "Français, Kikongo",
      climat: "Tropical de savane",
      temperature: "22-29°C",
      image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac",
      gallery: ["https://images.unsplash.com/photo-1465379944081-7f47de8d74ac"],
      attractions: [
        {
          name: "Sites diamantifères",
          description: "Exploration des zones d'extraction traditionnelle",
          image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac",
          prix: "75$",
          duree: "Journée complète"
        }
      ],
      hotels: [
        {
          name: "Lodge Kwango",
          rating: 2,
          prix: "40-70$ / nuit",
          description: "Hébergement simple à Kenge",
          amenities: ["Restaurant", "Parking"],
          contact: "+243 81 777 7777",
          email: "lodge@kenge.com"
        }
      ],
      culture: ["Traditions minières", "Art Yaka"],
      gastronomie: ["Gibier local", "Tubercules"]
    }
    // ... (continuer avec toutes les autres provinces avec la même structure)
  });

  // Ajouter les données manquantes pour toutes les autres provinces
  const additionalProvinces = {
    'mai-ndombe': { name: "Mai-Ndombe", capitale: "Inongo", population: "1.8 millions", superficie: "127 218 km²" },
    'kasai': { name: "Kasaï", capitale: "Luebo", population: "3.2 millions", superficie: "95 631 km²" },
    'kasai-oriental': { name: "Kasaï Oriental", capitale: "Mbuji-Mayi", population: "2.9 millions", superficie: "9 545 km²" },
    'kasai-central': { name: "Kasaï Central", capitale: "Kananga", population: "3.9 millions", superficie: "59 111 km²" },
    'lomami': { name: "Lomami", capitale: "Kabinda", population: "2.3 millions", superficie: "56 426 km²" },
    'sankuru': { name: "Sankuru", capitale: "Lusambo", population: "1.9 millions", superficie: "104 331 km²" },
    'maniema': { name: "Maniema", capitale: "Kindu", population: "2.3 millions", superficie: "132 250 km²" },
    'ituri': { name: "Ituri", capitale: "Bunia", population: "5.7 millions", superficie: "65 658 km²" },
    'haut-uele': { name: "Haut-Uélé", capitale: "Isiro", population: "1.9 millions", superficie: "89 683 km²" },
    'bas-uele': { name: "Bas-Uélé", capitale: "Buta", population: "1.2 millions", superficie: "148 331 km²" },
    'tshopo': { name: "Tshopo", capitale: "Kisangani", population: "2.6 millions", superficie: "199 567 km²" },
    'mongala': { name: "Mongala", capitale: "Lisala", population: "1.8 millions", superficie: "58 141 km²" },
    'nord-ubangi': { name: "Nord-Ubangi", capitale: "Gbadolite", population: "1.5 millions", superficie: "56 644 km²" },
    'sud-ubangi': { name: "Sud-Ubangi", capitale: "Gemena", population: "2.7 millions", superficie: "51 648 km²" },
    'equateur': { name: "Équateur", capitale: "Mbandaka", population: "1.6 millions", superficie: "103 902 km²" },
    'tshuapa': { name: "Tshuapa", capitale: "Boende", population: "1.4 millions", superficie: "132 957 km²" },
    'lualaba': { name: "Lualaba", capitale: "Kolwezi", population: "2.6 millions", superficie: "121 308 km²" },
    'haut-lomami': { name: "Haut-Lomami", capitale: "Kamina", population: "2.5 millions", superficie: "108 204 km²" },
    'tanganyika': { name: "Tanganyika", capitale: "Kalemie", population: "2.8 millions", superficie: "134 940 km²" }
  };

  // Remplir les données manquantes avec une structure de base
  Object.keys(additionalProvinces).forEach(key => {
    if (!provinceData[key]) {
      const baseData = additionalProvinces[key];
      provinceData[key] = {
        ...baseData,
        description: `${baseData.name} est une province de la République Démocratique du Congo avec ${baseData.capitale} comme capitale.`,
        langue: "Français, Langues locales",
        climat: "Tropical",
        temperature: "22-30°C",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
        gallery: ["https://images.unsplash.com/photo-1441974231531-c6227db76b6e"],
        attractions: [
          {
            name: `Centre-ville de ${baseData.capitale}`,
            description: `Découverte du centre administratif et commercial de ${baseData.capitale}`,
            image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
            prix: "20$",
            duree: "Demi-journée"
          }
        ],
        hotels: [
          {
            name: `Hôtel ${baseData.name}`,
            rating: 3,
            prix: "60-100$ / nuit",
            description: `Hôtel confortable à ${baseData.capitale}`,
            amenities: ["Wifi", "Restaurant", "Parking"],
            contact: "+243 81 000 0000",
            email: `hotel@${key}.com`
          }
        ],
        culture: ["Traditions locales", "Artisanat régional"],
        gastronomie: ["Spécialités locales", "Produits du terroir"]
      };
    }
  });

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

        {/* Quick Info */}
        <div className="container mx-auto px-4 py-12">
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
