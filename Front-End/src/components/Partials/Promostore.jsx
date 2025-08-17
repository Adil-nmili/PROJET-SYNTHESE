import React, { useEffect, useRef } from 'react';
import { Sparkles, Star, Crown, Gift } from 'lucide-react';

const Promostore = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imagesRef = useRef([]);
  const particlesRef = useRef([]);
  const overlayRef = useRef(null);

  useEffect(() => {
    // Mock GSAP functions for demonstration
    const animateElement = (element, options) => {
      if (element && element.style) {
        const delay = options.delay || 0;
        setTimeout(() => {
          element.style.transition = `all ${options.duration || 0.5}s ease-out`;
          
          let transform = '';
          if (options.scale) transform += `scale(${options.scale}) `;
          if (options.y) transform += `translateY(${options.y}px) `;
          if (options.x) transform += `translateX(${options.x}px) `;
          if (options.rotation) transform += `rotate(${options.rotation}deg) `;
          
          if (transform) element.style.transform = transform;
          if (options.opacity !== undefined) element.style.opacity = options.opacity;
        }, delay * 1000);
      }
    };

    const timeline = {
      to: (element, options) => {
        animateElement(element, options);
        return timeline;
      },
      from: (element, options) => {
        // Set initial state then animate to normal
        if (element && element.style) {
          let initialTransform = '';
          if (options.scale) initialTransform += `scale(${options.scale}) `;
          if (options.y) initialTransform += `translateY(${options.y}px) `;
          if (options.x) initialTransform += `translateX(${options.x}px) `;
          if (options.rotation) initialTransform += `rotate(${options.rotation}deg) `;
          
          if (initialTransform) element.style.transform = initialTransform;
          if (options.opacity !== undefined) element.style.opacity = options.opacity;
          
          // Animate to final state
          setTimeout(() => {
            element.style.transition = `all ${options.duration || 0.5}s ease-out`;
            element.style.transform = '';
            element.style.opacity = '1';
          }, 50);
        }
        return timeline;
      },
      staggerTo: (elements, duration, options) => {
        if (elements && elements.length) {
          elements.forEach((el, i) => {
            const staggerDelay = (options.delay || 0) + (i * 0.1);
            animateElement(el, { ...options, delay: staggerDelay, duration });
          });
        }
        return timeline;
      }
    };

    const gsap = {
      timeline: () => timeline,
      to: animateElement
    };

    const tl = gsap.timeline();

    // Animate container entrance
    tl.from(containerRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 1,
      delay: 0.2
    });

    // Animate text elements with delays
    setTimeout(() => {
      if (textRef.current?.children[0]) {
        tl.from(textRef.current.children[0], {
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: 0.5
        });
      }
    }, 100);

    setTimeout(() => {
      if (textRef.current?.children[1]) {
        tl.from(textRef.current.children[1], {
          y: 30,
          opacity: 0,
          duration: 0.6,
          delay: 0.8
        });
      }
    }, 200);

    setTimeout(() => {
      if (textRef.current?.children[2]) {
        tl.from(textRef.current.children[2], {
          scale: 0.8,
          opacity: 0,
          duration: 0.5,
          delay: 1.0
        });
      }
    }, 300);

    // Animate floating images with stagger
    if (imagesRef.current.length > 0) {
      tl.staggerTo(imagesRef.current, 0.8, {
        y: 0,
        opacity: 1,
        scale: 1,
        rotation: 0,
        delay: 0.3
      });
    }

    // Create continuous floating animation for images
    const startFloatingAnimations = () => {
      imagesRef.current.forEach((img, index) => {
        if (img) {
          const animate = () => {
            const time = Date.now() * 0.001;
            const yOffset = Math.sin(time + index) * 8;
            const rotation = Math.sin(time + index) * 3;
            
            img.style.transform += ` translateY(${yOffset}px) rotate(${rotation}deg)`;
            
            requestAnimationFrame(animate);
          };
          setTimeout(() => animate(), index * 100);
        }
      });
    };

    setTimeout(startFloatingAnimations, 1500);

    // Animate particles
    particlesRef.current.forEach((particle, index) => {
      if (particle) {
        gsap.to(particle, {
          y: -100 + Math.random() * 200,
          x: -100 + Math.random() * 200,
          opacity: 0.8,
          scale: 0.5 + Math.random() * 0.5,
          duration: 3 + Math.random() * 2,
          delay: index * 0.1
        });
      }
    });

  }, []);

  // Mock product images with luxury items
  const productImages = [
    {
      src: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
      alt: "Luxury Watch",
      className: "absolute top-10 left-10 w-32 transform -rotate-12"
    },
    {
      src: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400",
      alt: "Designer Jacket",
      className: "absolute top-5 left-1/3 w-40 transform rotate-6"
    },
    {
      src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      alt: "Premium Sneakers",
      className: "absolute bottom-10 left-1/4 w-36 transform -rotate-6"
    },
    {
      src: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400",
      alt: "Luxury Bag",
      className: "absolute top-16 right-1/6 w-44 transform rotate-12"
    },
    {
      src: "https://images.unsplash.com/photo-1580149959184-c3aaa501a0d4?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Designer Sunglasses",
      className: "absolute top-10 right-10 w-32 transform -rotate-6"
    },
    {
      src: "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=400",
      alt: "Premium Jewelry",
      className: "absolute bottom-10 right-10 w-28 transform rotate-15"
    }
  ];

  const handleShopNow = () => {
    console.log('Navigate to products');
  };

  return (
    <div 
      ref={containerRef}
      className="relative min-h-[600px] flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 25%, #2d2d2d 50%, #1a1a1a 75%, #0f0f0f 100%)'
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-amber-400/20 to-orange-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-80 h-80 bg-gradient-to-br from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-gold-400/10 to-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            ref={el => particlesRef.current[i] = el}
            className="absolute w-1 h-1 bg-amber-400 rounded-full opacity-0"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Luxury Product Images */}
      {productImages.map((image, index) => (
        <div
          key={index}
          ref={el => imagesRef.current[index] = el}
          className={`${image.className} opacity-0 transform translate-y-10 hover:scale-110 transition-all duration-500 cursor-pointer`}
          style={{ 
            filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))',
            transform: 'translateY(50px) scale(0.8) rotate(0deg)'
          }}
        >
          <div className="relative group">
            <img 
              src={image.src} 
              alt={image.alt}
              className="w-full h-full object-cover rounded-2xl border-2 border-amber-400/30 group-hover:border-amber-400/60 transition-all duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      ))}

      {/* Central Content */}
      <div 
        ref={textRef}
        className="text-center z-20 relative px-8"
      >
        {/* Luxury Badge */}
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-400/20 to-orange-500/20 backdrop-blur-sm rounded-full border border-amber-400/30 mb-8">
          <Crown size={20} className="text-amber-400" />
          <span className="text-amber-400 font-semibold tracking-wide">EXCLUSIVE LUXURY SALE</span>
          <Sparkles size={18} className="text-amber-400 animate-pulse" />
        </div>

        {/* Main Heading */}
        <h1 className="text-7xl md:text-8xl font-black mb-6 tracking-tight">
          <span className="bg-gradient-to-r from-amber-400 via-gold-500 to-orange-600 bg-clip-text text-transparent">
            50% OFF
          </span>
        </h1>

        {/* Subheading */}
        <div className="space-y-4 mb-10">
          <h2 className="text-2xl md:text-3xl font-light text-white/90 tracking-wide">
            Premium Collection
          </h2>
          <p className="text-lg text-white/70 max-w-lg mx-auto leading-relaxed">
            Indulge in luxury with our exclusive designer pieces
            <br />
            <span className="text-amber-400 font-medium">Minimum purchase $350</span>
          </p>
        </div>

        {/* CTA Button */}
        <div className="relative inline-block">
          <button 
            onClick={handleShopNow}
            className="group relative px-12 py-5 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-black text-sm rounded-full overflow-hidden transform transition-all duration-500 hover:scale-110 hover:shadow-2xl focus:outline-none"
          >
            {/* Button Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-gold-400 to-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            
            {/* Button Content */}
            <div className="relative flex items-center gap-3">
              <Gift size={24} className="group-hover:rotate-12 transition-transform duration-300" />
              <span className="tracking-wider">SHOP LUXURY</span>
              <div className="w-8 h-8 bg-black/20 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
                <div className="w-3 h-3 border-t-2 border-r-2 border-black transform rotate-45 group-hover:translate-x-0.5 transition-transform duration-300"></div>
              </div>
            </div>
          </button>
          
          {/* Button Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-600 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 -z-10"></div>
        </div>

        {/* Decorative Stars */}
        <div className="absolute -top-8 -left-8">
          <Star size={24} className="text-amber-400 fill-current animate-pulse" />
        </div>
        <div className="absolute -top-4 -right-12">
          <Star size={16} className="text-gold-400 fill-current animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
        <div className="absolute -bottom-6 left-16">
          <Star size={20} className="text-amber-400 fill-current animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </div>

      {/* Premium Overlay Effect */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none"
      />

      {/* Animated Border */}
      <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-amber-400/20 via-transparent to-orange-600/20 mask-border-gradient pointer-events-none"></div>
    </div>
  );
};

export default Promostore;