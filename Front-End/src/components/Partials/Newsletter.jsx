import { useState } from 'react';
import '../../../public/players/7.png';
import '../../../public/asset/lignes.png';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Subscribing email:', email);
    setEmail('');
  };

  return (
    <div className="w-full min-h-[250px] md:h-[350px] bg-purple-900 bg-opacity-90 py-4 md:py-6 px-2 md:px-4 flex items-center justify-center my-0" 
      style={{ backgroundColor: "#52307c", backgroundImage: "linear-gradient(to right, rgba(107, 70, 193, 0.8), rgba(66, 39, 90, 0.9))" }}>
      <div className="w-11/12 md:w-10/12 mx-auto h-full">
        <div className="bg-gray-100 rounded-lg p-2 flex flex-col h-full md:flex-row shadow-md">
          {/* Left Section - Newsletter Form */}
          <div className="p-2 md:p-3 flex flex-col justify-center md:items-start md:w-1/2 lg:w-1/3">
            <div className="text-left pl-4 md:pl-12 pr-2">
              <h2 className="text-lg md:text-xl font-bold text-amber-400 tracking-wide ml-2 md:ml-6">
                NEWSLETTER
              </h2>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-400 mb-2 md:mb-3 ml-2 md:ml-6">
                SUBSCRIPTION
              </h3>
              <p className="text-sm md:text-md text-gray-600 mb-3 md:mb-4 ml-2 md:ml-6">
                Stay updated with the latest Lakers news, events and exclusive offers
              </p>
              
              <form onSubmit={handleSubmit} className="flex w-full ml-2 md:ml-6">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="flex-grow p-1 md:p-2 text-sm md:text-md border border-gray-300 rounded-l-md focus:outline-none bg-white rounded-r-none"
                  required
                />
                <Button
                  type="submit"
                  className="bg-amber-400 hover:bg-amber-500 p-1 md:p-2 rounded-r-md shadow-md transition-colors duration-200 rounded-l-none hover:shadow-lg shadow-black/20"
                >
                  <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-purple-900" />
                </Button>
              </form>
            </div>
          </div>
          
          {/* Right Section - Image */}
          <div className="w-full md:w-1/2 lg:w-2/3 h-[200px] md:h-full relative flex justify-end items-center pr-2 md:pr-6">
            {/* Background lines image */}
            <div className="absolute inset-0 z-0 h-full">
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
              className="h-[180px] md:h-auto w-auto max-h-[120%] absolute right-0 md:-right-20 -top-5 md:-top-10 object-contain transform translate-x-0 md:translate-x-12 translate-y-0 z-10"
              style={{ filter: "drop-shadow(2px 6px 8px rgba(0,0,0,0.3))" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;