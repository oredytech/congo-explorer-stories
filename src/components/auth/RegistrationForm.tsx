
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Camera, Video, PenTool, Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { contributorApi, type RegistrationData } from '@/services/contributorApi';

interface RegistrationFormProps {
  onSuccess: () => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSuccess }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    type: 'photographer' as 'photographer' | 'videographer' | 'blogger',
    location: '',
    bio: ''
  });

  const provinces = [
    'Kinshasa', 'Kongo Central', 'Kwango', 'Kwilu', 'Mai-Ndombe',
    'Équateur', 'Mongala', 'Nord-Ubangi', 'Sud-Ubangi', 'Tshuapa',
    'Haut-Lomami', 'Haut-Katanga', 'Lualaba', 'Kasaï', 'Kasaï-Central',
    'Kasaï-Oriental', 'Lomami', 'Sankuru', 'Bas-Uele', 'Haut-Uele',
    'Ituri', 'Tshopo', 'Nord-Kivu', 'Sud-Kivu', 'Maniema', 'Tanganyika'
  ];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerForm.password !== registerForm.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive"
      });
      return;
    }

    if (registerForm.password.length < 6) {
      toast({
        title: "Erreur",
        description: "Le mot de passe doit contenir au moins 6 caractères.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const registrationData: RegistrationData = {
        name: registerForm.name,
        email: registerForm.email,
        password: registerForm.password,
        type: registerForm.type,
        location: registerForm.location,
        bio: registerForm.bio
      };

      const result = await contributorApi.register(registrationData);
      
      toast({
        title: "Inscription réussie !",
        description: result.message,
      });
      
      // Rediriger vers la connexion
      onSuccess();
      
    } catch (error) {
      toast({
        title: "Erreur d'inscription",
        description: error instanceof Error ? error.message : "Impossible de créer votre compte. Réessayez.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-congo-brown/20">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-congo-brown">Devenir Contributeur</CardTitle>
        <CardDescription className="text-congo-brown/80">
          Créez votre compte pour participer aux challenges mensuels
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="register-name" className="text-congo-brown">Nom complet</Label>
            <Input
              id="register-name"
              value={registerForm.name}
              onChange={(e) => setRegisterForm(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Jean Mukendi"
              required
              className="bg-white border-congo-brown/30 text-congo-brown placeholder:text-congo-brown/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="register-email" className="text-congo-brown">Email</Label>
            <Input
              id="register-email"
              type="email"
              value={registerForm.email}
              onChange={(e) => setRegisterForm(prev => ({ ...prev, email: e.target.value }))}
              placeholder="jean@example.com"
              required
              className="bg-white border-congo-brown/30 text-congo-brown placeholder:text-congo-brown/60"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-congo-brown">Type de contributeur</Label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { type: 'photographer', icon: Camera, label: 'Photographe' },
                { type: 'videographer', icon: Video, label: 'Vidéaste' },
                { type: 'blogger', icon: PenTool, label: 'Blogueur' }
              ].map(({ type, icon: Icon, label }) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setRegisterForm(prev => ({ ...prev, type: type as any }))}
                  className={`p-3 border rounded-lg flex flex-col items-center space-y-1 text-xs transition-colors ${
                    registerForm.type === type 
                      ? 'border-congo-green bg-congo-green/20 text-congo-brown' 
                      : 'border-congo-brown/30 hover:border-congo-green text-congo-brown/80 bg-white'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-congo-brown">Province</Label>
            <Select value={registerForm.location} onValueChange={(value) => setRegisterForm(prev => ({ ...prev, location: value }))}>
              <SelectTrigger className="bg-white border-congo-brown/30 text-congo-brown">
                <SelectValue placeholder="Sélectionnez votre province" />
              </SelectTrigger>
              <SelectContent className="bg-white border-congo-brown/30">
                {provinces.map((province) => (
                  <SelectItem key={province} value={province} className="text-congo-brown">{province}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="register-bio" className="text-congo-brown">Biographie (optionnel)</Label>
            <Textarea
              id="register-bio"
              value={registerForm.bio}
              onChange={(e) => setRegisterForm(prev => ({ ...prev, bio: e.target.value }))}
              placeholder="Parlez-nous de votre passion..."
              rows={3}
              className="bg-white border-congo-brown/30 text-congo-brown placeholder:text-congo-brown/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="register-password" className="text-congo-brown">Mot de passe</Label>
            <Input
              id="register-password"
              type="password"
              value={registerForm.password}
              onChange={(e) => setRegisterForm(prev => ({ ...prev, password: e.target.value }))}
              placeholder="••••••••"
              required
              className="bg-white border-congo-brown/30 text-congo-brown"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="register-confirm" className="text-congo-brown">Confirmer le mot de passe</Label>
            <Input
              id="register-confirm"
              type="password"
              value={registerForm.confirmPassword}
              onChange={(e) => setRegisterForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
              placeholder="••••••••"
              required
              className="bg-white border-congo-brown/30 text-congo-brown"
            />
          </div>

          <Button type="submit" className="w-full bg-congo-green hover:bg-congo-green/90 text-white" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Créer mon compte
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegistrationForm;
