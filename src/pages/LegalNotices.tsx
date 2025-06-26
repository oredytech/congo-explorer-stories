
import Layout from '@/components/Layout';

const LegalNotices = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-congo-beige py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-congo-brown mb-8">Mentions Légales – VisiteCongo</h1>
            
            <div className="space-y-8 text-congo-brown">
              <section>
                <h2 className="text-2xl font-semibold text-congo-brown mb-4 flex items-center">
                  📌 1. Éditeur du site
                </h2>
                <div className="space-y-2 text-congo-brown">
                  <p>Le site <strong>www.visitecongo.com</strong> est un produit de <strong>L'ets POA JARDIN Group</strong> œuvrant en RDC sous numéro d'identité nationale <strong>19-S9502-N67849H</strong>, une entreprise de droit congolais.</p>
                  <p><strong>Statut :</strong> Projet de valorisation touristique et culturelle</p>
                  <p><strong>Responsable de la publication :</strong> KASEREKA KALAMBO RICHARD</p>
                  <p><strong>Entreprise parent :</strong> Ets POA JARDIN Group, Entreprise de droit congolais</p>
                  <p><strong>Email :</strong> contact@visitecongo.com ou kaserekakalambu2014@gmail.com</p>
                  <p><strong>Hébergement :</strong> Lovable</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-congo-brown mb-4 flex items-center">
                  🌐 2. Propriété intellectuelle
                </h2>
                <p className="text-congo-brown">Tous les contenus présents sur ce site (textes, images, vidéos, sons, logos, documents à télécharger, etc.) sont, sauf mention contraire, la propriété exclusive de VisiteCongo. Toute reproduction ou utilisation sans autorisation écrite est interdite.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-congo-brown mb-4 flex items-center">
                  👤 3. Données personnelles
                </h2>
                <div className="space-y-2 text-congo-brown">
                  <p>VisiteCongo collecte des données personnelles via ses formulaires de contact ou d'inscription à la newsletter. Ces données sont utilisées uniquement pour améliorer l'expérience utilisateur, répondre aux messages ou envoyer des informations utiles.</p>
                  <p>Aucune donnée n'est vendue ou partagée à des tiers sans consentement explicite.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-congo-brown mb-4 flex items-center">
                  🔐 4. Cookies
                </h2>
                <p className="text-congo-brown">Le site peut utiliser des cookies pour améliorer la navigation et analyser l'audience. L'utilisateur peut refuser l'utilisation des cookies en configurant son navigateur.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-congo-brown mb-4 flex items-center">
                  ⚖️ 5. Limitation de responsabilité
                </h2>
                <p className="text-congo-brown">VisiteCongo ne peut être tenu responsable des erreurs, interruptions ou bugs du site, ni de l'usage qui pourrait en être fait par des tiers. Les liens externes sont proposés à titre informatif, sans engagement sur leur contenu.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-congo-brown mb-4 flex items-center">
                  📝 6. Contact
                </h2>
                <div className="space-y-2 text-congo-brown">
                  <p>Pour toute question relative aux mentions légales, vous pouvez écrire à :</p>
                  <p><strong>Email :</strong> contact@visitecongo.com</p>
                  <p><strong>Objet :</strong> Mentions légales / Données personnelles / Signalement de contenu</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LegalNotices;
