
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

const MissionSection = () => {
  return (
    <Card className="border-congo-brown/20 bg-white">
      <CardHeader>
        <CardTitle className="flex items-center text-congo-brown">
          <Users className="h-6 w-6 mr-2 text-congo-green" />
          Notre Mission
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-congo-brown">
          Nous sommes un collectif de jeunes Congolais déterminés à changer la perception 
          du monde sur notre pays. À travers nos explorations, nous documentons et partageons 
          les merveilles naturelles, culturelles et humaines de la RDC.
        </p>
      </CardContent>
    </Card>
  );
};

export default MissionSection;
