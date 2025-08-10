
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Heart } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-congo-brown text-congo-beige border-t border-congo-brown/20 w-full">
      <div className="w-full max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact */}
          <div>
            <h3 className="font-semibold text-congo-beige mb-4">Contact</h3>
            <div className="space-y-3 text-sm text-congo-beige/80">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span className="break-all">contact@visitecongo.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+243 991 478 206</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>Goma, Nord-Kivu, RDC</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-congo-beige mb-4">Navigation</h3>
            <div className="space-y-2 text-sm">
              <Link to="/" className="block text-congo-beige/80 hover:text-congo-green transition-colors">
                Accueil
              </Link>
              <Link to="/articles" className="block text-congo-beige/80 hover:text-congo-green transition-colors">
                Articles
              </Link>
              <Link to="/galerie" className="block text-congo-beige/80 hover:text-congo-green transition-colors">
                Galerie
              </Link>
              <Link to="/contact" className="block text-congo-beige/80 hover:text-congo-green transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Partners */}
          <div>
            <h3 className="font-semibold text-congo-beige mb-4">Partenaires</h3>
            <div className="space-y-2 text-sm">
              <Link to="/rejoindre" className="block text-congo-beige/80 hover:text-congo-green transition-colors">
                Devenir partenaire
              </Link>
              <div className="text-congo-beige/60 text-xs mt-4">
                Logos des partenaires à venir
              </div>
            </div>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-semibold text-congo-beige mb-4">Aide</h3>
            <Link to="/contact" className="inline-flex items-center space-x-2 text-sm text-congo-green hover:text-congo-green/80 transition-colors">
              <Heart className="h-4 w-4 flex-shrink-0" />
              <span>Formulaire d'assistance</span>
            </Link>
          </div>
        </div>

        <div className="border-t border-congo-beige/20 mt-8 pt-8 text-center text-sm text-congo-beige/80">
          <p>&copy; 2024 VISITE CONGO. Tous droits réservés. Fièrement conçu par <a href="https://oredytech.com" target="_blank" rel="noopener noreferrer" className="text-congo-green hover:text-congo-green/80 transition-colors">Oredy TECHNOLOGIES</a>.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
