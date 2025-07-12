
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
    <Card className="border-border bg-card shadow-lg hover:shadow-xl transition-shadow w-full">
      <CardHeader className="bg-primary/5 border-b border-border pb-4">
        <CardTitle className="text-card-foreground text-lg md:text-xl break-words">
          Vos responsabilités
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        <ul className="space-y-3 md:space-y-4">
          {responsibilities.map((responsibility, index) => (
            <li key={index} className="flex items-start p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
              <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-card-foreground leading-relaxed text-sm md:text-base break-words">
                {responsibility}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ResponsibilitiesSection;
