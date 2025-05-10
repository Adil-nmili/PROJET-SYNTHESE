import { useState } from 'react';
import '../../../public/players/7.png';
import '../../../public/asset/lignes.png';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Subscribing email:', email);
    setEmail('');
  };

  return (
    <div className="w-full bg-purple-900 bg-opacity-90 py-6 px-4" style={{ backgroundColor: "#52307c", backgroundImage: "linear-gradient(to right, rgba(107, 70, 193, 0.8), rgba(66, 39, 90, 0.9))" }}>
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-100 rounded-lg p-2 flex flex-col md:flex-row overflow-hidden shadow-md" style={{ maxHeight: "460px" }}>
          <div className="p-3 flex flex-col justify-center md:items-start md:w-1/3">
            <div className="text-left pl-12 pr-2">
              <h2 className="text-6xl font-bold text-amber-400 tracking-wide ml-6">
                NEWSLETTER
              </h2>
              <h3 className="text-6xl font-bold text-gray-400 mb-3 ml-6">
                SUBSCRIPTION
              </h3>
              <br/>
              <p className="text-lg text-gray-600 mb-4 ml-6">
                Stay updated with the latest Lakers news, events and exclusive offers
              </p>
              
              <form onSubmit={handleSubmit} className="flex w-full ml-6">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="flex-grow p-2 text-md border border-gray-300 rounded-l-md focus:outline-none bg-white shadow-inner"
                  required
                />
                <button
                  type="submit"
                  className="bg-amber-400 hover:bg-amber-500 p-2 rounded-r-md shadow-md transition-colors duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
          
          <div className="md:w-2/3 relative overflow-visible flex justify-end items-center pr-6" style={{ height: "450px" }}>
            {/* Background lines image */}
            <div className="absolute inset-0 z-0">
              <img 
                src="/asset/lignes.png" 
                alt="Background Lines" 
                className="w-full h-full object-cover opacity-30"
              />
            </div>
            
            {/* Player image */}
            <img
              src="/players/7.png"
              alt="Lakers Player"
              className="h-auto w-[155%] max-h-[490px] object-contain object-right scale-125 transform translate-x-12 translate-y-0 z-10 relative"
              style={{ filter: "drop-shadow(2px 6px 8px rgba(0,0,0,0.3))" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;