
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Camera, Video, PenTool, ExternalLink, Eye, Calendar } from 'lucide-react';
import type { Contribution } from '@/services/contributorApi';

interface ContributionHistoryProps {
  contributions: Contribution[];
}

export const ContributionHistory: React.FC<ContributionHistoryProps> = ({ contributions }) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'photo': return <Camera className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'article': return <PenTool className="h-4 w-4" />;
      default: return <Eye className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-200">En attente</Badge>;
      case 'approved':
        return <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">Approuvé</Badge>;
      case 'rejected':
        return <Badge variant="secondary" className="bg-red-100 text-red-800 border-red-200">Rejeté</Badge>;
      default:
        return <Badge variant="secondary">Inconnu</Badge>;
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

  return (
    <Card className="bg-white border-congo-brown/20 shadow-sm">
      <CardHeader>
        <CardTitle className="text-congo-brown">Mes contributions</CardTitle>
        <CardDescription className="text-congo-brown/70">
          Gérez et suivez vos contributions soumises
        </CardDescription>
      </CardHeader>
      <CardContent>
        {contributions.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-congo-brown/50 mb-2">
              <Camera className="h-12 w-12 mx-auto mb-4" />
            </div>
            <p className="text-congo-brown/70 mb-4">Vous n'avez pas encore de contributions.</p>
            <p className="text-sm text-congo-brown/60">
              Commencez par soumettre votre première photo, vidéo ou article !
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {contributions.map((contribution) => (
              <div
                key={contribution.id}
                className="border border-congo-brown/10 rounded-lg p-4 bg-congo-beige/20 hover:bg-congo-beige/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="text-congo-green">
                      {getTypeIcon(contribution.type)}
                    </div>
                    <div>
                      <h4 className="font-medium text-congo-brown">{contribution.title}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm text-congo-brown/70">
                          {getTypeLabel(contribution.type)} • {contribution.province}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(contribution.status)}
                    <div className="text-right">
                      <div className="text-sm font-medium text-congo-green">{contribution.points} pts</div>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-congo-brown/80 mb-3 line-clamp-2">
                  {contribution.description}
                </p>

                {contribution.tags && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {contribution.tags.split(',').map((tag, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs border-congo-green/30 text-congo-green"
                      >
                        {tag.trim()}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-congo-brown/60">
                    <Calendar className="h-3 w-3 mr-1" />
                    Soumis le {contribution.createdAt}
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
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContributionHistory;
