
import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, FileText, AlertTriangle, Clock, Scale, CheckCircle } from 'lucide-react';

const Privacy = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 bg-congo-beige min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-congo-brown mb-4">
              Accord de Confidentialité – VisiteCongo
            </h1>
            <p className="text-xl text-congo-brown">
              Protection des informations sensibles et stratégiques
            </p>
          </div>

          <div className="space-y-6">
            {/* Article 1 */}
            <Card className="border-congo-brown/20 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-congo-brown">
                  <FileText className="h-5 w-5" />
                  <span>📍 1. Objet de l'accord</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-congo-brown leading-relaxed">
                  Le présent accord de confidentialité a pour objet de protéger toute information sensible, 
                  stratégique ou exclusive transmise ou recueillie dans le cadre des collaborations avec 
                  VisiteCongo, que ce soit par les bénévoles, contributeurs, prestataires ou partenaires.
                </p>
              </CardContent>
            </Card>

            {/* Article 2 */}
            <Card className="border-congo-brown/20 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-congo-brown">
                  <Lock className="h-5 w-5" />
                  <span>🔐 2. Définition des informations confidentielles</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-congo-brown">
                  <li>• Informations non publiques concernant la stratégie, les projets, les lieux en développement ou non encore publiés.</li>
                  <li>• Contenus visuels (photos, vidéos) ou textes non encore diffusés.</li>
                  <li>• Identité ou coordonnées de partenaires ou collaborateurs privés.</li>
                  <li>• Informations techniques, administratives ou liées à la plateforme digitale.</li>
                </ul>
              </CardContent>
            </Card>

            {/* Article 3 */}
            <Card className="border-congo-brown/20 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-congo-brown">
                  <Shield className="h-5 w-5" />
                  <span>🧾 3. Engagement du signataire</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-congo-brown">
                  <li>• Ne pas divulguer, reproduire, ni transférer à des tiers les informations confidentielles.</li>
                  <li>• Ne pas utiliser ces informations à des fins personnelles ou concurrentielles.</li>
                  <li>• Prévenir immédiatement VisiteCongo en cas de fuite ou d'utilisation non autorisée.</li>
                </ul>
              </CardContent>
            </Card>

            {/* Article 4 */}
            <Card className="border-congo-brown/20 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-congo-brown">
                  <AlertTriangle className="h-5 w-5" />
                  <span>⛔ 4. Exceptions à la confidentialité</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-congo-brown">
                  <li>• Les informations tombées dans le domaine public sans faute du signataire.</li>
                  <li>• Les données demandées par obligation légale ou judiciaire, avec notification préalable à VisiteCongo.</li>
                </ul>
              </CardContent>
            </Card>

            {/* Article 5 */}
            <Card className="border-congo-brown/20 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-congo-brown">
                  <Clock className="h-5 w-5" />
                  <span>🕒 5. Durée de l'obligation</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-congo-brown leading-relaxed">
                  L'engagement de confidentialité prend effet dès la première collaboration et demeure en vigueur 
                  pendant toute la durée de l'implication du signataire, et jusqu'à 3 ans après la fin de toute collaboration.
                </p>
              </CardContent>
            </Card>

            {/* Article 6 */}
            <Card className="border-congo-brown/20 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-congo-brown">
                  <Scale className="h-5 w-5" />
                  <span>⚖️ 6. Conséquences en cas de non-respect</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-congo-brown leading-relaxed">
                  Toute violation grave de cet accord peut entraîner la résiliation immédiate de la collaboration, 
                  des poursuites civiles et/ou pénales, ainsi que la demande de réparation du préjudice subi par VisiteCongo.
                </p>
              </CardContent>
            </Card>

            {/* Article 7 */}
            <Card className="border-congo-brown/20 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-congo-brown">
                  <CheckCircle className="h-5 w-5" />
                  <span>📝 7. Acceptation</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-congo-brown leading-relaxed mb-6">
                  Le signataire reconnaît avoir lu, compris et accepté les termes du présent accord de confidentialité, 
                  et s'engage à les respecter dans l'intérêt du projet VisiteCongo.
                </p>
                
                <div className="bg-congo-beige/50 p-6 rounded-lg space-y-4">
                  <div className="text-congo-brown font-medium">
                    Fait à ____________________ le ________________
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-congo-brown font-medium">Nom du signataire :</p>
                      <div className="border-b-2 border-congo-brown/30 mt-2 pb-1">___________________________</div>
                    </div>
                    <div>
                      <p className="text-congo-brown font-medium">Signature :</p>
                      <div className="border-b-2 border-congo-brown/30 mt-2 pb-1">_________________________________</div>
                    </div>
                  </div>
                  <div>
                    <p className="text-congo-brown font-medium">Signature VisiteCongo :</p>
                    <div className="border-b-2 border-congo-brown/30 mt-2 pb-1">_______________________</div>
                  </div>
                </div>
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
                      En poursuivant l'utilisation de la plateforme VisiteCongo ou en envoyant toute contribution 
                      (texte, image, vidéo, etc.), le collaborateur reconnaît avoir lu et accepté les termes du 
                      présent accord de confidentialité.
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

export default Privacy;
