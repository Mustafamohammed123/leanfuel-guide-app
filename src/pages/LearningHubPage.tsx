
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Book, BookOpen, GraduationCap, Star } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import ArticleCard from "@/components/learning/ArticleCard";
import PremiumContentBanner from "@/components/learning/PremiumContentBanner";
import { useArticles } from "@/hooks/useArticles";

const LearningHubPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const { articles, isPremiumUser } = useArticles();
  
  // Filter articles based on search query and active category
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        article.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || article.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="leanfuel-container pb-20">
      <header className="pt-8 pb-4">
        <div className="flex items-center mb-2">
          <BookOpen className="mr-2 text-leanfuel-primary" size={24} />
          <h1 className="text-2xl font-bold text-leanfuel-dark">Learning Hub</h1>
        </div>
        <p className="text-gray-500">Nutrition articles to help you reach your goals</p>
      </header>

      <div className="mb-4">
        <Input
          type="search"
          placeholder="Search articles..."
          className="w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all" onValueChange={setActiveCategory} className="mb-6">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="burn-fat">Burn Fat</TabsTrigger>
          <TabsTrigger value="metabolism">Metabolism</TabsTrigger>
          <TabsTrigger value="habits">Healthy Habits</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          <div className="space-y-4">
            {filteredArticles.map(article => (
              <ArticleCard key={article.id} article={article} isPremiumUser={isPremiumUser} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="burn-fat" className="mt-4">
          <div className="space-y-4">
            {filteredArticles.map(article => (
              <ArticleCard key={article.id} article={article} isPremiumUser={isPremiumUser} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="metabolism" className="mt-4">
          <div className="space-y-4">
            {filteredArticles.map(article => (
              <ArticleCard key={article.id} article={article} isPremiumUser={isPremiumUser} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="habits" className="mt-4">
          <div className="space-y-4">
            {filteredArticles.map(article => (
              <ArticleCard key={article.id} article={article} isPremiumUser={isPremiumUser} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {!isPremiumUser && <PremiumContentBanner />}

      <BottomNavigation />
    </div>
  );
};

export default LearningHubPage;
