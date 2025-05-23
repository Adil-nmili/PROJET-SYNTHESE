import React from 'react';

const NewsSlider = () => {
  return (
    <section className="relative h-[500px] ">
      <div className="relative h-full">
        <video
          className="w-full h-screen object-cover"
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