import HomeSlider from "../components/Partials/HomeSlider"
import SponsorCarousel from "../components/Partials/SponsorCarousel"

function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <HomeSlider />
      <SponsorCarousel/>
    </div>
  )
}

export default Home