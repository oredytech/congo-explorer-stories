
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import { Calendar, User, Tag, Clock, ArrowRight, ThumbsUp, Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useWordPressArticles } from '@/hooks/useWordPressArticles';

const Articles = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const { articles, isLoading, error, handleReaction, handleRating } = useWordPressArticles(20);

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

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || 
      article.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesYear = selectedYear === 'all' || article.date.startsWith(selectedYear);
    const matchesSearch = searchTerm === '' || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesYear && matchesSearch;
  });

  const featuredArticles = filteredArticles.filter(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  const renderStars = (article: any, interactive = false) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${interactive ? 'cursor-pointer' : ''} ${
          i < Math.floor(article.rating) ? 'text-yellow-500 fill-current' : 
          i < article.rating ? 'text-yellow-500 fill-current opacity-50' : 'text-gray-300'
        } ${interactive && article.userRating > i ? 'text-yellow-600 fill-current' : ''}`}
        onClick={interactive ? () => handleRating(article.id, i + 1) : undefined}
      />
    ));
  };

  if (error) {
    return (
      <Layout>
        <div className="py-16 bg-congo-beige">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-congo-brown mb-4">Erreur de chargement</h1>
            <p className="text-congo-brown/70 mb-8">
              Impossible de charger les articles. Veuillez réessayer plus tard.
            </p>
            <Button onClick={() => window.location.reload()} className="bg-congo-green hover:bg-congo-green/80 text-congo-beige">
              Réessayer
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

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

          {isLoading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-congo-green mx-auto mb-4"></div>
              <p className="text-congo-brown/60 text-lg">Chargement des articles...</p>
            </div>
          ) : (
            <>
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
                          onError={(e) => {
                            e.currentTarget.src = "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800&h=400&fit=crop";
                          }}
                        />
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <Badge className="bg-congo-green/10 text-congo-green border-congo-green/20">
                              {article.category}
                            </Badge>
                            <div className="flex items-center text-sm text-congo-brown/60">
                              <Clock className="h-4 w-4 mr-1" />
                              {article.readTime}
                            </div>
                          </div>
                          
                          <h3 className="text-xl font-bold text-congo-brown mb-3 line-clamp-2">
                            {article.title}
                          </h3>
                          
                          <p className="text-congo-brown/70 mb-4 line-clamp-3">
                            {article.excerpt}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {article.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs bg-congo-brown/10 text-congo-brown">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                          
                          {/* Rating and Reactions */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-4">
                              <button
                                onClick={() => handleReaction(article.id, 'like')}
                                className={`flex items-center space-x-1 transition-colors ${
                                  article.userReaction === 'like' ? 'text-congo-green' : 'text-congo-brown/60 hover:text-congo-green'
                                }`}
                              >
                                <ThumbsUp className="h-4 w-4" />
                                <span>{article.likes}</span>
                              </button>
                              
                              <div className="flex items-center space-x-1">
                                {renderStars(article, true)}
                                <span className="text-sm text-congo-brown/60 ml-1">
                                  ({article.totalRatings})
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-congo-brown/60">
                              <User className="h-4 w-4 mr-1" />
                              {article.author}
                              <span className="mx-2">•</span>
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(article.date).toLocaleDateString('fr-FR')}
                            </div>
                            <Button 
                              size="sm" 
                              className="bg-congo-green hover:bg-congo-green/80 text-congo-beige"
                              onClick={() => window.open(article.link, '_blank')}
                            >
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
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&h=400&fit=crop";
                      }}
                    />
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="secondary" className="text-xs bg-congo-brown/10 text-congo-brown">
                          {article.category}
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
                      
                      {/* Rating and Reactions */}
                      <div className="flex items-center justify-between mb-3">
                        <button
                          onClick={() => handleReaction(article.id, 'like')}
                          className={`flex items-center space-x-1 text-sm transition-colors ${
                            article.userReaction === 'like' ? 'text-congo-green' : 'text-congo-brown/60 hover:text-congo-green'
                          }`}
                        >
                          <ThumbsUp className="h-3 w-3" />
                          <span>{article.likes}</span>
                        </button>
                        
                        <div className="flex items-center space-x-1">
                          {renderStars(article, true)}
                          <span className="text-xs text-congo-brown/60 ml-1">
                            ({article.totalRatings})
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-congo-brown/60 mb-3">
                        <div className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          <span className="truncate">{article.author}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(article.date).toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                      
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full border-congo-brown/30 text-congo-brown hover:bg-congo-brown/10"
                        onClick={() => window.open(article.link, '_blank')}
                      >
                        Lire l'article
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* No Results */}
              {filteredArticles.length === 0 && !isLoading && (
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
            </>
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
