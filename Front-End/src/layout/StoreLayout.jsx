import StoreNav from "@/components/Partials/StoreNav"
import { Outlet } from "react-router-dom"
import Footer from "@/components/Partials/Footer"



function StoreLayout() {
  return (
    <div>
      <StoreNav/>
      <main className="bg-gray-50 dark:bg-slate-900 min-h-screen w-full relative">
        <Outlet />
      </main>
      <Footer/>
    </div>
  )
}

export default StoreLayout