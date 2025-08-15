import { Link, useLocation } from 'react-router-dom';
import { HOME, ABOUT, NEWS, STORE } from '../../router/Router';

const FooterNav = ({isScrolled}) => {
    const location = useLocation();

    const links = [
        {
            name: "Home",
            path: HOME,
        },
        {
            name: "About",
            path: ABOUT,
        },
        {
            name: "News",
            path: NEWS,
        },
        {
            name:"Store",
            path:STORE
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
        <div className={`flex justify-center items-center gap-4 h-full px-6 rounded-b-md transition-colors duration-300 ${
            isScrolled ? 'backdrop-blur-xl  shadow-md shadow-black ' : 'bg-transparent'
        }`}>
            {links.map((link) => (
                <Link 
                    to={link.path} 
                    key={link.name} 
                    className={`px-4 py-2  hover:text-[#FF335F] rounded-lg transition-colors duration-300 hover:bg-[#FFCC28] ${
                        isActiveLink(link.path)
                            ? 'text-[#56065D] bg-[#FFCC28] font-semibold shadow-sm' 
                            : 'text-slate-900 underline'
                    }`}
                >
                    <span className="text-xs sm:text-sm font-medium">{link.name}</span>
                </Link>
            ))}
        </div>
    );
};

export default FooterNav; 