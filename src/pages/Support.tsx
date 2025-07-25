import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import { Heart, Users, Camera, Laptop, Car, Plane, DollarSign, CreditCard, Phone, Copy, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

const Support = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [donationAmount, setDonationAmount] = useState('');
  const [selectedProject, setSelectedProject] = useState('general');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Mobile Money Information
  const mobileMoneyInfo = {
    mpesa: {
      name: "M-Pesa",
      number: "+243 849 538 279",
      nom: "VISITE CONGO"
    },
    airtelMoney: {
      name: "Airtel Money", 
      number: "+243 991 478 206",
      nom: "VISITE CONGO"
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast({
      title: "Copié !",
      description: "L'information a été copiée dans le presse-papiers.",
    });
    setTimeout(() => setCopiedField(null), 2000);
  };

  const projects = [
    {
      id: 'general',
      title: 'Soutien général',
      description: 'Contribuez au fonctionnement global de VISITE CONGO',
      target: 50000,
      raised: 23450,
      supporters: 187,
      image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=250&fit=crop'
    },
    {
      id: 'equipment',
      title: 'Équipement de documentation',
      description: 'Caméras, drones et matériel pour nos explorateurs',
      target: 30000,
      raised: 18200,
      supporters: 94,
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=250&fit=crop',
      needs: [
        { item: 'Caméra professionnelle 4K', price: 1500 },
        { item: 'Drone pour prises aériennes', price: 800 },
        { item: 'Microphones de qualité', price: 300 },
        { item: 'Équipement d\'éclairage', price: 400 }
      ]
    },
    {
      id: 'expeditions',
      title: 'Expéditions dans les provinces',
      description: 'Financement des voyages d\'exploration et documentation',
      target: 75000,
      raised: 41300,
      supporters: 203,
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=250&fit=crop',
      needs: [
        { item: 'Frais de transport inter-provinces', price: 2000 },
        { item: 'Hébergement équipes', price: 800 },
        { item: 'Guides locaux', price: 500 },
        { item: 'Carburant véhicules', price: 600 }
      ]
    },
    {
      id: 'platform',
      title: 'Développement de la plateforme',
      description: 'Amélioration du site web et des outils numériques',
      target: 25000,
      raised: 12800,
      supporters: 67,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
      needs: [
        { item: 'Serveurs et hébergement', price: 200 },
        { item: 'Outils de développement', price: 150 },
        { item: 'Formation technique équipe', price: 500 }
      ]
    }
  ];

  const donationOptions = [5, 10, 25, 50, 100, 250];

  const impacts = [
    {
      icon: <Camera className="h-12 w-12 text-congo-green" />,
      title: 'Documentation visuelle',
      description: '500+ photos et 50+ vidéos documentaires produites',
      stat: '550+'
    },
    {
      icon: <Users className="h-12 w-12 text-congo-green" />,
      title: 'Communautés touchées',
      description: 'Plus de 100 communautés visitées et documentées',
      stat: '100+'
    },
    {
      icon: <Plane className="h-12 w-12 text-congo-green" />,
      title: 'Provinces explorées',
      description: '22 des 26 provinces déjà visitées',
      stat: '22/26'
    },
    {
      icon: <Heart className="h-12 w-12 text-congo-green" />,
      title: 'Explorateurs actifs',
      description: 'Réseau de 45 explorateurs bénévoles',
      stat: '45'
    }
  ];

  const expenses = [
    { category: 'Transport et logistique', percentage: 35, amount: 15750 },
    { category: 'Équipement technique', percentage: 25, amount: 11250 },
    { category: 'Développement web', percentage: 20, amount: 9000 },
    { category: 'Formation des explorateurs', percentage: 15, amount: 6750 },
    { category: 'Administration', percentage: 5, amount: 2250 }
  ];

  const handleDonation = () => {
    if (!donationAmount || parseFloat(donationAmount) <= 0) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer un montant valide.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Merci pour votre soutien !",
      description: `Redirection vers le paiement de ${donationAmount}$ en cours...`,
    });

    console.log(`Donation de ${donationAmount}$ pour le projet ${selectedProject}`);
  };

  return (
    <Layout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-congo-brown mb-4">
              Soutenez Notre Mission
            </h1>
            <p className="text-xl text-congo-green font-medium mb-4">
              Soutenez notre mission de faire briller la RDC aux yeux du monde
            </p>
            <p className="text-lg text-congo-brown/80 max-w-3xl mx-auto">
              Votre soutien nous permet de continuer à révéler les trésors cachés de la RDC 
              et de partager sa beauté avec le monde entier.
            </p>
          </div>

          {/* Impact Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-congo-brown text-center mb-8">
              Notre Impact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {impacts.map((impact, index) => (
                <Card key={index} className="text-center bg-congo-beige border-congo-brown/20">
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      {impact.icon}
                    </div>
                    <div className="text-3xl font-bold text-congo-brown mb-2">
                      {impact.stat}
                    </div>
                    <h3 className="font-semibold text-congo-brown mb-2">
                      {impact.title}
                    </h3>
                    <p className="text-sm text-congo-brown/70">
                      {impact.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Projects and Needs */}
            <div className="lg:col-span-2 space-y-8">
              <h2 className="text-2xl font-bold text-congo-brown">
                Nos besoins réels et actuels
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <Card 
                    key={project.id}
                    className={`cursor-pointer transition-all hover:shadow-lg bg-congo-beige border-congo-brown/20 ${
                      selectedProject === project.id ? 'ring-2 ring-congo-green' : ''
                    }`}
                    onClick={() => setSelectedProject(project.id)}
                  >
                    <div className="relative">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-40 object-cover rounded-t-lg"
                      />
                      {selectedProject === project.id && (
                        <Badge className="absolute top-2 right-2 bg-congo-green text-congo-beige">
                          Sélectionné
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-congo-brown mb-2">
                        {project.title}
                      </h3>
                      <p className="text-sm text-congo-brown/70 mb-4">
                        {project.description}
                      </p>
                      
                      {/* Specific Needs */}
                      {project.needs && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-congo-brown mb-2">Besoins spécifiques :</h4>
                          <ul className="text-xs text-congo-brown/60 space-y-1">
                            {project.needs.map((need, index) => (
                              <li key={index} className="flex justify-between">
                                <span>• {need.item}</span>
                                <span className="font-medium">${need.price}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {/* Progress */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-congo-brown/80">
                            {project.raised.toLocaleString()}$ collectés
                          </span>
                          <span className="text-congo-brown/80">
                            {Math.round((project.raised / project.target) * 100)}%
                          </span>
                        </div>
                        <Progress 
                          value={(project.raised / project.target) * 100}
                          className="h-2"
                        />
                        <div className="flex justify-between text-xs text-congo-brown/60">
                          <span>Objectif: {project.target.toLocaleString()}$</span>
                          <span>{project.supporters} contributeurs</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Budget Transparency */}
              <Card className="bg-congo-beige border-congo-brown/20">
                <CardHeader>
                  <CardTitle className="text-congo-brown">Transparence budgétaire</CardTitle>
                  <CardDescription className="text-congo-brown/70">
                    Découvrez comment vos dons sont utilisés
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {expenses.map((expense, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium text-congo-brown">{expense.category}</span>
                          <span className="text-congo-brown/80">{expense.percentage}% - {expense.amount.toLocaleString()}$</span>
                        </div>
                        <Progress value={expense.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Donation Methods */}
            <div className="space-y-6">
              {/* Mobile Money Section */}
              <Card className="bg-congo-beige border-congo-brown/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-congo-brown">
                    <Phone className="h-6 w-6 mr-2 text-congo-green" />
                    Mobile Money
                  </CardTitle>
                  <CardDescription className="text-congo-brown/70">
                    Soutenez-nous via Mobile Money
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(mobileMoneyInfo).map(([key, info]) => (
                    <div key={key} className="p-3 bg-white rounded-lg border border-congo-brown/20">
                      <h4 className="font-semibold text-congo-brown mb-2">{info.name}</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-congo-brown/70">Numéro:</span>
                          <div className="flex items-center space-x-2">
                            <span className="font-mono text-congo-brown">{info.number}</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(info.number, `${key}-number`)}
                              className="h-6 w-6 p-0"
                            >
                              {copiedField === `${key}-number` ? (
                                <CheckCircle className="h-3 w-3 text-green-600" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-congo-brown/70">Nom:</span>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-congo-brown">{info.nom}</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(info.nom, `${key}-nom`)}
                              className="h-6 w-6 p-0"
                            >
                              {copiedField === `${key}-nom` ? (
                                <CheckCircle className="h-3 w-3 text-green-600" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="p-3 bg-gray-100 rounded-lg border border-congo-brown/20 opacity-60">
                    <h4 className="font-semibold text-congo-brown mb-2">Orange Money</h4>
                    <p className="text-sm text-congo-brown/60">Bientôt disponible</p>
                  </div>
                </CardContent>
              </Card>

              {/* Card Payment Section */}
              <Card className="bg-congo-beige border-congo-brown/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-congo-brown">
                    <CreditCard className="h-6 w-6 mr-2 text-congo-green" />
                    Paiement par carte
                  </CardTitle>
                  <CardDescription className="text-congo-brown/70">
                    Paiement sécurisé Visa/MasterCard
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Donation Amount */}
                  <div>
                    <label className="block text-sm font-medium text-congo-brown mb-3">
                      Montant du don (USD)
                    </label>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {donationOptions.map((amount) => (
                        <Button
                          key={amount}
                          variant={donationAmount === amount.toString() ? "default" : "outline"}
                          size="sm"
                          onClick={() => setDonationAmount(amount.toString())}
                          className={donationAmount === amount.toString() ? "bg-congo-green hover:bg-congo-green/80 text-congo-beige" : "border-congo-brown/30 text-congo-brown hover:bg-congo-brown/10"}
                        >
                          ${amount}
                        </Button>
                      ))}
                    </div>
                    <Input
                      type="number"
                      placeholder="Autre montant"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value)}
                      min="1"
                      className="bg-congo-beige border-congo-brown/30 text-congo-brown placeholder:text-congo-brown/50"
                    />
                  </div>

                  <Button 
                    onClick={handleDonation}
                    className="w-full bg-congo-green hover:bg-congo-green/80 text-congo-beige"
                    size="lg"
                  >
                    Payer ${donationAmount || '0'} par carte
                  </Button>

                  <p className="text-xs text-congo-brown/60 text-center">
                    Paiement sécurisé. Vos informations sont protégées.
                  </p>
                </CardContent>
              </Card>

              {/* Other Ways to Help */}
              <Card className="bg-congo-beige border-congo-brown/20">
                <CardHeader>
                  <CardTitle className="text-congo-brown">Autres façons d'aider</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start text-congo-brown border-congo-brown/30 hover:bg-congo-brown/5">
                    <Users className="h-4 w-4 mr-2" />
                    Devenir bénévole
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-congo-brown border-congo-brown/30 hover:bg-congo-brown/5">
                    <Camera className="h-4 w-4 mr-2" />
                    Partager nos contenus
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-congo-brown border-congo-brown/30 hover:bg-congo-brown/5">
                    <Laptop className="h-4 w-4 mr-2" />
                    Contribuer techniquement
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Supporters */}
              <Card className="bg-congo-beige border-congo-brown/20">
                <CardHeader>
                  <CardTitle className="text-congo-brown">Derniers soutiens</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: 'Marie K.', amount: 50, time: '2h' },
                      { name: 'Jean-Paul M.', amount: 25, time: '5h' },
                      { name: 'Grace T.', amount: 100, time: '1j' },
                      { name: 'David L.', amount: 30, time: '2j' }
                    ].map((supporter, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-congo-green/20 rounded-full flex items-center justify-center">
                            <Heart className="h-4 w-4 text-congo-green" />
                          </div>
                          <span className="font-medium text-congo-brown">{supporter.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-congo-brown">${supporter.amount}</div>
                          <div className="text-congo-brown/60">Il y a {supporter.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Testimonials from supporters */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-congo-brown text-center mb-8">
              Témoignages de nos soutiens
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Dr. Pauline Mukuna",
                  role: "Professeure d'université",
                  quote: "VISITE CONGO change la narratif sur notre pays. Chaque contribution compte pour montrer la vraie beauté de la RDC.",
                  image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
                },
                {
                  name: "Michel Tshisekedi",
                  role: "Entrepreneur",
                  quote: "Soutenir cette initiative, c'est investir dans l'image positive de notre patrimoine national.",
                  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                },
                {
                  name: "Claudine Mukamana",
                  role: "Diaspora canadienne",
                  quote: "Depuis le Canada, je suis fière de soutenir la promotion de notre belle RDC à travers VISITE CONGO.",
                  image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
                }
              ].map((testimonial, index) => (
                <Card key={index} className="bg-congo-beige border-congo-brown/20">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full mx-auto mb-4"
                      />
                      <p className="text-congo-brown/80 italic mb-4">
                        "{testimonial.quote}"
                      </p>
                      <div>
                        <p className="font-semibold text-congo-brown">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-congo-brown/60">
                          {testimonial.role}
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

export default Support;
