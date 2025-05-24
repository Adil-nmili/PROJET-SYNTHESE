import { Card, CardHeader } from '@/components/ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from 'react';
import { NewsService } from '../../../service/newsService';
import { format } from 'date-fns';
import ArticleDetails from './ArticleDetails';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import EditArticlePopup from './EditArticlePopup';
import { toast } from 'react-hot-toast';

export default function ArticlesTable() {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('all');
  const [selectedDate, setSelectedDate] = useState('all');
  const [authors, setAuthors] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [editingArticle, setEditingArticle] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await NewsService.getAllArticles(); 
      if (response.status === 201) {
        const articlesData = response.data;
        console.log('Articles Data:', articlesData);
        
        setArticles(articlesData);
        setFilteredArticles(articlesData);
        
        // Extract unique authors
        const uniqueAuthors = articlesData.reduce((acc, article) => {
          const authorId = article.created_by?.id;
          const authorName = article.created_by ? 
            `${article.created_by.first_name} ${article.created_by.last_name}` : 
            'Unknown Author';
            
          if (authorId && !acc.some(a => a.id === authorId)) {
            acc.push({ id: authorId, name: authorName });
          }
          return acc;
        }, []);
        
        console.log('Unique Authors:', uniqueAuthors);
        setAuthors(uniqueAuthors);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
      toast.error('Error fetching articles');
    }
  };

  useEffect(() => {
    filterArticles();
  }, [searchQuery, selectedAuthor, selectedDate]);

  const filterArticles = () => {
    let filtered = [...articles];
    console.log('Starting filter with:', { 
      selectedAuthor, 
      totalArticles: filtered.length 
    });

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by author
    if (selectedAuthor !== 'all') {
      console.log('Filtering by author:', selectedAuthor);
      filtered = filtered.filter(article => {
        const articleAuthorId = article.created_by?.id;
        const matches = articleAuthorId === selectedAuthor;
        return matches;
      });
    }

    // Filter by date
    if (selectedDate !== 'all') {
      const today = new Date();
      const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const lastMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

      filtered = filtered.filter(article => {
        const articleDate = new Date(article.date);
        switch (selectedDate) {
          case 'today':
            return articleDate.toDateString() === today.toDateString();
          case 'week':
            return articleDate >= lastWeek;
          case 'month':
            return articleDate >= lastMonth;
          default:
            return true;
        }
      });
    }
    setFilteredArticles(filtered);
  };

  const handleUpdateArticle = (updatedArticle) => {
    setArticles(prev => prev.map(article => 
      article.id === updatedArticle.id ? updatedArticle : article
    ));
    setFilteredArticles(prev => prev.map(article => 
      article.id === updatedArticle.id ? updatedArticle : article
    ));
  };

  const handleDelete = async (articleId) => {
    setDeleteLoading(true);
    try {
      const response = await NewsService.deleteArticle(articleId);
      if (response.status === 200) {
        toast.success('Article deleted successfully');
        // Update the articles list
        setArticles(prev => prev.filter(article => article._id !== articleId));
        setFilteredArticles(prev => prev.filter(article => article._id !== articleId));
      }
    } catch (error) {
      toast.error('Error deleting article');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="space-y-4">
          <form className='relative'>
            <Input 
              placeholder='Search for an Article...' 
              className='placeholder:text-s pr-13'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button className='absolute top-0 right-0' variant={'outline'}>
              <Search className="h-4 w-4" />
            </Button>
          </form>

          <div className="flex gap-4">
            <Select value={selectedAuthor} onValueChange={(value) => {
              console.log('Author selected:', value);
              setSelectedAuthor(value);
            }}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Filter by Author" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Authors</SelectItem>
                {authors.map((author) => (
                  <SelectItem key={author.id} value={author.id}>
                    {author.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedDate} onValueChange={setSelectedDate}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Filter by Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">Last Week</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table Display */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredArticles.map((article) => (
                  <TableRow key={article._id}>
                    <TableCell className="font-medium">{article.title}</TableCell>
                    <TableCell>{article.created_by.first_name + ' ' + article.created_by.last_name}</TableCell>
                    <TableCell>{format(new Date(article.date), 'PPP')}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size='sm' onClick={() => setSelectedArticle(article)}>
                              Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="w-[1000px] max-w-[1000px]">
                            <ArticleDetails article={article} />
                          </DialogContent>
                        </Dialog>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setEditingArticle(article)}
                        >
                          Edit
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              disabled={deleteLoading}
                            >
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure you want to delete this article?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the article
                                and remove it from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(article._id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                disabled={deleteLoading}
                              >
                                {deleteLoading ? 'Deleting...' : 'Delete'}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredArticles.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4">
                      No articles found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardHeader>
      {editingArticle && (
        <EditArticlePopup
          article={editingArticle}
          onClose={() => setEditingArticle(null)}
          onUpdate={handleUpdateArticle}
        />
      )}
    </Card>
  );
}
