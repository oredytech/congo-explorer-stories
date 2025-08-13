
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award, Camera, Video, PenTool } from 'lucide-react';
import { useContributor } from '@/hooks/useContributor';

export const MonthlyRankings: React.FC = () => {
  const { rankings } = useContributor();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'photographer': return <Camera className="h-4 w-4" />;
      case 'videographer': return <Video className="h-4 w-4" />;
      case 'blogger': return <PenTool className="h-4 w-4" />;
      default: return <Award className="h-4 w-4" />;
    }
  };

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1: return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2: return <Medal className="h-5 w-5 text-gray-400" />;
      case 3: return <Award className="h-5 w-5 text-orange-500" />;
      default: return <span className="text-lg font-bold text-congo-brown">#{position}</span>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Trophy className="h-5 w-5 text-congo-green" />
          <span>Classement du mois</span>
        </CardTitle>
        <CardDescription>
          Les meilleurs contributeurs de ce mois-ci
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {rankings.slice(0, 10).map((ranking) => (
            <div 
              key={ranking.contributor.id}
              className={`flex items-center space-x-4 p-4 rounded-lg border ${
                ranking.isWinner ? 'bg-congo-green/5 border-congo-green' : 'bg-background'
              }`}
            >
              <div className="flex-shrink-0 w-12 flex justify-center">
                {getRankIcon(ranking.position)}
              </div>
              
              <div className="flex-grow">
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium text-congo-brown">{ranking.contributor.name}</h4>
                  <div className="flex items-center space-x-1">
                    {getTypeIcon(ranking.contributor.type)}
                    <Badge variant="secondary" className="text-xs">
                      {ranking.contributor.type === 'photographer' ? 'Photographe' :
                       ranking.contributor.type === 'videographer' ? 'Vidéaste' : 'Blogueur'}
                    </Badge>
                  </div>
                  {ranking.isWinner && (
                    <Badge className="bg-congo-green text-white text-xs">
                      Gagnant
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{ranking.contributor.location}</p>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-bold text-congo-green">{ranking.points} pts</div>
                <div className="text-xs text-muted-foreground">{ranking.contributions} contributions</div>
              </div>
            </div>
          ))}
          
          {rankings.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              Aucun classement disponible pour ce mois.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyRankings;
