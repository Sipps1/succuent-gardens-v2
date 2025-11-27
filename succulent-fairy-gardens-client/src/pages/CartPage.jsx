import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

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
    <div>
      <h2 className="text-3xl mb-6">Your Magical Cart</h2>
      {cartItems.length === 0 ? (
        <p>
          Your cart is empty. <Link to="/shop">Go Shopping!</Link>
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 items-start">
          <div className="bg-white p-6 rounded-2xl shadow-soft-inset">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200 last:border-b-0 last:mb-0 last:pb-0">
                <img
                  src={item.image || 'https://via.placeholder.com/100'}
                  alt={item.name}
                  className="w-[100px] h-[100px] object-cover rounded-2xl"
                />
                <div className="flex-grow">
                  <Link to={`/shop`}>
                    <strong>{item.name}</strong>
                  </Link>
                  <p>R{item.price.toFixed(2)}</p>
                </div>
                <input
                  type="number"
                  min="1"
                  value={item.qty}
                  onChange={(e) => updateQuantity(item._id, e.target.value)}
                  className="form-control w-[70px]"
                />
                <button
                  className="btn btn-danger"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <aside className="bg-bg-soft p-8 rounded-2xl border border-primary">
            <h3 className="text-2xl mb-4">Order Summary</h3>
            {loadingSettings ? (
              <p>Loading summary...</p>
            ) : (
              <>
                <ul className="list-none mb-6">
                  <li className="flex justify-between mb-4 text-lg">
                    <span>Subtotal</span>
                    <span>R{itemsPrice.toFixed(2)}</span>
                  </li>
                  <li className="flex justify-between mb-4 text-lg">
                    <span>Shipping Fee</span>
                    <span>R{shippingFee.toFixed(2)}</span>
                  </li>
                  <li className="flex justify-between font-bold text-xl border-t-2 border-primary pt-4 mt-4">
                    <span>Total</span>
                    <span>R{totalPrice.toFixed(2)}</span>
                  </li>
                </ul>
                <button
                  className="btn w-full justify-center"
                  onClick={() => navigate('/checkout')}
                >
                  Proceed to Checkout
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