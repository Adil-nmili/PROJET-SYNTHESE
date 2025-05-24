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
        <nav className="flex justify-center items-center gap-4 sm:gap-8 md:gap-16 py-2 fixed bottom-0 md:bottom-5 z-50 w-full md:w-5/12 bg-yellow-600 rounded-t-2xl md:rounded-2xl shadow-lg shadow-slate-800 left-1/2 -translate-x-1/2">
            {links.map((link) => (
                <Link 
                    to={link.path} 
                    key={link.name} 
                    className={`flex flex-col items-center justify-center gap-1 ${
                        location.pathname === link.path 
                            ? 'text-purple-900 font-semibold scale-105' 
                            : 'text-gray-300'
                    }`}
                >
                    <span className="w-5 h-5 sm:w-6 sm:h-6">{link.icon}</span>
                    <span className="text-xs sm:text-sm font-medium">{link.name}</span>
                </Link>
            ))}
        </nav>
    );
};

export default FooterNav; 