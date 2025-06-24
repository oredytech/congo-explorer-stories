
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Heart } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-stone-50 border-t border-stone-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact */}
          <div>
            <h3 className="font-semibold text-stone-900 mb-4">{t('footer.contact')}</h3>
            <div className="space-y-3 text-sm text-stone-600">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>contact@visitecongo.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+243 XXX XXX XXX</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Kinshasa, RDC</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-stone-900 mb-4">Navigation</h3>
            <div className="space-y-2 text-sm">
              <Link to="/mentions-legales" className="block text-stone-600 hover:text-green-700 transition-colors">
                {t('footer.legal')}
              </Link>
              <Link to="/confidentialite" className="block text-stone-600 hover:text-green-700 transition-colors">
                {t('footer.privacy')}
              </Link>
              <Link to="/contact" className="block text-stone-600 hover:text-green-700 transition-colors">
                {t('footer.contact')}
              </Link>
            </div>
          </div>

          {/* Partners */}
          <div>
            <h3 className="font-semibold text-stone-900 mb-4">{t('footer.partners')}</h3>
            <div className="space-y-2 text-sm">
              <Link to="/partenaires" className="block text-stone-600 hover:text-green-700 transition-colors">
                {t('footer.becomePartner')}
              </Link>
              <div className="text-stone-500 text-xs mt-4">
                Logos des partenaires à venir
              </div>
            </div>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-semibold text-stone-900 mb-4">{t('footer.needHelp')}</h3>
            <Link 
              to="/contact" 
              className="inline-flex items-center space-x-2 text-sm text-green-700 hover:text-green-800 transition-colors"
            >
              <Heart className="h-4 w-4" />
              <span>Formulaire d'assistance</span>
            </Link>
          </div>
        </div>

        <div className="border-t border-stone-200 mt-8 pt-8 text-center text-sm text-stone-500">
          <p>&copy; 2024 VISITE CONGO. Tous droits réservés. Fait avec ❤️ pour la RDC.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
