
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
    <div className="w-full overflow-hidden bg-white py-4">
      <div className="slider">
        <div className="slide-track">
          {repeatedSponsors.map((src, index) => (
            <div className="slide" key={index}>
              <img
                src={src}
                alt={`Sponsor ${index + 1}`}
                className="h-20 w-auto max-w-[120px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
