import React from 'react';
import './SocialMediaSlider.css';

const socialMediaLinks = [
  {
    name: 'Facebook',
    image: '/images/facebook.png',
    url: 'https://www.facebook.com/nba',
  },
  {
    name: 'Instagram',
    image: '/images/instagram.png',
    url: 'https://www.instagram.com/nba',
  },
  {
    name: 'NBA',
    image: '/images/nba.png',
    url: 'https://www.nba.com',
  },
  {
    name: 'YouTube',
    image: '/images/youtube.png',
    url: 'https://www.youtube.com/nba',
  }
  
];

const SocialMediaSlider = () => {
  return (
    <div className="slider-wrapper">
      <div className="slider-track">
        {socialMediaLinks.map((item, index) => (
          <a
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="slider-item"
          >
            <img src={item.image} alt={item.name} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialMediaSlider;
