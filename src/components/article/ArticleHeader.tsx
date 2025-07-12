
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ArticleHeaderProps {
  article: {
    id: number;
    title: string;
    excerpt: string;
    featured_image: string;
    date: string;
    author: string;
  };
}

const ArticleHeader = ({ article }: ArticleHeaderProps) => {
  return (
    <div className="relative">
      {article.featured_image && (
        <div className="w-full h-64 md:h-80 overflow-hidden">
          <img
            src={article.featured_image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-congo-brown mb-4 leading-tight">
          {article.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-congo-brown/70 mb-6">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            {new Date(article.date).toLocaleDateString('fr-FR')}
          </div>
          <div className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            {article.author}
          </div>
        </div>

        {article.excerpt && (
          <p className="text-lg text-congo-brown/80 leading-relaxed border-l-4 border-congo-green pl-4 bg-congo-beige/30 p-4 rounded-r-lg">
            {article.excerpt}
          </p>
        )}
      </div>
    </div>
  );
};

export default ArticleHeader;
