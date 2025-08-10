
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useWordPressArticles } from '@/hooks/useWordPressArticles';
import { useYouTubeVideos } from '@/hooks/useYouTubeVideos';

interface ArticleSidebarProps {
  currentArticleId: number;
}

const ArticleSidebar = ({ currentArticleId }: ArticleSidebarProps) => {
  const { articles } = useWordPressArticles(50);
  const { videos } = useYouTubeVideos();
  
  const recentArticles = articles.filter(a => a.id !== currentArticleId).slice(0, 3);
  const recentVideos = videos.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Articles récents */}
      <div className="sticky top-4">
        <Card className="bg-white/95 backdrop-blur-sm border-congo-brown/10 shadow-lg">
          <CardHeader className="bg-congo-green/5 border-b border-congo-brown/10 py-4">
            <CardTitle className="text-congo-brown text-lg">Articles récents</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-80">
              <div className="p-4 space-y-4">
                {recentArticles.map((recentArticle) => (
                  <div key={recentArticle.id} className="group">
                    <Link 
                      to={`/article/${recentArticle.id}`}
                      className="flex space-x-3 p-3 rounded-lg hover:bg-congo-beige/30 transition-all duration-200 group-hover:shadow-md"
                    >
                      <img
                        src={recentArticle.image}
                        alt={recentArticle.title}
                        className="w-16 h-16 object-cover rounded-md shadow-sm group-hover:shadow-md transition-shadow"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=400&fit=crop";
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-congo-brown group-hover:text-congo-green line-clamp-2 transition-colors leading-5 mb-1">
                          {recentArticle.title}
                        </h4>
                        <p className="text-xs text-congo-brown/60">
                          {new Date(recentArticle.date).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Vidéos récentes */}
      <div className="sticky top-[28rem]">
        <Card className="bg-white/95 backdrop-blur-sm border-congo-brown/10 shadow-lg">
          <CardHeader className="bg-congo-green/5 border-b border-congo-brown/10 py-4">
            <CardTitle className="text-congo-brown text-lg">Vidéos récentes</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-80">
              <div className="p-4 space-y-4">
                {recentVideos.map((video) => (
                  <div key={video.id} className="group">
                    <Link 
                      to={`/watch/${video.id}`}
                      className="flex space-x-3 p-3 rounded-lg hover:bg-congo-beige/30 transition-all duration-200 group-hover:shadow-md"
                    >
                      <div className="relative flex-shrink-0">
                        <img
                          src={video.image}
                          alt={video.title}
                          className="w-16 h-16 object-cover rounded-md shadow-sm group-hover:shadow-md transition-shadow"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                            <div className="w-0 h-0 border-l-2 border-l-white border-y-1 border-y-transparent ml-0.5"></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-congo-brown group-hover:text-congo-green line-clamp-2 transition-colors leading-5 mb-1">
                          {video.title}
                        </h4>
                        <p className="text-xs text-congo-brown/60">
                          {video.duration}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ArticleSidebar;
