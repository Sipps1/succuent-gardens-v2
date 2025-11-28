import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { MapPin, User, Phone, Mail, CheckCircle } from 'lucide-react';

const CheckoutPage = () => {
  const { cartItems, itemsPrice, shippingFee, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    shippingAddress: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { name, email, phone, shippingAddress } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !shippingAddress) {
      setError('Please fill in all fields.');
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      const order = {
        orderItems: cartItems,
        customer: {
          name,
          email,
          phone,
          shippingAddress,
        },
        itemsPrice,
        shippingPrice: shippingFee,
        totalPrice,
      };

      const { data: createdOrder } = await axios.post(
        '/api/orders',
        order
      );

      setLoading(false);
      clearCart();
      navigate('/order-confirmation', { state: { order: createdOrder } });

    } catch (err) {
      console.error('Order creation failed:', err);
      setError('Failed to place order. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl min-h-[60vh] p-8 relative shadow-soft border border-white/50">
      <h2 className="text-4xl font-heading text-primary mb-8 text-center text-shadow-custom">
        Secure Checkout
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 items-start">
        {/* Checkout Form */}
        <form 
          className="bg-[#FDF6F6] p-8 rounded-2xl shadow-inner border border-white" 
          onSubmit={submitHandler}
        >
          <h3 className="text-2xl font-heading text-secondary mb-6 border-b border-[#E8D5D5] pb-2">
            Shipping Details
          </h3>
          
          {error && (
            <div className="bg-red-100 border border-red-200 text-red-600 p-4 rounded-xl mb-6">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-bold text-gray-600 text-sm flex items-center gap-2">
                  <User className="w-4 h-4" /> Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={onChange}
                  className="w-full p-3 rounded-xl border border-[#E8D5D5] focus:border-[#D4A5A5] focus:ring-2 focus:ring-[#D4A5A5]/20 outline-none transition-all bg-white"
                  placeholder="Fairy Godmother"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-bold text-gray-600 text-sm flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={onChange}
                  className="w-full p-3 rounded-xl border border-[#E8D5D5] focus:border-[#D4A5A5] focus:ring-2 focus:ring-[#D4A5A5]/20 outline-none transition-all bg-white"
                  placeholder="082 123 4567"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 font-bold text-gray-600 text-sm flex items-center gap-2">
                <Mail className="w-4 h-4" /> Email Address
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                className="w-full p-3 rounded-xl border border-[#E8D5D5] focus:border-[#D4A5A5] focus:ring-2 focus:ring-[#D4A5A5]/20 outline-none transition-all bg-white"
                placeholder="magic@garden.com"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-bold text-gray-600 text-sm flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Shipping Address
              </label>
              <textarea
                name="shippingAddress"
                value={shippingAddress}
                onChange={onChange}
                className="w-full p-3 rounded-xl border border-[#E8D5D5] focus:border-[#D4A5A5] focus:ring-2 focus:ring-[#D4A5A5]/20 outline-none transition-all bg-white resize-none"
                rows="3"
                placeholder="123 Enchanted Lane..."
                required
              ></textarea>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn w-full mt-8 py-4 text-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all" 
            disabled={loading}
          >
            {loading ? 'Placing Order...' : 'Place Order (Pay via EFT)'}
          </button>
        </form>

        {/* Mini Cart Summary */}
        <aside className="bg-white p-8 rounded-2xl shadow-soft border border-[#E8D5D5] sticky top-8">
          <h3 className="text-xl font-bold text-primary mb-6">Your Order</h3>
          <div className="max-h-[300px] overflow-y-auto pr-2 custom-scrollbar mb-6">
            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between mb-4 text-sm border-b border-dashed border-gray-100 pb-4 last:border-0">
                <span className="text-gray-600 font-medium">{item.name} <span className="text-[#D4A5A5]">x{item.qty}</span></span>
                <span className="font-bold text-gray-700">R{(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="space-y-3 bg-[#FDF6F6] p-4 rounded-xl">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>R{itemsPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Shipping</span>
              <span>R{shippingFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-primary border-t border-[#E8D5D5] pt-3 mt-2">
              <span>Total</span>
              <span>R{totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CheckoutPage;