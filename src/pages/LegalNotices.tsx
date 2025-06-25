
import Layout from '@/components/Layout';

const LegalNotices = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-congo-beige py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-congo-brown mb-8">Mentions Légales</h1>
            
            <div className="space-y-8 text-congo-brown/80">
              <section>
                <h2 className="text-2xl font-semibold text-congo-brown mb-4">Éditeur du site</h2>
                <p className="mb-2"><strong>VISITE CONGO</strong></p>
                <p>Adresse : Goma, Nord-Kivu, République Démocratique du Congo</p>
                <p>Téléphone : +243 991 478 206</p>
                <p>Email : contact@visitecongo.com</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-congo-brown mb-4">Hébergement</h2>
                <p>Ce site est hébergé par Lovable</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-congo-brown mb-4">Propriété intellectuelle</h2>
                <p>L'ensemble du contenu de ce site (textes, images, vidéos, logos) est protégé par le droit d'auteur. Toute reproduction ou utilisation sans autorisation est interdite.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-congo-brown mb-4">Responsabilité</h2>
                <p>VISITE CONGO s'efforce de fournir des informations exactes et à jour, mais ne peut garantir l'exactitude, la complétude ou l'actualité des informations diffusées sur ce site.</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LegalNotices;
