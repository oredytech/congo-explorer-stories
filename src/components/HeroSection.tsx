import { useTranslation } from 'react-i18next';
import { ArrowRight, Camera, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { useWordPressArticles } from '@/hooks/useWordPressArticles';
import { useEffect, useState } from 'react';

const HeroSection = () => {
  const { t } = useTranslation();
  const [api, setApi] = useState<any>();
  const [backgroundApi, setBackgroundApi] = useState<any>();

  // Auto-play functionality for main carousel
  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [api]);

  // Auto-play functionality for background carousel (slower)
  useEffect(() => {
    if (!backgroundApi) return;

    const interval = setInterval(() => {
      backgroundApi.scrollNext();
    }, 6000); // Change background slide every 6 seconds

    return () => clearInterval(interval);
  }, [backgroundApi]);

  const heroImages = [
    {
      id: 1,
      src: "/lovable-uploads/d38e11a5-2582-4112-9081-f71ffb6fa529.png",
      title: "Marché de poissons - Vie locale congolaise",
      description: "Découvrez les marchés traditionnels et la richesse des produits locaux"
    },
    {
      id: 2,
      src: "/lovable-uploads/5f88bb86-33ae-4ea4-bdca-011b28287006.png",
      title: "Paysages montagneux - Beauté naturelle",
      description: "Explorez les magnifiques montagnes et vallées verdoyantes du Congo"
    },
    {
      id: 3,
      src: "/lovable-uploads/f38062f9-69ca-453e-8012-fce6e2980367.png",
      title: "Rivière forestière - Écosystème tropical",
      description: "Plongez dans la biodiversité exceptionnelle des forêts congolaises"
    },
    {
      id: 4,
      src: "/lovable-uploads/043d4709-0530-4195-80dd-52dfe9b46c31.png",
      title: "Rivière cristalline - Ressources naturelles",
      description: "Admirez la pureté des cours d'eau dans les régions préservées"
    },
    {
      id: 5,
      src: "/lovable-uploads/638a6482-2147-4b93-a2a1-2502becb4810.png",
      title: "Vue panoramique - Horizons infinis",
      description: "Contemplez les vastes étendues et panoramas à couper le souffle"
    }
  ];

  return (
    <section className="relative overflow-hidden py-20">
      {/* Background Image Slider with very low opacity */}
      <div className="absolute inset-0 z-0">
        <Carousel 
          setApi={setBackgroundApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="h-full"
        >
          <CarouselContent className="h-full">
            {heroImages.map((image) => (
              <CarouselItem key={`bg-${image.id}`} className="h-full">
                <div className="relative h-full">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920&h=1080&fit=crop";
                    }}
                  />
                  <div className="absolute inset-0 bg-congo-beige/95"></div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-congo-beige/90 via-congo-beige/85 to-congo-beige/80 z-10"></div>

      {/* Main content */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h1 className="text-4xl lg:text-6xl font-bold text-congo-brown mb-4">
                  {t('home.title')}
                </h1>
                <p className="text-xl text-congo-green font-medium mb-6 italic">
                  Premier site du tourisme en ligne pour vous faire découvrir la RDC dans toute sa splendeur.
                </p>
                <p className="text-xl text-congo-brown/80 leading-relaxed mb-8">
                  {t('home.subtitle')}
                </p>
                <p className="text-lg text-congo-brown/70 leading-relaxed">
                  {t('home.heroText')}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-congo-green hover:bg-congo-green/90 text-congo-beige border-0">
                  <Link to="/explorer" className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>{t('nav.explore')}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                
                <Button asChild variant="outline" size="lg" className="border-congo-brown text-congo-brown hover:bg-congo-brown hover:text-congo-beige">
                  <Link to="/ajouter" className="flex items-center space-x-2">
                    <Camera className="h-5 w-5" />
                    <span>{t('home.addContent')}</span>
                  </Link>
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-congo-brown/60">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-congo-green rounded-full"></div>
                  <span>26 Provinces</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                  <span>500+ Photos</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>50+ Documentaires</span>
                </div>
              </div>
            </motion.div>

            {/* Right Content - Articles Carousel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <Carousel 
                setApi={setApi}
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="relative overflow-hidden rounded-2xl shadow-2xl"
              >
                <CarouselContent>
                  {heroImages.map((image) => (
                    <CarouselItem key={image.id}>
                      <div className="relative">
                        <img
                          src={image.src}
                          alt={image.title}
                          className="w-full h-96 object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        
                        {/* Image info overlay */}
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <div className="bg-congo-green text-white px-3 py-1 rounded-full text-xs font-medium mb-2 inline-block">
                            Découverte
                          </div>
                          <h3 className="text-lg font-bold mb-2 line-clamp-2">
                            {image.title}
                          </h3>
                          <p className="text-sm opacity-90 line-clamp-2">
                            {image.description}
                          </p>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
              
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-congo-beige rounded-full p-4 shadow-lg border border-congo-brown/10">
                <div className="text-center">
                  <div className="text-2xl font-bold text-congo-green">26</div>
                  <div className="text-xs text-congo-brown">Provinces</div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-congo-beige rounded-full p-4 shadow-lg border border-congo-brown/10">
                <div className="text-center">
                  <div className="text-2xl font-bold text-congo-brown">RDC</div>
                  <div className="text-xs text-congo-brown/70">À découvrir</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
