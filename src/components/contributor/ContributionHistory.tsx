
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Camera, Video, PenTool, ExternalLink, Calendar } from 'lucide-react';
import { type Contribution } from '@/services/contributorApi';

interface ContributionHistoryProps {
  contributions: Contribution[];
}

export const ContributionHistory: React.FC<ContributionHistoryProps> = ({ contributions }) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'photo': return <Camera className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'article': return <PenTool className="h-4 w-4" />;
      default: return <Camera className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'photo': return 'Photo';
      case 'video': return 'Vidéo';
      case 'article': return 'Article';
      default: return 'Contenu';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800">En attente</Badge>;
      case 'approved':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Approuvé</Badge>;
      case 'rejected':
        return <Badge variant="secondary" className="bg-red-100 text-red-800">Refusé</Badge>;
      default:
        return <Badge variant="secondary">Inconnu</Badge>;
    }
  };

  if (contributions.length === 0) {
    return (
      <Card className="bg-white/95 backdrop-blur-sm border-congo-brown/20">
        <CardContent className="text-center py-12">
          <Camera className="h-12 w-12 text-congo-brown/40 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-congo-brown mb-2">Aucune contribution</h3>
          <p className="text-congo-brown/80">Vous n'avez pas encore soumis de contribution. Commencez dès maintenant !</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-congo-brown/20">
      <CardHeader>
        <CardTitle className="text-congo-brown">Mes contributions ({contributions.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {contributions.map((contribution) => (
            <div key={contribution.id} className="border border-congo-brown/20 rounded-lg p-4 bg-congo-brown/5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {getTypeIcon(contribution.type)}
                  <h3 className="font-medium text-congo-brown">{contribution.title}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(contribution.status)}
                  {contribution.points > 0 && (
                    <Badge variant="secondary" className="bg-congo-green/20 text-congo-green">
                      +{contribution.points} pts
                    </Badge>
                  )}
                </div>
              </div>

              <p className="text-congo-brown/80 text-sm mb-3 line-clamp-2">
                {contribution.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-congo-brown/60">
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {contribution.createdAt}
                  </span>
                  <Badge variant="outline" className="border-congo-brown/30 text-congo-brown">
                    {getTypeLabel(contribution.type)}
                  </Badge>
                  {contribution.province && (
                    <Badge variant="outline" className="border-congo-brown/30 text-congo-brown">
                      {contribution.province}
                    </Badge>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(contribution.url, '_blank')}
                  className="border-congo-brown/30 text-congo-brown hover:bg-congo-brown/10"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Voir
                </Button>
              </div>

              {contribution.tags && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {contribution.tags.split(',').map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-congo-yellow/20 text-congo-brown text-xs">
                      {tag.trim()}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContributionHistory;
