import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';

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
    <div>
      <h2 className="text-3xl mb-6">Checkout</h2>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 items-start">
        <form className="bg-bg-soft p-8 rounded-2xl border border-primary" onSubmit={submitHandler}>
          <h3 className="text-2xl mb-4">Your Details</h3>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className="mb-5">
            <label className="block mb-1 font-bold">Full Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-1 font-bold">Email Address</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-1 font-bold">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={phone}
              onChange={onChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-1 font-bold">Shipping Address</label>
            <textarea
              name="shippingAddress"
              value={shippingAddress}
              onChange={onChange}
              className="form-control"
              rows="4"
              required
            ></textarea>
          </div>
          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Placing Order...' : 'Place Order (Pay via EFT)'}
          </button>
        </form>

        <aside className="bg-bg-soft p-8 rounded-2xl border border-primary">
          <h3 className="text-2xl mb-4">Your Order</h3>
          {cartItems.map((item) => (
            <div key={item._id} className="flex justify-between mb-2">
              <span>{item.name} (x{item.qty})</span>
              <span>R{(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}
          <hr className="my-4 border-gray-300" />
          <ul className="list-none">
            <li className="flex justify-between mb-4 text-lg">
              <span>Subtotal</span>
              <span>R{itemsPrice.toFixed(2)}</span>
            </li>
            <li className="flex justify-between mb-4 text-lg">
              <span>Shipping</span>
              <span>R{shippingFee.toFixed(2)}</span>
            </li>
            <li className="flex justify-between font-bold text-xl border-t-2 border-primary pt-4 mt-4">
              <span>Total</span>
              <span>R{totalPrice.toFixed(2)}</span>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default CheckoutPage;