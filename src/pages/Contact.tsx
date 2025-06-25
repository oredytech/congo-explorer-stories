
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-congo-beige py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-congo-brown mb-4">Contactez-nous</h1>
              <p className="text-lg text-congo-brown/70">
                Nous sommes à votre disposition pour toute question ou information
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold text-congo-brown mb-6">Nos Coordonnées</h2>
                
                <div className="space-y-6">
                  <Card className="border-congo-brown/20 bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <MapPin className="h-6 w-6 text-congo-green mt-1" />
                        <div>
                          <h3 className="font-semibold text-congo-brown mb-1">Adresse</h3>
                          <p className="text-congo-brown/70">Goma, Nord-Kivu<br />République Démocratique du Congo</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-congo-brown/20 bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Phone className="h-6 w-6 text-congo-green mt-1" />
                        <div>
                          <h3 className="font-semibold text-congo-brown mb-1">Téléphone</h3>
                          <p className="text-congo-brown/70">+243 991 478 206</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-congo-brown/20 bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Mail className="h-6 w-6 text-congo-green mt-1" />
                        <div>
                          <h3 className="font-semibold text-congo-brown mb-1">Email</h3>
                          <p className="text-congo-brown/70">contact@visitecongo.com</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-congo-brown/20 bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Clock className="h-6 w-6 text-congo-green mt-1" />
                        <div>
                          <h3 className="font-semibold text-congo-brown mb-1">Heures d'ouverture</h3>
                          <p className="text-congo-brown/70">
                            Lundi - Vendredi: 8h00 - 17h00<br />
                            Samedi: 9h00 - 13h00
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-congo-brown mb-6">À propos de VISITE CONGO</h2>
                <Card className="border-congo-brown/20 bg-white">
                  <CardContent className="p-6">
                    <p className="text-congo-brown/70 leading-relaxed mb-4">
                      VISITE CONGO est une plateforme dédiée à la promotion et à la valorisation du patrimoine touristique de la République Démocratique du Congo.
                    </p>
                    <p className="text-congo-brown/70 leading-relaxed mb-4">
                      Notre mission est de révéler au monde la beauté extraordinaire de notre pays à travers des documentaires, des articles, une galerie photo et des guides d'exploration.
                    </p>
                    <p className="text-congo-brown/70 leading-relaxed">
                      Basée à Goma, au cœur du Nord-Kivu, notre équipe travaille passionnément pour partager les trésors cachés de la RDC avec les voyageurs du monde entier.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
