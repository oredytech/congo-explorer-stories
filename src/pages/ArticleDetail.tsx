
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWordPressArticles } from '@/hooks/useWordPressArticles';
import ArticleHeader from '@/components/article/ArticleHeader';
import ArticleActions from '@/components/article/ArticleActions';
import ArticleSidebar from '@/components/article/ArticleSidebar';
import CommentForm from '@/components/article/CommentForm';
import WordPressViewTracker from '@/components/WordPressViewTracker';

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const { articles } = useWordPressArticles(50);

  const article = articles.find(a => a.slug === slug);

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
        <div className="py-16 bg-gradient-to-br from-congo-beige/30 to-white min-h-screen">
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
      <div className="py-8 bg-gradient-to-br from-congo-beige/30 to-white min-h-screen">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col xl:flex-row gap-8">
            {/* Article principal */}
            <article className="xl:w-2/3 min-w-0">
              <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
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

                {/* Header de l'article */}
                <ArticleHeader article={article} />

                {/* Tracking des vues WordPress */}
                <div className="px-6 pb-2">
                  <WordPressViewTracker />
                </div>

                <div className="p-6 md:p-8">
                  {/* Actions et partage */}
                  <ArticleActions article={article} />

                  {/* Contenu de l'article */}
                  <div 
                    className="prose prose-lg max-w-none leading-relaxed mb-8"
                    dangerouslySetInnerHTML={{ 
                      __html: formatContent(article.content) 
                    }}
                  />

                  {/* Tags */}
                  {article.tags.length > 0 && (
                    <div className="pt-6 border-t border-congo-brown/10">
                      <h3 className="text-lg font-semibold text-congo-brown mb-3">Tags :</h3>
                      <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1 bg-congo-brown/10 text-congo-brown rounded-full text-sm hover:bg-congo-brown/20 transition-colors">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Formulaire de commentaire */}
              <div className="mt-8">
                <CommentForm />
              </div>
            </article>

            {/* Barre latérale */}
            <aside className="xl:w-1/3 min-w-0">
              <ArticleSidebar currentArticleId={article.id} />
            </aside>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ArticleDetail;
