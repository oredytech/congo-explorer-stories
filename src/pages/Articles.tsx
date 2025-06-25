import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import { Calendar, User, Tag, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const Articles = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'Tous' },
    { id: 'environnement', name: 'Environnement' },
    { id: 'culture', name: 'Culture' },
    { id: 'histoire', name: 'Histoire' },
    { id: 'exploration', name: 'Exploration' },
    { id: 'communaute', name: 'Communauté' },
    { id: 'tradition', name: 'Tradition' }
  ];

  const years = ['all', '2024', '2023', '2022'];

  const articles = [
    {
      id: 1,
      title: "Les Trésors Cachés du Parc National de Kahuzi-Biega",
      excerpt: "Au cœur du Sud-Kivu, le parc national de Kahuzi-Biega abrite les derniers gorilles de montagne de l'Est. Une biodiversité exceptionnelle à préserver.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
      author: "Dr. Alphonse Maindo",
      date: "2024-05-20",
      category: "environnement",
      readTime: "8 min",
      image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800&h=400&fit=crop",
      tags: ["parc national", "gorilles", "biodiversité", "sud-kivu"],
      featured: true
    },
    {
      id: 2,
      title: "L'Art Traditionnel Kuba : Entre Raffinement et Spiritualité",
      excerpt: "Découverte de l'art sophistiqué du royaume Kuba, où chaque motif raconte une histoire séculaire transmise de génération en génération.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      author: "Marie-Claire Ilunga",
      date: "2024-05-15",
      category: "culture",
      readTime: "12 min",
      image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=800&h=400&fit=crop",
      tags: ["art", "kuba", "tradition", "kasaï"],
      featured: false
    },
    {
      id: 3,
      title: "Sur les Traces des Anciens Royaumes du Congo",
      excerpt: "Voyage historique à travers les vestiges des grands royaumes précoloniaux qui ont façonné l'identité congolaise.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      author: "Prof. Joseph Malemba",
      date: "2024-05-12",
      category: "histoire",
      readTime: "15 min",
      image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800&h=400&fit=crop",
      tags: ["royaume", "histoire", "précolonial", "patrimoine"],
      featured: true
    },
    {
      id: 4,
      title: "Exploration des Grottes de Kakontwe",
      excerpt: "Première exploration documentée du réseau souterrain de Kakontwe, révélant des formations géologiques uniques au monde.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      author: "Équipe VISITE CONGO",
      date: "2024-05-08",
      category: "exploration",
      readTime: "10 min",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=400&fit=crop",
      tags: ["grottes", "exploration", "géologie", "katanga"],
      featured: false
    },
    {
      id: 5,
      title: "Les Femmes Entrepreneures de Goma : Résilience et Innovation",
      excerpt: "Portrait de femmes exceptionnelles qui transforment leur communauté à travers l'entrepreneuriat social et l'innovation.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      author: "Nadège Bashige",
      date: "2024-05-05",
      category: "communaute",
      readTime: "7 min",
      image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=800&h=400&fit=crop",
      tags: ["femmes", "entrepreneuriat", "goma", "innovation"],
      featured: false
    },
    {
      id: 6,
      title: "Rituels de Pêche Ancestraux sur le Lac Tanganyika",
      excerpt: "Immersion dans les traditions de pêche millénaires des communautés riveraines du lac Tanganyika.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      author: "Samuel Kayembe",
      date: "2024-05-01",
      category: "tradition",
      readTime: "9 min",
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&h=400&fit=crop",
      tags: ["pêche", "lac tanganyika", "tradition", "katanga"],
      featured: false
    },
    {
      id: 7,
      title: "La Renaissance Musicale de Kinshasa",
      excerpt: "Comment la nouvelle génération d'artistes congolais réinvente la rumba et influence la scène musicale africaine.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      author: "Patrick Wondo",
      date: "2023-12-20",
      category: "culture",
      readTime: "11 min",
      image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800&h=400&fit=crop",
      tags: ["musique", "kinshasa", "rumba", "culture"],
      featured: false
    },
    {
      id: 8,
      title: "Conservation Communautaire dans la Réserve de Tayna",
      excerpt: "Initiative locale de protection de la forêt tropicale impliquant directement les communautés locales.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      author: "Dr. Christine Bashonga",
      date: "2023-11-15",
      category: "environnement",
      readTime: "13 min",
      image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800&h=400&fit=crop",
      tags: ["conservation", "communauté", "forêt", "tayna"],
      featured: false
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesYear = selectedYear === 'all' || article.date.startsWith(selectedYear);
    const matchesSearch = searchTerm === '' || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesYear && matchesSearch;
  });

  const featuredArticles = filteredArticles.filter(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  return (
    <Layout>
      <div className="py-16 bg-congo-beige">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-congo-brown mb-4">
              Nos Articles
            </h1>
            <p className="text-lg text-congo-brown/70 max-w-3xl mx-auto">
              Plongez dans nos récits d'exploration, nos analyses culturelles et nos découvertes 
              sur les richesses méconnues de la République Démocratique du Congo.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-12 space-y-6">
            {/* Search */}
            <div className="max-w-md mx-auto">
              <Input
                type="text"
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border-congo-brown/30 focus:border-congo-green text-congo-brown placeholder:text-congo-brown/50"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={selectedCategory === category.id ? "bg-congo-green hover:bg-congo-green/80 text-congo-beige" : "border-congo-brown/30 text-congo-brown hover:bg-congo-brown/10"}
                >
                  {category.name}
                </Button>
              ))}
            </div>

            {/* Year Filter */}
            <div className="flex justify-center gap-2">
              {years.map((year) => (
                <Button
                  key={year}
                  variant={selectedYear === year ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedYear(year)}
                  className={selectedYear === year ? "bg-congo-green hover:bg-congo-green/80 text-congo-beige" : "border-congo-brown/30 text-congo-brown hover:bg-congo-brown/10"}
                >
                  {year === 'all' ? 'Toutes les années' : year}
                </Button>
              ))}
            </div>
          </div>

          {/* Featured Articles */}
          {featuredArticles.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-congo-brown mb-8 text-center">
                Articles à la une
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredArticles.map((article) => (
                  <div key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-congo-brown/10">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge className="bg-congo-green/10 text-congo-green border-congo-green/20">
                          {categories.find(cat => cat.id === article.category)?.name}
                        </Badge>
                        <div className="flex items-center text-sm text-congo-brown/60">
                          <Clock className="h-4 w-4 mr-1" />
                          {article.readTime}
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-congo-brown mb-3">
                        {article.title}
                      </h3>
                      
                      <p className="text-congo-brown/70 mb-4">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs bg-congo-brown/10 text-congo-brown">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-congo-brown/60">
                          <User className="h-4 w-4 mr-1" />
                          {article.author}
                          <span className="mx-2">•</span>
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(article.date).toLocaleDateString('fr-FR')}
                        </div>
                        <Button size="sm" className="bg-congo-green hover:bg-congo-green/80 text-congo-beige">
                          Lire la suite
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Regular Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularArticles.map((article) => (
              <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-congo-brown/10">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="text-xs bg-congo-brown/10 text-congo-brown">
                      {categories.find(cat => cat.id === article.category)?.name}
                    </Badge>
                    <div className="flex items-center text-sm text-congo-brown/60">
                      <Clock className="h-3 w-3 mr-1" />
                      {article.readTime}
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-congo-brown mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-congo-brown/70 text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-congo-brown/60 mb-3">
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {article.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(article.date).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                  
                  <Button size="sm" variant="outline" className="w-full border-congo-brown/30 text-congo-brown hover:bg-congo-brown/10">
                    Lire l'article
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredArticles.length === 0 && (
            <div className="text-center py-16">
              <p className="text-congo-brown/60 text-lg">
                Aucun article ne correspond à vos critères de recherche.
              </p>
              <Button 
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedYear('all');
                  setSearchTerm('');
                }}
                className="mt-4 bg-congo-green hover:bg-congo-green/80 text-congo-beige"
              >
                Réinitialiser les filtres
              </Button>
            </div>
          )}

          {/* Newsletter Signup */}
          <div className="text-center mt-16 p-8 bg-white rounded-lg border border-congo-brown/10">
            <h2 className="text-2xl font-bold text-congo-brown mb-4">
              Ne manquez aucun article
            </h2>
            <p className="text-congo-brown/70 mb-6">
              Inscrivez-vous à notre newsletter pour recevoir nos dernières découvertes.
            </p>
            <div className="flex max-w-md mx-auto gap-2">
              <Input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 border-congo-brown/30 focus:border-congo-green text-congo-brown placeholder:text-congo-brown/50"
              />
              <Button className="bg-congo-green hover:bg-congo-green/80 text-congo-beige">
                S'abonner
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Articles;
