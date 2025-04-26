import StoreNav from "@/components/Partials/StoreNav"
import { Outlet } from "react-router-dom"
import Footer from "@/components/Partials/Footer"



function StoreLayout() {
  return (
    <div>
      <StoreNav/>
      <main className="bg-gray-50 min-h-[calc(100vh+200px)] w-full relative pt-16">
        <Outlet />
      </main>
      <Footer/>
    </div>
  )
}

export default StoreLayout