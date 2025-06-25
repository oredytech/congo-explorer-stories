
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Handshake, Globe } from 'lucide-react';

const Partners = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-congo-beige">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-congo-brown to-congo-green text-congo-beige">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">Nos Partenaires</h1>
              <p className="text-xl text-congo-beige/90 mb-8">
                Ensemble, nous révélons la beauté de la République Démocratique du Congo
              </p>
            </div>
          </div>
        </section>

        {/* Become Partner Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-congo-brown mb-8 text-center">Devenir Partenaire</h2>
              
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <Card className="border-congo-brown/20">
                  <CardContent className="p-6 text-center">
                    <Users className="h-12 w-12 text-congo-green mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-congo-brown mb-3">Organisations</h3>
                    <p className="text-congo-brown/70">Collaborez avec nous pour promouvoir le tourisme congolais</p>
                  </CardContent>
                </Card>
                
                <Card className="border-congo-brown/20">
                  <CardContent className="p-6 text-center">
                    <Handshake className="h-12 w-12 text-congo-green mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-congo-brown mb-3">Entreprises</h3>
                    <p className="text-congo-brown/70">Soutenez notre mission de valorisation du patrimoine</p>
                  </CardContent>
                </Card>
                
                <Card className="border-congo-brown/20">
                  <CardContent className="p-6 text-center">
                    <Globe className="h-12 w-12 text-congo-green mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-congo-brown mb-3">Institutions</h3>
                    <p className="text-congo-brown/70">Participez à la promotion culturelle du Congo</p>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center">
                <Button size="lg" className="bg-congo-green hover:bg-congo-green/80">
                  Nous Contacter
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Partners;
