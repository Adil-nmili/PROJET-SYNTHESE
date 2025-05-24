import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { format } from 'date-fns';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ArticleDetails = ({ article }) => {
    if (!article) return null;
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    return (
        <div className="w-full h-full  mx-auto p-1">
            <Card className='w-full'>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-2xl font-bold">{article.title}</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className='w-full'>
                    <div className="space-y-1 w-full">
                        <div className="flex items-center w-full gap-2 text-gray-600">
                            <span>Author: {article.created_by?.first_name} {article.created_by?.last_name}</span>
                            <span>•</span>
                            <span>Date: {format(new Date(article.date), 'PPP')}</span>
                        </div>
                        
                        {article.images && (
                            <div className="">
                                <Swiper
                                    modules={[Navigation, Pagination]}
                                    spaceBetween={30}
                                    slidesPerView={1}
                                    className="w-[400px] h-[200px]"
                                >
                                    {JSON.parse(article.images).map((image, index) => (
                                        <SwiperSlide key={index}>
                                            <img 
                                                src={backendUrl + '/' + image}
                                                alt={`Article image ${index + 1}`}
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        )}

                        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
                        
                        {article.video_url && (
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold mb-2">Video</h3>
                                <iframe
                                    src={`https://www.youtube.com/embed/${article.video_url.split('v=')[1]}`}
                                    className="w-full h-56"
                                    allowFullScreen
                                />
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ArticleDetails;
