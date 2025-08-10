import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Camera, 
  Video, 
  PenTool, 
  Upload, 
  Star, 
  Trophy, 
  User,
  MapPin,
  Calendar,
  Award
} from 'lucide-react';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  type: 'photographer' | 'videographer' | 'blogger';
  points: number;
  contributions: number;
  rank: number;
  joinDate: string;
  location: string;
}

interface Contribution {
  id: string;
  title: string;
  type: 'photo' | 'video' | 'article';
  url: string;
  description: string;
  province: string;
  status: 'pending' | 'approved' | 'rejected';
  points: number;
  createdAt: string;
}

const Add = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'add' | 'profile'>('dashboard');
  
  // Formulaire d'ajout de contenu
  const [contentForm, setContentForm] = useState({
    title: '',
    type: 'photo' as 'photo' | 'video' | 'article',
    url: '',
    description: '',
    province: '',
    tags: ''
  });

  // Provinces de la RDC
  const provinces = [
    'Kinshasa', 'Kongo Central', 'Kwango', 'Kwilu', 'Mai-Ndombe',
    'Équateur', 'Mongala', 'Nord-Ubangi', 'Sud-Ubangi', 'Tshuapa',
    'Haut-Lomami', 'Haut-Katanga', 'Lualaba', 'Kasaï', 'Kasaï-Central',
    'Kasaï-Oriental', 'Lomami', 'Sankuru', 'Bas-Uele', 'Haut-Uele',
    'Ituri', 'Tshopo', 'Nord-Kivu', 'Sud-Kivu', 'Maniema', 'Tanganyika'
  ];

  useEffect(() => {
    // Simuler la vérification de connexion et chargement du profil
    const checkAuth = () => {
      const storedUser = localStorage.getItem('ot_contributor_user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUserProfile(user);
        setIsLoggedIn(true);
        loadUserContributions(user.id);
      }
    };
    checkAuth();
  }, []);

  const loadUserContributions = (userId: string) => {
    // Simuler le chargement des contributions
    const mockContributions: Contribution[] = [
      {
        id: '1',
        title: 'Coucher de soleil sur le fleuve Congo',
        type: 'photo',
        url: 'https://example.com/photo1.jpg',
        description: 'Une magnifique photo du coucher de soleil',
        province: 'Kinshasa',
        status: 'approved',
        points: 25,
        createdAt: '2024-01-15'
      },
      {
        id: '2',
        title: 'Les merveilles du Parc Virunga',
        type: 'video',
        url: 'https://youtube.com/watch?v=example',
        description: 'Documentaire sur la faune du parc',
        province: 'Nord-Kivu',
        status: 'pending',
        points: 0,
        createdAt: '2024-01-10'
      }
    ];
    setContributions(mockContributions);
  };

  const handleSubmitContent = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour ajouter du contenu.",
        variant: "destructive"
      });
      return;
    }

    // Validation pour s'assurer que le contenu concerne la RDC
    if (!contentForm.province) {
      toast({
        title: "Province requise",
        description: "Veuillez sélectionner une province de la RDC.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Simuler l'envoi vers le plugin WordPress
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Contenu soumis !",
        description: "Votre contribution a été envoyée pour modération.",
      });
      
      // Reset form
      setContentForm({
        title: '',
        type: 'photo',
        url: '',
        description: '',
        province: '',
        tags: ''
      });
      
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de soumettre votre contenu.",
        variant: "destructive"
      });
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Points totaux</CardTitle>
            <Star className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{userProfile?.points || 0}</div>
            <p className="text-xs text-muted-foreground">+12 ce mois</p>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Contributions</CardTitle>
            <Upload className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{contributions.length}</div>
            <p className="text-xs text-muted-foreground">Cette année</p>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Classement</CardTitle>
            <Trophy className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">#{userProfile?.rank || 0}</div>
            <p className="text-xs text-muted-foreground">Ce mois</p>
          </CardContent>
        </Card>
      </div>

      {/* Contributions récentes */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Mes contributions récentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {contributions.map((contribution) => (
              <div key={contribution.id} className="flex items-center space-x-4 p-4 border border-border rounded-lg bg-background">
                <div className="flex-shrink-0">
                  {contribution.type === 'photo' && <Camera className="h-6 w-6 text-primary" />}
                  {contribution.type === 'video' && <Video className="h-6 w-6 text-primary" />}
                  {contribution.type === 'article' && <PenTool className="h-6 w-6 text-primary" />}
                </div>
                <div className="flex-grow min-w-0">
                  <h4 className="font-medium text-foreground truncate">{contribution.title}</h4>
                  <p className="text-sm text-muted-foreground">{contribution.province} • {contribution.createdAt}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${
                    contribution.status === 'approved' ? 'bg-green-100 text-green-800' :
                    contribution.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {contribution.status === 'approved' ? 'Approuvé' :
                     contribution.status === 'pending' ? 'En attente' : 'Rejeté'}
                  </span>
                  {contribution.status === 'approved' && (
                    <p className="text-sm font-medium text-primary mt-1">+{contribution.points} pts</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAddContent = () => (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">Ajouter du contenu sur la RDC</CardTitle>
        <CardDescription className="text-muted-foreground">
          Partagez vos photos, vidéos ou articles sur les merveilles de la République Démocratique du Congo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmitContent} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">Type de contenu</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { type: 'photo', icon: Camera, label: 'Photo' },
                { type: 'video', icon: Video, label: 'Vidéo' },
                { type: 'article', icon: PenTool, label: 'Article' }
              ].map(({ type, icon: Icon, label }) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setContentForm(prev => ({ ...prev, type: type as any }))}
                  className={`p-4 border rounded-lg flex flex-col items-center space-y-2 transition-colors ${
                    contentForm.type === type 
                      ? 'border-primary bg-primary/10' 
                      : 'border-border hover:border-primary bg-background'
                  }`}
                >
                  <Icon className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium text-foreground">{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">Titre</label>
            <Input
              value={contentForm.title}
              onChange={(e) => setContentForm(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Donnez un titre à votre contenu..."
              className="bg-background border-border text-foreground"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">
              {contentForm.type === 'photo' ? 'URL de la photo' : 
               contentForm.type === 'video' ? 'URL de la vidéo' : 'Lien de l\'article'}
            </label>
            <Input
              type="url"
              value={contentForm.url}
              onChange={(e) => setContentForm(prev => ({ ...prev, url: e.target.value }))}
              placeholder="https://..."
              className="bg-background border-border text-foreground"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">Province de la RDC</label>
            <select
              value={contentForm.province}
              onChange={(e) => setContentForm(prev => ({ ...prev, province: e.target.value }))}
              className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
              required
            >
              <option value="">Sélectionnez une province</option>
              {provinces.map((province) => (
                <option key={province} value={province}>{province}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">Description</label>
            <Textarea
              value={contentForm.description}
              onChange={(e) => setContentForm(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Décrivez votre contenu..."
              rows={4}
              className="bg-background border-border text-foreground"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">Tags (séparés par des virgules)</label>
            <Input
              value={contentForm.tags}
              onChange={(e) => setContentForm(prev => ({ ...prev, tags: e.target.value }))}
              placeholder="nature, paysage, culture..."
              className="bg-background border-border text-foreground"
            />
          </div>

          <Button type="submit" className="w-full" size="lg">
            <Upload className="h-4 w-4 mr-2" />
            Soumettre ma contribution
          </Button>
        </form>
      </CardContent>
    </Card>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Mon profil</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <User className="h-8 w-8 text-primary-foreground" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold text-foreground truncate">{userProfile?.name}</h3>
                <p className="text-muted-foreground truncate">{userProfile?.email}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground truncate">{userProfile?.location}</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              <div className="text-center">
                <Calendar className="h-5 w-5 mx-auto text-primary mb-1" />
                <p className="text-sm text-muted-foreground">Membre depuis</p>
                <p className="font-medium text-foreground">{userProfile?.joinDate}</p>
              </div>
              <div className="text-center">
                <Award className="h-5 w-5 mx-auto text-primary mb-1" />
                <p className="text-sm text-muted-foreground">Type</p>
                <p className="font-medium capitalize text-foreground">
                  {userProfile?.type === 'photographer' ? 'Photographe' :
                   userProfile?.type === 'videographer' ? 'Vidéaste' : 'Blogueur'}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  if (!isLoggedIn) {
    return (
      <Layout>
        <div className="py-16 bg-background min-h-screen">
          <div className="container mx-auto px-4 max-w-md">
            <Card className="bg-card border-border">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-card-foreground">Connexion requise</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Connectez-vous pour accéder à votre tableau de bord contributeur
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button 
                    onClick={() => {
                      // Simuler une connexion
                      const mockUser: UserProfile = {
                        id: '1',
                        name: 'Jean Mukendi',
                        email: 'jean@example.com',
                        type: 'photographer',
                        points: 156,
                        contributions: 12,
                        rank: 3,
                        joinDate: '2023-10-15',
                        location: 'Kinshasa'
                      };
                      localStorage.setItem('ot_contributor_user', JSON.stringify(mockUser));
                      setUserProfile(mockUser);
                      setIsLoggedIn(true);
                      loadUserContributions(mockUser.id);
                    }}
                    className="w-full"
                  >
                    Se connecter (Demo)
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    En mode démo - Cliquez pour simuler une connexion
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-8 bg-congo-beige min-h-screen">
        <div className="w-full px-4 max-w-6xl mx-auto">
          {/* Header avec navigation */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-congo-brown break-words">
                  Tableau de bord Contributeur
                </h1>
                <p className="text-congo-brown/80 mt-1 break-words">
                  Bienvenue, {userProfile?.name} - 
                  {userProfile?.type === 'photographer' ? ' Photographe' :
                   userProfile?.type === 'videographer' ? ' Vidéaste' : ' Blogueur'}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-xl sm:text-2xl font-bold text-congo-green">{userProfile?.points} pts</div>
                <div className="text-sm text-congo-brown/70">Classement #{userProfile?.rank}</div>
              </div>
            </div>

            {/* Navigation tabs */}
            <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-1 bg-congo-beige-dark rounded-lg p-1 border border-congo-brown/20">
              {[
                { key: 'dashboard', label: 'Tableau de bord', icon: Trophy },
                { key: 'add', label: 'Ajouter contenu', icon: Upload },
                { key: 'profile', label: 'Mon profil', icon: User }
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as any)}
                  className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === key
                      ? 'bg-congo-green text-congo-beige'
                      : 'text-congo-brown hover:bg-congo-beige'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Contenu selon l'onglet actif */}
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'add' && renderAddContent()}
          {activeTab === 'profile' && renderProfile()}
        </div>
      </div>
    </Layout>
  );
};

export default Add;
