
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

const MissionSection = () => {
  return (
    <Card className="border-congo-brown/20 bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader className="bg-congo-green/5 border-b border-congo-brown/10">
        <CardTitle className="flex items-center text-congo-brown">
          <Users className="h-6 w-6 mr-2 text-congo-green" />
          Notre Mission
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <p className="text-congo-brown/90 leading-relaxed">
          Nous sommes un collectif de jeunes Congolais déterminés à changer la perception 
          du monde sur notre pays. À travers nos explorations, nous documentons et partageons 
          les merveilles naturelles, culturelles et humaines de la RDC.
        </p>
      </CardContent>
    </Card>
  );
};

export default MissionSection;
