import React from 'react';
import { Facebook, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  // Styling for the "Picket Fence" top edge
  const fenceTopStyle = {
    height: '30px',
    width: '100%',
    backgroundColor: 'transparent',
    backgroundImage: `
      linear-gradient(45deg, transparent 75%, #ffffff 75%), 
      linear-gradient(-45deg, transparent 75%, #ffffff 75%)
    `,
    backgroundPosition: '0 0',
    backgroundSize: '40px 40px', // Controls the width of the fence pickets
    backgroundRepeat: 'repeat-x',
    position: 'relative',
    top: '2px',
    zIndex: 10,
  };

  // Styling for the "Wood" texture body
  const woodBodyStyle = {
    backgroundColor: '#78350f', // Dark wood color
    backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 2px, transparent 2px, transparent 8px)',
  };

  return (
    <div className="mt-auto">
      {/* The Picket Fence Top (Inline Styles) */}
      <div style={fenceTopStyle}></div>
      
      {/* The Fence Body (Footer) */}
      <footer style={woodBodyStyle} className="text-white pt-12 pb-8 px-4 border-t-4 border-white/20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-serif text-2xl mb-4 text-green-300">Succulent Fairy Gardens</h3>
            <p className="text-sm opacity-80 mb-4 max-w-xs">
              Bringing magic to your home, one tiny plant at a time.
            </p>
          </div>

          {/* Column 2: Quick Links (Socials) */}
          <div className="flex flex-col items-center">
            <h4 className="font-bold mb-4 uppercase tracking-wider text-sm text-green-200">Follow the Magic</h4>
            <div className="flex gap-6">
              <a
                href="https://www.instagram.com/succulentfairygardens/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-400 hover:scale-110 transition-all transform bg-white/10 p-3 rounded-full"
              >
                <Instagram className="w-6 h-6" />
              </a>
              {/* Example Facebook link */}
               <a
                href="#"
                className="hover:text-blue-400 hover:scale-110 transition-all transform bg-white/10 p-3 rounded-full"
              >
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Column 3: Contact */}
          <div className="flex flex-col items-center md:items-end">
             <h4 className="font-bold mb-4 uppercase tracking-wider text-sm text-green-200">Contact Us</h4>
             <a href="mailto:info@succulentfairygardens.co.za" className="flex items-center gap-2 hover:text-pink-300 transition-colors">
               <Mail className="w-4 h-4" />
               info@succulentfairygardens.co.za
             </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-green-100/60 text-sm font-mono">
            &copy; {new Date().getFullYear()} Succulent Fairy Gardens. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;