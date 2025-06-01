import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, NewspaperIcon, StoreIcon, FileQuestion } from 'lucide-react';
import { HOME, ABOUT, NEWS, STORE } from '../../router/Router';

const FooterNav = () => {
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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

    // Function to check if a link is active
    const isActiveLink = (path) => {
        if (path === HOME) {
            return location.pathname === path;
        }
        return location.pathname.startsWith(path);
    };

    return (
        <nav className={`flex justify-center items-center gap-4 sm:gap-8 md:gap-16 py-2 fixed bottom-0  z-50 w-full  rounded-t-2xl  transition-colors duration-300 ${
            isScrolled ? 'bg-black' : 'bg-transparent'
        }`}>
            {links.map((link) => (
                <Link 
                    to={link.path} 
                    key={link.name} 
                    className={`flex flex-col items-center justify-center gap-1 ${
                        isActiveLink(link.path)
                            ? 'text-yellow-600 font-semibold scale-105' 
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