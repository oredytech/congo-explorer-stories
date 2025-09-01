import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useContributor } from '@/hooks/useContributor';
import { Camera, Video, PenTool, X, Loader2, Upload, Link2 } from 'lucide-react';

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

  const [uploadMethod, setUploadMethod] = useState<'url' | 'file'>('url');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const provinces = [
    'Kinshasa', 'Kongo Central', 'Kwango', 'Kwilu', 'Mai-Ndombe',
    'Équateur', 'Mongala', 'Nord-Ubangi', 'Sud-Ubangi', 'Tshuapa',
    'Haut-Lomami', 'Haut-Katanga', 'Lualaba', 'Kasaï', 'Kasaï-Central',
    'Kasaï-Oriental', 'Lomami', 'Sankuru', 'Bas-Uele', 'Haut-Uele',
    'Ituri', 'Tshopo', 'Nord-Kivu', 'Sud-Kivu', 'Maniema', 'Tanganyika'
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Vérifier le type de fichier
      const allowedTypes = ['image/webp', 'image/png', 'image/jpg', 'image/jpeg'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Erreur",
          description: "Seuls les formats WebP, PNG et JPG sont acceptés.",
          variant: "destructive"
        });
        return;
      }

      // Vérifier la taille (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "Erreur",
          description: "La taille du fichier ne doit pas dépasser 10MB.",
          variant: "destructive"
        });
        return;
      }

      setSelectedFile(file);
      
      // Créer une prévisualisation
      const reader = new FileReader();
      reader.onload = (e) => {
        setFilePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.province) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    // Vérifier qu'une URL ou un fichier est fourni
    if (uploadMethod === 'url' && !formData.url) {
      toast({
        title: "Erreur",
        description: "Veuillez fournir une URL pour votre contenu.",
        variant: "destructive"
      });
      return;
    }

    if (uploadMethod === 'file' && !selectedFile) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un fichier à télécharger.",
        variant: "destructive"
      });
      return;
    }

    try {
      const submissionData = {
        ...formData,
        url: uploadMethod === 'file' ? `file:${selectedFile?.name}` : formData.url,
        file: uploadMethod === 'file' ? selectedFile : undefined
      };

      await submitContribution(submissionData);
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
    <Card className="border-0 shadow-lg bg-white">
      <CardHeader className="flex flex-row items-center justify-between bg-white border-b border-congo-brown/10">
        <CardTitle className="text-congo-brown">Nouvelle contribution</CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose} className="text-congo-brown hover:bg-congo-brown/10">
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="bg-white">
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

          {formData.type === 'photo' && (
            <div className="space-y-2">
              <Label className="text-congo-brown">Méthode d'ajout *</Label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setUploadMethod('url')}
                  className={`p-3 border rounded-lg flex flex-col items-center space-y-1 text-sm transition-colors ${
                    uploadMethod === 'url'
                      ? 'border-congo-green bg-congo-green/20 text-congo-brown' 
                      : 'border-congo-brown/30 hover:border-congo-green text-congo-brown/80'
                  }`}
                >
                  <Link2 className="h-5 w-5" />
                  <span>Par URL</span>
                </button>
                <button
                  type="button"
                  onClick={() => setUploadMethod('file')}
                  className={`p-3 border rounded-lg flex flex-col items-center space-y-1 text-sm transition-colors ${
                    uploadMethod === 'file'
                      ? 'border-congo-green bg-congo-green/20 text-congo-brown' 
                      : 'border-congo-brown/30 hover:border-congo-green text-congo-brown/80'
                  }`}
                >
                  <Upload className="h-5 w-5" />
                  <span>Télécharger</span>
                </button>
              </div>
            </div>
          )}

          {(formData.type !== 'photo' || uploadMethod === 'url') && (
            <div className="space-y-2">
              <Label htmlFor="url" className="text-congo-brown">
                {formData.type === 'photo' ? 'URL de l\'image *' : 'Lien vers le contenu *'}
              </Label>
              <Input
                id="url"
                type="url"
                value={formData.url}
                onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                placeholder="https://example.com/mon-contenu"
                required={formData.type !== 'photo' || uploadMethod === 'url'}
                className="border-congo-brown/30 text-congo-brown"
              />
            </div>
          )}

          {formData.type === 'photo' && uploadMethod === 'file' && (
            <div className="space-y-2">
              <Label htmlFor="file" className="text-congo-brown">Télécharger une image *</Label>
              <div className="border-2 border-dashed border-congo-brown/30 rounded-lg p-4">
                {!selectedFile ? (
                  <div className="text-center">
                    <Upload className="h-12 w-12 mx-auto text-congo-brown/50 mb-2" />
                    <Input
                      id="file"
                      type="file"
                      accept=".webp,.png,.jpg,.jpeg"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Label 
                      htmlFor="file" 
                      className="cursor-pointer text-congo-brown hover:text-congo-green"
                    >
                      Cliquez pour sélectionner une image
                    </Label>
                    <p className="text-sm text-congo-brown/60 mt-1">
                      Formats acceptés: WebP, PNG, JPG (max 10MB)
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-congo-brown">{selectedFile.name}</span>
                      <Button type="button" variant="ghost" size="sm" onClick={removeFile}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    {filePreview && (
                      <img 
                        src={filePreview} 
                        alt="Prévisualisation" 
                        className="max-w-full h-32 object-cover rounded"
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label className="text-congo-brown">Province *</Label>
            <Select value={formData.province} onValueChange={(value) => setFormData(prev => ({ ...prev, province: value }))}>
              <SelectTrigger className="border-congo-brown/30 text-congo-brown">
                <SelectValue placeholder="Sélectionnez la province" />
              </SelectTrigger>
              <SelectContent className="bg-white">
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
