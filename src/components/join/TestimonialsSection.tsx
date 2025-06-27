
import { Card, CardContent } from '@/components/ui/card';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Mukala",
      location: "Lubumbashi",
      quote: "Rejoindre VISITE CONGO m'a permis de redécouvrir mon propre pays et de partager sa beauté avec le monde.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "David Kabongo",
      location: "Goma",
      quote: "Grâce à cette équipe, j'ai appris la photographie et je peux maintenant documenter les merveilles du Kivu.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Grace Mwamba",
      location: "Kisangani",
      quote: "Être exploratrice, c'est être ambassadrice de la beauté congolaise. Chaque découverte est une fierté partagée.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ];

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-congo-brown text-center mb-8">
        Témoignages d'explorateurs
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="border-congo-brown/20 bg-white">
            <CardContent className="pt-6">
              <div className="text-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4"
                />
                <p className="text-congo-brown italic mb-4">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold text-congo-brown">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-congo-brown">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </CardContent>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
