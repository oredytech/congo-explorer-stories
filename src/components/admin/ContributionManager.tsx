
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, Video, PenTool, Check, X, Eye } from 'lucide-react';

interface Contribution {
  id: string;
  title: string;
  type: 'photo' | 'video' | 'article';
  url: string;
  description: string;
  province: string;
  contributorName: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export const ContributionManager: React.FC = () => {
  const [contributions, setContributions] = useState<Contribution[]>([]);

  useEffect(() => {
    // Charger les contributions depuis localStorage (simulation)
    const loadContributions = () => {
      const stored = localStorage.getItem('contributions') || '[]';
      setContributions(JSON.parse(stored));
    };
    loadContributions();
  }, []);

  const handleApprove = (contributionId: string) => {
    const updated = contributions.map(c => 
      c.id === contributionId ? { ...c, status: 'approved' as const } : c
    );
    setContributions(updated);
    localStorage.setItem('contributions', JSON.stringify(updated));
  };

  const handleReject = (contributionId: string) => {
    const updated = contributions.map(c => 
      c.id === contributionId ? { ...c, status: 'rejected' as const } : c
    );
    setContributions(updated);
    localStorage.setItem('contributions', JSON.stringify(updated));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'photo': return <Camera className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'article': return <PenTool className="h-4 w-4" />;
      default: return null;
    }
  };

  const pendingContributions = contributions.filter(c => c.status === 'pending');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion des Contributions</CardTitle>
        <CardDescription>
          Validez ou rejetez les contributions des contributeurs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pendingContributions.length > 0 ? pendingContributions.map((contribution) => (
            <div key={contribution.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getTypeIcon(contribution.type)}
                  <h4 className="font-medium">{contribution.title}</h4>
                  <Badge variant="secondary">{contribution.type}</Badge>
                </div>
                <Badge variant="outline">{contribution.status}</Badge>
              </div>
              
              <p className="text-sm text-muted-foreground">{contribution.description}</p>
              <div className="text-xs text-muted-foreground">
                Par {contribution.contributorName} • {contribution.province} • {contribution.createdAt}
              </div>
              
              <div className="flex items-center space-x-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => window.open(contribution.url, '_blank')}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Voir
                </Button>
                <Button 
                  size="sm" 
                  variant="default"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => handleApprove(contribution.id)}
                >
                  <Check className="h-4 w-4 mr-1" />
                  Approuver
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => handleReject(contribution.id)}
                >
                  <X className="h-4 w-4 mr-1" />
                  Rejeter
                </Button>
              </div>
            </div>
          )) : (
            <p className="text-center text-muted-foreground py-8">
              Aucune contribution en attente de validation.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContributionManager;
