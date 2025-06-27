
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone } from 'lucide-react';

const VolunteerApplicationForm = () => {
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
  );
};

export default VolunteerApplicationForm;
