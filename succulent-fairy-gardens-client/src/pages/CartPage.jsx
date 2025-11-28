import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, ShoppingBag, ArrowRight, PackageOpen } from 'lucide-react';

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    itemsPrice,
    shippingFee,
    totalPrice,
    loadingSettings,
  } = useCart();
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl min-h-[60vh] p-8 relative shadow-soft border border-white/50">
      <h2 className="text-4xl font-heading text-primary mb-8 text-center text-shadow-custom">
        Your Magical Cart
      </h2>

      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-[#FDF6F6] w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-[#D4A5A5]" />
          </div>
          <p className="text-xl text-gray-500 mb-8">
            Your cart is empty. It looks like you haven't found your fairy treasures yet!
          </p>
          <Link to="/shop" className="btn btn-secondary inline-flex items-center gap-2">
            <ArrowRight className="w-4 h-4" />
            Go Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 items-start">
          {/* Cart Items List */}
          <div className="bg-[#FDF6F6] p-6 rounded-2xl shadow-inner border border-white/60">
            {cartItems.map((item) => (
              <div 
                key={item._id} 
                className="flex flex-col sm:flex-row items-center gap-6 mb-6 pb-6 border-b border-[#E8D5D5] last:border-b-0 last:mb-0 last:pb-0"
              >
                <img
                  src={item.image || 'https://via.placeholder.com/100'}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-2xl shadow-sm border-2 border-white"
                />
                <div className="flex-grow text-center sm:text-left">
                  <Link to={`/shop`} className="text-lg font-bold text-primary hover:text-[#D4A5A5] transition-colors">
                    {item.name}
                  </Link>
                  <p className="text-secondary font-medium mt-1">R{item.price.toFixed(2)}</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-white rounded-full border border-[#E8D5D5] px-3 py-1">
                    <span className="text-xs font-bold text-gray-400 mr-2">QTY</span>
                    <input
                      type="number"
                      min="1"
                      value={item.qty}
                      onChange={(e) => updateQuantity(item._id, Number(e.target.value))}
                      className="w-12 text-center border-none p-0 focus:ring-0 font-bold text-gray-700"
                    />
                  </div>
                  
                  <button
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                    onClick={() => removeFromCart(item._id)}
                    title="Remove Item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <aside className="bg-white p-8 rounded-2xl shadow-soft border border-[#E8D5D5] sticky top-8">
            <h3 className="text-2xl font-heading text-secondary mb-6 flex items-center gap-2">
              <PackageOpen className="w-6 h-6" /> Order Summary
            </h3>
            {loadingSettings ? (
              <p className="text-center text-gray-400 py-4">Loading summary...</p>
            ) : (
              <>
                <ul className="space-y-4 mb-8">
                  <li className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium">R{itemsPrice.toFixed(2)}</span>
                  </li>
                  <li className="flex justify-between text-gray-600">
                    <span>Shipping Fee</span>
                    <span className="font-medium">R{shippingFee.toFixed(2)}</span>
                  </li>
                  <li className="flex justify-between text-xl font-bold text-primary border-t border-dashed border-[#E8D5D5] pt-4 mt-4">
                    <span>Total</span>
                    <span>R{totalPrice.toFixed(2)}</span>
                  </li>
                </ul>
                <button
                  className="btn w-full justify-center py-3 text-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                  onClick={() => navigate('/checkout')}
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
};

export default CartPage;