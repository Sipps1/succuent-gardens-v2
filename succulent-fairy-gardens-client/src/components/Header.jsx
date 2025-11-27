import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { cartItems } = useCart();
  const { userInfo } = useAuth();

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <header className="bg-white/70 backdrop-blur-md py-4 border-b border-gray-200 sticky top-0 z-[100]">
      <nav className="flex justify-between items-center max-w-[1200px] mx-auto px-4 flex-col md:flex-row gap-4 md:gap-0">
        <Link to="/" className="font-heading text-2xl md:text-3xl font-bold text-primary no-underline">
          Succulent Fairy Gardens
        </Link>
        <ul className="list-none flex gap-6">
          <li>
            <Link to="/" className="text-lg font-medium text-gray-700 hover:text-primary transition-colors">Home</Link>
          </li>
          <li>
            <Link to="/shop" className="text-lg font-medium text-gray-700 hover:text-primary transition-colors">Shop</Link>
          </li>
          <li>
            <Link to="/cart" className="text-lg font-medium text-gray-700 hover:text-primary transition-colors">Cart {cartCount > 0 && `(${cartCount})`}</Link>
          </li>
          {userInfo && userInfo.isAdmin && (
            <li>
              <Link to="/admin" className="text-lg font-medium text-gray-700 hover:text-primary transition-colors">Admin</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;