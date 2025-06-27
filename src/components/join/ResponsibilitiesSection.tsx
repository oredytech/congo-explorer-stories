
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
    <Card className="border-congo-brown/20 bg-white">
      <CardHeader>
        <CardTitle className="text-congo-brown">Vos responsabilités</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {responsibilities.map((responsibility, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="h-5 w-5 text-congo-green mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-congo-brown">{responsibility}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ResponsibilitiesSection;
