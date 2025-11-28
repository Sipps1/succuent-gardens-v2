import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ShoppingBag, ArrowRight, Leaf, Flower } from 'lucide-react';
import Product from '../components/Product';

// --- Cute Cactus SVG Components ---
const CuteCactusLeft = () => (
  <svg width="200" height="200" viewBox="0 0 200 200" className="opacity-80 drop-shadow-lg">
    {/* Pot */}
    <path d="M60 140 L50 190 L150 190 L140 140 Z" fill="#d4a5a5" stroke="#8d5e5e" strokeWidth="3" />
    <path d="M50 140 L150 140" stroke="#8d5e5e" strokeWidth="3" />
    {/* Plant Body */}
    <path d="M100 140 L100 60 A 30 30 0 0 0 40 60 L40 90" fill="none" stroke="#22c55e" strokeWidth="20" strokeLinecap="round" />
    <path d="M100 140 L100 40 A 40 40 0 0 1 180 40 L180 70" fill="none" stroke="#22c55e" strokeWidth="20" strokeLinecap="round" />
    <rect x="85" y="50" width="30" height="100" rx="15" fill="#22c55e" />
    {/* Eyes */}
    <circle cx="90" cy="90" r="3" fill="black" />
    <circle cx="110" cy="90" r="3" fill="black" />
    {/* Smile */}
    <path d="M95 95 Q100 100 105 95" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" />
    {/* Cheeks */}
    <circle cx="85" cy="98" r="4" fill="#fbcfe8" opacity="0.6" />
    <circle cx="115" cy="98" r="4" fill="#fbcfe8" opacity="0.6" />
    {/* Flower */}
    <circle cx="85" cy="40" r="10" fill="#db2777" />
    <circle cx="85" cy="40" r="5" fill="#fce7f3" />
  </svg>
);

const CuteCactusRight = () => (
  <svg width="250" height="250" viewBox="0 0 200 200" className="opacity-80 drop-shadow-lg">
    {/* Pot */}
    <path d="M50 150 L45 190 L155 190 L150 150 Z" fill="#ea580c" stroke="#9a3412" strokeWidth="3" opacity="0.8" />
    {/* Round Cactus Body */}
    <circle cx="100" cy="110" r="45" fill="#16a34a" />
    {/* Spikes (dots) */}
    <circle cx="80" cy="100" r="1" fill="#bbf7d0" />
    <circle cx="120" cy="100" r="1" fill="#bbf7d0" />
    <circle cx="100" cy="80" r="1" fill="#bbf7d0" />
    <circle cx="100" cy="120" r="1" fill="#bbf7d0" />
    <circle cx="70" cy="120" r="1" fill="#bbf7d0" />
    <circle cx="130" cy="120" r="1" fill="#bbf7d0" />
    {/* Face */}
    <circle cx="85" cy="110" r="3" fill="black" />
    <circle cx="115" cy="110" r="3" fill="black" />
    <path d="M95 115 Q100 120 105 115" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" />
    {/* Flower on top */}
    <path d="M80 70 Q100 50 120 70" fill="#f472b6" />
    <circle cx="100" cy="65" r="8" fill="#fbcfe8" />
  </svg>
);

const HomePage = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await axios.get('/api/products');
        setFeatured(data.slice(0, 4));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    // Full screen layout with a richer green gradient
    <div className="relative w-full min-h-screen bg-gradient-to-b from-[#dcfce7] via-[#f0fdf4] to-[#ffffff] overflow-x-hidden">
      
      {/* --- Background Decor --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         {/* Top Left Hanging Vine */}
         <div className="absolute -top-10 -left-10 w-40 h-40 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
         
         {/* Cute Cactus Left (Desktop) */}
         <div className="absolute top-32 left-10 hidden lg:block animate-bounce" style={{ animationDuration: '3s' }}>
           <CuteCactusLeft />
         </div>
         
         {/* Cute Cactus Right (Desktop) */}
         <div className="absolute bottom-10 right-5 hidden lg:block animate-bounce" style={{ animationDuration: '4s' }}>
           <CuteCactusRight />
         </div>

         {/* Mobile decorative circles */}
         <div className="absolute top-1/4 right-0 w-32 h-32 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 lg:hidden"></div>
      </div>

      {/* --- Local Styles for animations --- */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
      `}</style>

      {/* --- Hero Section (Full Width) --- */}
      <section className="relative w-full py-24 px-4 flex flex-col items-center justify-center text-center z-10">
        
        <div className="bg-white/60 backdrop-blur-md border border-white/80 p-8 md:p-12 rounded-[3rem] shadow-xl max-w-4xl w-full mx-auto relative overflow-hidden">
          {/* Decorative Sparkles */}
          <div className="absolute top-6 right-10 text-yellow-400 text-2xl animate-pulse"></div>
          <div className="absolute bottom-6 left-10 text-yellow-400 text-2xl animate-pulse" style={{animationDelay: '0.5s'}}></div>

          <div className="inline-flex items-center justify-center px-4 py-1.5 bg-green-100 text-green-800 rounded-full mb-6 shadow-sm border border-green-200">
            <Leaf className="w-4 h-4 mr-2" />
            <span className="text-sm font-bold tracking-wide uppercase">Welcome to the Garden</span>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl text-green-900 mb-6 drop-shadow-sm leading-tight">
            Create Your Own <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 italic">
              Magical World
            </span>
          </h1>
          
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-gray-600 leading-relaxed font-medium">
            Discover enchanting succulents, whimsical figurines, and magical
            accessories. Build a tiny paradise right on your desk.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/shop" className="inline-flex items-center justify-center gap-2 bg-green-600 text-white rounded-full font-bold text-lg px-8 py-4 shadow-[0_4px_14px_0_rgba(34,197,94,0.39)] hover:bg-green-700 hover:scale-105 transition-all duration-300">
              <ShoppingBag className="w-5 h-5" />
              Start Shopping
            </Link>
            <Link to="/shop" className="inline-flex items-center justify-center gap-2 bg-white text-green-700 border-2 border-green-100 rounded-full font-bold text-lg px-8 py-4 hover:bg-green-50 hover:border-green-200 transition-all duration-300">
              View Gallery
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* --- Featured Collection Section (Full Width Strip) --- */}
      <section className="relative w-full py-20 bg-white/50 backdrop-blur-sm border-t border-green-100 z-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-green-900 text-4xl md:text-5xl mb-4 flex items-center justify-center gap-3 font-serif">
              <Flower className="text-pink-400 w-8 h-8 animate-spin-slow" />
              Featured Treasures
              <Flower className="text-pink-400 w-8 h-8 animate-spin-slow" />
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Handpicked favorites to jumpstart your fairy garden layout
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-12">
              {featured.map((product) => (
                <div key={product._id} className="transform hover:-translate-y-2 transition-transform duration-300">
                  <Product product={product} />
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-20">
            <Link to="/shop" className="group inline-flex items-center gap-2 text-green-700 font-bold text-xl hover:text-green-800 transition-colors">
              <span className="border-b-2 border-green-300 group-hover:border-green-600 transition-all">
                Wander Through Full Collection
              </span>
              <ArrowRight className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
};

export default HomePage;