
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, FileText, MapPin, Users } from 'lucide-react';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: Camera,
      title: "Formation en photographie",
      description: "Techniques de photographie de paysage et documentaire"
    },
    {
      icon: FileText,
      title: "Rédaction d'articles",
      description: "Apprenez à raconter les histoires de nos découvertes"
    },
    {
      icon: MapPin,
      title: "Exploration guidée",
      description: "Participez à nos expéditions dans toute la RDC"
    },
    {
      icon: Users,
      title: "Réseau communautaire",
      description: "Rejoignez une communauté passionnée d'explorateurs"
    }
  ];

  return (
    <Card className="border-border bg-card shadow-lg hover:shadow-xl transition-shadow w-full">
      <CardHeader className="bg-primary/5 border-b border-border pb-4">
        <CardTitle className="text-card-foreground text-lg md:text-xl break-words">
          Ce que nous vous offrons
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 md:p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
              <div className="flex-shrink-0 mt-1">
                <benefit.icon className="h-6 w-6 md:h-8 md:w-8 text-primary flex-shrink-0" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-card-foreground mb-2 text-sm md:text-base break-words">
                  {benefit.title}
                </h4>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed break-words">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BenefitsSection;
