
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import { Calendar, User, Clock, ArrowLeft, ThumbsUp, Star, Share2, Facebook, Twitter, Linkedin, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useWordPressArticles } from '@/hooks/useWordPressArticles';
import { useYouTubeVideos } from '@/hooks/useYouTubeVideos';
import { toast } from '@/hooks/use-toast';

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const { articles, handleReaction, handleRating } = useWordPressArticles(50);
  const { videos } = useYouTubeVideos();

  const article = articles.find(a => a.slug === slug);
  const recentArticles = articles.filter(a => a.slug !== slug).slice(0, 3);
  const recentVideos = videos.slice(0, 3);

  const shareUrl = `https://visitecongo.net/article/${slug}`;
  const shareTitle = article?.title || '';

  const handleShare = (platform: string) => {
    let url = '';
    
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(shareUrl);
        toast({
          title: "Lien copié",
          description: "Le lien de l'article a été copié dans le presse-papiers",
        });
        return;
    }
    
    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
    }
  };

  const renderStars = (rating: number, interactive = false, articleId?: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${interactive ? 'cursor-pointer' : ''} ${
          i < Math.floor(rating) ? 'text-yellow-500 fill-current' : 
          i < rating ? 'text-yellow-500 fill-current opacity-50' : 'text-gray-300'
        }`}
        onClick={interactive && articleId ? () => handleRating(articleId, i + 1) : undefined}
      />
    ));
  };

  const formatContent = (content: string) => {
    // Nettoyer et formater le contenu HTML
    const cleanContent = content
      .replace(/<p style="text-align: justify;">/g, '<p class="text-justify mb-4">')
      .replace(/<p>/g, '<p class="mb-4">')
      .replace(/<h([1-6])[^>]*>/g, (match, level) => `<h${level} class="text-${7-parseInt(level)}xl font-bold text-congo-brown mb-4 mt-6">`)
      .replace(/<\/h([1-6])>/g, '</h$1>')
      .replace(/<strong>/g, '<strong class="font-semibold text-congo-brown">')
      .replace(/<a href="([^"]*)"[^>]*>/g, '<a href="$1" class="text-congo-green hover:underline" target="_blank" rel="noopener">')
      .replace(/<blockquote>/g, '<blockquote class="border-l-4 border-congo-green pl-4 italic text-congo-brown/80 my-6">')
      .replace(/<ul>/g, '<ul class="list-disc pl-6 mb-4 space-y-2">')
      .replace(/<ol>/g, '<ol class="list-decimal pl-6 mb-4 space-y-2">')
      .replace(/<li>/g, '<li class="text-congo-brown/90">');
    
    return cleanContent;
  };

  if (!article) {
    return (
      <Layout>
        <div className="py-16 bg-congo-beige">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-congo-brown mb-4">Article non trouvé</h1>
            <p className="text-congo-brown/70 mb-8">
              L'article que vous recherchez n'existe pas ou a été supprimé.
            </p>
            <Button asChild className="bg-congo-green hover:bg-congo-green/80 text-congo-beige">
              <Link to="/articles">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour aux articles
              </Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-8 bg-congo-beige min-h-screen">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Article principal */}
            <article className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Image principale */}
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-64 md:h-80 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800&h=400&fit=crop";
                  }}
                />

                <div className="p-6 md:p-8">
                  {/* Bouton retour */}
                  <Button 
                    asChild 
                    variant="ghost" 
                    size="sm" 
                    className="mb-6 text-congo-brown hover:bg-congo-brown/10"
                  >
                    <Link to="/articles">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Retour aux articles
                    </Link>
                  </Button>

                  {/* Métadonnées */}
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <Badge className="bg-congo-green/10 text-congo-green border-congo-green/20">
                      {article.category}
                    </Badge>
                    <div className="flex items-center text-sm text-congo-brown/60">
                      <Clock className="h-4 w-4 mr-1" />
                      {article.readTime}
                    </div>
                    <div className="flex items-center text-sm text-congo-brown/60">
                      <User className="h-4 w-4 mr-1" />
                      {article.author}
                    </div>
                    <div className="flex items-center text-sm text-congo-brown/60">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(article.date).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>

                  {/* Titre */}
                  <h1 className="text-3xl md:text-4xl font-bold text-congo-brown mb-6 leading-tight">
                    {article.title}
                  </h1>

                  {/* Extrait */}
                  <div className="text-lg text-congo-brown/80 mb-6 font-medium leading-relaxed">
                    {article.excerpt}
                  </div>

                  {/* Actions et partage */}
                  <div className="flex flex-wrap items-center justify-between mb-8 p-4 bg-congo-beige/50 rounded-lg">
                    <div className="flex items-center space-x-6">
                      <button
                        onClick={() => handleReaction(article.id, 'like')}
                        className={`flex items-center space-x-2 transition-colors ${
                          article.userReaction === 'like' ? 'text-congo-green' : 'text-congo-brown/60 hover:text-congo-green'
                        }`}
                      >
                        <ThumbsUp className="h-5 w-5" />
                        <span className="font-medium">{article.likes}</span>
                      </button>
                      
                      <div className="flex items-center space-x-2">
                        {renderStars(article.rating, true, article.id)}
                        <span className="text-sm text-congo-brown/60">
                          ({article.totalRatings})
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-congo-brown/60 mr-2">Partager :</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleShare('facebook')}
                        className="p-2"
                      >
                        <Facebook className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleShare('twitter')}
                        className="p-2"
                      >
                        <Twitter className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleShare('linkedin')}
                        className="p-2"
                      >
                        <Linkedin className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleShare('copy')}
                        className="p-2"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Separator className="mb-8" />

                  {/* Contenu de l'article */}
                  <div 
                    className="prose prose-lg max-w-none text-congo-brown leading-relaxed"
                    dangerouslySetInnerHTML={{ 
                      __html: formatContent(article.content) 
                    }}
                  />

                  {/* Tags */}
                  {article.tags.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-congo-brown/10">
                      <h3 className="text-lg font-semibold text-congo-brown mb-3">Tags :</h3>
                      <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-congo-brown/10 text-congo-brown">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </article>

            {/* Barre latérale */}
            <aside className="lg:w-1/3 space-y-6">
              {/* Articles récents */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-congo-brown">Articles récents</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentArticles.map((recentArticle) => (
                    <div key={recentArticle.id} className="flex space-x-3">
                      <img
                        src={recentArticle.image}
                        alt={recentArticle.title}
                        className="w-16 h-16 object-cover rounded"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=400&fit=crop";
                        }}
                      />
                      <div className="flex-1">
                        <Link 
                          to={`/article/${recentArticle.slug}`}
                          className="text-sm font-medium text-congo-brown hover:text-congo-green line-clamp-2"
                        >
                          {recentArticle.title}
                        </Link>
                        <p className="text-xs text-congo-brown/60 mt-1">
                          {new Date(recentArticle.date).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Vidéos récentes */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-congo-brown">Vidéos récentes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentVideos.map((video) => (
                    <div key={video.id} className="flex space-x-3">
                      <div className="relative">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                            <div className="w-0 h-0 border-l-2 border-l-white border-y-1 border-y-transparent ml-0.5"></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <Link 
                          to={`/watch/${video.id}`}
                          className="text-sm font-medium text-congo-brown hover:text-congo-green line-clamp-2"
                        >
                          {video.title}
                        </Link>
                        <p className="text-xs text-congo-brown/60 mt-1">
                          {video.duration}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Section commentaires */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-congo-brown">Commentaires</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-congo-brown/60 mb-4">
                      Les commentaires seront bientôt disponibles
                    </p>
                    <Button className="bg-congo-green hover:bg-congo-green/80 text-congo-beige">
                      Connectez-vous pour commenter
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ArticleDetail;
