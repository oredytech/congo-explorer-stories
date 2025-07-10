
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import { Calendar, User, Clock, ArrowLeft, ThumbsUp, Star, Share2, Facebook, Twitter, Linkedin, Copy, MessageSquare, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useWordPressArticles } from '@/hooks/useWordPressArticles';
import { useYouTubeVideos } from '@/hooks/useYouTubeVideos';
import { toast } from '@/hooks/use-toast';
import { useState } from 'react';

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const { articles, handleReaction, handleRating } = useWordPressArticles(50);
  const { videos } = useYouTubeVideos();
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

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
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`;
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

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !name.trim() || !email.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Commentaire envoyé",
      description: "Votre commentaire a été envoyé avec succès",
    });
    
    setComment('');
    setName('');
    setEmail('');
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
    const cleanContent = content
      .replace(/<p style="text-align: justify;">/g, '<p class="text-justify mb-6 leading-relaxed text-congo-brown">')
      .replace(/<p>/g, '<p class="mb-6 leading-relaxed text-congo-brown">')
      .replace(/<h([1-6])[^>]*>/g, (match, level) => `<h${level} class="text-${7-parseInt(level)}xl font-bold text-congo-brown mb-6 mt-8 leading-tight">`)
      .replace(/<\/h([1-6])>/g, '</h$1>')
      .replace(/<strong>/g, '<strong class="font-semibold text-congo-brown">')
      .replace(/<a href="([^"]*)"[^>]*>/g, '<a href="$1" class="text-congo-green hover:underline font-medium" target="_blank" rel="noopener">')
      .replace(/<blockquote>/g, '<blockquote class="border-l-4 border-congo-green pl-6 italic text-congo-brown/90 my-8 bg-congo-beige/50 py-4 rounded-r-lg">')
      .replace(/<ul>/g, '<ul class="list-disc pl-8 mb-6 space-y-3">')
      .replace(/<ol>/g, '<ol class="list-decimal pl-8 mb-6 space-y-3">')
      .replace(/<li>/g, '<li class="text-congo-brown/90 leading-relaxed">');
    
    return cleanContent;
  };

  if (!article) {
    return (
      <Layout>
        <div className="py-16 bg-congo-beige min-h-screen">
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
                {/* Bouton retour */}
                <div className="p-6 pb-0">
                  <Button 
                    asChild 
                    variant="ghost" 
                    size="sm" 
                    className="mb-4 text-congo-brown hover:bg-congo-brown/10"
                  >
                    <Link to="/articles">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Retour aux articles
                    </Link>
                  </Button>
                </div>

                {/* Titre en premier */}
                <div className="px-6 md:px-8">
                  <h1 className="text-3xl md:text-4xl font-bold text-congo-brown mb-6 leading-tight">
                    {article.title}
                  </h1>

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
                </div>

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
                  {/* Extrait */}
                  <div className="text-lg text-congo-brown/80 mb-8 font-medium leading-relaxed bg-congo-beige/30 p-6 rounded-lg border-l-4 border-congo-green">
                    {article.excerpt}
                  </div>

                  {/* Actions et partage */}
                  <div className="flex flex-wrap items-center justify-between mb-8 p-6 bg-congo-beige/50 rounded-lg border border-congo-brown/10">
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

                    <div className="flex items-center space-x-2 mt-4 lg:mt-0">
                      <span className="text-sm text-congo-brown/60 mr-2">Partager :</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleShare('facebook')}
                        className="p-2 border-congo-brown/20 hover:bg-congo-brown/10"
                      >
                        <Facebook className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleShare('twitter')}
                        className="p-2 border-congo-brown/20 hover:bg-congo-brown/10"
                      >
                        <Twitter className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleShare('linkedin')}
                        className="p-2 border-congo-brown/20 hover:bg-congo-brown/10"
                      >
                        <Linkedin className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleShare('whatsapp')}
                        className="p-2 border-congo-brown/20 hover:bg-congo-brown/10"
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleShare('copy')}
                        className="p-2 border-congo-brown/20 hover:bg-congo-brown/10"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Separator className="mb-8" />

                  {/* Contenu de l'article */}
                  <div 
                    className="prose prose-lg max-w-none leading-relaxed"
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
                          <Badge key={tag} variant="secondary" className="bg-congo-brown/10 text-congo-brown hover:bg-congo-brown/20">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Formulaire de commentaire */}
                  <div className="mt-12 pt-8 border-t border-congo-brown/10">
                    <h3 className="text-2xl font-bold text-congo-brown mb-6">Laisser un commentaire</h3>
                    <form onSubmit={handleCommentSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-congo-brown mb-2">
                            Nom *
                          </label>
                          <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border border-congo-brown/20 rounded-md focus:outline-none focus:ring-2 focus:ring-congo-green bg-white text-congo-brown"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-congo-brown mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-congo-brown/20 rounded-md focus:outline-none focus:ring-2 focus:ring-congo-green bg-white text-congo-brown"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="comment" className="block text-sm font-medium text-congo-brown mb-2">
                          Commentaire *
                        </label>
                        <Textarea
                          id="comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          rows={4}
                          className="w-full border-congo-brown/20 focus:ring-congo-green bg-white text-congo-brown"
                          placeholder="Écrivez votre commentaire ici..."
                          required
                        />
                      </div>
                      <Button type="submit" className="bg-congo-green hover:bg-congo-green/80 text-congo-beige">
                        <Send className="h-4 w-4 mr-2" />
                        Publier le commentaire
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </article>

            {/* Barre latérale */}
            <aside className="lg:w-1/3 space-y-6">
              {/* Articles récents */}
              <Card className="bg-white border-congo-brown/10 shadow-md">
                <CardHeader className="bg-congo-green/5 border-b border-congo-brown/10">
                  <CardTitle className="text-congo-brown text-lg">Articles récents</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <ScrollArea className="h-80">
                    <div className="space-y-4">
                      {recentArticles.map((recentArticle) => (
                        <div key={recentArticle.id} className="flex space-x-3 p-3 rounded-lg hover:bg-congo-beige/30 transition-colors">
                          <img
                            src={recentArticle.image}
                            alt={recentArticle.title}
                            className="w-16 h-16 object-cover rounded-md shadow-sm"
                            onError={(e) => {
                              e.currentTarget.src = "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=400&fit=crop";
                            }}
                          />
                          <div className="flex-1">
                            <Link 
                              to={`/article/${recentArticle.slug}`}
                              className="text-sm font-medium text-congo-brown hover:text-congo-green line-clamp-2 transition-colors"
                            >
                              {recentArticle.title}
                            </Link>
                            <p className="text-xs text-congo-brown/60 mt-1">
                              {new Date(recentArticle.date).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Vidéos récentes */}
              <Card className="bg-white border-congo-brown/10 shadow-md">
                <CardHeader className="bg-congo-green/5 border-b border-congo-brown/10">
                  <CardTitle className="text-congo-brown text-lg">Vidéos récentes</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <ScrollArea className="h-80">
                    <div className="space-y-4">
                      {recentVideos.map((video) => (
                        <div key={video.id} className="flex space-x-3 p-3 rounded-lg hover:bg-congo-beige/30 transition-colors">
                          <div className="relative">
                            <img
                              src={video.image}
                              alt={video.title}
                              className="w-16 h-16 object-cover rounded-md shadow-sm"
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
                              className="text-sm font-medium text-congo-brown hover:text-congo-green line-clamp-2 transition-colors"
                            >
                              {video.title}
                            </Link>
                            <p className="text-xs text-congo-brown/60 mt-1">
                              {video.duration}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
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
