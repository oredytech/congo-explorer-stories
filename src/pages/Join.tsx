
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import VolunteerProtocolSection from '@/components/join/VolunteerProtocolSection';
import { Button } from '@/components/ui/button';
import { UserPlus, ArrowRight } from 'lucide-react';

const Join = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleJoinClick = () => {
    // Rediriger vers la page d'inscription du contributeur
    navigate('/ajouter');
  };

  return (
    <Layout>
      <div className="py-8 md:py-16 bg-congo-beige min-h-screen w-full">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-3xl md:text-5xl font-bold text-congo-brown mb-6">
              Devenez Explorateur VISITE CONGO
            </h1>
            <p className="text-lg md:text-xl text-congo-brown/80 max-w-4xl mx-auto leading-relaxed">
              Rejoignez notre communauté d'explorateurs passionnés et participez à la découverte 
              et à la promotion des merveilles de la République Démocratique du Congo.
            </p>
          </div>

          {/* Protocol Section */}
          <div className="mb-16">
            <VolunteerProtocolSection />
          </div>

          {/* Call to Action */}
          <div className="bg-white border border-congo-brown/20 rounded-2xl p-8 md:p-12 text-center shadow-lg">
            <div className="max-w-3xl mx-auto">
              <UserPlus className="h-16 w-16 text-congo-green mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-bold text-congo-brown mb-4">
                Prêt à commencer votre aventure ?
              </h2>
              <p className="text-lg text-congo-brown/70 mb-8 leading-relaxed">
                En acceptant notre protocole d'accord, vous rejoindrez une communauté dynamique 
                d'explorateurs dédiés à faire découvrir la beauté authentique du Congo.
              </p>
              
              <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center md:items-center">
                <Button 
                  onClick={handleJoinClick}
                  size="lg"
                  className="w-full md:w-auto text-lg px-8 py-4 bg-congo-green hover:bg-congo-green/90 text-congo-beige"
                >
                  Rejoindre
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <div className="text-sm text-congo-brown/70">
                  <p>🚀 Processus simple et rapide</p>
                  <p>📸 Formation gratuite incluse</p>
                  <p>🌍 Explorez tout le Congo</p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <p className="text-sm text-congo-brown/70">
              Des questions ? Contactez-nous à{' '}
              <a 
                href="mailto:explorateurs@visitecongo.com" 
                className="text-congo-green hover:underline"
              >
                explorateurs@visitecongo.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Join;
