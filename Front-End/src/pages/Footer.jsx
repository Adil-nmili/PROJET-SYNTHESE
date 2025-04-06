import { Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#552582] text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm text-left">
          <div>
            <h3 className="font-bold mb-2">NBA ORGANIZATION</h3>
            <ul>
              <li>
                <a
                  href="https://www.nba.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  NBA Official
                </a>
              </li>
              <li>
                <a
                  href="https://careers.nba.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  NBA Careers
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-2">NBA INITIATIVE</h3>
            <ul>
              <li>
                <a
                  href="https://cares.nba.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  NBA Cares
                </a>
              </li>
              <li>
                <a
                  href="https://jr.nba.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Jr. NBA
                </a>
              </li>
              <li>
                <a
                  href="https://nbafoundation.nba.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  NBA Foundation
                </a>
              </li>
              <li>
                <a
                  href="https://www.nba.com/social-justice-coalition"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Social Justice Coalition
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-2">ACROSS THE LEAGUE</h3>
            <ul>
              <li>
                <a
                  href="https://pr.nba.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  NBA Communications
                </a>
              </li>
              <li>
                <a
                  href="https://lockervision.nba.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Lockervision
                </a>
              </li>
              <li>
                <a
                  href="https://www.nba.com/transactions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  NBA Transactions
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-2">SHOP</h3>
            <ul>
              <li>
                <a
                  href="https://store.nba.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Global Stores
                </a>
              </li>
              <li>
                <a
                  href="https://www.nbashop.com/stores"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  NYC Store
                </a>
              </li>
              <li>
                <a
                  href="https://auctions.nba.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  NBA Auctions
                </a>
              </li>
              <li>
                <a
                  href="https://photostore.nba.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  NBA Photostore
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-400 my-6" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs">© 2025 NBA Media Ventures, LLC. All rights reserved.</p>
          <div className="flex space-x-4">
            <a
              href="https://www.instagram.com/nba"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="https://www.facebook.com/nba"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="https://www.youtube.com/nba"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <Youtube className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
