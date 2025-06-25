
import { useTranslation } from 'react-i18next';
import { Users, Camera, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CTASection = () => {
  const { t } = useTranslation();

  const actions = [
    {
      icon: Users,
      title: t('home.joinExplorers'),
      description: "Rejoignez notre communauté d'explorateurs passionnés et participez à la documentation de la beauté congolaise.",
      link: "/rejoindre",
      buttonText: "Rejoindre",
      color: "green"
    },
    {
      icon: Camera,
      title: t('home.addContent'),
      description: "Partagez vos découvertes avec le monde entier. Chaque photo et vidéo enrichit notre collection.",
      link: "/ajouter",
      buttonText: "Ajouter",
      color: "blue"
    },
    {
      icon: Heart,
      title: "Soutenez notre mission",
      description: "Aidez-nous à continuer notre travail de documentation et de promotion du patrimoine congolais.",
      link: "/soutenir",
      buttonText: "Soutenir",
      color: "yellow"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-16 bg-congo-brown text-congo-beige">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-congo-beige">
            Participez à l'aventure
          </h2>
          <p className="text-lg text-congo-beige/80 max-w-2xl mx-auto">
            Ensemble, nous pouvons révéler au monde la beauté extraordinaire de la République Démocratique du Congo
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {actions.map((action, index) => {
            const Icon = action.icon;
            const colorClasses = {
              green: "text-congo-green bg-congo-green/10",
              blue: "text-blue-400 bg-blue-400/10", 
              yellow: "text-yellow-400 bg-yellow-400/10"
            };

            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="bg-congo-brown/50 border-congo-beige/20 hover:bg-congo-brown/70 transition-all duration-300 group h-full">
                  <CardContent className="p-8 text-center space-y-6">
                    <div className={`w-16 h-16 rounded-full ${colorClasses[action.color as keyof typeof colorClasses]} flex items-center justify-center mx-auto`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-congo-beige">
                        {action.title}
                      </h3>
                      <p className="text-congo-beige/80 leading-relaxed">
                        {action.description}
                      </p>
                    </div>

                    <Button asChild variant="outline" className="border-congo-beige/60 text-congo-beige hover:bg-congo-beige hover:text-congo-brown group-hover:border-congo-beige/80 bg-transparent">
                      <Link to={action.link} className="flex items-center space-x-2">
                        <span>{action.buttonText}</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
