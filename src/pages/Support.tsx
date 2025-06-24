import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import { Heart, Users, Camera, Laptop, Car, Plane, DollarSign, CreditCard, Phone } from 'lucide-react';
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
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=250&fit=crop'
    },
    {
      id: 'expeditions',
      title: 'Expéditions dans les provinces',
      description: 'Financement des voyages d\'exploration et documentation',
      target: 75000,
      raised: 41300,
      supporters: 203,
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=250&fit=crop'
    },
    {
      id: 'platform',
      title: 'Développement de la plateforme',
      description: 'Amélioration du site web et des outils numériques',
      target: 25000,
      raised: 12800,
      supporters: 67,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop'
    }
  ];

  const donationOptions = [5, 10, 25, 50, 100, 250];

  const paymentMethods = [
    {
      name: 'Mobile Money',
      icon: <Phone className="h-6 w-6" />,
      description: 'Orange Money, Airtel Money, M-Pesa',
      available: true
    },
    {
      name: 'PayPal',
      icon: <DollarSign className="h-6 w-6" />,
      description: 'Paiement sécurisé international',
      available: true
    },
    {
      name: 'Carte bancaire',
      icon: <CreditCard className="h-6 w-6" />,
      description: 'Visa, MasterCard',
      available: true
    }
  ];

  const impacts = [
    {
      icon: <Camera className="h-12 w-12 text-blue-600" />,
      title: 'Documentation visuelle',
      description: '500+ photos et 50+ vidéos documentaires produites',
      stat: '550+'
    },
    {
      icon: <Users className="h-12 w-12 text-green-600" />,
      title: 'Communautés touchées',
      description: 'Plus de 100 communautés visitées et documentées',
      stat: '100+'
    },
    {
      icon: <Plane className="h-12 w-12 text-purple-600" />,
      title: 'Provinces explorées',
      description: '22 des 26 provinces déjà visitées',
      stat: '22/26'
    },
    {
      icon: <Heart className="h-12 w-12 text-red-600" />,
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

    // Ici, on redirigerait vers la plateforme de paiement
    console.log(`Donation de ${donationAmount}$ pour le projet ${selectedProject}`);
  };

  return (
    <Layout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-stone-900 mb-4">
              Soutenez Notre Mission
            </h1>
            <p className="text-lg text-stone-600 max-w-3xl mx-auto">
              Votre soutien nous permet de continuer à révéler les trésors cachés de la RDC 
              et de partager sa beauté avec le monde entier.
            </p>
          </div>

          {/* Impact Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-stone-900 text-center mb-8">
              Notre Impact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {impacts.map((impact, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      {impact.icon}
                    </div>
                    <div className="text-3xl font-bold text-stone-900 mb-2">
                      {impact.stat}
                    </div>
                    <h3 className="font-semibold text-stone-900 mb-2">
                      {impact.title}
                    </h3>
                    <p className="text-sm text-stone-600">
                      {impact.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Projects */}
            <div className="lg:col-span-2 space-y-8">
              <h2 className="text-2xl font-bold text-stone-900">
                Projets à soutenir
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <Card 
                    key={project.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedProject === project.id ? 'ring-2 ring-green-500' : ''
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
                        <Badge className="absolute top-2 right-2 bg-green-600">
                          Sélectionné
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-stone-900 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-sm text-stone-600 mb-4">
                        {project.description}
                      </p>
                      
                      {/* Progress */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-stone-600">
                            {project.raised.toLocaleString()}$ collectés
                          </span>
                          <span className="text-stone-600">
                            {Math.round((project.raised / project.target) * 100)}%
                          </span>
                        </div>
                        <Progress 
                          value={(project.raised / project.target) * 100}
                          className="h-2"
                        />
                        <div className="flex justify-between text-xs text-stone-500">
                          <span>Objectif: {project.target.toLocaleString()}$</span>
                          <span>{project.supporters} contributeurs</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Budget Transparency */}
              <Card>
                <CardHeader>
                  <CardTitle>Transparence budgétaire</CardTitle>
                  <CardDescription>
                    Découvrez comment vos dons sont utilisés
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {expenses.map((expense, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{expense.category}</span>
                          <span>{expense.percentage}% - {expense.amount.toLocaleString()}$</span>
                        </div>
                        <Progress value={expense.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Donation Form */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="h-6 w-6 mr-2 text-red-500" />
                    Faire un don
                  </CardTitle>
                  <CardDescription>
                    Soutenez le projet sélectionné : {projects.find(p => p.id === selectedProject)?.title}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Donation Amount */}
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-3">
                      Montant du don (USD)
                    </label>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {donationOptions.map((amount) => (
                        <Button
                          key={amount}
                          variant={donationAmount === amount.toString() ? "default" : "outline"}
                          size="sm"
                          onClick={() => setDonationAmount(amount.toString())}
                          className={donationAmount === amount.toString() ? "bg-green-600 hover:bg-green-700" : ""}
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
                    />
                  </div>

                  {/* Payment Methods */}
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-3">
                      Méthode de paiement
                    </label>
                    <div className="space-y-2">
                      {paymentMethods.map((method, index) => (
                        <div 
                          key={index}
                          className={`p-3 border rounded-lg cursor-pointer hover:bg-stone-50 ${
                            method.available ? '' : 'opacity-50 cursor-not-allowed'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            {method.icon}
                            <div>
                              <div className="font-medium text-stone-900">
                                {method.name}
                                {!method.available && (
                                  <Badge variant="secondary" className="ml-2">
                                    Bientôt
                                  </Badge>
                                )}
                              </div>
                              <div className="text-sm text-stone-600">
                                {method.description}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button 
                    onClick={handleDonation}
                    className="w-full bg-green-600 hover:bg-green-700"
                    size="lg"
                  >
                    Faire un don de ${donationAmount || '0'}
                  </Button>

                  <p className="text-xs text-stone-500 text-center">
                    Paiement sécurisé. Vos informations sont protégées.
                  </p>
                </CardContent>
              </Card>

              {/* Other Ways to Help */}
              <Card>
                <CardHeader>
                  <CardTitle>Autres façons d'aider</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Devenir bénévole
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Camera className="h-4 w-4 mr-2" />
                    Partager nos contenus
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Laptop className="h-4 w-4 mr-2" />
                    Contribuer techniquement
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Supporters */}
              <Card>
                <CardHeader>
                  <CardTitle>Derniers soutiens</CardTitle>
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
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <Heart className="h-4 w-4 text-green-600" />
                          </div>
                          <span className="font-medium">{supporter.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">${supporter.amount}</div>
                          <div className="text-stone-500">Il y a {supporter.time}</div>
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
            <h2 className="text-2xl font-bold text-stone-900 text-center mb-8">
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
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full mx-auto mb-4"
                      />
                      <p className="text-stone-600 italic mb-4">
                        "{testimonial.quote}"
                      </p>
                      <div>
                        <p className="font-semibold text-stone-900">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-stone-500">
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
