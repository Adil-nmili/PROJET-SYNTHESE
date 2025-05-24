import React from 'react';

const Videos = ({ videos }) => {
  return (
    <section className="py-6 md:py-10 px-2 md:px-4">
      <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-8 text-center text-gray-800">Recent Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
        {videos.map((videoItem) => (
          <div 
            key={videoItem.id} 
            className="bg-purple-50 rounded-lg shadow-md overflow-hidden hover:scale-[1.02] transform transition duration-300"
          >
            <div className="relative w-full" style={{ paddingBottom: '45%' }}>
              <iframe
                className="absolute top-0 left-0 w-full  h-full"
                src={videoItem.videoUrl}
                title={videoItem.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-2 md:p-4">
              <h3 className="font-bold text-sm md:text-lg mb-1 md:mb-2 text-gray-800 line-clamp-2">
                {videoItem.title}
              </h3>
              <p className="text-xs md:text-sm text-gray-600">
                {videoItem.author} • {new Date(videoItem.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Videos; 