
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Users, Heart, Lightbulb, Shield, Award, FileText, User, Camera, Upload, Scale, AlertTriangle, Clock } from 'lucide-react';

const VolunteerProtocolSection = () => {
  const { t } = useTranslation();

  const protocolSections = [
    {
      icon: FileText,
      title: "1. Objet du protocole",
      content: "Ce protocole définit les engagements réciproques entre VISITE CONGO et l'explorateur bénévole souhaitant contribuer au projet en tant qu'explorateur terrain, photographe ou reporter culturel."
    },
    {
      icon: User,
      title: "2. Statut du bénévole",
      points: [
        "L'explorateur agit à titre strictement bénévole",
        "Aucune obligation contractuelle d'exclusivité",
        "Responsable de sa propre sécurité et déplacements",
        "Pas de lien de subordination avec VISITE CONGO"
      ]
    },
    {
      icon: Camera,
      title: "3. Contributions attendues",
      points: [
        "Photographies et vidéos de lieux culturels, touristiques ou naturels",
        "Articles courts avec informations détaillées (lieu, date, contexte)",
        "Coordonnées GPS si possible",
        "Respect de la charte des explorateurs VISITE CONGO"
      ]
    },
    {
      icon: Upload,
      title: "4. Modalités de publication",
      points: [
        "Transmission via email ou formulaire dédié",
        "Modération avant publication",
        "Respect de la ligne éditoriale",
        "Droit de refus de publication"
      ]
    },
    {
      icon: Scale,
      title: "5. Droits sur les contenus",
      points: [
        "Images publiées deviennent propriété de VISITE CONGO",
        "Mention possible de l'auteur (nom ou pseudonyme)",
        "Utilisation conforme aux valeurs éthiques",
        "Pas d'usage commercial sans accord"
      ]
    },
    {
      icon: AlertTriangle,
      title: "6. Responsabilités",
      points: [
        "Respect des populations locales et de la nature",
        "Conformité avec la loi et les valeurs du site",
        "Prise en charge des risques personnels",
        "VISITE CONGO non responsable des incidents"
      ]
    }
  ];

  const values = [
    { icon: Heart, title: "Respect", description: "Des communautés locales et traditions" },
    { icon: Users, title: "Collaboration", description: "Esprit d'équipe et partage" },
    { icon: Lightbulb, title: "Innovation", description: "Créativité dans la documentation" },
    { icon: Shield, title: "Intégrité", description: "Honnêteté et transparence" }
  ];

  return (
    <section className="space-y-12 bg-congo-beige min-h-screen py-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-congo-brown mb-4">
          Protocole d'Accord Explorateurs
        </h2>
        <p className="text-lg text-congo-brown/80 max-w-3xl mx-auto">
          Engagements réciproques pour une collaboration réussie
        </p>
      </div>

      {/* Values Section */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-congo-brown mb-8 text-center">
          Nos Valeurs Fondamentales
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <Card key={index} className="text-center border-congo-brown/20 hover:shadow-lg transition-shadow bg-white">
                <CardContent className="pt-6">
                  <IconComponent className="h-12 w-12 text-congo-green mx-auto mb-4" />
                  <h4 className="font-semibold text-congo-brown mb-2">{value.title}</h4>
                  <p className="text-congo-brown/70 text-sm">{value.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Protocol Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {protocolSections.map((section, index) => {
          const IconComponent = section.icon;
          return (
            <Card key={index} className="border-congo-brown/20 bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-congo-brown text-lg">
                  <IconComponent className="h-6 w-6 mr-3 text-congo-green" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {section.content ? (
                  <p className="text-congo-brown/80 leading-relaxed">{section.content}</p>
                ) : (
                  <ul className="space-y-3">
                    {section.points?.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-congo-green mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-congo-brown/80 text-sm leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Duration and Termination */}
      <Card className="border-congo-brown/20 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center text-congo-brown">
            <Clock className="h-6 w-6 mr-3 text-congo-green" />
            7. Durée et résiliation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <Badge variant="outline" className="mb-3 bg-congo-green/10 text-congo-green border-congo-green/20">
                Durée indéterminée
              </Badge>
              <p className="text-sm text-congo-brown/70">
                Protocole valable sans limite de temps
              </p>
            </div>
            <div className="text-center">
              <Badge variant="outline" className="mb-3 bg-congo-green/10 text-congo-green border-congo-green/20">
                Résiliation libre
              </Badge>
              <p className="text-sm text-congo-brown/70">
                Arrêt possible à tout moment par les deux parties
              </p>
            </div>
            <div className="text-center">
              <Badge variant="outline" className="mb-3 bg-congo-green/10 text-congo-green border-congo-green/20">
                Contenus conservés
              </Badge>
              <p className="text-sm text-congo-brown/70">
                Les publications restent propriété du site
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Acceptance Notice */}
      <Card className="border-congo-green/30 bg-congo-green/5">
        <CardContent className="p-8">
          <div className="flex items-start space-x-4">
            <CheckCircle className="h-8 w-8 text-congo-green mt-1 flex-shrink-0" />
            <div>
              <h4 className="text-lg font-semibold text-congo-brown mb-3">
                Acceptation automatique
              </h4>
              <p className="text-congo-brown/80 leading-relaxed">
                En contribuant activement à la plateforme VISITE CONGO, vous acceptez automatiquement 
                les termes de ce protocole d'accord pour explorateurs bénévoles.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default VolunteerProtocolSection;
