
import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, User, Camera, Upload, Scale, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const VolunteerProtocol = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 bg-congo-beige min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-congo-brown mb-4">
              Protocole d'Accord – Explorateurs Bénévoles de VisiteCongo
            </h1>
            <p className="text-xl text-congo-brown">
              Engagements réciproques pour les contributeurs bénévoles
            </p>
          </div>

          <div className="space-y-6">
            {/* Article 1 */}
            <Card className="border-congo-brown/20 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-congo-brown">
                  <FileText className="h-5 w-5" />
                  <span>📍 1. Objet du protocole</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-congo-brown leading-relaxed">
                  Le présent protocole définit les engagements réciproques entre VisiteCongo et le bénévole 
                  souhaitant contribuer au projet en tant qu'explorateur terrain, photographe ou reporter 
                  culturel à titre non rémunéré.
                </p>
              </CardContent>
            </Card>

            {/* Article 2 */}
            <Card className="border-congo-brown/20 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-congo-brown">
                  <User className="h-5 w-5" />
                  <span>👤 2. Statut du bénévole</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-congo-brown">
                  <li>• L'explorateur agit à titre strictement bénévole.</li>
                  <li>• Il n'est pas salarié, ni prestataire, ni mandataire de VisiteCongo.</li>
                  <li>• Aucune obligation contractuelle d'exclusivité n'est imposée.</li>
                  <li>• Il est responsable de sa propre sécurité et de ses déplacements.</li>
                </ul>
              </CardContent>
            </Card>

            {/* Article 3 */}
            <Card className="border-congo-brown/20 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-congo-brown">
                  <Camera className="h-5 w-5" />
                  <span>📸 3. Contributions attendues</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-congo-brown">
                  <li>• Photographies, vidéos ou articles courts présentant des lieux culturels, touristiques ou naturels.</li>
                  <li>• Informations utiles : nom du lieu, date, contexte, description, coordonnées GPS si possible.</li>
                  <li>• Respect de la charte des explorateurs VisiteCongo.</li>
                </ul>
              </CardContent>
            </Card>

            {/* Article 4 */}
            <Card className="border-congo-brown/20 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-congo-brown">
                  <Upload className="h-5 w-5" />
                  <span>📤 4. Modalités de publication</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-congo-brown">
                  <li>• Les contenus sont transmis à VisiteCongo via email ou formulaire dédié.</li>
                  <li>• Une modération est exercée avant publication.</li>
                  <li>• VisiteCongo se réserve le droit de ne pas publier les contenus ne respectant pas sa ligne éditoriale.</li>
                </ul>
              </CardContent>
            </Card>

            {/* Article 5 */}
            <Card className="border-congo-brown/20 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-congo-brown">
                  <Scale className="h-5 w-5" />
                  <span>⚖️ 5. Droits sur les contenus</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-congo-brown">
                  <li>• Toutes les images publiées deviennent la propriété du site VisiteCongo.</li>
                  <li>• Les auteurs peuvent être mentionnés (nom ou pseudonyme), sauf demande d'anonymat.</li>
                  <li>• Aucune utilisation ne sera faite à des fins contraires aux valeurs éthiques de la plateforme.</li>
                </ul>
              </CardContent>
            </Card>

            {/* Article 6 */}
            <Card className="border-congo-brown/20 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-congo-brown">
                  <AlertTriangle className="h-5 w-5" />
                  <span>⚠️ 6. Engagement de responsabilité</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-congo-brown">
                  <li>• Le bénévole s'engage à respecter les populations locales, la nature, la loi et les valeurs du site.</li>
                  <li>• Il assume entièrement les risques liés à ses déplacements, prises de vues ou enquêtes sur le terrain.</li>
                  <li>• VisiteCongo ne pourra être tenu responsable des dommages ou incidents survenus lors des activités bénévoles.</li>
                </ul>
              </CardContent>
            </Card>

            {/* Article 7 */}
            <Card className="border-congo-brown/20 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-congo-brown">
                  <Clock className="h-5 w-5" />
                  <span>✅ 7. Durée et résiliation</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-congo-brown">
                  <li>• Ce protocole est conclu pour une durée indéterminée.</li>
                  <li>• Il peut être résilié à tout moment par l'une ou l'autre des parties, sans justification.</li>
                  <li>• Les contenus déjà publiés resteront la propriété du site.</li>
                </ul>
              </CardContent>
            </Card>

            {/* Article 8 */}
            <Card className="border-congo-brown/20 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-congo-brown">
                  <CheckCircle className="h-5 w-5" />
                  <span>📝 8. Acceptation en ligne</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-congo-brown leading-relaxed">
                  En envoyant volontairement du contenu à VisiteCongo (texte, photo, vidéo, témoignage, etc.), 
                  le contributeur reconnaît avoir lu et accepté les termes du présent protocole d'accord pour bénévoles.
                </p>
              </CardContent>
            </Card>

            {/* Acceptance Notice */}
            <Card className="border-congo-green/30 bg-congo-green/5">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-congo-green mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-congo-brown font-medium mb-2">✅ Acceptation automatique</p>
                    <p className="text-congo-brown leading-relaxed">
                      En contribuant activement à la plateforme VisiteCongo, vous acceptez automatiquement 
                      les termes de ce protocole d'accord pour explorateurs bénévoles.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VolunteerProtocol;
