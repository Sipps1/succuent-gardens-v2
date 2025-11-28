import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { 
  Home, 
  ShoppingBag, 
  ShoppingCart, 
  LogOut, 
  Flower, 
  Settings
} from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  // Using 'cartItems' to avoid the "undefined" error
  const { cartItems } = useCart(); 
  const location = useLocation();

  // Calculate total items in cart safely
  const cartItemCount = cartItems ? cartItems.reduce((acc, item) => acc + item.qty, 0) : 0;

  // Helper to check active link for styling
  const isActive = (path) => {
    return location.pathname === path 
      ? "text-green-800 bg-green-100 font-bold" 
      : "text-gray-600 hover:text-green-600 hover:bg-green-50";
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-green-100 shadow-sm transition-all duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
        
        {/* --- Logo Section --- */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-green-100 p-2 rounded-full group-hover:bg-green-200 transition-colors">
            <Flower className="w-6 h-6 text-pink-500" />
          </div>
          <span className="font-serif text-xl md:text-2xl text-green-900 tracking-tight group-hover:text-green-700 transition-colors">
            Succulent <span className="text-pink-500">Fairy</span> Gardens
          </span>
        </Link>

        {/* --- Desktop Navigation --- */}
        <nav className="hidden md:flex items-center gap-2">
          <Link 
            to="/" 
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${isActive('/')}`}
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
          
          <Link 
            to="/shop" 
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${isActive('/shop')}`}
          >
            <ShoppingBag className="w-4 h-4" />
            Shop
          </Link>

          {/* Only show Admin link if user is logged in and is an admin */}
          {user && user.isAdmin && (
             <Link 
             to="/admin/dashboard" 
             className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${isActive('/admin/dashboard')}`}
           >
             <Settings className="w-4 h-4" />
             Admin
           </Link>
          )}
        </nav>

        {/* --- Right Actions (Cart & User) --- */}
        <div className="flex items-center gap-3 md:gap-4">
          
          {/* Cart Icon */}
          <Link to="/cart" className="relative p-2 text-gray-600 hover:text-green-700 transition-colors group">
            <ShoppingCart className="w-6 h-6" />
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 bg-pink-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm group-hover:scale-110 transition-transform">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* User Section - ONLY visible if logged in */}
          {user && (
            <div className="flex items-center gap-3 pl-3 border-l border-green-100">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Hello,</span>
                <span className="text-sm font-bold text-green-800 leading-none">{user.name.split(' ')[0]}</span>
              </div>
              <button 
                onClick={logout}
                className="bg-red-50 text-red-400 p-2 rounded-full hover:bg-red-100 hover:text-red-600 transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          )}
          
          {/* Public Login button has been removed */}
        </div>

      </div>
    </header>
  );
};

export default Header;