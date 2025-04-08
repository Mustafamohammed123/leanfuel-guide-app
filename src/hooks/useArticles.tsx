
import { useState, useEffect } from "react";
import { Article } from "@/types/article";
import articlesData from "@/data/articles";

export const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isPremiumUser, setIsPremiumUser] = useState<boolean>(false);

  useEffect(() => {
    // In a real app, fetch articles from API
    setArticles(articlesData);
    
    // Check premium status
    const premiumStatus = localStorage.getItem('isPremiumUser') === 'true';
    setIsPremiumUser(premiumStatus);
  }, []);

  return {
    articles,
    isPremiumUser,
  };
};
