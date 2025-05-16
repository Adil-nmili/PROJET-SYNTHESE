import React from 'react';
import './SocialMediaSlider.css';

const socialMediaLinks = [
  {
    name: 'Facebook',
    image: '/asset/facebook.png',
    url: 'https://www.facebook.com/nba',
  },
  {
    name: 'Instagram',
    image: '/asset/instagram.png',
    url: 'https://www.instagram.com/nba',
  },
  {
    name: 'NBA',
    image: '/asset/nba.png',
    url: 'https://www.nba.com',
  },
  {
    name: 'YouTube',
    image: '/asset/youtube.png',
    url: 'https://www.youtube.com/nba',
  },
  {
    name: 'Twitter',
    image: '/asset/x.png',
    url: 'https://www.twitter.com/nba',
  },

  {
    name: 'Tiktok',
    image: '/asset/tiktok.png',
    url: 'https://www.tiktok.com/nba',
  },
  {
    name: 'Reddit',
    image: '/asset/reddit.png',
    url: 'https://www.reddit.com/nba',
  }
];

const SocialMediaSlider = () => {
  // Double the array to create seamless infinite scroll
  const repeatedLinks = [...socialMediaLinks, ...socialMediaLinks];

  return (
    <div className="w-full overflow-hidden bg-white">
      <div className="slider">
        <div className="slide-track">
          {repeatedLinks.map((item, index) => (
            <div className="slide" key={index}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="slider-item"
              >
                <img src={item.image}  alt={item.name} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialMediaSlider;
