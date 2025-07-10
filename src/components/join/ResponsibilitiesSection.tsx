
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const ResponsibilitiesSection = () => {
  const responsibilities = [
    "Documenter les lieux visités avec photos et récits",
    "Respecter les communautés locales et leurs traditions",
    "Partager vos découvertes avec l'équipe VISITE CONGO",
    "Participer aux réunions mensuelles (virtuelles ou physiques)",
    "Contribuer à la promotion du patrimoine congolais",
    "Respecter notre charte éthique et environnementale"
  ];

  return (
    <Card className="border-congo-brown/20 bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader className="bg-congo-green/5 border-b border-congo-brown/10">
        <CardTitle className="text-congo-brown">Vos responsabilités</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <ul className="space-y-4">
          {responsibilities.map((responsibility, index) => (
            <li key={index} className="flex items-start p-3 rounded-lg bg-congo-beige/20 hover:bg-congo-beige/30 transition-colors">
              <CheckCircle className="h-5 w-5 text-congo-green mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-congo-brown/90 leading-relaxed">{responsibility}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ResponsibilitiesSection;
