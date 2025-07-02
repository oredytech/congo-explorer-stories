
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ExternalLink } from 'lucide-react';

const VolunteerProtocolSection = () => {
  const handleProtocolClick = () => {
    // Scroll to top of the page to show the protocol section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="mb-16">
      <Card className="border-congo-brown/20 bg-white">
        <CardHeader>
          <CardTitle className="text-congo-brown text-2xl text-center">
            Protocole d'Accord – Explorateurs Bénévoles
          </CardTitle>
          <CardDescription className="text-congo-brown text-center">
            Veuillez lire attentivement les conditions ci-dessous avant de compléter votre candidature
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-congo-brown mb-2 flex items-center">
                  📍 1. Objet du protocole
                </h3>
                <p className="text-congo-brown text-sm">
                  Définit les engagements réciproques entre VisiteCongo et le bénévole souhaitant contribuer en tant qu'explorateur terrain, photographe ou reporter culturel à titre non rémunéré.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-congo-brown mb-2 flex items-center">
                  👤 2. Statut du bénévole
                </h3>
                <ul className="text-congo-brown text-sm space-y-1">
                  <li>• Agit à titre strictement bénévole</li>
                  <li>• N'est pas salarié, ni prestataire, ni mandataire</li>
                  <li>• Aucune obligation d'exclusivité</li>
                  <li>• Responsable de sa propre sécurité</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-congo-brown mb-2 flex items-center">
                  📸 3. Contributions attendues
                </h3>
                <ul className="text-congo-brown text-sm space-y-1">
                  <li>• Photographies, vidéos ou articles courts</li>
                  <li>• Informations utiles : nom, date, contexte, GPS</li>
                  <li>• Respect de la charte des explorateurs</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-congo-brown mb-2 flex items-center">
                  📤 4. Modalités de publication
                </h3>
                <ul className="text-congo-brown text-sm space-y-1">
                  <li>• Transmission via email ou formulaire</li>
                  <li>• Modération avant publication</li>
                  <li>• Respect de la ligne éditoriale</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-congo-brown mb-2 flex items-center">
                  ⚖️ 5. Droits sur les contenus
                </h3>
                <ul className="text-congo-brown text-sm space-y-1">
                  <li>• Images publiées deviennent propriété du site</li>
                  <li>• Mention possible des auteurs</li>
                  <li>• Utilisation conforme aux valeurs éthiques</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-congo-brown mb-2 flex items-center">
                  ⚠️ 6. Engagement de responsabilité
                </h3>
                <ul className="text-congo-brown text-sm space-y-1">
                  <li>• Respect des populations locales et de la nature</li>
                  <li>• Responsabilité des risques personnels</li>
                  <li>• VisiteCongo non responsable des incidents</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-congo-brown mb-2 flex items-center">
                  ✅ 7. Durée et résiliation
                </h3>
                <ul className="text-congo-brown text-sm space-y-1">
                  <li>• Durée indéterminée</li>
                  <li>• Résiliation libre à tout moment</li>
                  <li>• Contenus publiés restent propriété du site</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-congo-brown mb-2 flex items-center">
                  📝 8. Acceptation en ligne
                </h3>
                <p className="text-congo-brown text-sm">
                  En envoyant du contenu à VisiteCongo, le contributeur accepte automatiquement ce protocole.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-congo-green/10 p-4 rounded-lg border border-congo-green/20">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="h-5 w-5 text-congo-green" />
              <span className="font-semibold text-congo-brown">Acceptation requise</span>
            </div>
            <p className="text-congo-brown text-sm">
              En complétant le formulaire ci-dessous, vous acceptez automatiquement les termes du protocole d'accord pour explorateurs bénévoles de VisiteCongo.
            </p>
          </div>

          <div className="text-center">
            <Button 
              variant="outline" 
              className="border-congo-brown/30 text-congo-brown hover:bg-congo-brown/10"
              onClick={handleProtocolClick}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Relire le protocole
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VolunteerProtocolSection;
