import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../pages/Nav'; // Importer le navbar
import Footer from '../pages/Footer'; // Importer le footer

const SiteLayout = () => {
  return (
    <div className="flex flex-col min-h-screen"> 
      <Nav />

      <main className="flex-grow flex items-center justify-center ">
        <Outlet /> 
      </main>


      <Footer />
    </div>
  );
};

export default SiteLayout;

