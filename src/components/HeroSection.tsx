
import { useTranslation } from 'react-i18next';
import { ArrowRight, Camera, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative bg-gradient-to-br from-congo-beige via-congo-beige/80 to-congo-beige/60 py-20">
      <div className="container mx-auto px-4">
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
                <h1 className="text-4xl lg:text-6xl font-bold text-congo-brown mb-6">
                  {t('home.title')}
                </h1>
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

            {/* Right Content - Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop"
                  alt="Paysage de la République Démocratique du Congo"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
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
