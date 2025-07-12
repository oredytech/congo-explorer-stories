
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

const MissionSection = () => {
  return (
    <Card className="border-congo-brown/20 bg-white/98 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader className="bg-congo-green/10 border-b border-congo-brown/10 pb-4">
        <CardTitle className="flex items-center text-congo-brown text-lg md:text-xl">
          <Users className="h-5 w-5 md:h-6 md:w-6 mr-2 text-congo-green flex-shrink-0" />
          <span className="break-words">Notre Mission</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        <p className="text-congo-brown/90 leading-relaxed text-sm md:text-base">
          Nous sommes un collectif de jeunes Congolais déterminés à changer la perception 
          du monde sur notre pays. À travers nos explorations, nous documentons et partageons 
          les merveilles naturelles, culturelles et humaines de la RDC.
        </p>
      </CardContent>
    </Card>
  );
};

export default MissionSection;
