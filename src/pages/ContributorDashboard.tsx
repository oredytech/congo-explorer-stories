
import React from 'react';
import { useContributor } from '@/hooks/useContributor';
import ContributorDashboard from '@/components/contributor/ContributorDashboard';
import ContributorAuth from '@/components/auth/ContributorAuth';

const ContributorDashboardPage: React.FC = () => {
  const { isAuthenticated } = useContributor();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-congo-yellow/20 via-congo-green/20 to-congo-red/20 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <ContributorAuth onSuccess={() => {
            // La redirection sera gérée par useContributor
          }} />
        </div>
      </div>
    );
  }

  return <ContributorDashboard />;
};

export default ContributorDashboardPage;
