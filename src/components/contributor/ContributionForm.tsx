
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useContributor } from '@/hooks/useContributor';
import { Camera, Video, PenTool, X, Loader2 } from 'lucide-react';

interface ContributionFormProps {
  onClose: () => void;
}

export const ContributionForm: React.FC<ContributionFormProps> = ({ onClose }) => {
  const { toast } = useToast();
  const { submitContribution, isSubmitting } = useContributor();
  
  const [formData, setFormData] = useState({
    title: '',
    type: 'photo' as 'photo' | 'video' | 'article',
    url: '',
    description: '',
    province: '',
    tags: ''
  });

  const provinces = [
    'Kinshasa', 'Kongo Central', 'Kwango', 'Kwilu', 'Mai-Ndombe',
    'Équateur', 'Mongala', 'Nord-Ubangi', 'Sud-Ubangi', 'Tshuapa',
    'Haut-Lomami', 'Haut-Katanga', 'Lualaba', 'Kasaï', 'Kasaï-Central',
    'Kasaï-Oriental', 'Lomami', 'Sankuru', 'Bas-Uele', 'Haut-Uele',
    'Ituri', 'Tshopo', 'Nord-Kivu', 'Sud-Kivu', 'Maniema', 'Tanganyika'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.url || !formData.description || !formData.province) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    try {
      await submitContribution(formData);
      toast({
        title: "Contribution soumise !",
        description: "Votre contribution a été envoyée et sera examinée par notre équipe.",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de soumettre votre contribution. Réessayez.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-congo-brown">Nouvelle contribution</CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose} className="text-congo-brown">
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-congo-brown">Titre *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Titre de votre contribution"
              required
              className="border-congo-brown/30 text-congo-brown"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-congo-brown">Type de contenu *</Label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { type: 'photo', icon: Camera, label: 'Photo' },
                { type: 'video', icon: Video, label: 'Vidéo' },
                { type: 'article', icon: PenTool, label: 'Article' }
              ].map(({ type, icon: Icon, label }) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, type: type as any }))}
                  className={`p-3 border rounded-lg flex flex-col items-center space-y-1 text-sm transition-colors ${
                    formData.type === type 
                      ? 'border-congo-green bg-congo-green/20 text-congo-brown' 
                      : 'border-congo-brown/30 hover:border-congo-green text-congo-brown/80'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="url" className="text-congo-brown">Lien vers le contenu *</Label>
            <Input
              id="url"
              type="url"
              value={formData.url}
              onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
              placeholder="https://example.com/mon-contenu"
              required
              className="border-congo-brown/30 text-congo-brown"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-congo-brown">Province *</Label>
            <Select value={formData.province} onValueChange={(value) => setFormData(prev => ({ ...prev, province: value }))}>
              <SelectTrigger className="border-congo-brown/30 text-congo-brown">
                <SelectValue placeholder="Sélectionnez la province" />
              </SelectTrigger>
              <SelectContent>
                {provinces.map((province) => (
                  <SelectItem key={province} value={province}>{province}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-congo-brown">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Décrivez votre contribution..."
              rows={4}
              required
              className="border-congo-brown/30 text-congo-brown"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags" className="text-congo-brown">Mots-clés</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              placeholder="nature, culture, tourisme (séparés par des virgules)"
              className="border-congo-brown/30 text-congo-brown"
            />
          </div>

          <div className="flex space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 border-congo-brown/30 text-congo-brown">
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1 bg-congo-green hover:bg-congo-green/90 text-white">
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Soumettre
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContributionForm;
