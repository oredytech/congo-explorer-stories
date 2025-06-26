
import { useState } from 'react';
import { Heart, MessageCircle, Star, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const TestimonialsSection = () => {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    testimonial: '',
    rating: 5
  });

  const testimonials = [
    {
      id: 1,
      name: "Dr. Pauline Mukuna",
      location: "Kinshasa, RDC",
      testimonial: "VISITE CONGO change vraiment la perception qu'on a de notre pays. Chaque contenu partagé révèle la beauté authentique de la RDC.",
      rating: 5,
      date: "2024-06-20",
      verified: true
    },
    {
      id: 2,
      name: "Michel Tshisekedi",
      location: "Lubumbashi, RDC",
      testimonial: "Grâce à ce site, j'ai découvert des lieux magnifiques dans ma propre province. Continuez ce travail exceptionnel !",
      rating: 5,
      date: "2024-06-18",
      verified: true
    },
    {
      id: 3,
      name: "Sarah Johnson",
      location: "Paris, France",
      testimonial: "En tant que française d'origine congolaise, ce site me permet de rester connectée aux merveilles de mon pays natal.",
      rating: 4,
      date: "2024-06-15",
      verified: false
    },
    {
      id: 4,
      name: "Jean-Claude Mbuyi",
      location: "Goma, RDC",
      testimonial: "Les documentaires sur le Kivu sont époustouflants. Vous montrez la vraie beauté de notre région !",
      rating: 5,
      date: "2024-06-12",
      verified: true
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.testimonial) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Merci pour votre témoignage !",
      description: "Votre témoignage sera examiné avant publication.",
    });

    setFormData({ name: '', location: '', testimonial: '', rating: 5 });
    setShowForm(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section className="py-16 bg-congo-beige/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-congo-brown mb-4">
            Témoignages
          </h2>
          <p className="text-lg text-congo-brown/70 max-w-2xl mx-auto mb-8">
            Découvrez ce que pensent nos visiteurs et les amoureux de la RDC
          </p>
          
          <Button 
            onClick={() => setShowForm(true)}
            className="bg-congo-green hover:bg-congo-green/80 text-congo-beige"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Laissez un témoignage
          </Button>
        </div>

        {/* Testimonial Form */}
        {showForm && (
          <Card className="max-w-2xl mx-auto mb-12 bg-white border-congo-brown/20">
            <CardHeader>
              <CardTitle className="text-congo-brown">Votre témoignage</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Votre nom *"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="border-congo-brown/30 focus:border-congo-green text-congo-brown"
                    required
                  />
                  <Input
                    placeholder="Votre localisation"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="border-congo-brown/30 focus:border-congo-green text-congo-brown"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-congo-brown mb-2">
                    Note
                  </label>
                  <div className="flex space-x-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`h-6 w-6 cursor-pointer ${
                          i < formData.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                        }`}
                        onClick={() => setFormData({...formData, rating: i + 1})}
                      />
                    ))}
                  </div>
                </div>
                
                <Textarea
                  placeholder="Partagez votre expérience avec VISITE CONGO... *"
                  value={formData.testimonial}
                  onChange={(e) => setFormData({...formData, testimonial: e.target.value})}
                  className="border-congo-brown/30 focus:border-congo-green text-congo-brown min-h-24"
                  required
                />
                
                <div className="flex space-x-2">
                  <Button type="submit" className="bg-congo-green hover:bg-congo-green/80 text-congo-beige">
                    <Send className="h-4 w-4 mr-2" />
                    Envoyer
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowForm(false)}
                    className="border-congo-brown/30 text-congo-brown hover:bg-congo-brown/10"
                  >
                    Annuler
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white border-congo-brown/20 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-congo-brown">{testimonial.name}</h4>
                      {testimonial.verified && (
                        <Badge className="bg-congo-green/10 text-congo-green border-congo-green/20 text-xs">
                          Vérifié
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-congo-brown/60">{testimonial.location}</p>
                  </div>
                  <div className="flex space-x-1">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
                
                <p className="text-congo-brown/80 mb-4 italic">
                  "{testimonial.testimonial}"
                </p>
                
                <div className="flex items-center justify-between text-xs text-congo-brown/50">
                  <span>{new Date(testimonial.date).toLocaleDateString('fr-FR')}</span>
                  <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-1 hover:text-congo-green transition-colors">
                      <Heart className="h-3 w-3" />
                      <span>Utile</span>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
