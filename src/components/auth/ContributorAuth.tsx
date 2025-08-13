
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

interface ContributorAuthProps {
  onSuccess?: () => void;
}

export const ContributorAuth: React.FC<ContributorAuthProps> = ({ onSuccess }) => {
  const [activeTab, setActiveTab] = useState('login');

  const handleRegistrationSuccess = () => {
    // Rediriger vers l'onglet de connexion après inscription
    setActiveTab('login');
  };

  return (
    <div className="max-w-md mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-white/90 border-congo-brown/20">
          <TabsTrigger value="login" className="text-congo-brown data-[state=active]:bg-congo-green data-[state=active]:text-white">
            Connexion
          </TabsTrigger>
          <TabsTrigger value="register" className="text-congo-brown data-[state=active]:bg-congo-green data-[state=active]:text-white">
            Inscription
          </TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <LoginForm onSuccess={onSuccess} />
        </TabsContent>

        <TabsContent value="register">
          <RegistrationForm onSuccess={handleRegistrationSuccess} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContributorAuth;
