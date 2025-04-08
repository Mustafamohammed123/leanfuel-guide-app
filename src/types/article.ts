
export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  category: "burn-fat" | "metabolism" | "habits";
  readTime: number;
  isPremium: boolean;
  hasVideo: boolean;
}
