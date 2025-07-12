
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ArticleHeaderProps {
  article: {
    id: number;
    title: string;
    excerpt: string;
    image: string;
    date: string;
    author: string;
  };
}

const ArticleHeader = ({ article }: ArticleHeaderProps) => {
  return (
    <div className="relative">
      {article.image && (
        <div className="w-full h-64 md:h-80 overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&h=400&fit=crop";
            }}
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
