import StoreNav from "@/components/Partials/StoreNav"
import { Outlet } from "react-router-dom"
import Footer from "@/components/Partials/Footer"
import FooterNav from "@/components/Partials/FooterNav"



function StoreLayout() {
  return (
    <div className="flex flex-col items-center">
      <StoreNav/>
      <main className="bg-gray-50 min-h-[calc(100vh+200px)] w-full relative pt-16">
        <Outlet />
      </main>
      <FooterNav />
      <Footer/>
    </div>
  )
}

export default StoreLayout