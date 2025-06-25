
import Layout from '@/components/Layout';

const Privacy = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-congo-beige py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-congo-brown mb-8">Politique de Confidentialité</h1>
            
            <div className="space-y-8 text-congo-brown/80">
              <section>
                <h2 className="text-2xl font-semibold text-congo-brown mb-4">Collecte des données</h2>
                <p>Nous collectons uniquement les données nécessaires au fonctionnement de notre service, notamment lors de l'utilisation de nos formulaires de contact et d'assistance.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-congo-brown mb-4">Utilisation des données</h2>
                <p>Les données collectées sont utilisées pour :</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Répondre à vos demandes</li>
                  <li>Améliorer nos services</li>
                  <li>Vous tenir informé de nos actualités (avec votre consentement)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-congo-brown mb-4">Protection des données</h2>
                <p>Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données personnelles contre tout accès non autorisé, modification, divulgation ou destruction.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-congo-brown mb-4">Vos droits</h2>
                <p>Vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données. Pour exercer ces droits, contactez-nous à contact@visitecongo.com</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
