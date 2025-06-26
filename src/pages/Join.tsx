
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import { Users, MapPin, Camera, FileText, Download, CheckCircle, Mail, Phone, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const Join = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    province: '',
    motivation: '',
    skills: '',
    availability: ''
  });

  const provinces = [
    'Kinshasa', 'Kongo Central', 'Kwango', 'Kwilu', 'Mai-Ndombe', 'Équateur',
    'Mongala', 'Nord-Ubangi', 'Sud-Ubangi', 'Tshuapa', 'Haut-Lomami',
    'Haut-Katanga', 'Lualaba', 'Kasaï', 'Kasaï-Central', 'Kasaï-Oriental',
    'Lomami', 'Sankuru', 'Bas-Uele', 'Haut-Uele', 'Ituri', 'Tshopo',
    'Nord-Kivu', 'Sud-Kivu', 'Maniema', 'Tanganyika'
  ];

  const benefits = [
    {
      icon: <Camera className="h-8 w-8 text-congo-green" />,
      title: "Formation en photographie",
      description: "Techniques de photographie de paysage et documentaire"
    },
    {
      icon: <FileText className="h-8 w-8 text-congo-green" />,
      title: "Rédaction d'articles",
      description: "Apprenez à raconter les histoires de nos découvertes"
    },
    {
      icon: <MapPin className="h-8 w-8 text-congo-green" />,
      title: "Exploration guidée",
      description: "Participez à nos expéditions dans toute la RDC"
    },
    {
      icon: <Users className="h-8 w-8 text-congo-green" />,
      title: "Réseau communautaire",
      description: "Rejoignez une communauté passionnée d'explorateurs"
    }
  ];

  const responsibilities = [
    "Documenter les lieux visités avec photos et récits",
    "Respecter les communautés locales et leurs traditions",
    "Partager vos découvertes avec l'équipe VISITE CONGO",
    "Participer aux réunions mensuelles (virtuelles ou physiques)",
    "Contribuer à la promotion du patrimoine congolais",
    "Respecter notre charte éthique et environnementale"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation simple
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.motivation) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    // Simulation d'envoi
    toast({
      title: "Candidature envoyée !",
      description: "Nous avons bien reçu votre candidature. Notre équipe vous contactera sous 48h.",
    });

    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      city: '',
      province: '',
      motivation: '',
      skills: '',
      availability: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Layout>
      <div className="py-16 bg-congo-beige">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-congo-brown mb-4">
              Rejoindre les Explorateurs
            </h1>
            <p className="text-lg text-congo-brown max-w-3xl mx-auto">
              Devenez ambassadeur de la beauté congolaise. Rejoignez notre équipe d'explorateurs 
              passionnés et contribuez à révéler les trésors cachés de la RDC.
            </p>
          </div>

          {/* Protocole d'Accord Section */}
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
                    onClick={() => window.open('/protocole-benevoles', '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Lire le protocole complet
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Information */}
            <div className="space-y-8">
              {/* Mission */}
              <Card className="border-congo-brown/20 bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center text-congo-brown">
                    <Users className="h-6 w-6 mr-2 text-congo-green" />
                    Notre Mission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-congo-brown">
                    Nous sommes un collectif de jeunes Congolais déterminés à changer la perception 
                    du monde sur notre pays. À travers nos explorations, nous documentons et partageons 
                    les merveilles naturelles, culturelles et humaines de la RDC.
                  </p>
                </CardContent>
              </Card>

              {/* Benefits */}
              <Card className="border-congo-brown/20 bg-white">
                <CardHeader>
                  <CardTitle className="text-congo-brown">Ce que nous vous offrons</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        {benefit.icon}
                        <div>
                          <h4 className="font-semibold text-congo-brown mb-1">
                            {benefit.title}
                          </h4>
                          <p className="text-sm text-congo-brown">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Responsibilities */}
              <Card className="border-congo-brown/20 bg-white">
                <CardHeader>
                  <CardTitle className="text-congo-brown">Vos responsabilités</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {responsibilities.map((responsibility, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-congo-green mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-congo-brown">{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Form */}
            <div>
              <Card className="border-congo-brown/20 bg-white">
                <CardHeader>
                  <CardTitle className="text-congo-brown">Candidature d'explorateur</CardTitle>
                  <CardDescription className="text-congo-brown">
                    Remplissez ce formulaire pour rejoindre notre équipe. 
                    Tous les champs marqués d'un * sont obligatoires.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-congo-brown mb-2">
                          Prénom *
                        </label>
                        <Input
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="border-congo-brown/30 focus:border-congo-green"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-congo-brown mb-2">
                          Nom *
                        </label>
                        <Input
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className="border-congo-brown/30 focus:border-congo-green"
                        />
                      </div>
                    </div>

                    {/* Contact */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-congo-brown mb-2">
                          Email *
                        </label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="border-congo-brown/30 focus:border-congo-green"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-congo-brown mb-2">
                          Téléphone
                        </label>
                        <Input
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+243..."
                          className="border-congo-brown/30 focus:border-congo-green"
                        />
                      </div>
                    </div>

                    {/* Location */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-congo-brown mb-2">
                          Ville
                        </label>
                        <Input
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="border-congo-brown/30 focus:border-congo-green"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-congo-brown mb-2">
                          Province
                        </label>
                        <select
                          name="province"
                          value={formData.province}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-congo-brown/30 rounded-md focus:outline-none focus:ring-2 focus:ring-congo-green focus:border-transparent text-congo-brown bg-white"
                        >
                          <option value="">Sélectionnez une province</option>
                          {provinces.map((province) => (
                            <option key={province} value={province}>
                              {province}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Motivation */}
                    <div>
                      <label className="block text-sm font-medium text-congo-brown mb-2">
                        Pourquoi voulez-vous rejoindre VISITE CONGO ? *
                      </label>
                      <Textarea
                        name="motivation"
                        value={formData.motivation}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder="Partagez votre motivation et votre vision..."
                        required
                        className="border-congo-brown/30 focus:border-congo-green resize-none text-congo-brown"
                      />
                    </div>

                    {/* Skills */}
                    <div>
                      <label className="block text-sm font-medium text-congo-brown mb-2">
                        Compétences particulières
                      </label>
                      <Textarea
                        name="skills"
                        value={formData.skills}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="Photographie, vidéo, rédaction, connaissances locales..."
                        className="border-congo-brown/30 focus:border-congo-green resize-none text-congo-brown"
                      />
                    </div>

                    {/* Availability */}
                    <div>
                      <label className="block text-sm font-medium text-congo-brown mb-2">
                        Disponibilité
                      </label>
                      <Textarea
                        name="availability"
                        value={formData.availability}
                        onChange={handleInputChange}
                        rows={2}
                        placeholder="Weekends, vacances, temps libre..."
                        className="border-congo-brown/30 focus:border-congo-green resize-none text-congo-brown"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-congo-green hover:bg-congo-green/80 text-congo-beige"
                      size="lg"
                    >
                      Envoyer ma candidature
                    </Button>

                    <p className="text-xs text-congo-brown text-center">
                      En soumettant ce formulaire, vous acceptez notre protocole d'accord pour explorateurs bénévoles 
                      et nos conditions d'utilisation.
                    </p>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <div className="mt-8 p-6 bg-congo-brown/10 rounded-lg">
                <h3 className="font-semibold text-congo-brown mb-4">
                  Questions ? Contactez-nous
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center text-congo-brown">
                    <Mail className="h-4 w-4 mr-2" />
                    explorateurs@visitecongo.com
                  </div>
                  <div className="flex items-center text-congo-brown">
                    <Phone className="h-4 w-4 mr-2" />
                    +243 991 478 206
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Success Stories */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-congo-brown text-center mb-8">
              Témoignages d'explorateurs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Sarah Mukala",
                  location: "Lubumbashi",
                  quote: "Rejoindre VISITE CONGO m'a permis de redécouvrir mon propre pays et de partager sa beauté avec le monde.",
                  image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
                },
                {
                  name: "David Kabongo",
                  location: "Goma",
                  quote: "Grâce à cette équipe, j'ai appris la photographie et je peux maintenant documenter les merveilles du Kivu.",
                  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                },
                {
                  name: "Grace Mwamba",
                  location: "Kisangani",
                  quote: "Être exploratrice, c'est être ambassadrice de la beauté congolaise. Chaque découverte est une fierté partagée.",
                  image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
                }
              ].map((testimonial, index) => (
                <Card key={index} className="border-congo-brown/20 bg-white">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full mx-auto mb-4"
                      />
                      <p className="text-congo-brown italic mb-4">
                        "{testimonial.quote}"
                      </p>
                      <div>
                        <p className="font-semibold text-congo-brown">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-congo-brown">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Join;
