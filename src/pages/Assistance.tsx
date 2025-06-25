
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Heart, Send } from 'lucide-react';

const Assistance = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Ici, vous pourriez ajouter la logique d'envoi du formulaire
    alert('Votre message a été envoyé avec succès !');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-congo-beige py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <Heart className="h-12 w-12 text-congo-green mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-congo-brown mb-4">Formulaire d'Assistance</h1>
              <p className="text-congo-brown/70">
                Nous sommes là pour vous aider. N'hésitez pas à nous contacter pour toute question ou demande d'assistance.
              </p>
            </div>

            <Card className="border-congo-brown/20 bg-white">
              <CardHeader>
                <CardTitle className="text-congo-brown">Comment pouvons-nous vous aider ?</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-congo-brown">Nom complet</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="border-congo-brown/30 focus:border-congo-green text-congo-brown"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-congo-brown">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="border-congo-brown/30 focus:border-congo-green text-congo-brown"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="subject" className="text-congo-brown">Sujet</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="border-congo-brown/30 focus:border-congo-green text-congo-brown"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-congo-brown">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="border-congo-brown/30 focus:border-congo-green resize-none text-congo-brown"
                    />
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full bg-congo-green hover:bg-congo-green/80 text-congo-beige">
                    <Send className="h-4 w-4 mr-2" />
                    Envoyer le message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Assistance;
