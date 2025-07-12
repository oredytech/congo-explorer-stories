
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

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer une adresse email valide.",
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
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div>
      <Card className="border-border bg-card shadow-lg w-full">
        <CardHeader>
          <CardTitle className="text-card-foreground break-words">Candidature d'explorateur</CardTitle>
          <CardDescription className="text-muted-foreground break-words">
            Remplissez ce formulaire pour rejoindre notre équipe. 
            Tous les champs marqués d'un * sont obligatoires.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Prénom *
                </label>
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="border-border focus:border-primary focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Nom *
                </label>
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="border-border focus:border-primary focus:ring-primary"
                />
              </div>
            </div>

            {/* Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Email *
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="border-border focus:border-primary focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Téléphone
                </label>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+243..."
                  className="border-border focus:border-primary focus:ring-primary"
                />
              </div>
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Ville
                </label>
                <Input
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="border-border focus:border-primary focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Province
                </label>
                <select
                  name="province"
                  value={formData.province}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-card-foreground bg-card"
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
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Pourquoi voulez-vous rejoindre VISITE CONGO ? *
              </label>
              <Textarea
                name="motivation"
                value={formData.motivation}
                onChange={handleInputChange}
                rows={4}
                placeholder="Partagez votre motivation et votre vision..."
                required
                className="border-border focus:border-primary focus:ring-primary resize-none"
              />
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Compétences particulières
              </label>
              <Textarea
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                rows={3}
                placeholder="Photographie, vidéo, rédaction, connaissances locales..."
                className="border-border focus:border-primary focus:ring-primary resize-none"
              />
            </div>

            {/* Availability */}
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Disponibilité
              </label>
              <Textarea
                name="availability"
                value={formData.availability}
                onChange={handleInputChange}
                rows={2}
                placeholder="Weekends, vacances, temps libre..."
                className="border-border focus:border-primary focus:ring-primary resize-none"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              size="lg"
            >
              Envoyer ma candidature
            </Button>

            <p className="text-xs text-muted-foreground text-center break-words">
              En soumettant ce formulaire, vous acceptez notre protocole d'accord pour explorateurs bénévoles 
              et nos conditions d'utilisation.
            </p>
          </form>
        </CardContent>
      </Card>

      {/* Contact Info */}
      <div className="mt-8 p-6 bg-muted rounded-lg w-full">
        <h3 className="font-semibold text-card-foreground mb-4 break-words">
          Questions ? Contactez-nous
        </h3>
        <div className="space-y-2">
          <div className="flex items-center text-card-foreground break-all">
            <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="break-all">explorateurs@visitecongo.com</span>
          </div>
          <div className="flex items-center text-card-foreground">
            <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>+243 991 478 206</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerApplicationForm;
