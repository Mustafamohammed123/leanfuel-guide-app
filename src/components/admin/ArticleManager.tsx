
import React, { useState } from "react";
import { PlusCircle, Edit, Trash2, Search, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useArticles } from "@/hooks/useArticles";
import { Article } from "@/types/article";

const ArticleManager = () => {
  const { articles } = useArticles();
  const [localArticles, setLocalArticles] = useState<Article[]>(articles);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Partial<Article> | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddEditArticle = () => {
    // In a real app, this would save to the database
    if (editingArticle) {
      if (editingArticle.id) {
        // Edit existing article
        setLocalArticles(localArticles.map(a => a.id === editingArticle.id ? editingArticle as Article : a));
      } else {
        // Add new article with generated ID
        const newArticle = { 
          ...editingArticle, 
          id: `article-${Date.now()}`,
          content: editingArticle.content || 'New article content'
        } as Article;
        setLocalArticles([...localArticles, newArticle]);
      }
    }
    setIsDialogOpen(false);
    setEditingArticle(null);
  };

  const handleDeleteArticle = (id: string) => {
    setLocalArticles(localArticles.filter(a => a.id !== id));
  };

  const openAddDialog = () => {
    setEditingArticle({
      title: "",
      description: "",
      category: "habits",
      readTime: 5,
      isPremium: false,
      hasVideo: false,
      content: ""
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (article: Article) => {
    setEditingArticle({ ...article });
    setIsDialogOpen(true);
  };

  const filteredArticles = localArticles.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Learning Hub Articles</h2>
        <Button onClick={openAddDialog} className="flex items-center gap-1">
          <PlusCircle className="h-4 w-4" />
          Add New Article
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative mb-4">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search articles..."
              className="pl-8"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Read Time</TableHead>
                <TableHead>Premium</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredArticles.map(article => (
                <TableRow key={article.id}>
                  <TableCell className="font-medium">{article.title}</TableCell>
                  <TableCell>{article.category}</TableCell>
                  <TableCell>{article.readTime} min</TableCell>
                  <TableCell>{article.isPremium ? "Yes" : "No"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(article)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteArticle(article.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{editingArticle?.id ? 'Edit Article' : 'Add New Article'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={editingArticle?.title || ''}
                onChange={e => setEditingArticle({ ...editingArticle, title: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editingArticle?.description || ''}
                onChange={e => setEditingArticle({ ...editingArticle, description: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={editingArticle?.category || 'habits'} 
                  onValueChange={(value: "burn-fat" | "metabolism" | "habits") => 
                    setEditingArticle({ ...editingArticle, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="habits">Habits</SelectItem>
                    <SelectItem value="burn-fat">Burn Fat</SelectItem>
                    <SelectItem value="metabolism">Metabolism</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="readTime">Read Time (minutes)</Label>
                <Input
                  id="readTime"
                  type="number"
                  value={editingArticle?.readTime || 5}
                  onChange={e => setEditingArticle({ ...editingArticle, readTime: parseInt(e.target.value) })}
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isPremium"
                  checked={editingArticle?.isPremium || false}
                  onChange={e => setEditingArticle({ ...editingArticle, isPremium: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="isPremium">Premium Content</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="hasVideo"
                  checked={editingArticle?.hasVideo || false}
                  onChange={e => setEditingArticle({ ...editingArticle, hasVideo: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="hasVideo">Includes Video</Label>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">Content (HTML)</Label>
              <Textarea
                id="content"
                value={editingArticle?.content || ''}
                onChange={e => setEditingArticle({ ...editingArticle, content: e.target.value })}
                className="min-h-[300px] font-mono text-sm"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddEditArticle}>Save Article</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ArticleManager;
