import { Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#552582] text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section principale */}
        <div className="grid grid-cols-4 gap-8 text-sm text-left">
          <div>
            <h3 className="font-bold mb-2">NBA ORGANIZATION</h3>
            <ul>
              <li><a href="#" className="hover:underline">NBA Official</a></li>
              <li><a href="#" className="hover:underline">NBA Careers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">NBA INITIATIVE</h3>
            <ul>
              <li><a href="#" className="hover:underline">NBA Cares</a></li>
              <li><a href="#" className="hover:underline">Jr. NBA</a></li>
              <li><a href="#" className="hover:underline">NBA Foundation</a></li>
              <li><a href="#" className="hover:underline">Social Justice Coalition</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">ACROSS THE LEAGUE</h3>
            <ul>
              <li><a href="#" className="hover:underline">NBA Communications</a></li>
              <li><a href="#" className="hover:underline">Lockervision</a></li>
              <li><a href="#" className="hover:underline">NBA Transactions</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">SHOP</h3>
            <ul>
              <li><a href="#" className="hover:underline">Global Stores</a></li>
              <li><a href="#" className="hover:underline">NYC Store</a></li>
              <li><a href="#" className="hover:underline">NBA Auctions</a></li>
              <li><a href="#" className="hover:underline">NBA Photostore</a></li>
            </ul>
          </div>
        </div>

        {/* Ligne séparatrice */}
        <hr className="border-gray-400 my-6" />

        {/* Bas de page */}
        <div className="flex justify-between items-center">
          <p className="text-xs">© 2025 NBA Media Ventures, LLC. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#"><Instagram className="w-6 h-6" /></a>
            <a href="#"><Facebook className="w-6 h-6" /></a>
            <a href="#"><Youtube className="w-6 h-6" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

