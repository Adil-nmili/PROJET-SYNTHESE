import React from 'react';

const Videos = ({ videos }) => {
  return (
    <section className="py-10 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Vidéos Récents</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((videoItem) => (
          <div key={videoItem.id} className="bg-purple-50 rounded-xl shadow-lg overflow-hidden hover:scale-105 transform transition duration-300">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={videoItem.videoUrl}
                title={videoItem.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2 text-gray-800">{videoItem.title}</h3>
              <p className="text-sm text-gray-600">
                {videoItem.author} • {new Date(videoItem.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Videos; 