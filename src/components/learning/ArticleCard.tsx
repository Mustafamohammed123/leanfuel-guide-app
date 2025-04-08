
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, BookText, GraduationCap, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Article } from "@/types/article";

interface ArticleCardProps {
  article: Article;
  isPremiumUser: boolean;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, isPremiumUser }) => {
  const navigate = useNavigate();
  
  const handleArticleClick = () => {
    if (article.isPremium && !isPremiumUser) {
      toast("This is premium content. Upgrade to access!", {
        action: {
          label: "Upgrade",
          onClick: () => {
            // Set premium status for demo purposes
            localStorage.setItem('isPremiumUser', 'true');
            window.location.reload();
          }
        }
      });
      return;
    }
    
    navigate(`/learning/${article.id}`);
  };
  
  const getCategoryIcon = () => {
    switch (article.category) {
      case "burn-fat":
        return <Book className="w-4 h-4 text-orange-500" />;
      case "metabolism":
        return <BookText className="w-4 h-4 text-green-500" />;
      case "habits":
        return <GraduationCap className="w-4 h-4 text-blue-500" />;
      default:
        return <Book className="w-4 h-4 text-leanfuel-primary" />;
    }
  };

  return (
    <Card 
      className={`cursor-pointer hover:shadow-md transition-shadow ${
        article.isPremium ? "border-amber-200 bg-amber-50" : ""
      }`}
      onClick={handleArticleClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start">
          <div className="flex-1">
            <div className="flex items-center mb-2 mt-2">
              {getCategoryIcon()}
              <span className="text-xs text-gray-500 ml-1 capitalize">
                {article.category.replace('-', ' ')}
              </span>
              {article.isPremium && (
                <div className="ml-auto flex items-center">
                  <Star className="w-4 h-4 text-amber-400 mr-1" />
                  <span className="text-xs text-amber-700">Premium</span>
                </div>
              )}
            </div>
            
            <h3 className="font-semibold mb-1">{article.title}</h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{article.description}</p>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">{article.readTime} min read</span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs text-leanfuel-primary hover:text-leanfuel-primary hover:bg-leanfuel-secondary/20"
              >
                Read Article
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
