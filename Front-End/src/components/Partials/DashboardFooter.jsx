// Front-End/src/components/Partials/DashboardFooter.jsx
import { FaBaseballBall, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function DashboardFooter() {
    return (
      <footer className="w-full border-t bg-white dark:bg-slate-950 py-4 mt-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between px-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Dashboard. All rights reserved.
          </span>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <Link to='https://github.com/' target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-2xl text-gray-500 dark:text-gray-400" />
            </Link>
            <Link to='https://www.linkedin.com/' target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-2xl text-gray-500 dark:text-gray-400" />
            </Link>
            <Link to='https://www.facebook.com/' target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-2xl text-gray-500 dark:text-gray-400" />
            </Link>
            <Link to='https://www.nba.com/' target="_blank" rel="noopener noreferrer">
            <FaBaseballBall className="text-2xl text-gray-500 dark:text-gray-400" />
            </Link>
            {/* Add more icons/links as needed */}
          </div>
        </div>
      </footer>
    );
  }