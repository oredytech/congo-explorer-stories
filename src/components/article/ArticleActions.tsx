
import { Heart, Share2, Bookmark, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ArticleActionsProps {
  article: {
    id: number;
    title: string;
  };
}

const ArticleActions = ({ article }: ArticleActionsProps) => {
  const { toast } = useToast();

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: article.title,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Lien copié !",
          description: "Le lien de l'article a été copié dans le presse-papiers.",
        });
      }
    } catch (error) {
      console.log('Erreur de partage:', error);
    }
  };

  const handleLike = () => {
    toast({
      title: "Article aimé !",
      description: "Merci pour votre appréciation.",
    });
  };

  const handleBookmark = () => {
    toast({
      title: "Article sauvegardé !",
      description: "L'article a été ajouté à vos favoris.",
    });
  };

  return (
    <div className="flex items-center justify-between py-4 mb-6 border-y border-congo-brown/10">
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLike}
          className="text-congo-brown hover:text-congo-green hover:bg-congo-green/10"
        >
          <Heart className="h-4 w-4 mr-1" />
          J'aime
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBookmark}
          className="text-congo-brown hover:text-congo-green hover:bg-congo-green/10"
        >
          <Bookmark className="h-4 w-4 mr-1" />
          Sauvegarder
        </Button>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleShare}
        className="text-congo-brown hover:text-congo-green hover:bg-congo-green/10"
      >
        <Share2 className="h-4 w-4 mr-1" />
        Partager
      </Button>
    </div>
  );
};

export default ArticleActions;
