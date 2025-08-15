import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import { axiosClient } from '../../../api/axios';
import toast from 'react-hot-toast';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!componentRef.current) return;
      
      const elementTop = componentRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight * 0.8 && !isVisible) {
        setIsVisible(true);
        gsap.fromTo(componentRef.current, 
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            ease: "power3.out" 
          }
        );
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post('/api/newsletter', { email }, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      
      if (response.status === 200) {
        toast.success('Congratulations! You have successfully subscribed to the Lakers platform');
        setEmail('');
      }
    } catch (error) {
      toast.error('Failed to subscribe. Please check your email or try again later.');
      console.error('Newsletter subscription error:', error);
    }
  };

  return (
    <div 
      ref={componentRef}
      className=" w-full px-4 md:px-8 lg:px-16 py-20 bg-gradient-to-br from-purple-900 to-gray-900 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFCC28] via-[#A92551] to-[#56065D]"></div>
      {/* Background texture */}
      <div className="absolute inset-0 opacity-20 bg-[url('/asset/diamond-upholstery.png')]"></div>
      
      <div className="max-w-6xl w-full mx-auto relative z-10">
        <div className=' backdrop-blur-xs border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl'>
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            {/* Content */}
            <div className="text-center md:text-left max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFCC28] to-[#FFAE00]">
                  Exclusive Updates
                </span>
              </h2>
              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl">
                Subscribe to receive premium Lakers content, exclusive offers, and behind-the-scenes access.
              </p>
              
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="flex-grow p-4 text-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 rounded-xl focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-[#FFCC28]"
                  required
                />
                <Button
                  type="submit"
                  className="p-4 md:p-5 bg-gradient-to-r from-[#FFCC28] to-[#FFAE00] text-black font-bold text-lg rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-[#FFAE00]/30 hover:shadow-[#FFAE00]/50"
                >
                  <span className="mr-2">Subscribe</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </form>
            </div>
            
            {/* Decorative element */}
            <div className="relative w-64 h-64 flex-shrink-0 hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFCC28]/20 to-[#FFAE00]/10 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute inset-8 border-4 border-[#FFCC28]/30 rounded-full"></div>
              <div className="absolute inset-16 border-2 border-[#FFAE00]/20 rounded-full"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-gradient-to-br from-[#FFCC28] to-[#FFAE00] rounded-full flex items-center justify-center shadow-lg shadow-[#FFAE00]/50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;