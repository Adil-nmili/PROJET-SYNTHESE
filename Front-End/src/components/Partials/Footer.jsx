import { useState } from 'react';
import { Facebook, Instagram, Youtube, Twitter, Mail, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";

export default function Footer() {
  const [openSection, setOpenSection] = useState(null);
  
  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="bg-gradient-to-b from-[#590D7A] to-[#440A5E] text-white w-full relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#F2CB05] via-[#440A5E] to-[#F2CB05]"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10">
        <div className="bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+CiAgPHBhdGggZD0iTTEyIDJMMiA3bDEwIDUgMTAtNS0xMC01ek0yIDE3bDEwIDUgMTAtNVYxMkwyIDEydjV6IiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K')] w-full h-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-10 relative z-10">
        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-[#F2CB05] to-[#F6D806] rounded-xl p-6 mb-12 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-white rounded-full p-3">
                <Mail className="text-[#590D7A] w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-xl text-[#590D7A]">STAY IN THE GAME</h3>
                <p className="text-[#590D7A]/90">Get exclusive NBA news and updates</p>
              </div>
            </div>
            
            <div className="flex-1 max-w-xl">
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="px-4 py-3 rounded-lg flex-1 text-gray-800 border border-[#590D7A] focus:ring-2 focus:ring-white"
                />
                <button className="bg-white text-[#590D7A] font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                  Subscribe <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Links - Desktop */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 text-left mb-10">
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span className="bg-[#c9082a] w-2 h-6 rounded"></span>
              NBA ORGANIZATION
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="https://www.nba.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#fdb927] transition-colors flex items-center gap-2">
                  <span className="bg-gray-700 w-1 h-1 rounded-full"></span>
                  NBA Official
                </a>
              </li>
              <li>
                <a href="https://careers.nba.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#fdb927] transition-colors flex items-center gap-2">
                  <span className="bg-gray-700 w-1 h-1 rounded-full"></span>
                  NBA Careers
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span className="bg-[#c9082a] w-2 h-6 rounded"></span>
              NBA INITIATIVE
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="https://cares.nba.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#fdb927] transition-colors flex items-center gap-2">
                  <span className="bg-gray-700 w-1 h-1 rounded-full"></span>
                  NBA Cares
                </a>
              </li>
              <li>
                <a href="https://jr.nba.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#fdb927] transition-colors flex items-center gap-2">
                  <span className="bg-gray-700 w-1 h-1 rounded-full"></span>
                  Jr. NBA
                </a>
              </li>
              <li>
                <a href="https://nbafoundation.nba.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#fdb927] transition-colors flex items-center gap-2">
                  <span className="bg-gray-700 w-1 h-1 rounded-full"></span>
                  NBA Foundation
                </a>
              </li>
              <li>
                <a href="https://www.nba.com/social-justice-coalition" target="_blank" rel="noopener noreferrer" className="hover:text-[#fdb927] transition-colors flex items-center gap-2">
                  <span className="bg-gray-700 w-1 h-1 rounded-full"></span>
                  Social Justice Coalition
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span className="bg-[#c9082a] w-2 h-6 rounded"></span>
              ACROSS THE LEAGUE
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="https://pr.nba.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#fdb927] transition-colors flex items-center gap-2">
                  <span className="bg-gray-700 w-1 h-1 rounded-full"></span>
                  NBA Communications
                </a>
              </li>
              <li>
                <a href="https://lockervision.nba.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#fdb927] transition-colors flex items-center gap-2">
                  <span className="bg-gray-700 w-1 h-1 rounded-full"></span>
                  Lockervision
                </a>
              </li>
              <li>
                <a href="https://www.nba.com/transactions" target="_blank" rel="noopener noreferrer" className="hover:text-[#fdb927] transition-colors flex items-center gap-2">
                  <span className="bg-gray-700 w-1 h-1 rounded-full"></span>
                  NBA Transactions
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span className="bg-[#c9082a] w-2 h-6 rounded"></span>
              SHOP
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="https://store.nba.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#fdb927] transition-colors flex items-center gap-2">
                  <span className="bg-gray-700 w-1 h-1 rounded-full"></span>
                  Global Stores
                </a>
              </li>
              <li>
                <a href="https://www.nbashop.com/stores" target="_blank" rel="noopener noreferrer" className="hover:text-[#fdb927] transition-colors flex items-center gap-2">
                  <span className="bg-gray-700 w-1 h-1 rounded-full"></span>
                  NYC Store
                </a>
              </li>
              <li>
                <a href="https://auctions.nba.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#fdb927] transition-colors flex items-center gap-2">
                  <span className="bg-gray-700 w-1 h-1 rounded-full"></span>
                  NBA Auctions
                </a>
              </li>
              <li>
                <a href="https://photostore.nba.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#fdb927] transition-colors flex items-center gap-2">
                  <span className="bg-gray-700 w-1 h-1 rounded-full"></span>
                  NBA Photostore
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span className="bg-[#c9082a] w-2 h-6 rounded"></span>
              FOLLOW US
            </h3>
            <p className="mb-4 text-white/80">Join millions of NBA fans worldwide</p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/nba" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-[#c9082a] p-3 rounded-full transition-all">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://www.facebook.com/nba" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-[#c9082a] p-3 rounded-full transition-all">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://www.youtube.com/nba" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-[#c9082a] p-3 rounded-full transition-all">
                <Youtube className="w-6 h-6" />
              </a>
              <a href="https://twitter.com/NBA" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-[#c9082a] p-3 rounded-full transition-all">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Mobile Accordion */}
        <div className="md:hidden mb-8">
          {['organization', 'initiative', 'league', 'shop'].map((section) => (
            <div key={section} className="mb-3 border-b border-white/20">
              <button 
                onClick={() => toggleSection(section)}
                className="w-full py-4 px-2 text-left flex justify-between items-center font-bold"
              >
                {section === 'organization' && 'NBA ORGANIZATION'}
                {section === 'initiative' && 'NBA INITIATIVE'}
                {section === 'league' && 'ACROSS THE LEAGUE'}
                {section === 'shop' && 'SHOP'}
                {openSection === section ? <ChevronUp /> : <ChevronDown />}
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${openSection === section ? 'max-h-96' : 'max-h-0'}`}>
                <div className="pb-4 px-2 space-y-3">
                  {section === 'organization' && (
                    <>
                      <a href="https://www.nba.com" target="_blank" rel="noopener noreferrer" className="block hover:text-[#fdb927] transition-colors">
                        NBA Official
                      </a>
                      <a href="https://careers.nba.com/" target="_blank" rel="noopener noreferrer" className="block hover:text-[#fdb927] transition-colors">
                        NBA Careers
                      </a>
                    </>
                  )}
                  
                  {section === 'initiative' && (
                    <>
                      <a href="https://cares.nba.com/" target="_blank" rel="noopener noreferrer" className="block hover:text-[#fdb927] transition-colors">
                        NBA Cares
                      </a>
                      <a href="https://jr.nba.com/" target="_blank" rel="noopener noreferrer" className="block hover:text-[#fdb927] transition-colors">
                        Jr. NBA
                      </a>
                      <a href="https://nbafoundation.nba.com/" target="_blank" rel="noopener noreferrer" className="block hover:text-[#fdb927] transition-colors">
                        NBA Foundation
                      </a>
                      <a href="https://www.nba.com/social-justice-coalition" target="_blank" rel="noopener noreferrer" className="block hover:text-[#fdb927] transition-colors">
                        Social Justice Coalition
                      </a>
                    </>
                  )}
                  
                  {section === 'league' && (
                    <>
                      <a href="https://pr.nba.com/" target="_blank" rel="noopener noreferrer" className="block hover:text-[#fdb927] transition-colors">
                        NBA Communications
                      </a>
                      <a href="https://lockervision.nba.com/" target="_blank" rel="noopener noreferrer" className="block hover:text-[#fdb927] transition-colors">
                        Lockervision
                      </a>
                      <a href="https://www.nba.com/transactions" target="_blank" rel="noopener noreferrer" className="block hover:text-[#fdb927] transition-colors">
                        NBA Transactions
                      </a>
                    </>
                  )}
                  
                  {section === 'shop' && (
                    <>
                      <a href="https://store.nba.com/" target="_blank" rel="noopener noreferrer" className="block hover:text-[#fdb927] transition-colors">
                        Global Stores
                      </a>
                      <a href="https://www.nbashop.com/stores" target="_blank" rel="noopener noreferrer" className="block hover:text-[#fdb927] transition-colors">
                        NYC Store
                      </a>
                      <a href="https://auctions.nba.com/" target="_blank" rel="noopener noreferrer" className="block hover:text-[#fdb927] transition-colors">
                        NBA Auctions
                      </a>
                      <a href="https://photostore.nba.com/" target="_blank" rel="noopener noreferrer" className="block hover:text-[#fdb927] transition-colors">
                        NBA Photostore
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <hr className="border-white/20 my-6" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-4">
          <div>
            <p className="text-sm text-white/70">© 2025 NBA Media Ventures, LLC. All rights reserved.</p>
            <div className="flex gap-4 mt-2 text-sm">
              <a href="#" className="hover:text-[#fdb927] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#fdb927] transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-[#fdb927] transition-colors">Cookie Policy</a>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="md:hidden flex gap-4">
              <a href="https://www.instagram.com/nba" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-[#c9082a] p-2 rounded-full transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/nba" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-[#c9082a] p-2 rounded-full transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/nba" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-[#c9082a] p-2 rounded-full transition-all">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://twitter.com/NBA" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-[#c9082a] p-2 rounded-full transition-all">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                <span className="text-xs">🌎</span>
              </div>
              <span className="text-sm">Global</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}