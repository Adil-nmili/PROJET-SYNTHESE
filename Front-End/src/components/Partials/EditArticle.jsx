import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { NewsService } from '../../../service/newsService';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const EditArticle = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        date: '',
        video_url: '',
        images: []
    });
    const [previewImages, setPreviewImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await NewsService.getArticleById(id);
                if (response.data) {
                    const article = response.data;
                    setFormData({
                        title: article.title || '',
                        content: article.content || '',
                        date: article.date ? new Date(article.date).toISOString().split('T')[0] : '',
                        video_url: article.video_url || '',
                        images: article.images ? JSON.parse(article.images) : []
                    });
                    setPreviewImages(article.images ? JSON.parse(article.images) : []);
                }
            } catch (error) {
                toast.error('Error loading article');
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData(prev => ({
            ...prev,
            images: files
        }));

        // Create preview URLs
        const previews = files.map(file => URL.createObjectURL(file));
        setPreviewImages(previews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('content', formData.content);
            formDataToSend.append('date', formData.date);
            formDataToSend.append('video_url', formData.video_url);
            
            formData.images.forEach((image, index) => {
                formDataToSend.append(`images[${index}]`, image);
            });

            const response = await NewsService.updateArticle(id, formDataToSend);
            if (response.status === 200) {
                toast.success('Article updated successfully');
                navigate('/articles');
            }
        } catch (error) {
            toast.error('Error updating article');
            console.error('Error:', error);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <Card className="w-full max-w-4xl mx-auto">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-2xl font-bold">Edit Article</CardTitle>
                        <Button variant="outline" onClick={() => navigate('/articles')}>
                            Back to Articles
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content">Content</Label>
                            <Textarea
                                id="content"
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                required
                                className="min-h-[300px] w-full"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="date">Date</Label>
                            <Input
                                id="date"
                                name="date"
                                type="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="video_url">Video URL</Label>
                            <Input
                                id="video_url"
                                name="video_url"
                                value={formData.video_url}
                                onChange={handleChange}
                                placeholder="https://www.youtube.com/watch?v=..."
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="images">Images</Label>
                            <Input
                                id="images"
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full"
                            />
                            {previewImages.length > 0 && (
                                <div className="grid grid-cols-4 gap-4 mt-4">
                                    {previewImages.map((preview, index) => (
                                        <img
                                            key={index}
                                            src={preview}
                                            alt={`Preview ${index + 1}`}
                                            className="w-full h-32 object-cover rounded-lg"
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end gap-4 pt-4">
                            <Button type="button" variant="outline" onClick={() => navigate('/articles')}>
                                Cancel
                            </Button>
                            <Button type="submit" className="min-w-[120px]">
                                Update Article
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default EditArticle; 