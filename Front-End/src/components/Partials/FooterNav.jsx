import React from 'react';
    import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, NewspaperIcon, StoreIcon, FileQuestion } from 'lucide-react';
import { HOME, ABOUT, NEWS, STORE } from '../../router/Router';


const FooterNav = () => {

    const location = useLocation();


    const links = [
        {
            name: "Home",
            path: HOME,
            icon: <HomeIcon />
        },
        {
            name: "About",
            path: ABOUT,
            icon: <FileQuestion />
        },
        {
            name: "News",
            path: NEWS,
            icon: <NewspaperIcon />
        },
        {
            name:"Store",
            path:STORE,
            icon: <StoreIcon />
        }
    ]

  return (
    <nav className="flex justify-center items-center gap-10 py-2 fixed bottom-10 z-50 w-1/3 bg-[#ca8a04]  rounded-2xl shadow-lg ">
        {links.map((link) => (
            <Link to={link.path} key={link.name} className={`flex flex-col items-center justify-center gap-1 ${location.pathname === link.path ? 'text-purple-900 font-bold scale-105' : 'text-gray-900'}`}>
                {link.icon}
                {link.name}
            </Link>
        ))}
    </nav>
  );
};

export default FooterNav; 