import React from "react";
import "../../css/slider.css";

const sponsors = [
  "/sponsors/AmericanExpress.png",
  "/sponsors/bibigo.png",
  "/sponsors/nike.png",
  "/sponsors/Pepsi.png",
  "/sponsors/Sixt.png",
  "/sponsors/Toyota.png",
  "/sponsors/UCLAHealth.png",
];

export default function SponsorCarousel() {
  const repeatedSponsors = [...sponsors, ...sponsors];

  return (
    <div className="w-full overflow-hidden  py-2 sm:py-4">
      <div className="slider">
        <div className="slide-track">
          {repeatedSponsors.map((src, index) => (
            <div className="slide" key={index}>
              <img
                src={src}
                alt={`Sponsor ${index + 1}`}
                className="h-12 sm:h-16 md:h-20 w-auto max-w-[80px] sm:max-w-[100px] md:max-w-[120px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
