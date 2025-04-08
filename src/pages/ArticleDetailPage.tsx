
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, BookOpen, Play } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import PremiumContentBanner from "@/components/learning/PremiumContentBanner";
import { useArticles } from "@/hooks/useArticles";
import { Article } from "@/types/article";

const ArticleDetailPage = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const navigate = useNavigate();
  const { articles, isPremiumUser } = useArticles();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    // Find the article with the matching ID
    const foundArticle = articles.find(a => a.id === articleId) || null;
    setArticle(foundArticle);
  }, [articleId, articles]);

  if (!article) {
    return (
      <div className="leanfuel-container flex items-center justify-center h-screen">
        <p>Article not found. <Button onClick={() => navigate('/learning')}>Back to Learning Hub</Button></p>
      </div>
    );
  }

  // Check if premium content is accessible
  const showLimitedContent = article.isPremium && !isPremiumUser;

  return (
    <div className="leanfuel-container pb-20">
      <div className="pt-6 pb-4">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-4" 
          onClick={() => navigate('/learning')}
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Learning Hub
        </Button>
        
        <div className="flex items-center mb-2">
          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 capitalize">
            {article.category.replace('-', ' ')}
          </span>
          {article.isPremium && (
            <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700 ml-2 flex items-center">
              <Star className="mr-1 h-3 w-3" />
              Premium
            </span>
          )}
          <span className="ml-auto text-xs text-gray-500">
            {article.readTime} min read
          </span>
        </div>
        
        <h1 className="text-2xl font-bold text-leanfuel-dark mb-2">{article.title}</h1>
        <p className="text-gray-600 mb-4">{article.description}</p>
        
        {article.hasVideo && (
          <div className="mb-6">
            {!showLimitedContent ? (
              <div className="relative bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play className="h-16 w-16 text-leanfuel-primary opacity-80" />
                </div>
                <p className="text-sm text-gray-500 mt-32">Video content available for premium users</p>
              </div>
            ) : (
              <Card className="border border-amber-200 bg-amber-50">
                <CardContent className="p-4 flex items-center">
                  <Play className="h-6 w-6 text-amber-500 mr-3" />
                  <div>
                    <h3 className="font-medium">Premium Video Content</h3>
                    <p className="text-sm text-gray-600">Upgrade to watch the video explainer for this article.</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
        
        <Card>
          <CardContent className="p-6">
            {!showLimitedContent ? (
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            ) : (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Premium Content</h3>
                <p className="text-gray-600 mb-6">
                  This article is exclusive to premium members. Upgrade now to access all our premium content, including AI-personalized articles and video explainers.
                </p>
                <PremiumContentBanner />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ArticleDetailPage;
