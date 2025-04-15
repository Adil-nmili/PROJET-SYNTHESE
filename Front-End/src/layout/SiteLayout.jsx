import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '@/components/Partials/Footer'; // Importer le footer
import WebsiteNav from '@/components/Partials/WebsiteNav';
import FooterNav from '@/components/Partials/FooterNav';

const SiteLayout = () => {
  return (
    <div className="flex flex-col min-h-screen"> 
      <WebsiteNav />

      <main className="flex-grow flex flex-col items-center  justify-center relative ">
        <Outlet /> 
      <FooterNav/>
      </main>

      <Footer />
    </div>
  );
};

export default SiteLayout;

