
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare } from 'lucide-react';

const CommentForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.comment) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Commentaire envoyé !",
      description: "Votre commentaire sera modéré avant publication.",
    });

    setFormData({ name: '', email: '', comment: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Card className="border-congo-brown/20 bg-white/95 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center text-congo-brown">
          <MessageSquare className="h-5 w-5 mr-2 text-congo-green" />
          Laisser un commentaire
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-congo-brown mb-2">
                Nom *
              </label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="border-congo-brown/30 focus:border-congo-green bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-congo-brown mb-2">
                Email *
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="border-congo-brown/30 focus:border-congo-green bg-white"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-congo-brown mb-2">
              Commentaire *
            </label>
            <Textarea
              name="comment"
              value={formData.comment}
              onChange={handleInputChange}
              rows={4}
              placeholder="Partagez votre opinion sur cet article..."
              required
              className="border-congo-brown/30 focus:border-congo-green resize-none bg-white"
            />
          </div>

          <Button 
            type="submit" 
            className="bg-congo-green hover:bg-congo-green/80 text-white"
          >
            Publier le commentaire
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CommentForm;
