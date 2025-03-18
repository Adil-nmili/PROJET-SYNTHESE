import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../pages/Nav'; // Importer le navbar
import Footer from '../pages/Footer'; // Importer le footer

const SiteLayout = () => {
  return (
    <div className="flex flex-col min-h-screen"> {/* Utilisation de flex pour une mise en page fluide */}
      {/* Navbar (en haut) */}
      <Nav />

      {/* Contenu principal */}
      <main className="flex-grow flex items-center justify-center ">
        <Outlet /> {/* Affiche les pages comme Home, About, News */}
      </main>

      {/* Footer (en bas) */}
      <Footer />
    </div>
  );
};

export default SiteLayout;

