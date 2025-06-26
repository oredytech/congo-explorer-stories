
import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import FeaturedSection from '@/components/FeaturedSection';
import DiscoverySection from '@/components/DiscoverySection';
import CTASection from '@/components/CTASection';
import TestimonialsSection from '@/components/TestimonialsSection';

const Home = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="space-y-0">
        <HeroSection />
        <DiscoverySection />
        <FeaturedSection />
        <TestimonialsSection />
        <CTASection />
        
        {/* About Mission Section */}
        <section className="py-16 bg-congo-beige">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-3xl font-bold text-congo-brown">
                {t('home.aboutTitle')}
              </h2>
              <p className="text-lg text-congo-brown/80 leading-relaxed">
                {t('home.aboutText')}
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-congo-green mb-2">26</div>
                  <div className="text-congo-brown/70">Provinces explorées</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">500+</div>
                  <div className="text-congo-brown/70">Photos partagées</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                  <div className="text-congo-brown/70">Documentaires créés</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
