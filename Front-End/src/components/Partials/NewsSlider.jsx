import React from 'react';

const NewsSlider = () => {
  return (
    <section className="relative h-56 mt-17 md:h-screen">
      <div className="relative h-full ">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          
        >
          <source src="/video/vid1.mp4" type="video/mp4" />
          Votre navigateur ne supporte pas la lecture de vidéos.
        </video>
      </div>
    </section>
  );
};

export default NewsSlider;