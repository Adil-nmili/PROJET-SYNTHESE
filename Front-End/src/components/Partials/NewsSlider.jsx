import React from 'react';

const NewsSlider = () => {
  return (
    <section className="relative h-56 mt-17 md:h-screen">
      <div className="relative h-full">
        <iframe
          className="w-full h-full object-cover"
          src="https://www.youtube.com/embed/zu7XWu5wrMg?autoplay=1&mute=1&loop=1&playlist=zu7XWu5wrMg&controls=0&showinfo=0&rel=0"
          title="NBA Highlights"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
};

export default NewsSlider;