
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useContributor } from '@/hooks/useContributor';

interface LoginFormProps {
  onSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { toast } = useToast();
  const { login } = useContributor();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginForm.email || !loginForm.password) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir tous les champs.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      await login(loginForm.email, loginForm.password);
      
      toast({
        title: "Connexion réussie !",
        description: "Redirection vers votre tableau de bord...",
      });
      
      // Attendre un peu avant la redirection pour que l'utilisateur voie le message
      setTimeout(() => {
        onSuccess?.();
      }, 1000);
      
    } catch (error: any) {
      console.error('Erreur de connexion:', error);
      
      toast({
        title: "Erreur de connexion",
        description: error.message || "Vérifiez vos identifiants et réessayez.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-congo-brown/20">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-congo-brown">Connexion Contributeur</CardTitle>
        <CardDescription className="text-congo-brown/80">
          Accédez à votre tableau de bord de contributeur
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="login-email" className="text-congo-brown">Email</Label>
            <Input
              id="login-email"
              type="email"
              value={loginForm.email}
              onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
              placeholder="votre@email.com"
              required
              disabled={isLoading}
              className="bg-white/90 border-congo-brown/30 text-congo-brown placeholder:text-congo-brown/60"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="login-password" className="text-congo-brown">Mot de passe</Label>
            <div className="relative">
              <Input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={loginForm.password}
                onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                placeholder="••••••••"
                required
                disabled={isLoading}
                className="bg-white/90 border-congo-brown/30 text-congo-brown pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-congo-brown"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-congo-green hover:bg-congo-green/90 text-white" 
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
