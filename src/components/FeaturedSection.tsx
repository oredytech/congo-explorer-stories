
import { useTranslation } from 'react-i18next';
import { ArrowRight, Calendar, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FeaturedSection = () => {
  const { t } = useTranslation();

  const featuredArticles = [
    {
      id: 1,
      title: "Les Chutes de Boyoma",
      excerpt: "Découvrez l'une des merveilles naturelles les plus spectaculaires de la Province Orientale...",
      image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a",
      province: "Province Orientale",
      date: "2024-01-15",
      category: "Nature"
    },
    {
      id: 2,
      title: "Art traditionnel Kuba",
      excerpt: "Plongez dans l'univers artistique fascinant du royaume Kuba et ses créations uniques...",
      image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac",
      province: "Kasaï",
      date: "2024-01-10",
      category: "Culture"
    },
    {
      id: 3,
      title: "Parc National de la Garamba",
      excerpt: "Rencontrez la faune sauvage préservée dans l'un des plus anciens parcs d'Afrique...",
      image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
      province: "Haut-Uele",
      date: "2024-01-05",
      category: "Wildlife"
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-congo-brown mb-4">
            {t('home.featuredArticles')}
          </h2>
          <p className="text-lg text-congo-brown/70 max-w-2xl mx-auto">
            Découvrez nos dernières explorations et reportages sur les merveilles cachées de la RDC
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {featuredArticles.map((article) => (
            <motion.div key={article.id} variants={itemVariants}>
              <Card className="h-full hover:shadow-xl transition-all duration-300 group border-congo-brown/20 bg-white">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-congo-green text-white px-2 py-1 rounded-full text-xs font-medium">
                      {article.category}
                    </span>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-congo-brown group-hover:text-congo-green transition-colors">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <p className="text-congo-brown/70 text-sm leading-relaxed mb-4">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-congo-brown/60">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{article.province}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(article.date).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full group-hover:bg-congo-green/10 group-hover:text-congo-green text-congo-brown">
                    Lire l'article
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center">
          <Button asChild size="lg" variant="outline" className="border-congo-brown text-congo-brown hover:bg-congo-brown hover:text-congo-beige">
            <Link to="/articles" className="flex items-center space-x-2">
              <span>Voir tous les articles</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
