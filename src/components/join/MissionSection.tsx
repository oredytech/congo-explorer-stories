
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

const MissionSection = () => {
  return (
    <Card className="border-border bg-card shadow-lg hover:shadow-xl transition-shadow w-full">
      <CardHeader className="bg-primary/5 border-b border-border pb-4">
        <CardTitle className="flex items-center text-card-foreground text-lg md:text-xl">
          <Users className="h-5 w-5 md:h-6 md:w-6 mr-2 text-primary flex-shrink-0" />
          <span className="break-words">Notre Mission</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        <p className="text-card-foreground leading-relaxed text-sm md:text-base break-words">
          Nous sommes un collectif de jeunes Congolais déterminés à changer la perception 
          du monde sur notre pays. À travers nos explorations, nous documentons et partageons 
          les merveilles naturelles, culturelles et humaines de la RDC.
        </p>
      </CardContent>
    </Card>
  );
};

export default MissionSection;
