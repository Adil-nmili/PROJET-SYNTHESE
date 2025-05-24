import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { NewsService } from '../../../service/newsService';
import { toast } from 'react-hot-toast';
import { X, Trash2 } from 'lucide-react';
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

const EditArticlePopup = ({ article, onClose, onUpdate }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        date: '',
        video_url: '',
        images: []
    });
    const [previewImages, setPreviewImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block', 'link', 'image'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'indent': '-1'}, { 'indent': '+1' }],
            [{ 'color': [ ] }, { 'background': [] }, { 'font': [ 'italic', 'bold', 'underline', 'strike' ] }],
            ['link', 'image', 'video'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'list', 'bullet',
        'color', 'background',
        'link', 'image', 'video'
    ];

    useEffect(() => {
        if (article) {
            setFormData({
                title: article.title || '',
                content: article.content || '',
                date: article.date ? new Date(article.date).toISOString().split('T')[0] : '',
                video_url: article.video_url || '',
                images: article.images ? JSON.parse(article.images) : []
            });
            setPreviewImages(article.images ? JSON.parse(article.images) : []);
        }
    }, [article]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleContentChange = (content) => {
        setFormData(prev => ({
            ...prev,
            content
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
        setLoading(true);
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('content', formData.content);
            formDataToSend.append('date', formData.date);
            formDataToSend.append('video_url', formData.video_url);
            
            formData.images.forEach((image, index) => {
                formDataToSend.append(`images[${index}]`, image);
            });

            const response = await NewsService.updateArticle(article.id, formDataToSend);
            if (response.status === 200) {
                toast.success('Article updated successfully');
                onUpdate(response.data);
                onClose();
            }
        } catch (error) {
            toast.error('Error updating article');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        setDeleteLoading(true);
        try {
            const response = await NewsService.deleteArticle(article.id);
            if (response.status === 200) {
                toast.success('Article deleted successfully');
                onUpdate(null); // Signal that the article was deleted
                onClose();
            }
        } catch (error) {
            toast.error('Error deleting article');
            console.error('Error:', error);
        } finally {
            setDeleteLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-[90%] max-w-4xl max-h-[90vh] overflow-y-auto">
                <Card className="border-0">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-2xl font-bold">Edit Article</CardTitle>
                        <div className="flex items-center gap-2">
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive" size="icon" disabled={deleteLoading}>
                                        <Trash2 className="h-4 w-4" />
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
                                            onClick={handleDelete}
                                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                            disabled={deleteLoading}
                                        >
                                            {deleteLoading ? 'Deleting...' : 'Delete'}
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                            <Button variant="ghost" size="icon" onClick={onClose}>
                                <X className="h-4 w-4" />
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
                                <div className="h-96">
                                    <ReactQuill
                                        theme="snow"
                                        value={formData.content}
                                        onChange={handleContentChange}
                                        modules={modules}
                                        formats={formats}
                                        className="h-80"
                                    />
                                </div>
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
                                                className="w-full h-24 object-cover rounded-lg"
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end gap-4 pt-4">
                                <Button type="button" variant="outline" onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={loading}>
                                    {loading ? 'Updating...' : 'Update Article'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default EditArticlePopup; 