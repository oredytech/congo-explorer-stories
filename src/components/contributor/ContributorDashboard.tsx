
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useContributor } from '@/hooks/useContributor';
import { Camera, Video, PenTool, Trophy, Star, Plus, Calendar, MapPin, User, LogOut } from 'lucide-react';
import ContributionForm from './ContributionForm';
import ContributionHistory from './ContributionHistory';

export const ContributorDashboard: React.FC = () => {
  const { currentUser, profile, contributions, rankings, logout } = useContributor();
  const [showContributionForm, setShowContributionForm] = React.useState(false);

  if (!currentUser) {
    return null;
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'photographer': return <Camera className="h-4 w-4" />;
      case 'videographer': return <Video className="h-4 w-4" />;
      case 'blogger': return <PenTool className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'photographer': return 'Photographe';
      case 'videographer': return 'Vidéaste';
      case 'blogger': return 'Blogueur';
      default: return 'Contributeur';
    }
  };

  const nextLevelPoints = Math.ceil((currentUser.points + 1) / 100) * 100;
  const progressPercentage = (currentUser.points % 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-congo-yellow/20 via-congo-green/20 to-congo-red/20 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-congo-brown">
              Tableau de bord contributeur
            </h1>
            <p className="text-congo-brown/80 mt-2">
              Bienvenue, {currentUser.name} !
            </p>
          </div>
          <Button variant="outline" onClick={logout} className="border-congo-brown/30 text-congo-brown hover:bg-congo-brown/10">
            <LogOut className="h-4 w-4 mr-2" />
            Déconnexion
          </Button>
        </div>

        {/* Profile Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/95 backdrop-blur-sm border-congo-brown/20">
            <CardHeader className="text-center">
              <div className="w-20 h-20 bg-congo-green/20 rounded-full mx-auto flex items-center justify-center mb-2">
                {getTypeIcon(currentUser.type)}
              </div>
              <CardTitle className="text-congo-brown">{currentUser.name}</CardTitle>
              <CardDescription className="text-congo-brown/80">
                {getTypeLabel(currentUser.type)}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center text-sm text-congo-brown/80">
                <MapPin className="h-4 w-4 mr-2" />
                {currentUser.location}
              </div>
              <div className="flex items-center text-sm text-congo-brown/80">
                <Calendar className="h-4 w-4 mr-2" />
                Membre depuis {currentUser.joinDate}
              </div>
              {currentUser.status === 'pending' && (
                <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                  Compte en attente
                </Badge>
              )}
              {currentUser.status === 'approved' && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Compte validé
                </Badge>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-congo-brown/20">
            <CardHeader>
              <CardTitle className="text-congo-brown flex items-center">
                <Trophy className="h-5 w-5 mr-2" />
                Points & Niveau
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-congo-green">{currentUser.points}</div>
                <div className="text-sm text-congo-brown/80">Points totaux</div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Niveau {Math.floor(currentUser.points / 100) + 1}</span>
                  <span>{nextLevelPoints} pts</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-congo-brown/20">
            <CardHeader>
              <CardTitle className="text-congo-brown flex items-center">
                <Star className="h-5 w-5 mr-2" />
                Statistiques
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-congo-green">{contributions.length}</div>
                  <div className="text-xs text-congo-brown/80">Contributions</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-congo-yellow">#{currentUser.rank || 'N/A'}</div>
                  <div className="text-xs text-congo-brown/80">Classement</div>
                </div>
              </div>
              <Button 
                onClick={() => setShowContributionForm(true)} 
                className="w-full bg-congo-green hover:bg-congo-green/90 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle contribution
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="contributions" className="space-y-4">
          <TabsList className="bg-white/90 border-congo-brown/20">
            <TabsTrigger value="contributions" className="text-congo-brown data-[state=active]:bg-congo-green data-[state=active]:text-white">
              Mes contributions
            </TabsTrigger>
            <TabsTrigger value="rankings" className="text-congo-brown data-[state=active]:bg-congo-green data-[state=active]:text-white">
              Classements
            </TabsTrigger>
            <TabsTrigger value="profile" className="text-congo-brown data-[state=active]:bg-congo-green data-[state=active]:text-white">
              Profil
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contributions" className="space-y-4">
            <ContributionHistory contributions={contributions} />
          </TabsContent>

          <TabsContent value="rankings" className="space-y-4">
            <Card className="bg-white/95 backdrop-blur-sm border-congo-brown/20">
              <CardHeader>
                <CardTitle className="text-congo-brown">Classement mensuel</CardTitle>
                <CardDescription className="text-congo-brown/80">
                  Découvrez les meilleurs contributeurs du mois
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {rankings.map((ranking) => (
                    <div key={ranking.contributor.id} className="flex items-center justify-between p-3 bg-congo-brown/5 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          ranking.position === 1 ? 'bg-yellow-500 text-white' :
                          ranking.position === 2 ? 'bg-gray-400 text-white' :
                          ranking.position === 3 ? 'bg-amber-600 text-white' :
                          'bg-congo-brown/20 text-congo-brown'
                        }`}>
                          {ranking.position}
                        </div>
                        <div>
                          <div className="font-medium text-congo-brown">{ranking.contributor.name}</div>
                          <div className="text-sm text-congo-brown/80">{ranking.contributor.location}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-congo-green">{ranking.points} pts</div>
                        <div className="text-sm text-congo-brown/80">{ranking.contributions} contributions</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <Card className="bg-white/95 backdrop-blur-sm border-congo-brown/20">
              <CardHeader>
                <CardTitle className="text-congo-brown">Informations du profil</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-congo-brown">Nom complet</label>
                    <p className="mt-1 text-congo-brown/80">{currentUser.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-congo-brown">Email</label>
                    <p className="mt-1 text-congo-brown/80">{currentUser.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-congo-brown">Type</label>
                    <p className="mt-1 text-congo-brown/80">{getTypeLabel(currentUser.type)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-congo-brown">Localisation</label>
                    <p className="mt-1 text-congo-brown/80">{currentUser.location}</p>
                  </div>
                </div>
                {currentUser.bio && (
                  <div>
                    <label className="text-sm font-medium text-congo-brown">Biographie</label>
                    <p className="mt-1 text-congo-brown/80">{currentUser.bio}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Contribution Form Modal */}
        {showContributionForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <ContributionForm onClose={() => setShowContributionForm(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContributorDashboard;
