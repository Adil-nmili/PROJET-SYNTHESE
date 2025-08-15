// import '@fontsource/bebas-neue';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/700.css';
import { motion, AnimatePresence } from 'framer-motion';

// import { useEffect, useState } from 'react';
import PlayersCoposant from '../components/Partials/Players';
import { useEffect, useState } from 'react';
import SplashScreen from '../components/Partials/SplashScreen';
import InterviewCoposant from '../components/Partials/InterviewCoposant';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const events = [
    { date: "1947", text: " the Lakers franchise was founded, but not in Los Angeles — they were originally based in Minneapolis, Minnesota, and were called the Minneapolis Lakers."},
    { date: "1980", text: "Marked the start of a dynasty: The Lakers would go on to win 5 championships in the 1980s (1980, 1982, 1985, 1987, 1988).Cemented Magic Johnson as a superstar and revolutionized the point guard role."  },
    { date: "2000", text: "Start of the Shaq-Kobe 3-peat (2000, 2001, 2002)Phil Jackson proved he could win without Michael Jordan.Lakers re-established themselves as the NBA's most dominant franchise of the early 2000s." },
    { date: "2020", text: "The year 2020 was an emotional and historic year for the Los Angeles Lakers. Despite the global COVID-19 pandemic and the tragic loss of Lakers legend Kobe Bryant, the team went on to win their 17th NBA Championship, tying the Boston Celtics for the most in NBA history." },
  ];

  // FAQ content
  const faqItems = [
    {
      q: "When were the Lakers founded?",
      a: "The franchise began in 1947 as the Minneapolis Lakers before moving to Los Angeles in 1960." 
    },
    {
      q: "How many NBA championships have the Lakers won?",
      a: "They've won 17 NBA championships, tied for the most in league history." 
    },
    {
      q: "Who are the most iconic Lakers players?",
      a: "Magic Johnson, Kareem Abdul-Jabbar, Kobe Bryant, Jerry West, Shaquille O'Neal, and LeBron James, among others." 
    },
    {
      q: "What is 'Showtime'?",
      a: "'Showtime' refers to the fast-paced, high-entertainment style of play led by Magic Johnson and coach Pat Riley in the 1980s." 
    }
  ];

  const playerQuotes = [
    {
      quote: "I'll do whatever it takes to win games, whether it's sitting on a bench waving a towel, handing a cup of water to a teammate, or hitting the game-winning shot.",
      author: "Kobe Bryant",
      image: "/players/bryant.jpg"
    },
    {
      quote: "The most important thing is to try and inspire people so that they can be great in whatever they want to do.",
      author: "LeBron James",
      image: "/players/CaricatureLebron.jpg"
    },
   
    {
      quote: "The best revenge is massive success.",
      author: "Magic Johnson",
      image: "/players/Magic.jpg"
    },
    {
      quote: "I'm going to use all my tools, my God-given ability, and make the best life I can with it.",
      author: "Shaquille O'Neal",
      image: "/players/neal.jpg"
    }
  ];

  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    // SplashScreen dure 3 secondes
    // const timer = setTimeout(() => {
    //   setLoading(false);
    // }, 7000
  // );

    // return () => clearTimeout(timer);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  useEffect(() => {
    const quoteTimer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % playerQuotes.length);
    }, 4000);

    return () => clearInterval(quoteTimer);
  }, []);

  // GSAP: global parallax and hover effects
  useEffect(() => {
    // Section parallax entrance
    const sections = gsap.utils.toArray('.about-parallax');
    sections.forEach((sec) => {
      gsap.fromTo(
        sec,
        { y: 90, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sec,
            start: 'top 85%',
            end: 'top 45%',
            scrub: true,
          },
        }
      );
    });

    // Floating decorative blobs
    gsap.utils.toArray('.float-blob').forEach((el, i) => {
      gsap.to(el, {
        y: i % 2 === 0 ? -30 : -50,
        x: i % 2 === 0 ? 20 : -20,
        duration: 6 + i,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    });

    // 3D tilt on hover for cards
    const cards = gsap.utils.toArray('.tilt-card');
    const handlers = [];
    cards.forEach((card) => {
      const bounds = () => card.getBoundingClientRect();
      const onMove = (e) => {
        const b = bounds();
        const relX = (e.clientX - b.left) / b.width - 0.5;
        const relY = (e.clientY - b.top) / b.height - 0.5;
        gsap.to(card, {
          rotateY: relX * 8,
          rotateX: -relY * 8,
          transformPerspective: 800,
          transformOrigin: 'center',
          duration: 0.3,
          ease: 'power2.out',
        });
      };
      const onLeave = () => {
        gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.4, ease: 'power3.out' });
      };
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
      handlers.push({ card, onMove, onLeave });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      handlers.forEach(({ card, onMove, onLeave }) => {
        card.removeEventListener('mousemove', onMove);
        card.removeEventListener('mouseleave', onLeave);
      });
    };
   
  }, []);

  // GSAP: KPI count-up on view
  useEffect(() => {
    const elements = gsap.utils.toArray('.kpi-count');
    elements.forEach((el) => {
      const target = parseInt(el.getAttribute('data-target') || '0', 10);
      const obj = { val: 0 };
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: target,
            duration: 1.5,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = Math.floor(obj.val).toString();
            }
          });
        }
      });
    });
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // if (loading) {
  //   return <SplashScreen onFinish={() => setLoading(false)} />;
  // }
  
  
  return (
    <div className='min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0f0527] via-[#2a0b5a] to-[#0f0527]'>
      {/* Luxury gradient lines */}
      <div className="pointer-events-none absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFCC28] via-[#A92551] to-[#56065D]"></div>
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#56065D] via-[#A92551] to-[#FFCC28]"></div>
      {/* Soft glow blobs */}
      <div className='float-blob absolute -top-10 -left-10 w-72 h-72 rounded-full blur-3xl opacity-30 bg-gradient-to-br from-[#FFCC28] to-transparent'></div>
      <div className='float-blob absolute top-40 -right-10 w-80 h-80 rounded-full blur-3xl opacity-20 bg-gradient-to-br from-[#A92551] to-transparent'></div>

      {/* Hero Section */}
      <div className="about-parallax px-4 py-14 md:px-16 md:py-20">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-bebas text-4xl md:text-6xl text-center uppercase font-bold m-2 bg-gradient-to-r from-[#FFCC28] via-[#E7B96E] to-[#A57468] bg-clip-text text-transparent drop-shadow"
        >
          What is the <span className='bg-gradient-to-r from-[#FDBB30] to-[#A57468] bg-clip-text text-transparent'>Los Angeles Lakers</span>
        </motion.h1>
        <motion.h3 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='text-[#E7B96E]/90 font-bold font-bebas text-base mb-4 tracking-wide text-center'
        >
          The Los Angeles Lakers: A Legacy of Excellence
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='text-white/90 text-base leading-relaxed tracking-wider px-4 md:px-10 max-w-5xl mx-auto mb-10 text-center'
        >
          Founded in 1947, the Los Angeles Lakers are more than just a basketball team—they are a cultural phenomenon. With 17 NBA championships and a legacy of legendary players like Magic Johnson, Kobe Bryant, Kareem Abdul-Jabbar, and LeBron James, the Lakers represent the pinnacle of basketball greatness. Known for their iconic purple and gold colors, their "Showtime" style of play, and their deep connection to the city of Los Angeles, the Lakers have captivated fans around the world for decades. Whether it's the electric atmosphere of the Crypto.com Arena or the unforgettable moments that define their history, the Lakers embody passion, innovation, and excellence both on and off the court.
        </motion.p>

        {/* Timeline Section */}
        <div className="about-parallax relative w-full py-10">
  <div className="max-w-5xl mx-auto">
    <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-4 border-[#FFCC28]/60 shadow-[0_0_30px_rgba(255,204,40,0.2)]"></div>

    {events.map((event, index) => (
      <motion.div
        key={index}
        className={`mb-4 flex justify-between items-center w-full ${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'}`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, delay: index * 0.2 }}
      >
        {/* Zone de la carte réduite */}
        <div className="w-2/3 flex flex-col items-center">
          <motion.div
            className="tilt-card w-full bg-white/10 backdrop-blur-xl rounded-xl p-4 shadow-2xl transition-all duration-300 border border-white/10 hover:border-[#FFCC28]/50 hover:shadow-[0_0_30px_rgba(255,204,40,0.25)]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <p className="text-[#FFCC28] text-base font-bebas mb-2 tracking-wider">
                {event.date}
              </p>
              <p className="text-white/90 text-sm font-bebas leading-relaxed">
                {event.text}
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Point central de la timeline */}
        <div className="z-10 w-4 h-4 mx-2 bg-[#FFCC28] rounded-full border-4 border-white/20 shadow-[0_0_20px_rgba(255,204,40,0.6)]"></div>

        {/* Zone vide en face */}
        <div className="w-2/3"></div>
      </motion.div>
    ))}
  </div>
</div>
</div>


      {/* Players Section */}
      <div className="about-parallax relative w-full py-20">
        <img
          src="basketball2.png"
          className="absolute left-0 top-1/2 transform -translate-y-1/2 w-28 h-28 object-contain opacity-70"
          alt="Basketball Left"
        />

        <img
          src="basketball2.png"
          className="absolute right-0 top-1/2 transform -translate-y-1/2 w-28 h-28 object-contain opacity-70"
          alt="Basketball Right"
        />

        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-bebas text-5xl bg-gradient-to-r from-[#FFCC28] via-[#E7B96E] to-[#A57468] bg-clip-text text-transparent uppercase font-bold ">
            Players
          </h1>
          <PlayersCoposant />
        </div>
      </div>
      
      {/* Stats at a Glance */}
      <div className="about-parallax py-14 px-6">
        <h2 className="font-bebas text-4xl md:text-5xl text-center bg-gradient-to-r from-[#FFCC28] via-[#E7B96E] to-[#A57468] bg-clip-text text-transparent uppercase font-bold mb-8">Stats at a Glance</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Championships', value: 17 },
            { label: 'Finals Appearances', value: 32 },
            { label: 'MVP Awards', value: 8 },
            { label: 'Retired Jerseys', value: 13 },
          ].map((kpi, i) => (
            <div key={i} className="tilt-card bg-white/5 backdrop-blur-xl rounded-2xl p-5 text-center border border-white/10 hover:border-[#FFCC28]/50 hover:shadow-[0_0_30px_rgba(255,204,40,0.25)]">
              <div className="text-4xl md:text-5xl font-bebas text-[#FFCC28]">
                <span className="kpi-count" data-target={kpi.value}>0</span>
              </div>
              <p className="text-white/80 text-sm mt-1 tracking-wide">{kpi.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Rivalries Spotlight */}
      <div className="about-parallax py-14 px-6">
        <h2 className="font-bebas text-4xl md:text-5xl text-center bg-gradient-to-r from-[#FFCC28] via-[#E7B96E] to-[#A57468] bg-clip-text text-transparent uppercase font-bold mb-8">Rivalries Spotlight</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Celtics */}
          <div className="tilt-card bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-[#FFCC28]/50 hover:shadow-[0_0_30px_rgba(255,204,40,0.25)]">
            <h3 className="font-bebas text-3xl text-[#E7B96E] mb-2">Boston Celtics</h3>
            <p className="text-white/80 text-sm leading-relaxed mb-4">The most storied rivalry in NBA history. Countless Finals meetings, legends on both sides, and a constant battle for the league’s most championships.</p>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-[#FFCC28] text-2xl font-bebas">17</p>
                <p className="text-white/70 text-xs">Titles</p>
              </div>
              <div>
                <p className="text-[#FFCC28] text-2xl font-bebas">12</p>
                <p className="text-white/70 text-xs">Finals H2H</p>
              </div>
              <div>
                <p className="text-[#FFCC28] text-2xl font-bebas">Showtime</p>
                <p className="text-white/70 text-xs">Era</p>
              </div>
            </div>
          </div>

          {/* Clippers */}
          <div className="tilt-card bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-[#FFCC28]/50 hover:shadow-[0_0_30px_rgba(255,204,40,0.25)]">
            <h3 className="font-bebas text-3xl text-[#E7B96E] mb-2">LA Clippers</h3>
            <p className="text-white/80 text-sm leading-relaxed mb-4">A city rivalry defined by contrasting histories—legacy vs. ambition. Staples to Crypto.com, the Battle of LA electrifies the regular season.</p>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-[#FFCC28] text-2xl font-bebas">34</p>
                <p className="text-white/70 text-xs">Years in LA</p>
              </div>
              <div>
                <p className="text-[#FFCC28] text-2xl font-bebas">H2H</p>
                <p className="text-white/70 text-xs">Season Series</p>
              </div>
              <div>
                <p className="text-[#FFCC28] text-2xl font-bebas">Derby</p>
                <p className="text-white/70 text-xs">Vibes</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Community & Culture */}
      <div className="about-parallax py-14 px-6">
        <h2 className="font-bebas text-4xl md:text-5xl text-center bg-gradient-to-r from-[#FFCC28] via-[#E7B96E] to-[#A57468] bg-clip-text text-transparent uppercase font-bold mb-8">Community & Culture</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[{
            title: 'Philanthropy',
            desc: 'Youth programs, education initiatives, and community uplift across Los Angeles.',
            icon: '🤝'
          },{
            title: 'Global Fanbase',
            desc: 'A worldwide community united by purple & gold, culture, and tradition.',
            icon: '🌍'
          },{
            title: 'Legacy & Culture',
            desc: 'From Showtime to Mamba Mentality—values that inspire on and off the court.',
            icon: '🏆'
          }].map((item, i) => (
            <div key={i} className="tilt-card bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-[#FFCC28]/50 hover:shadow-[0_0_30px_rgba(255,204,40,0.25)]">
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="font-bebas text-2xl text-[#E7B96E] mb-2">{item.title}</h3>
              <p className="text-white/80 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="about-parallax py-14 px-6">
        <h2 className="font-bebas text-4xl md:text-5xl text-center bg-gradient-to-r from-[#FFCC28] via-[#E7B96E] to-[#A57468] bg-clip-text text-transparent uppercase font-bold mb-8">FAQ</h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {faqItems.map((item, idx) => {
            const open = openFaq === idx;
            return (
              <motion.div key={idx} className="tilt-card bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4 }}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(open ? null : idx)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-3 hover:bg-white/5"
                >
                  <span className="font-bebas text-xl text-white/90">{item.q}</span>
                  <span className={`text-[#FFCC28] transition-transform ${open ? 'rotate-45' : ''}`}>+</span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="px-5"
                >
                  {open && (
                    <div className="pb-4 text-white/80 text-sm leading-relaxed">{item.a}</div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
       {/* Section Quotes Slider */}
      <div className="about-parallax py-10 px-5 ">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-bebas text-3xl text-center bg-gradient-to-r from-[#FFCC28] via-[#E7B96E] to-[#A57468] bg-clip-text text-transparent uppercase font-bold mb-8"
        >
          Legendary Quotes
        </motion.h1>
        <div className="max-w-3xl mx-auto relative h-[300px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuote}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="absolute w-full"
            >
              <div className="tilt-card bg-white/5 backdrop-blur-xl rounded-xl p-6 shadow-2xl transition-all duration-300 border border-white/10 hover:border-[#FFCC28]/50 hover:shadow-[0_0_30px_rgba(255,204,40,0.25)]">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex items-center justify-center mb-6"
                >
                  <div className="relative">
                    <motion.img
                      src={playerQuotes[currentQuote].image}
                      alt={playerQuotes[currentQuote].author}
                      className="w-20 h-20 rounded-full object-cover border-4 border-[#FFCC28]/70 shadow-[0_0_20px_rgba(255,204,40,0.5)]"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-[#AD8291]"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-center"
                >
                  <p className="text-white/90 text-lg italic mb-4 font-bebas leading-relaxed">
                    "{playerQuotes[currentQuote].quote}"
                  </p>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-[#E7B96E] font-bold text-base font-bebas"
                  >
                    - {playerQuotes[currentQuote].author}
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      

     
    </div>
  );
}

export default About;

