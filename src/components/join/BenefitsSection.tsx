
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, FileText, MapPin, Users } from 'lucide-react';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: <Camera className="h-8 w-8 text-congo-green" />,
      title: "Formation en photographie",
      description: "Techniques de photographie de paysage et documentaire"
    },
    {
      icon: <FileText className="h-8 w-8 text-congo-green" />,
      title: "Rédaction d'articles",
      description: "Apprenez à raconter les histoires de nos découvertes"
    },
    {
      icon: <MapPin className="h-8 w-8 text-congo-green" />,
      title: "Exploration guidée",
      description: "Participez à nos expéditions dans toute la RDC"
    },
    {
      icon: <Users className="h-8 w-8 text-congo-green" />,
      title: "Réseau communautaire",
      description: "Rejoignez une communauté passionnée d'explorateurs"
    }
  ];

  return (
    <Card className="border-congo-brown/20 bg-white">
      <CardHeader>
        <CardTitle className="text-congo-brown">Ce que nous vous offrons</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start space-x-3">
              {benefit.icon}
              <div>
                <h4 className="font-semibold text-congo-brown mb-1">
                  {benefit.title}
                </h4>
                <p className="text-sm text-congo-brown">
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
