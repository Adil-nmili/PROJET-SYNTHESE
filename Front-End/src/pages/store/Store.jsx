import StoreSlider from "@/components/Partials/StoreSlider"
import StoreProduct from "@/components/Partials/StoreProduct"
import ImageCarousel from "@/components/Partials/ImageCarousel"
import Promostore from "@/components/Partials/Promostore"
function Store() {
  return (
    <div>
      <StoreSlider/>
      <StoreProduct/>
      <ImageCarousel/>
      <Promostore/>
    </div>
  )
}

export default Store